/* eslint-disable react/prop-types */

import { FaSpinner } from 'react-icons/fa';

export const Button2 = ({
  type = 'button',
  onClick,
  children,
  disabled = false,
  isLoading = false,
  variant = 'primary',
}) => {
  const baseStyles = 'w-full px-4 py-2 rounded-md';
  const primaryStyles = 'bg-black text-white';
  const secondaryStyles = 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${disabled || isLoading ? disabledStyles : ''}`}
    >
      {isLoading && <FaSpinner className="inline-block mr-2 animate-spin" />}
      {children}
    </button>
  );
};
