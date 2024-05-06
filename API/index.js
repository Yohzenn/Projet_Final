const express = require("express");
const router = require("./routes/start");
const cors = require("cors");
const app = express();
const port = 3000;
const ip = require("ip");
const ipAddr = ip.address();


app.use(cors());
app.use(express.json());
app.use(router);
app.listen(3000, () => {
  console.log("Server run: http://" + ipAddr + ":3000"); //--------------------
});
