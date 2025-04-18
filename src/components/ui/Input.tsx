import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const id = props.id || `input-${props.name}`;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          block ${fullWidth ? 'w-full' : ''} rounded-md border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        style={{ borderWidth: '1px', padding: '0.5rem 0.75rem' }}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;