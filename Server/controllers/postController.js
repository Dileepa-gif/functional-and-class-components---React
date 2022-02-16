const Post = require("../models/post");

exports.AddPost = async function (req, res) {
  const newDetails = new Post({
    topic: req.body.topic,
    description: req.body.description,
    postCategory: req.body.postCategory,
  });
  newDetails.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "posts saved sucessfully",
    });
  });
};

exports.getAllPosts = async function (req, res) {
  Post.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPost: posts,
    });
  });
};

exports.getPost = async function (req, res) {
  let postId = req.params.id;
  Post.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
};

exports.updatePostDetails = async function (req, res) {
  Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          err: err,
        });
      }
      return res.status(200).json({
        success: "updated Sucessfully",
      });
    }
  );
};

exports.deletePostDetails = async function (req, res) {
  Post.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        message: "Deleted unsucessful",
        err,
      });
    }
    return res.status(200).json({
      message: "Deleted Sucessfully",
      deletedPost,
    });
  });
};
