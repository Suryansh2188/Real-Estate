/* eslint-disable react/prop-types */


export const Input2 = ({ id, name, type = 'text', value, onChange, placeholder, required = false }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 text-black py-2 border rounded-md"
    />
  );
};
