import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const getChats = async (req, res) => {
    const userId = req.userId;
    try {
        const chats = await Chat.find({
            $or: [
              { senderId: userId }, 
              { receiverId: userId }
            ]
          }).populate("senderId receiverId lastMessage", "-password");
        res.status(200).json(chats);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });

    }
}
export const getChat = async (req, res) => {
    const userId = req.userId; // Assuming req.userId is set via middleware
    const chatId = req.params.id;
  
    try {
      // Find the chat by senderId and chatId, and populate the messages
      const chat = await Chat.findOne({
        _id: chatId,
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      })
        .select("messages")
        .populate("messages");
  
      // Check if the chat exists
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      // Return only the messages array
      res.status(200).json(chat.messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
export const addChat = async (req, res) => {
    const senderId = req.userId;
    const receiverId = req.body.receiverId
    try {
        const newChat = new Chat({ senderId, receiverId });
        await newChat.save();
        res.status(200).json(newChat)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }
}
export const readChat = async (req, res) => {

    try {


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}


