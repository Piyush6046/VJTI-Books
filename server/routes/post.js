import express from 'express';
import {getPosts,createPost,updatePost,deletePost,getPost} from '../controllers/post.js'
import auth from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/',auth,createPost);
router.get('/',getPosts);
router.get("/:id",getPost);
router.delete('/:id',deletePost);
router.patch('/:id',auth,updatePost)
// router.patch('/:id/likepost',likePost);

export default router;