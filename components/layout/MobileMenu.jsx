'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaMobileAlt,
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartBar,
  FaHistory,
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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg p-0 flex items-center justify-center"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
            onClick={closeMenu}
          />

          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Navigation
                </h3>
                <Badge variant="purple">Menu</Badge>
              </div>

              <nav className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <Link key={link.href} href={link.href} onClick={closeMenu}>
                      <div
                        className={`
                          flex flex-col items-center justify-center gap-2 p-4 rounded-xl
                          transition-all duration-200
                          ${
                            isActive
                              ? 'bg-purple-100 text-purple-600 border-2 border-purple-300'
                              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                          }
                        `}
                      >
                        <Icon className="text-2xl" />
                        <span className="text-sm font-medium">
                          {link.label}
                        </span>
                        {isActive && (
                          <Badge variant="purple" size="sm">
                            Active
                          </Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
