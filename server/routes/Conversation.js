import express from 'express'
import {createConversation,getConversation} from '../controllers/conversations.js'

const router = express.Router();

router.post('/',createConversation);
router.get('/:userId',getConversation);

export default router;