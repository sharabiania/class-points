const router = require('express').Router();
const { getStudents, addStudent, getLeaderboard, getOldRanks } = require('../services/db-service');

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
    const leaders = await getLeaderboard(req.params.cohortId);
    const oldRanks = await getOldRanks(req.params.cohortId);
    // TODO find a better way to convert to map.
    const rankMap = {};
    for (const x of oldRanks)
      rankMap[x.st_id] = x.ranking;
    
    for (const x of leaders) {
      if (rankMap[x.st_id])
        x.old_rank = rankMap[x.st_id];
      else x.old_rank = x.ranking;
      x.up_down = x.old_rank - x.ranking;
    }

    res.send(leaders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

