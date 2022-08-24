const router = require('express').Router();
const { getStudents, addStudent, getLeaderboard } = require('../services/db-service');

router.get('/:cohortId', async (req, res) => {
  try {
    const result = await getStudents(req.params.cohortId);
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const { name, nickName, cohortId } = req.body;
  try {
    const result = await addStudent(name, nickName, cohortId);
    res.send(result);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/leaderboard/:cohortId', async (req, res) => {
  if (!req.params.cohortId) res.status(500).json({ err: 'cohortId is required.' });
  try {
    const result = await getLeaderboard(req.params.cohortId);
    res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

