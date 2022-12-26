const Message = require("../Models/Message");

//write new message
const SendMessage = async (req, res) => {
  const {sender=req.user,...others}=req.body;
  const newMessage = new Message({sender,...others});

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get Messages

const GetMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { SendMessage, GetMessages };
