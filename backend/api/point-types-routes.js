const router = require('express').Router();
const { getPointTypes, createPointType } = require('../services/db-service');

router.get('/', async (req, res) => {
  const result = await getPointTypes();  
  res.send(result); 
});

router.post('/', async (req, res) => {
  const { name, pointValue, description } = req.body;
  const result = await createPointType(name, pointValue, description);
  res.send(result);
});

module.exports = router;

