/* eslint-disable react/prop-types */


export default function NoResult({message}) {
  return (
    <div className=" w-full flex flex-col items-center justify-center h-40 ">
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  )
}
