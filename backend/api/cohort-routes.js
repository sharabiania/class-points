const router = require('express').Router();
const { addCohort, getCohorts, getActiveCohort } = require('../services/db-service');

router.get('/', async (req, res) => {
  const result = await getCohorts();
  res.send(result);
});

router.get('/active', async (req, res) => {
  const result = await getActiveCohort();
  res.send(result);
});

router.post('/', async (req, res) => {  
  const result = await addCohort(req.body.name);  
  res.send(result); 
});


module.exports = router;

