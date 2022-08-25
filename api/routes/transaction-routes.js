const router = require('express').Router();
const { addTransaction, getTransactions, getTransactionHistory } = require('../services/db-service');
const { withAuth } = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const result = await getTransactions();
    res.send(result);
  } catch (err) {
    res.status.apply(500).send(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  const { sId, pId, note } = req.body;
  console.log('req.body: ', req.body);
  if (!sId) res.send(400).json('\'sId\' is required.');
  if (!pId) res.send(400).json('\'pId\' is required.');
  try {
    const result = await addTransaction(sId, pId, note);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/history/:cohortId', async (req, res) => {
  let { page, pageSize } = req.query;
  if (!page) page = 0;
  if (!pageSize) pageSize = 20;
  try {
    const result = await getTransactionHistory(page, pageSize);
    res.send(result);
  }
  catch (err) {
    res.status.apply(500).send(err);
  }
});


module.exports = router;

