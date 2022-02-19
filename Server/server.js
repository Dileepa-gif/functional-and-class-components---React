const express = require("express");
const mongoose = require("mongoose");
const path =require('path');
require("dotenv").config({path : "./config.env"});
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const URI = process.env.MONGO_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to the mongo db");
  }
);

app.use("/", routes);
// app.route("/").get((req, res) => {
//   res.send("STABLO-WEB");
// });


if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname,'/Client/build')))
  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'Client', 'build', 'index.html'));
  })
}else{
  app.get("/", (req, res) => {
    res.send("Api running");
  })
}

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
