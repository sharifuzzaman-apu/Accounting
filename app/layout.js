import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/lib/redux/provider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'POS-Soft - Financial Management System',
  description: 'Simple financial tracking for small businesses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Toaster position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
