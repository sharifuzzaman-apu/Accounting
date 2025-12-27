'use client';

import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Header({
  title,
  subtitle,
  icon,
  badge,
  backButton = false,
  action,
}) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {backButton && (
          <Button variant="secondary" size="sm" onClick={() => router.back()}>
            <FaArrowLeft />
          </Button>
        )}

        {icon && <div className="text-3xl">{icon}</div>}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {badge && <Badge variant="purple">{badge}</Badge>}
          </div>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
