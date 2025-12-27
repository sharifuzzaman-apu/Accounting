'use client';

import Badge from '@/components/ui/Badge';

const variants = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
  red: 'from-red-500 to-red-600',
};

export default function BalanceCard({
  title,
  amount,
  subtitle,
  icon,
  variant = 'purple',
  showBadge = false,
  badgeText = '',
}) {
  return (
    <div
      className={`bg-gradient-to-br ${variants[variant]} rounded-lg p-6 text-white shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          {showBadge && badgeText && (
            <Badge variant="gray" size="sm" className="mt-1">
              {badgeText}
            </Badge>
          )}
        </div>
        {icon && <div className="text-3xl opacity-80">{icon}</div>}
      </div>
      <div>
        <p className="text-3xl font-bold mb-1">{amount.toFixed(2)}</p>
        {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
      </div>
    </div>
  );
}
