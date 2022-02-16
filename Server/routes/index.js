const routes = require("express").Router();

const PostRoute = require("./Post/index");

routes.use("/PostRoute", PostRoute);

module.exports = routes;
