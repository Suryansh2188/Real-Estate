/* eslint-disable react/prop-types */


export const Textarea = ({ id, name, value, onChange, placeholder, required = false }) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border rounded-md"
      rows="4"
    ></textarea>
  );
};
