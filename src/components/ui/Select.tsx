import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  fullWidth = false,
  onChange,
  className = '',
  ...props
}) => {
  const id = props.id || `select-${props.name}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          block ${fullWidth ? 'w-full' : ''} rounded-md border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        style={{ borderWidth: '1px', padding: '0.5rem 2.5rem 0.5rem 0.75rem' }}
        onChange={handleChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;