const router = require('express').Router();
const { addTransaction, getTransactions, getTransactionHistory } = require('../services/db-service');

router.get('/', async (req, res) => {
  const result = await getTransactions();
  res.send(result);
});

router.post('/', async (req, res) => {
  const { sId, pId, note } = req.body;
  const result = await addTransaction(sId, pId, note);  
  res.send(result); 
});

router.get('/history', async (req, res) => {
  const result = await getTransactionHistory();
  res.send(result);
});


module.exports = router;

