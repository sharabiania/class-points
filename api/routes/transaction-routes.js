const router = require('express').Router();
const { addTransaction, getTransactions, getTransactionHistory } = require('../services/db-service');

router.get('/', async (req, res) => {
  const result = await getTransactions();
  res.send(result);
});

router.post('/', async (req, res) => {
  const { sId, pId, note } = req.body;
  
  if (!sId) res.send(400).json('\'sId\' is required.');
  if (!pId) res.send(400).json('\'pId\' is required.');
  
  const result = await addTransaction(sId, pId, note);  
  res.send(result); 
});

router.get('/history/:cohortId', async (req, res) => {
  let { page, pageSize } = req.query;
  if (!page) page = 0;
  if (!pageSize) pageSize = 20;
  const result = await getTransactionHistory(page, pageSize);
  res.send(result);
});


module.exports = router;

