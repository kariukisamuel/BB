const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const base_url = 'https://1c991e74-b4c3-4f45-a9fa-a45e60c6313a.mock.pstmn.io/dev/users';

app.get('/get-users', (req, res, next) => {

  const url = base_url
  async function getData() {
    try {
      const response = await axios.get(url);
      res.send({
        response: response.data
      });
    } catch (error) {
      console.log(error)
    }

  }
  getData();
});

app.post('/add-user', (req, res, next) => {

  const url = base_url
  async function getData() {
    const body = {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      avatar: req.body.avatar
    }
    try {
      const response = await axios.post(url, body);
      res.send({
        response: response.data
      });
    } catch (error) {
      console.log(error.response)
      res.send({
        response: error.response.data
      });
    }

  }

  getData();

});

app.post('/delete-users', (req, res, next) => {
  const url = `${base_url}?id=${req.body.id}`
  async function getData() {
    try {
      const response = await axios.delete(url)
      res.send({
        response: response.data
      });
    } catch (error) {
      console.log(error)
    }
  }
  getData();
});

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
