// src/App.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ChatList from "../chat/ChatList";
import ChatBox from "../chat/ChatBox";
import { AuthContext } from "../../contexts/AuthContext";
import { SocketContext } from "../../contexts/SocketContext";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [chats, setChats] = useState([]); // List of chats
  const [messages, setMessages] = useState([]); // Messages of the selected chat
  const [selectedChatId, setSelectedChatId] = useState(null); // Selected chat ID

  // Fetch all chats on initial load
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/chat", {
          withCredentials: true,
        });
        console.log("Chats fetched:", response.data);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages for the selected chat
  const fetchMessages = async (id) => {
    setSelectedChatId(id); // Set selected chat
    try {
      const response = await axios.get(`http://localhost:5000/chat/${id}`, {
        withCredentials: true,
      });
      console.log("Messages fetched:", response.data);
      setMessages(response.data); // Set the messages state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle sending a new message
  const handleSendMessage = async(text) => {
    if(!text) return;
    try {
      const response = await axios.post(`http://localhost:5000/message/${selectedChatId}`, {text}, {withCredentials: true})
      console.log("", response.data)
      setMessages((prevMessages) => [
        ...prevMessages,
        response.data,
      ]);
      //socket.emit("sendMessage", response.data);
    } catch (error) {
      console.log("", error);
    }
    
  };

  const test = () => {
    socket.emit("test", "Hello Backend")
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex h-96 mt-2 md:mt-0">
      <button onClick={test}>Test</button>
      {selectedChatId ? (
        <ChatBox
          messages={messages} // Pass messages as an array
          setMessages={setMessages}
          onSendMessage={handleSendMessage}
          setSelectedChatId={setSelectedChatId}
          selectedChatId={selectedChatId}
        />
      ) : chats.length > 0 ? (
        <ChatList chats={chats} onSelectChat={fetchMessages} />
      ) : (
        <div>No chats</div>
      )}
    </div>
  );
};

export default Chat;
