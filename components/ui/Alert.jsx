'use client';

const variants = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-orange-50 border-orange-200 text-orange-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const icons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export default function Alert({ variant = 'info', title, message, onClose }) {
  return (
    <div className={`border rounded-lg p-4 ${variants[variant]}`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{icons[variant]}</span>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          {message && <p className="text-sm">{message}</p>}
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-3 text-xl hover:opacity-70">
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
