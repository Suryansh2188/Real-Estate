import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import PostDetails from "../models/postDetails.model.js";
import SavedPost from "../models/savedPost.model.js";
import jwt from "jsonwebtoken";

export const getAllPosts = async (req, res) => {
  const query = req.query;
  // const token = req.cookies?.token;
  //console.log(query)
  try {
    const allPosts = await Post.find({
      ...(query.type && query.type !== "" && { type: query.type }),
      ...(query.propertyType &&
        query.propertyType !== "" && { property_type: query.propertyType }),
      ...(query.location &&
        query.location !== "" && { "location.city": query.location }),
      ...(query.bedrooms &&
        parseInt(query.bedrooms) > 0 && {
          "features.bedrooms": parseInt(query.bedrooms),
        }),
      ...(query.bathrooms &&
        parseInt(query.bathrooms) > 0 && {
          "features.bathrooms": parseInt(query.bathrooms),
        }),
      ...(query.price_min || query.price_max
        ? {
            price: {
              ...(query.price_min &&
                parseFloat(query.price_min) >= 0 && {
                  $gte: parseFloat(query.price_min),
                }),
              ...(query.price_max &&
                parseFloat(query.price_max) >= 0 && {
                  $lte: parseFloat(query.price_max),
                }),
            },
          }
        : {}),
    });

    

    //console.log(allPosts);
    // setTimeout(() => {
    //     res.status(200).json(allPosts);
    // }, 2000);
    res.status(200).json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch all posts" });
  }
};

export const getPostDetails = async (req, res) => {
  const postId = req.params.id;
  const token = req.cookies?.token;
  try {
    //step 1 Find post
    const post = await Post.findById(postId).populate({
      path: "user_id",
      select: "first_name last_name", // Select only first_name and last_name from user_id
    });
    // .populate({
    //     path: 'post', // Populate the 'post' field
    //     populate: {
    //         path: 'seller', // Within 'post', populate the 'seller' field
    //         select: 'username avatar', // Select only the 'username' field from the User schema
    //     },
    // });

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (!err) {
          const saved = await Post.findById({
            _id: postId,
            user_id: payload.id,
          });
          return res.status(200).json({ post, isSaved: saved ? true : false });
        }
      });
    } else {
      return res.status(200).json({ post, isSaved: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch post details" });
  }
};

export const createPost = async (req, res) => {
  const id = req.userId;
  //console.log("", id);
  const body = req.body;
  //console.log("", body);
  try {
    const seller = await User.findById(id);
    if (!seller) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = new Post({ ...body, user_id: id });
    const newPost = await post.save();

    // const postDetails = new PostDetails({ ...body.postDetails, post: newPost._id });
    // await postDetails.save();

    const sellerDetails = await User.findById(id).select("username");

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  const body = req.body;
  //console.log(body);
  try {
    // Check if the user (seller) exists
    // const seller = await User.findById(userId);
    // if (!seller) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // Find the post by its ID
    const post = await Post.findById(postId);
    //const postDetails = await PostDetails.findOne({ post: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the owner of the post (i.e., the seller)
    // if (post.seller.toString() !== userId) {
    //   return res
    //     .status(403)
    //     .json({ message: "Not authorized to update this post" });
    // }

    if (body) {
      await Post.findByIdAndUpdate(postId, { $set: body }, { new: true });
    }
    // if (body.postDetails) {
    //   await PostDetails.findOneAndUpdate(
    //     { post: postId },
    //     { $set: body.postDetails },
    //     { new: true }
    //   );
    // }

    res.status(200).json({ message: "Post Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const savedPost = async (req, res) => {
  const postId = req.body.postId;
  const userId = req.userId;
  console.log(userId, postId);
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const postIndex = user.saved_posts.findIndex(
      (post) => post.toString() === postId
    );

    if (postIndex !== -1) {
      // If the post is already saved, remove it
      user.saved_posts.splice(postIndex, 1);
      await user.save(); // Save the updated user document
      return res.status(200).json({ message: "Post removed from saved posts" });
    } else {
      // If the post is not saved, add it
      user.saved_posts.push(postId);
      await user.save(); // Save the updated user document
      return res.status(200).json({ message: "Post saved successfully" });
    }
    //const savedPost = await SavedPost.findOne({ postId, userId });
    // if (savedPost) {
    //   await SavedPost.deleteOne({ postId, userId });
    //   return res.status(200).json({ message: "Post deleted" });
    // } else {
    //   await new SavedPost({ postId, userId }).save();
    //   return res.status(200).json({ message: "Post saved" });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save post" });
  }
};

export const deletePost = async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  try {
    // Check if the user (seller) exists
    const seller = await User.findById(userId);
    if (!seller) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post by its ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the owner of the post (i.e., the seller)
    if (post.seller.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    await PostDetails.deleteOne({ post: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

export const myPosts = async (req, res) => {
  const user_id = req.userId;

  //console.log("User ID:", user_id);

  try {
    // Fetch posts created by the user
    const myPosts = await Post.find({ user_id });
    console.log("My Posts:", myPosts);

    // Fetch the user to get their saved posts
    const user = await User.findById(user_id).select("saved_posts").populate("saved_posts"); // Assuming saved_posts contains post IDs
   // console.log("", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const mySavedPosts = user.saved_posts;
    //console.log("My Saved Posts:", mySavedPosts);

    res.status(200).json({ myPosts, mySavedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

