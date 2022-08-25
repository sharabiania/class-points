const { findUser, createUser } = require('../services/db-service');
const { hashPassword, checkPassword } = require('../utils/auth');
const router = require('express').Router();

router.post('/register', async (req, res) => {
  try {
    const hashedPw = await hashPassword(req.body.password);
    const newUser = await createUser(req.body.username, hashedPw, req.body.cohortId);
    res.sendStatus(201);
  }
  catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await findUser(req.body.username);
    console.log('user: ', user);
    if (!user) throw new Error('user not found.');
    const isPassCorrect = checkPassword(req.body.password, user.password)
    if (!user || !isPassCorrect)
      throw new Error('invalid user credentials');

    req.session.save(() => {
      req.session.userId = user.id,
        req.session.username = user.username,
        req.session.loggedIn = true
      // res.setHeader('Set-Cookie', 'shara=' + req.sessionID);
      res.json(user);
    });

  }
  catch (err) {
    console.error('login error: ', err);
    res.status(400).json(err);
  }
});

router.get('/check_login', (req, res) => {
  if (!req.session.userId)
    return res.status(403).json({ loggedIn: null });
  else
    return res.json({ loggedIn: req.session.username });
});

router.post('/logout', (req, res) => {
  console.log('logout req.session: ', req.session);
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    console.log('session doesnt exist')
    res.status(404).end();
  }
});

module.exports = router;