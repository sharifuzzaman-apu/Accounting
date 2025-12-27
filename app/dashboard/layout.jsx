import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import MobileMenu from '@/components/layout/MobileMenu';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      <MobileMenu />
    </div>
  );
}
