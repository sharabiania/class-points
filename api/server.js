const express = require('express');
const session = require('express-session')
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Class Points API is listening on port ${port}`)
});