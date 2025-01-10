import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost, deletePost, getAllPosts, getPostDetails, myPosts, savedPost, updatePost } from "../controllers/postController.js";

const router = express.Router()

router.get('/', getAllPosts);
router.get('/:id', verifyToken, getPostDetails);
router.post("/savedPost", verifyToken, savedPost);
router.post('/add-post', verifyToken, createPost);
router.put('/edit-post/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
router.get('/profile/posts',verifyToken, myPosts);

export default router