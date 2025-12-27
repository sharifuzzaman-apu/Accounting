'use client';

export default function DatePicker({
  name,
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  min,
  max,
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
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
