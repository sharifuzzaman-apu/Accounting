'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { calculateDailySummary } from '@/lib/redux/features/summary/summarySlice';
import Header from '@/components/layout/Header';
import BalanceStats from '@/components/accounting/BalanceStats';
import BalanceCard from '@/components/accounting/BalanceCard';
import { FaHome } from 'react-icons/fa';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const { totalBankAmount = 0, transactions: bkashTransactions = [] } =
    useSelector((state) => state.bkash || {});
  const { totalCash = 0, transactions: cashTransactions = [] } = useSelector(
    (state) => state.cash || {}
  );
  const { totalExpense = 0, expenses = [] } = useSelector(
    (state) => state.expense || {}
  );
  const { totalLoanTaken = 0, totalLoanRemaining = 0 } = useSelector(
    (state) => state.loan || {}
  );

  useEffect(() => {
    setMounted(true);
    dispatch(
      calculateDailySummary({
        bkashTransactions,
        cashTransactions,
        expenses,
      })
    );
  }, [
    dispatch,
    bkashTransactions.length,
    cashTransactions.length,
    expenses.length,
  ]);

  const totalBalance = totalBankAmount + totalCash;
  const totalIncome = totalBankAmount + totalCash;
  const netProfit = totalIncome - totalExpense;

  const stats = [
    {
      title: 'Total Balance',
      value: mounted ? `${totalBalance.toFixed(2)}` : '0.00',
      icon: '💰',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Current',
      badgeVariant: 'gray',
    },
    {
      title: 'Total Income',
      value: mounted ? `${totalIncome.toFixed(2)}` : '0.00',
      icon: '💵',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Received',
      badgeVariant: 'gray',
    },
    {
      title: 'Total Expense',
      value: mounted ? `${totalExpense.toFixed(2)}` : '0.00',
      icon: '💸',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: 'Spent',
      badgeVariant: 'gray',
    },
    {
      title: 'Net Profit',
      value: mounted ? `${netProfit.toFixed(2)}` : '0.00',
      icon: '📊',
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      valueColor: 'text-gray-900',
      badgeText: netProfit >= 0 ? 'Profit' : 'Loss',
      badgeVariant: 'gray',
    },
  ];

  return (
    <div className="space-y-6">
      <Header
        title="Dashboard"
        subtitle="Overview of your financial status"
        icon={<FaHome className="text-2xl" />}
      />

      {mounted && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BalanceCard
            title="Bank Balance"
            amount={totalBankAmount}
            subtitle="From bKash"
            icon="🏦"
            variant="blue"
          />

          <BalanceCard
            title="Cash Balance"
            amount={totalCash}
            subtitle="Available cash"
            icon="💵"
            variant="green"
          />

          <BalanceCard
            title="Total Loan"
            amount={totalLoanRemaining}
            subtitle={`${totalLoanTaken.toFixed(2)} taken`}
            icon="💰"
            variant="orange"
          />
        </div>
      )}

      <BalanceStats stats={stats} />
    </div>
  );
}
