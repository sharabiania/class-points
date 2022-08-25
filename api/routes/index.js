const router = require('express').Router();

const studentRoutes = require('./students-routes');
const transactionRoutes = require('./transaction-routes');
const pointTypeRoutes = require('./point-types-routes');
const cohortRoutes = require('./cohort-routes');
const authRoutes = require('./auth-routes');

router.use('/students', studentRoutes);
router.use('/transactions', transactionRoutes);
router.use('/pointTypes', pointTypeRoutes);
router.use('/cohorts', cohortRoutes);
router.use('/auth', authRoutes);


module.exports = router;
