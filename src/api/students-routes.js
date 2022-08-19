const router = require('express').Router();
const { getStudents, addStudent, getLeaderboard } = require('../services/db-service');

router.get('/:cohortId', async (req, res) => {
  const result = await getStudents(req.params.cohortId);
  res.send(result); 
});

router.post('/', async (req, res) => {
  const { name, nickName, cohortId }  = req.body;
  const result = await addStudent(name, nickName, cohortId);
  res.send(result);
});

router.get('/leaderboard/:cohortId', async (req, res) => {
  const result = await getLeaderboard(req.params.cohortId);
  res.send(result);
});

module.exports = router;

