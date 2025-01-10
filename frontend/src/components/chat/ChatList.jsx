/* eslint-disable react/prop-types */
// src/components/ChatList.jsx
import ChatCard from './ChatCard';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
const ChatList = ({ chats, onSelectChat }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full border h-full overflow-y-auto">
      {/* {chats.map((chat) => (
        <ChatCard
          key={chat._id}
          name={chat.receiverId.first_name}
          lastMessage={chat.lastMessage.content}
          timestamp={chat.lastMessage.createdAt}
          chat_id={chat._id}
          onSelectChat={onSelectChat}
        />
      ))} */}
      {chats.map((chat) => {
        // Determine the other participant's name
        const otherParticipant =
          chat.senderId._id === user._id ? chat.receiverId : chat.senderId;

        return (
          <ChatCard
            key={chat._id}
            name={otherParticipant.first_name} // Use the other participant's name
            lastMessage={chat.lastMessage?.content || "No messages yet"}
            timestamp={chat.lastMessage?.createdAt || ""}
            chat_id={chat._id}
            onSelectChat={onSelectChat}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
