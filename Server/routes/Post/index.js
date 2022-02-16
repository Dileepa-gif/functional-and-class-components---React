const routes = require("express").Router();

// const utils = require('../../lib/utils');
var postController = require("../../controllers/postController");

routes.post("/createPost", postController.AddPost);

routes.get("/getAllPostDetails", postController.getAllPosts);

routes.get("/getPostDetails/:id", postController.getPost)

routes.put("/updatePostDetails/:id", postController.updatePostDetails);

routes.delete("/deletePost/:id", postController.deletePostDetails);

module.exports = routes;
