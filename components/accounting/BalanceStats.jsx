'use client';

import StatsCard from './StatsCard';

export default function BalanceStats({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 md: grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
          valueColor={stat.valueColor}
          badgeText={stat.badgeText}
          badgeVariant={stat.badgeVariant}
        />
      ))}
    </div>
  );
}
