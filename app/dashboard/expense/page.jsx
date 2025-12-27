'use client';

import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import TransactionForm from '@/components/accounting/TransactionForm';
import BalanceStats from '@/components/accounting/BalanceStats';
import {
  addExpense,
  deleteExpense,
} from '@/lib/redux/features/expense/expenseSlice';
import { deductCash, addCashBack } from '@/lib/redux/features/cash/cashSlice';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function ExpensePage() {
  const dispatch = useDispatch();
  const { expenses = [], totalExpense = 0 } = useSelector(
    (state) => state.expense || {}
  );
  const { totalCash = 0 } = useSelector((state) => state.cash || {});

  const handleSubmit = (formData) => {
    const amount = parseFloat(formData.amount);
    const expenseId = Date.now().toString();

    dispatch(
      addExpense({
        id: expenseId,
        date: formData.date,
        paidTo: formData.receivedFrom,
        amount,
        note: formData.note,
      })
    );

    dispatch(
      deductCash({
        date: formData.date,
        paidTo: formData.receivedFrom,
        amount,
        note: formData.note,
        expenseId,
      })
    );

    toast.success('Expense added and deducted from cash');
  };

  const handleDelete = (expense) => {
    if (window.confirm('Delete this expense?')) {
      dispatch(deleteExpense(expense.id));

      dispatch(
        addCashBack({
          expenseId: expense.id,
          amount: expense.amount,
        })
      );

      toast.success('Expense deleted and cash restored');
    }
  };

  const avgExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;

  const stats = [
    {
      title: 'Total Expense',
      value: `${totalExpense.toFixed(2)}`,
      icon: <FaShoppingCart />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: `${expenses.length} expenses`,
      badgeVariant: 'gray',
    },
    {
      title: 'Average Expense',
      value: `${avgExpense.toFixed(2)}`,
      icon: '📊',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Per expense',
      badgeVariant: 'gray',
    },
    {
      title: 'Cash Balance',
      value: `${totalCash.toFixed(2)}`,
      icon: '💵',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Remaining',
      badgeVariant: 'gray',
    },
  ];

  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (e) => format(new Date(e.date), 'dd MMM yyyy'),
    },
    {
      key: 'paidTo',
      label: 'Paid To',
      render: (e) => <span className="font-medium">{e.paidTo}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (e) => (
        <span className="font-semibold text-red-600">
          -{(e.amount || 0).toFixed(2)}
        </span>
      ),
    },
    { key: 'note', label: 'Note', render: (e) => e.note || '-' },
    {
      key: 'actions',
      label: 'Actions',
      render: (e) => (
        <Button variant="outline" size="sm" onClick={() => handleDelete(e)}>
          <FaTrash />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="Expense Management"
        subtitle="Track daily expenses (auto deducts from cash)"
        icon={<FaShoppingCart className="text-2xl" />}
      />

      <BalanceStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm
            title="Add Expense"
            onSubmit={handleSubmit}
            buttonText="Add Expense"
            buttonVariant="danger"
            receivedFromLabel="Paid To"
            amountLabel="Amount"
          />
        </div>

        <div className="lg:col-span-2">
          <Card title="Expense History">
            <Table
              columns={columns}
              data={expenses}
              emptyMessage="No expenses yet"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
