const express = require('express');
const studentRoutes = require('./students-routes');
const transactionRoutes = require('./transaction-routes');
const pointTypeRoutes = require('./point-types-routes');
const cohortRoutes = require('./cohort-routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/pointTypes', pointTypeRoutes);
app.use('/api/cohorts', cohortRoutes)

app.listen(port, () => {
  console.log(`Class Points API is listening on port ${port}`)
});