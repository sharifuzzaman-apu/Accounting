'use client';

export default function Input({
  type = 'text',
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  min,
  max,
  step,
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
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
