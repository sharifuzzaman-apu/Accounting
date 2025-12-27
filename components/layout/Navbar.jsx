'use client';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ThemeToggle from '@/components/shared/ThemeToggle';
import UserProfile from '@/components/shared/UserProfile';
import { FaBell } from 'react-icons/fa';

const mockNotifications = [
  { id: 1, message: 'New transaction added', time: '5 mins ago', unread: true },
  {
    id: 2,
    message: 'Daily summary generated',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    message: 'Expense limit warning',
    time: '2 hours ago',
    unread: false,
  },
];

export default function Navbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { totalBankAmount = 0 } = useSelector((state) => state.bkash || {});
  const { totalCash = 0 } = useSelector((state) => state.cash || {});
  const totalBalance = totalBankAmount + totalCash;

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleUpdateProfile = (data) => {
    console.log('Profile updated:', data);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <p className="text-sm text-gray-600">Welcome back,</p>
        <p className="font-semibold text-gray-900">Admin</p>
      </div>

      {mounted ? (
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-600">Total Balance:</span>
          <Badge
            variant="purple"
            size="lg"
            className="text-sm md:text-base font-bold"
          >
            {totalBalance.toFixed(2)}
          </Badge>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <ThemeToggle showLabel={false} size="sm" />

        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative"
          >
            <FaBell className="text-lg" />
            {unreadCount > 0 && (
              <Badge
                variant="danger"
                size="sm"
                className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>

          {isNotificationOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsNotificationOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-slide-down">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge variant="danger" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>

                <div className="max-h-96 overflow-y-auto scrollbar-thin">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-gray-900 flex-1">
                          {notification.message}
                        </p>
                        {notification.unread && (
                          <Badge variant="info" size="sm">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-gray-200">
                  <Button variant="outline" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <UserProfile
          user={{
            name: 'Admin User',
            email: 'admin@possoft.com',
            phone: '+880 1234-567890',
            role: 'Administrator',
            status: 'active',
          }}
          onLogout={handleLogout}
          onUpdateProfile={handleUpdateProfile}
          size="sm"
        />
      </div>
    </header>
  );
}
