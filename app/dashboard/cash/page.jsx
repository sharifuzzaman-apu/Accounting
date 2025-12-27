'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import TransactionForm from '@/components/accounting/TransactionForm';
import BalanceStats from '@/components/accounting/BalanceStats';
import {
  addCashTransaction,
  deleteCashTransaction,
} from '@/lib/redux/features/cash/cashSlice';
import { FaMoneyBillWave, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function CashPage() {
  const dispatch = useDispatch();
  const { transactions = [], totalCash = 0 } = useSelector(
    (state) => state.cash || {}
  );

  const incomeTransactions = transactions.filter((t) => t.type === 'income');

  const handleSubmit = (formData) => {
    dispatch(
      addCashTransaction({
        date: formData.date,
        receivedFrom: formData.receivedFrom,
        amount: parseFloat(formData.amount),
        note: formData.note,
      })
    );
    toast.success('Cash transaction added successfully');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch(deleteCashTransaction(id));
      toast.success('Transaction deleted');
    }
  };

  const avgTransaction =
    incomeTransactions.length > 0
      ? incomeTransactions.reduce((sum, t) => sum + t.amount, 0) /
        incomeTransactions.length
      : 0;

  const stats = [
    {
      title: 'Total Cash',
      value: `${totalCash.toFixed(2)}`,
      icon: <FaMoneyBillWave />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${incomeTransactions.length} transactions`,
      badgeVariant: 'gray',
    },
    {
      title: 'Average Transaction',
      value: `${avgTransaction.toFixed(2)}`,
      icon: '📊',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Per transaction',
      badgeVariant: 'gray',
    },
    {
      title: 'Transactions',
      value: incomeTransactions.length,
      icon: '📝',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Total count',
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
      label: 'Amount',
      render: (t) => (
        <span className="font-semibold text-green-600">
          {(t.amount || 0).toFixed(2)}
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
        title="Cash Transactions"
        subtitle="Manage cash income"
        icon={<FaMoneyBillWave className="text-2xl" />}
      />

      <BalanceStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm
            title="Add Cash Transaction"
            onSubmit={handleSubmit}
            buttonText="Add Transaction"
            buttonVariant="success"
            receivedFromLabel="Received From"
            amountLabel="Received Amount"
          />
        </div>

        <div className="lg:col-span-2">
          <Card title="Transaction History">
            <Table
              columns={columns}
              data={incomeTransactions}
              emptyMessage="No transactions yet"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
