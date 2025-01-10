import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
        },
})

export default mongoose.model("SavedPost", savedPostSchema);