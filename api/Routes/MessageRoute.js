const MessageController=require('../Controllers/Message');
const Authorization=require('../middleware/Authorization')
const router=require('express').Router();



router.post("/",Authorization,MessageController.SendMessage);
router.get("/:conversationId",Authorization,MessageController.GetMessages);

module.exports=router;

