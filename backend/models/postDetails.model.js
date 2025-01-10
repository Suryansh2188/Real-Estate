import mongoose from "mongoose";


const postDetailsSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    description: {
        type: String,
        default: "No description",
    },
    utilities: {
        type: [String],
        default: [],
    },
    pet: {
        type: String,
    },
    income: {
        type: String,
    },
    size: {
        type: String,
    },
    busRoutes: {
        type: Number,
    },
    nearbySchools: {
        type: Number,
    },
    nearbyRestaurants: {
        type: Number,
    },
}, { timestamps: true });

export default mongoose.model("PostDetails", postDetailsSchema);