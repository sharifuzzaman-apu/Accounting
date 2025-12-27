'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import TransactionForm from '@/components/accounting/TransactionForm';
import BalanceStats from '@/components/accounting/BalanceStats';
import {
  addBkashTransaction,
  deleteBkashTransaction,
} from '@/lib/redux/features/bkash/bkashSlice';
import { FaMobileAlt, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function BkashPage() {
  const dispatch = useDispatch();
  const {
    transactions = [],
    totalBankAmount = 0,
    chargeRate = 1.85,
  } = useSelector((state) => state.bkash || {});

  const totalReceived = transactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );
  const totalCharge = transactions.reduce((sum, t) => sum + (t.charge || 0), 0);

  const handleSubmit = (formData) => {
    dispatch(
      addBkashTransaction({
        date: formData.date,
        receivedFrom: formData.receivedFrom,
        amount: parseFloat(formData.amount),
        note: formData.note,
      })
    );
    toast.success('bKash transaction added successfully');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch(deleteBkashTransaction(id));
      toast.success('Transaction deleted');
    }
  };

  const stats = [
    {
      title: 'Total Received',
      value: `${totalReceived.toFixed(2)}`,
      icon: <FaMobileAlt />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${transactions.length} transactions`,
      badgeVariant: 'gray',
    },
    {
      title: 'Total Charge',
      value: `${totalCharge.toFixed(2)}`,
      icon: '💸',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${chargeRate}% deducted`,
      badgeVariant: 'gray',
    },
    {
      title: 'Bank Balance',
      value: `${totalBankAmount.toFixed(2)}`,
      icon: '🏦',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Final amount',
      badgeVariant: 'gray',
    },
  ];

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (t) => format(new Date(t.date), 'dd MMM yyyy'),
    },
    {
      key: 'receivedFrom',
      label: 'Received From',
      render: (t) => <span className="font-medium">{t.receivedFrom}</span>,
    },
    {
      key: 'amount',
      label: 'Received',
      render: (t) => (
        <span className="font-medium">{(t.amount || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'charge',
      label: 'Charge',
      render: (t) => (
        <span className="text-red-600">-{(t.charge || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'bankAmount',
      label: 'Bank Amount',
      render: (t) => (
        <span className="font-semibold text-green-600">
          {(t.bankAmount || 0).toFixed(2)}
        </span>
      ),
    },
    { key: 'note', label: 'Note', render: (t) => t.note || '-' },
    {
      key: 'actions',
      label: 'Actions',
      render: (t) => (
        <Button variant="outline" size="sm" onClick={() => handleDelete(t.id)}>
          <FaTrash />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="bKash Transactions"
        subtitle="Manage bKash income"
        icon={<FaMobileAlt className="text-2xl" />}
      />

      <BalanceStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm
            title="Add bKash Transaction"
            onSubmit={handleSubmit}
            buttonText="Add Transaction"
            buttonVariant="primary"
            receivedFromLabel="Received From"
            amountLabel="Received Amount"
          />
        </div>

        <div className="lg:col-span-2">
          <Card title="Transaction History">
            <Table
              columns={columns}
              data={transactions}
              emptyMessage="No transactions yet"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
