const ConversationModel = require("../Models/Conversation");

//new conv
const Addconversation = async (req, res) => {
  
  const newConversation = new ConversationModel({
    members: [req.user, req.body.receiverId],
  });

  try {
    let Conversation=await ConversationModel.find({members:{ $all: [req.user,req.body.receiverId]}});
    if(Conversation.length==0){
      const savedConversation = await newConversation.save();
      return res.status(200).json(savedConversation);
    }else{
      return res.status(403).json(Conversation);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

//get conv of a user
const GetUserConversation = async (req, res) => {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId
const GetMembersConversation = async (req, res) => {
  try {
    const conversation = await ConversationModel.findOne({
      members: { $all: [req.user,req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports={Addconversation,GetUserConversation,GetMembersConversation}