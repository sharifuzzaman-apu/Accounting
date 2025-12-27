'use client';

import { useSelector } from 'react-redux';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Tabs from '@/components/ui/Tabs';
import Badge from '@/components/ui/Badge';
import Empty from '@/components/ui/Empty';
import { FaHistory } from 'react-icons/fa';
import { format } from 'date-fns';

export default function HistoryPage() {
  const { transactions: bkashTransactions = [] } = useSelector(
    (state) => state.bkash || {}
  );
  const { transactions: cashTransactions = [] } = useSelector(
    (state) => state.cash || {}
  );
  const { expenses = [] } = useSelector((state) => state.expense || {});
  const { loans = [] } = useSelector((state) => state.loan || {});

  const allTransactions = [
    ...bkashTransactions.map((t) => ({
      ...t,
      type: 'bKash',
      category: 'Income',
    })),
    ...cashTransactions
      .filter((t) => t.type === 'income')
      .map((t) => ({ ...t, type: 'Cash', category: 'Income' })),
    ...expenses.map((e) => ({
      ...e,
      type: 'Expense',
      category: 'Expense',
      receivedFrom: e.paidTo,
    })),
    ...loans.map((l) => ({ ...l, type: 'Loan', category: 'Loan' })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const allColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (t) => format(new Date(t.date), 'dd MMM yyyy'),
    },
    {
      key: 'type',
      label: 'Type',
      render: (t) => (
        <Badge
          variant={
            t.type === 'bKash'
              ? 'info'
              : t.type === 'Cash'
              ? 'success'
              : t.type === 'Expense'
              ? 'danger'
              : 'warning'
          }
        >
          {t.type}
        </Badge>
      ),
    },
    {
      key: 'party',
      label: 'From/To',
      render: (t) => (
        <span className="font-medium">{t.receivedFrom || '-'}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (t) => {
        const isExpense = t.type === 'Expense';
        return (
          <span
            className={`font-semibold ${
              isExpense ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {isExpense ? '-' : '+'}
            {(t.amount || 0).toFixed(2)}
          </span>
        );
      },
    },
    {
      key: 'note',
      label: 'Note',
      render: (t) => t.note || '-',
    },
  ];

  const bkashColumns = [
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
        <span className="font-semibold">{(t.amount || 0).toFixed(2)}</span>
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
    {
      key: 'note',
      label: 'Note',
      render: (t) => t.note || '-',
    },
  ];

  const cashColumns = [
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
    {
      key: 'note',
      label: 'Note',
      render: (t) => t.note || '-',
    },
  ];

  const expenseColumns = [
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
    {
      key: 'note',
      label: 'Note',
      render: (e) => e.note || '-',
    },
  ];

  const loanColumns = [
    {
      key: 'date',
      label: 'Date',
      render: (l) => format(new Date(l.date), 'dd MMM yyyy'),
    },
    {
      key: 'receivedFrom',
      label: 'Received From',
      render: (l) => <span className="font-medium">{l.receivedFrom}</span>,
    },
    {
      key: 'amount',
      label: 'Loan Amount',
      render: (l) => (
        <span className="font-semibold">{(l.amount || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'paidAmount',
      label: 'Paid',
      render: (l) => (
        <span className="text-green-600">{(l.paidAmount || 0).toFixed(2)}</span>
      ),
    },
    {
      key: 'remainingAmount',
      label: 'Remaining',
      render: (l) => (
        <span className="text-red-600 font-semibold">
          {(l.remainingAmount || 0).toFixed(2)}
        </span>
      ),
    },
    {
      key: 'note',
      label: 'Note',
      render: (l) => l.note || '-',
    },
  ];

  const incomeTransactions = cashTransactions.filter(
    (t) => t.type === 'income'
  );

  const tabs = [
    {
      label: `All (${allTransactions.length})`,
      content:
        allTransactions.length > 0 ? (
          <Card>
            <Table
              columns={allColumns}
              data={allTransactions}
              emptyMessage="No transactions"
            />
          </Card>
        ) : (
          <Card>
            <Empty
              icon="📭"
              title="No Transactions"
              message="No transactions found"
            />
          </Card>
        ),
    },
    {
      label: `bKash (${bkashTransactions.length})`,
      content:
        bkashTransactions.length > 0 ? (
          <Card>
            <Table
              columns={bkashColumns}
              data={bkashTransactions}
              emptyMessage="No bKash transactions"
            />
          </Card>
        ) : (
          <Card>
            <Empty
              icon="📱"
              title="No bKash Transactions"
              message="No bKash transactions found"
            />
          </Card>
        ),
    },
    {
      label: `Cash (${incomeTransactions.length})`,
      content:
        incomeTransactions.length > 0 ? (
          <Card>
            <Table
              columns={cashColumns}
              data={incomeTransactions}
              emptyMessage="No cash transactions"
            />
          </Card>
        ) : (
          <Card>
            <Empty
              icon="💵"
              title="No Cash Transactions"
              message="No cash transactions found"
            />
          </Card>
        ),
    },
    {
      label: `Expenses (${expenses.length})`,
      content:
        expenses.length > 0 ? (
          <Card>
            <Table
              columns={expenseColumns}
              data={expenses}
              emptyMessage="No expenses"
            />
          </Card>
        ) : (
          <Card>
            <Empty icon="🛒" title="No Expenses" message="No expenses found" />
          </Card>
        ),
    },
    {
      label: `Loans (${loans.length})`,
      content:
        loans.length > 0 ? (
          <Card>
            <Table columns={loanColumns} data={loans} emptyMessage="No loans" />
          </Card>
        ) : (
          <Card>
            <Empty icon="💰" title="No Loans" message="No loans found" />
          </Card>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="Transaction History"
        subtitle="View all your transactions"
        icon={<FaHistory className="text-2xl" />}
      />

      <Tabs tabs={tabs} />
    </div>
  );
}
