const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");

//setup and initialize the app

const app = express();

//add app middlewares

app.use(morgan("tiny"));
app.use(cors());

//setup base url
const BASE_URL = `https://himalayas.app/jobs/api?`;

//app api endpoints

//get initial jobs
app.get("/job-listings", (req, res) => {
  //make request to api and send data
  axios
    .get(BASE_URL + `limit=20&offset=0`)
    .then((response) => {
      res.json(response.data.jobs);
    })
    .catch((err) => console.err(err));
});

//get more jobs
app.get("/get-more", (req, res) => {
  //create current offset and increment anytime a new request comes in (pagination)
  let currentOffset = 40;
  //get more data from the api

  axios
    .get(BASE_URL + `limit=20&offset=${currentOffset}`)
    .then((response) => {
      res.json(response.data.jobs);
    })
    .catch((err) => console.err(err));
});

//set app port and start the app service
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`NullJobs server running on ${PORT} ....`);
});
