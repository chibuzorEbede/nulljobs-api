const axios = require("axios");

//set the base url
//it gets all data from himalayas jobs api
const BASE_URL = `https://himalayas.app/jobs/api?limit=20&offset=0`;

//make a get request to the HM api and get job listings
const getJobs = () => {
  // const jobsList = {};
  axios
    .get(BASE_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { getJobs };
