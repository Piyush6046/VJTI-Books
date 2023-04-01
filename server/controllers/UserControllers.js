import UserModel from "../model/UserModel.js";

export const getUser = async(req,res) => {
  const {userId} = req.params;

  try {
    const user = await UserModel.findById(userId);
    if(user){
      const {password,...otherdetails} = user._doc;
      // here insteead of sending whole user we will exclude pasword field from it
      //user._doc is actually the doc of gicen user with give id from where
      //we have separeted password and otherdetails
      res.status(200).json(user) 
      } else { 
        res.status(404).json({message:"User doesn't exist with given ID"});
      }
  } catch (error) {
    res.status(500).json(error);
  }
}