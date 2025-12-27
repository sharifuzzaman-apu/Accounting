'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Logo from '@/components/shared/Logo';
import {
  FaHome,
  FaMobileAlt,
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartBar,
  FaHistory,
  FaCog,
  FaBars,
  FaTimes,
  FaHandHoldingUsd,
} from 'react-icons/fa';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: FaHome },
  { href: '/dashboard/bkash', label: 'bKash', icon: FaMobileAlt },
  { href: '/dashboard/cash', label: 'Cash', icon: FaMoneyBillWave },
  { href: '/dashboard/loan', label: 'Loan', icon: FaHandHoldingUsd },
  { href: '/dashboard/expense', label: 'Expense', icon: FaShoppingCart },
  { href: '/dashboard/summary', label: 'Summary', icon: FaChartBar },
  { href: '/dashboard/history', label: 'History', icon: FaHistory },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-lg" />
          ) : (
            <FaBars className="text-lg" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 
          flex flex-col transition-transform duration-300
          ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >
        <div className="p-6 border-b border-gray-200">
          <Logo showVersion={true} size="md" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <Icon className="text-xl flex-shrink-0" />
                <span className="flex-1">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4 space-y-3">
          <Link
            href="/dashboard/settings"
            className="nav-link"
            onClick={closeMobileMenu}
          >
            <FaCog className="text-xl" />
            <span>Settings</span>
          </Link>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              © Accounts Soft By Sharifuzzaman
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
