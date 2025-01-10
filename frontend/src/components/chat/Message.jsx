/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Message = forwardRef(({ sender, text }, ref) => {
  const { user } = useContext(AuthContext);
  //console.log("", user._id, sender);
  return (
    <div
       //ref={ref}// Attach the ref here
      className={`flex ${user._id === sender ? "justify-end" : "justify-start"} m-px`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          user._id === sender ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {/* <div className="text-sm">{sender}</div> */}
        <div className="text-base">{text}</div>
      </div>
    </div>
  );
});

export default Message;
