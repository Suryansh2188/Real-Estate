/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";
import Message from "./Message";

const ChatBox = ({ messages, onSendMessage, setSelectedChatId, selectedChatId, setMessages }) => {
  const { socket} = useContext(SocketContext);
  const [input, setInput] = useState("");
  const lastMessageRef = useRef(null); // Ref for the last message
  //const chatContainerRef = useRef(null); // Ref for the chat container

  // Scroll to the last message when the messages array updates
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Join the chat room when selectedChatId changes
    if (selectedChatId) {
        socket.emit('joinRoom', selectedChatId);

        // Listen for new messages
        socket.on('messageReceived', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }

    return () => {
        socket.off('messageReceived'); // Clean up the listener
    };
}, [selectedChatId]);

  // const handleSend = () => {
  //   if (input.trim()) {
  //     onSendMessage(input);
  //     setInput("");
  //   }
  // };
  const handleSend = () => {
    if (input.trim()) {
        const newMessage = { sender: 'You', text: input, isOwn: true };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Emit the message to the server
        socket.emit('newMessage', { chatId: selectedChatId, message: newMessage });
        onSendMessage(input);
        setInput('');
    }
};

  return (
    <div className="flex flex-col border w-full h-full">
      <button
        className="bg-blue-400 py-3 px-1"
        onClick={() => setSelectedChatId(null)}
      >
        Back
      </button>
      <div
        //ref={chatContainerRef} // Add a ref for the chat container
        className="flex-1 overflow-y-auto p-4 bg-white rounded-md shadow-md"
      >
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.senderId}
            text={msg.content}
            isOwn={msg.isOwn}
            ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
          />
        ))}
      </div>
      <div className="flex items-center p-4 border-t">
        <input
          type="text"
          className="flex-1 border rounded-lg px-4 py-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
