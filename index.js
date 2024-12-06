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

app.get("/", (req, res) => {
  res.send("nulljobs api online");
});

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
    .get(BASE_URL + `limit=100&offset=${currentOffset}`)
    .then((response) => {
      res.json(response.data.jobs);
    })
    .catch((err) => console.err(err));
});

//get full job details
//given a job id, return the full details for the job
app.get("/details/:jobGuid", (req, res) => {
  const jobGuid = req.params.jobGuid;
  let singleJobDetails = [];

  //filter the api for the given job uid
  //call the himalays api and find the job that matches the given guid then return only the details about that job
  axios
    .get(BASE_URL + `limit=60&offset=0`)
    .then((response) => {
      singleJobDetails = response.data.jobs.filter(
        (job) => job.guid.replace(/[^\w\s]/gi, "") === jobGuid
      )[0];
      //create a promise to return the single job detail
      const jobPromise = new Promise((resolve, reject) => {
        resolve(res.json(singleJobDetails));
        reject("job not found.");
      });
    })
    .catch((err) => console.error(err));
});

//set app port and start the app service
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`NullJobs server running on ${PORT} ....`);
});
