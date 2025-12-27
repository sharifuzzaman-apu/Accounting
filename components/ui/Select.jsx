'use client';

export default function Select({
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  required = false,
  disabled = false,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
