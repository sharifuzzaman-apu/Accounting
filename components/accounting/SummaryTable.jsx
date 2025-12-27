'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Empty from '@/components/ui/Empty';
import { format } from 'date-fns';
import { FaPrint, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function SummaryTable({ summaries = {}, className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedDates = Object.keys(summaries).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);

    try {
      const element = document.getElementById('printable-summary');

      // Temporarily show print elements
      const printElements = element.querySelectorAll('.print\\:block');
      printElements.forEach((el) => {
        el.style.display = 'block';
      });

      // Hide status column
      const statusCells = element.querySelectorAll('.print\\:hidden');
      statusCells.forEach((el) => {
        el.style.display = 'none';
      });

      // Create canvas from HTML
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Restore original display
      printElements.forEach((el) => {
        el.style.display = '';
      });
      statusCells.forEach((el) => {
        el.style.display = '';
      });

      // Calculate PDF dimensions
      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Generate filename with current date
      const fileName = `Financial_Summary_${format(
        new Date(),
        'yyyy-MM-dd_HHmm'
      )}.pdf`;

      // Download PDF
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) {
    return (
      <Card className={`overflow-x-auto ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (sortedDates.length === 0) {
    return (
      <Card className={className}>
        <Empty
          icon="📅"
          title="No Summaries"
          message="No daily summaries available yet"
        />
      </Card>
    );
  }

  // Calculate totals
  let totalBkashReceived = 0;
  let totalBkashCharge = 0;
  let totalBankAmount = 0;
  let totalCash = 0;
  let totalIncome = 0;
  let totalExpense = 0;
  let totalNetBalance = 0;

  sortedDates.forEach((date) => {
    const summary = summaries[date];
    const bkashReceived = summary.income?.totalBkashReceived || 0;
    const bkashCharge = summary.income?.totalBkashCharge || 0;
    const bankAmount = summary.income?.totalBankAmount || 0;
    const cashIncome = summary.income?.totalCash || 0;
    const expense = summary.totalExpense || 0;
    const income = bankAmount + cashIncome;
    const netBalance = income - expense;

    totalBkashReceived += bkashReceived;
    totalBkashCharge += bkashCharge;
    totalBankAmount += bankAmount;
    totalCash += cashIncome;
    totalIncome += income;
    totalExpense += expense;
    totalNetBalance += netBalance;
  });

  return (
    <Card className={`overflow-x-auto ${className}`}>
      {/* Action Buttons - Hidden when printing */}
      <div className="flex justify-end gap-3 mb-4 print:hidden">
        <Button
          variant="success"
          size="sm"
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          <FaFilePdf />
          {isGenerating ? 'Generating.. .' : 'Download PDF'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <FaPrint /> Print
        </Button>
      </div>

      {/* Printable Content */}
      <div id="printable-summary">
        {/* Print Header - Only visible when printing or in PDF */}
        <div className="hidden print:block mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">POS-Soft</h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            Financial Summary Report
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Generated on: {format(new Date(), 'dd MMM yyyy, hh:mm a')}
          </p>
          <div className="border-t-2 border-gray-300 mt-4 mb-4"></div>
        </div>

        {/* Summary Table */}
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-200 px-3 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                bKash Received
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                bKash Charge
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Bank Amount
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Cash
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Total Income
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Expense
              </th>
              <th className="border border-gray-200 px-3 py-2 text-right">
                Net Balance
              </th>
              <th className="border border-gray-200 px-3 py-2 text-center print:hidden">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDates.map((date) => {
              const summary = summaries[date];
              const bkashReceived = summary.income?.totalBkashReceived || 0;
              const bkashCharge = summary.income?.totalBkashCharge || 0;
              const bankAmount = summary.income?.totalBankAmount || 0;
              const cashIncome = summary.income?.totalCash || 0;
              const totalIncome = bankAmount + cashIncome;
              const totalExpense = summary.totalExpense || 0;
              const netBalance = totalIncome - totalExpense;
              const isProfit = netBalance >= 0;

              return (
                <tr key={date} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2 font-medium">
                    {format(new Date(date), 'dd MMM yyyy')}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right">
                    {bkashReceived.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right text-red-600">
                    -{bkashCharge.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-medium text-green-600">
                    {bankAmount.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right">
                    {cashIncome.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-semibold">
                    {totalIncome.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right text-red-600">
                    -{totalExpense.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-right font-bold">
                    {netBalance.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-3 py-2 text-center print:hidden">
                    <Badge variant={isProfit ? 'success' : 'danger'}>
                      {isProfit ? 'Profit' : 'Loss'}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Footer Totals */}
          <tfoot>
            <tr className="bg-gray-200 font-bold">
              <td className="border border-gray-300 px-3 py-3 text-left">
                TOTAL
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right">
                {totalBkashReceived.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right text-red-600">
                -{totalBkashCharge.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right text-green-600">
                {totalBankAmount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right">
                {totalCash.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right">
                {totalIncome.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right text-red-600">
                -{totalExpense.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 text-right">
                {totalNetBalance.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-3 print:hidden"></td>
            </tr>
          </tfoot>
        </table>

        {/* Print Footer - Only visible when printing or in PDF */}
        <div className="hidden print:block mt-8">
          <div className="border-t-2 border-gray-300 pt-6">
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold">Prepared By:</p>
                <p className="mt-12 border-t border-gray-400 pt-1 text-center">
                  Signature
                </p>
              </div>
              <div>
                <p className="font-semibold">Checked By:</p>
                <p className="mt-12 border-t border-gray-400 pt-1 text-center">
                  Signature
                </p>
              </div>
              <div>
                <p className="font-semibold">Approved By:</p>
                <p className="mt-12 border-t border-gray-400 pt-1 text-center">
                  Signature
                </p>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-8">
            <p>© 2025 POS-Soft - Financial Management System</p>
            <p className="mt-1">by Sharifuzzaman Apu</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
