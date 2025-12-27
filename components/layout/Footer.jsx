'use client';

import Logo from '@/components/shared/Logo';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md: grid-cols-4 gap-8">
          <div>
            <Logo variant="white" size="md" />
            <p className="mt-4 text-gray-400 text-sm">
              Simple financial management for small businesses
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/dashboard" className="hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/bkash" className="hover:text-white">
                  bKash
                </a>
              </li>
              <li>
                <a href="/dashboard/cash" className="hover:text-white">
                  Cash
                </a>
              </li>
              <li>
                <a href="/dashboard/expense" className="hover:text-white">
                  Expense
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover: text-white">
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 POS-Soft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
