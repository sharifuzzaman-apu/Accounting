'use client';

export default function Logo({
  variant = 'default',
  size = 'md',
  showVersion = false,
  className = '',
}) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const variants = {
    default: 'text-purple-600',
    white: 'text-white',
    gradient:
      'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <span className={`font-bold ${sizes[size]} ${variants[variant]}`}>
          POS-Soft
        </span>
      </div>
      {showVersion && (
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
          v1.0
        </span>
      )}
    </div>
  );
}
