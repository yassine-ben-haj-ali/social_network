const PostController=require('../Controllers/Post');
const router=require('express').Router();
const Authorization=require('../middleware/Authorization')

router.post("/",Authorization,PostController.CreatePost);
router.put("/:id",Authorization,PostController.UpdatePost);
router.delete("/:id",Authorization,PostController.DeletePost);
router.put("/:id/like",Authorization,PostController.PostReaction);
router.get("/findpost/:id",Authorization,PostController.GetPost);
router.get("/timeline",Authorization,PostController.GetTimlinePosts);
router.get("/profile/:username",Authorization,PostController.UserPosts);

module.exports=router;


