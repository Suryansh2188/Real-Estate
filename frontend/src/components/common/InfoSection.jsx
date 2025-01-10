/* eslint-disable react/prop-types */
// File: src/components/InfoSection.jsx

const InfoSection = ({ title, items }) => {
  return (
    <div className="mb-3 shadow-md bg-white p-1 rounded-md">
      <h1 className="title-font text-lg font-medium text-gray-900 mb-2">
        {title}
      </h1>
      <div className="flex items-center flex-wrap justify-between gap-4">
        {items.map((item, index) => (
          <p
            key={index}
            className="text-gray-600 flex items-center gap-2 text-base"
          >
            {item.icon && <item.icon className="text-black w-5 h-5" />}
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
