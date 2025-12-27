'use client';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import SummaryTable from '@/components/accounting/SummaryTable';
import BalanceStats from '@/components/accounting/BalanceStats';
import { FaChartBar } from 'react-icons/fa';

export default function SummaryPage() {
  const [mounted, setMounted] = useState(false);
  const { dailySummaries = {} } = useSelector((state) => state.summary || {});

  useEffect(() => {
    setMounted(true);
  }, []);

  const dates = Object.keys(dailySummaries);
  const totalDays = dates.length;

  let totalBkashReceived = 0;
  let totalBkashCharge = 0;
  let totalBankAmount = 0;
  let totalCash = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  if (mounted) {
    dates.forEach((date) => {
      const summary = dailySummaries[date];
      const bkashReceived = summary.income?.totalBkashReceived || 0;
      const bkashCharge = summary.income?.totalBkashCharge || 0;
      const bankAmount = summary.income?.totalBankAmount || 0;
      const cash = summary.income?.totalCash || 0;

      totalBkashReceived += bkashReceived;
      totalBkashCharge += bkashCharge;
      totalBankAmount += bankAmount;
      totalCash += cash;
      totalIncome += bankAmount + cash;
      totalExpense += summary.totalExpense || 0;
    });
  }

  const netBalance = totalIncome - totalExpense;

  const stats = [
    {
      title: 'bKash Received',
      value: mounted ? `${totalBkashReceived.toFixed(2)}` : '0.00',
      icon: '📱',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${totalBkashCharge.toFixed(2)} charge`,
      badgeVariant: 'gray',
    },
    {
      title: 'Bank Amount',
      value: mounted ? `${totalBankAmount.toFixed(2)}` : '0.00',
      icon: '🏦',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'After charge',
      badgeVariant: 'gray',
    },
    {
      title: 'Total Income',
      value: mounted ? `${totalIncome.toFixed(2)}` : '0.00',
      icon: '💰',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'All time',
      badgeVariant: 'gray',
    },
    {
      title: 'Total Expense',
      value: mounted ? `${totalExpense.toFixed(2)}` : '0.00',
      icon: '💸',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'All time',
      badgeVariant: 'gray',
    },
    {
      title: 'Net Balance',
      value: mounted ? `${netBalance.toFixed(2)}` : '0.00',
      icon: '📊',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${totalDays} days`,
      badgeVariant: 'gray',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hidden when printing */}
      <div className="print-hide">
        <Header
          title="Financial Summary"
          subtitle="Date-wise financial reports with bKash charge details"
          icon={<FaChartBar className="text-2xl" />}
        />
      </div>

      {/* Hidden when printing */}
      <div className="print-hide">
        <BalanceStats stats={stats} />
      </div>

      {/* Always visible, but only this prints */}
      {mounted && <SummaryTable summaries={dailySummaries} />}
    </div>
  );
}
