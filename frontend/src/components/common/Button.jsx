// eslint-disable-next-line react/prop-types
export default function Button({ label }) {
  return (
    // <button className="hidden md:inline-flex items-center  border border-black py-1 px-3 focus:outline-none rounded-2xl text-base font-bold mt-4 md:mt-0">
    //   {label}
    // </button>
    <button className="inline-flex items-center border border-black py-1 px-3 focus:outline-none rounded-2xl text-base font-bold  md:mt-0">
      {label}
    </button>
  );
}
