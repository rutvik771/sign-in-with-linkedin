const express = require("express");
const hostName = "127.0.0.1";
const port = process.env.PORT || 3006;
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
const linkedin = require("./Linkedin");


app.post("/authcode" , linkedin.authcode);

app.listen(port, hostName, () => {
    console.log(`server started at http://${hostName}:${port}`);
  });