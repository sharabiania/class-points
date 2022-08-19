const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Class Points API is listening on port ${port}`)
});