const { findUser, createUser } = require('../services/db-service');
const { hashPassword, checkPassword } = require('../utils/auth');
const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    const hashedPw = await hashPassword(req.body.password);
    const newUser = await createUser(req.body.username, hashedPw, req.body.cohortId);
    res.sendStatus(201);
  }
  catch(err) { 
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('req.url: ', req.sessionID);

  try {
    const user = await findUser(req.body.username);
    console.log('user: ', user);
    if (!user) throw new Error('user not found.');
    const isPassCorrect = checkPassword(req.body.password, user.password)
    if (!user || !isPassCorrect)
      throw new Error('invalid user credentials');
    console.log('req.session: ',req.session);
    const payload = { user: user.username, id: user.id }
    req.session.save(() => {
      req.session.userId = user.id,
      req.session.username = user.username,
      req.session.loggedIn = true
      res.json(user);
    });
    
    

  }
  catch(err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;