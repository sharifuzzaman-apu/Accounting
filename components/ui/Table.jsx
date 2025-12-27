'use client';

import Empty from './Empty';

export default function Table({
  columns = [],
  data = [],
  emptyMessage = 'No data available',
}) {
  if (data.length === 0) {
    return <Empty title="No Data" message={emptyMessage} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {columns.map((column, index) => (
              <th
                key={index}
                className="border border-gray-200 px-3 py-2 text-left font-medium"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border border-gray-200 px-3 py-2">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
