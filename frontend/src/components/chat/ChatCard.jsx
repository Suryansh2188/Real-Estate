/* eslint-disable react/prop-types */
// src/components/ChatCard.jsx


const ChatCard = ({ name, lastMessage, timestamp, onSelectChat, chat_id}) => {
  return (
    <div className="flex w-full mt-3 items-center p-4 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectChat(chat_id)}>
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0"></div>
      <div className="ml-4 flex-1 w-2/5 lg:max-w-96">
        <div className="text-lg font-medium">{name}</div>
        <div className="text-sm text-gray-500 truncate">{lastMessage}</div>
      </div>
      <div className="text-xs text-gray-400">{timestamp}</div>
    </div>
  );
};

export default ChatCard;
