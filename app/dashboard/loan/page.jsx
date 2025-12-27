'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import TransactionForm from '@/components/accounting/TransactionForm';
import BalanceStats from '@/components/accounting/BalanceStats';
import { addLoan, deleteLoan } from '@/lib/redux/features/loan/loanSlice';
import { addCashTransaction } from '@/lib/redux/features/cash/cashSlice';
import { FaHandHoldingUsd, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function LoanPage() {
  const dispatch = useDispatch();
  const {
    loans = [],
    totalLoanTaken = 0,
    totalLoanPaid = 0,
    totalLoanRemaining = 0,
  } = useSelector((state) => state.loan || {});

  const handleSubmit = (formData) => {
    const amount = parseFloat(formData.amount);

    dispatch(
      addLoan({
        date: formData.date,
        receivedFrom: formData.receivedFrom,
        amount,
        note: formData.note,
      })
    );

    dispatch(
      addCashTransaction({
        date: formData.date,
        receivedFrom: `Loan from ${formData.receivedFrom}`,
        amount,
        note: formData.note,
      })
    );

    toast.success('Loan taken and added to cash');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this loan?')) {
      dispatch(deleteLoan(id));
      toast.success('Loan deleted');
    }
  };

  const stats = [
    {
      title: 'Total Loan Taken',
      value: `${(totalLoanTaken || 0).toFixed(2)}`,
      icon: <FaHandHoldingUsd />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${loans.length} loans`,
      badgeVariant: 'gray',
    },
    {
      title: 'Total Paid',
      value: `${(totalLoanPaid || 0).toFixed(2)}`,
      icon: '✅',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Repaid',
      badgeVariant: 'gray',
    },
    {
      title: 'Remaining',
      value: `${(totalLoanRemaining || 0).toFixed(2)}`,
      icon: '💸',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'To pay',
      badgeVariant: 'gray',
    },
  ];

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (loan) => format(new Date(loan.date), 'dd MMM yyyy'),
    },
    {
      key: 'receivedFrom',
      label: 'Received From',
      render: (loan) => (
        <span className="font-medium">{loan.receivedFrom}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Loan Amount',
      render: (loan) => (
        <span className="font-medium">{(loan.amount || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'paidAmount',
      label: 'Paid',
      render: (loan) => (
        <span className="text-green-600 font-medium">
          {(loan.paidAmount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'remainingAmount',
      label: 'Remaining',
      render: (loan) => (
        <span className="text-red-600 font-semibold">
          {(loan.remainingAmount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (loan) => (
        <Badge variant="gray">
          {loan.remainingAmount === 0
            ? 'Paid'
            : loan.paidAmount > 0
            ? 'Partial'
            : 'Unpaid'}
        </Badge>
      ),
    },
    { key: 'note', label: 'Note', render: (loan) => loan.note || '-' },
    {
      key: 'actions',
      label: 'Actions',
      render: (loan) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(loan.id)}
        >
          <FaTrash />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="Loan Management"
        subtitle="Take loans (auto adds to cash)"
        icon={<FaHandHoldingUsd className="text-2xl" />}
      />

      <BalanceStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm
            title="Take Loan"
            onSubmit={handleSubmit}
            buttonText="Take Loan"
            buttonVariant="warning"
            receivedFromLabel="Received From"
            amountLabel="Loan Amount"
          />
        </div>

        <div className="lg:col-span-2">
          <Card title="Loan History">
            <Table columns={columns} data={loans} emptyMessage="No loans yet" />
          </Card>
        </div>
      </div>
    </div>
  );
}
