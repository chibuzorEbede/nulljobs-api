const express = require("express");
const morgan = require("morgan");
const jobService = require("./services/remote-jobs");
const axios = require("axios");
const cors = require("cors");

//setup and initialize the app

const app = express();

//add app middlewares

app.use(morgan("tiny"));
app.use(cors());

//setup base url
const BASE_URL = `https://himalayas.app/jobs/api?limit=20&offset=0`;

//app api endpoints

app.get("/job-listings", (req, res) => {
  //make request to api and send data
  axios.get(BASE_URL).then((response) => {
    res.json(response.data.jobs);
  });
});

//set app port and start the app service
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`NullJobs server running on ${PORT} ....`);
});
