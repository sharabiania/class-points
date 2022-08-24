const router = require('express').Router();
const { getPointTypes, createPointType } = require('../services/db-service');

router.get('/', async (req, res) => {    
  const result = await getPointTypes();  
  res.send(result); 
});

router.post('/', async (req, res) => {
  const { name, pointValue, description } = req.body;
  
  if (!name) res.send(400).json('\'name\' is required.');
  if (!pointValue) res.send(400).json('\'pointValue\' is required.');
  if (!description) res.send(400).json('\'description\' is required.');

  const result = await createPointType(name, pointValue, description);
  res.send(result);
});

module.exports = router;

