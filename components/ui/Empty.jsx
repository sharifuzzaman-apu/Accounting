'use client';

export default function Empty({
  icon = '📭',
  title = 'No Data',
  message = 'No data available',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
