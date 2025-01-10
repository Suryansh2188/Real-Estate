import mongoose from "mongoose";
import Chat from "./chat.model.js"

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String,},
        email: { type: String, required: true, unique: true }, // Unique email used for login
        password: { type: String, required: true }, // Hashed password stored for security
        about: { type: String, default: null },
        avatar: { type: String, default: null },
        posts: [],
        saved_posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat"}]
    },
    { timestamps: true } // Created and updated timestamps
);

export default mongoose.model("User", userSchema);