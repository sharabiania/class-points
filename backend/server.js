const express = require('express');
const apiRoutes = require('./api');


const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Class Points API is listening on port ${port}`)
});