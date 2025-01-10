import express from "express";
import { admin, loggedIn } from "../controllers/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";



const router = express.Router();
router.get('/logged-in', verifyToken, loggedIn)
router.get('/admin', admin)


export default router;