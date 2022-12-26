const ConversationController=require('../Controllers/Conversation');
const Authorization=require('../middleware/Authorization');
const router=require('express').Router();


router.post('/',Authorization,ConversationController.Addconversation);
router.get('/:userId',Authorization,ConversationController.GetUserConversation);
router.get('/find/:secondUserId',Authorization,ConversationController.GetMembersConversation)

module.exports=router;