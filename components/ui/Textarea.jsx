'use client';

export default function Textarea({
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  error,
  className = '',
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`input resize-none ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
