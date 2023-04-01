import ConversationModel from "../model/Conversation.js";

export const createConversation = async (req, res) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(409).json(error);
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
