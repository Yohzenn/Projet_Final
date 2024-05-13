const express = require("express");
const router = require("./routes/start");
// const cors = require("cors");
const app = express();
const ip = require("ip");
const ipAddr = ip.address();
const port = 3000;

// app.use(cors());
app.use(express.static("../FRONT"));
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Server run: http://${ipAddr}:${port}`); //--------------------
});
