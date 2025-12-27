'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import DatePicker from '@/components/ui/DatePicker';
import Button from '@/components/ui/Button';

export default function TransactionForm({
  title = 'Add Transaction',
  onSubmit,
  buttonText = 'Add Transaction',
  buttonVariant = 'primary',
  receivedFromLabel = 'Received From',
  amountLabel = 'Amount',
}) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    receivedFrom: '',
    amount: '',
    note: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      receivedFrom: '',
      amount: '',
      note: '',
    });
  };

  return (
    <Card title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DatePicker
          name="date"
          label="Date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="receivedFrom"
          label={receivedFromLabel}
          value={formData.receivedFrom}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />

        <Input
          type="number"
          name="amount"
          label={amountLabel}
          value={formData.amount}
          onChange={handleChange}
          placeholder="0.00"
          required
          min="0"
          step="0.01"
        />

        <Input
          type="text"
          name="note"
          label="Note (Optional)"
          value={formData.note}
          onChange={handleChange}
          placeholder="Additional details..."
        />

        <Button type="submit" variant={buttonVariant} className="w-full">
          {buttonText}
        </Button>
      </form>
    </Card>
  );
}
