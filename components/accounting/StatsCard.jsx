'use client';

import Badge from '@/components/ui/Badge';

export default function StatsCard({
  title,
  value,
  icon,
  bgColor = 'bg-gray-100',
  iconColor = 'text-gray-600',
  valueColor = 'text-gray-900',
  badgeText,
  badgeVariant = 'gray',
  trend,
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6 border border-gray-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
          {badgeText && (
            <Badge variant={badgeVariant} size="sm" className="mt-2">
              {badgeText}
            </Badge>
          )}
        </div>
        {icon && (
          <div className={`text-3xl ${iconColor}`}>
            {typeof icon === 'string' ? icon : icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 text-sm">
          <span
            className={trend.value >= 0 ? 'text-green-600' : 'text-red-600'}
          >
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-gray-600 ml-2">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
