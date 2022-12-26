const userController=require('../Controllers/User');
const router=require('express').Router();
const Authorization=require('../middleware/Authorization');



router.put("/:id",Authorization,userController.UpdateUser);
router.delete("/:id",Authorization,userController.DeleteUser);
router.get("/",Authorization,userController.GetUser);
router.get("/search/",Authorization,userController.SearchUsers);
router.get("/friendlist/:userId",Authorization,userController.GetFriends);
router.put("/:id/follow",Authorization,userController.FollowUser);
router.put("/:id/unfollow",Authorization,userController.UnfollowUser);

module.exports=router;