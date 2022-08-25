const bcrypt = require('bcrypt');

const withAuth = (req, res, next) => {
  console.log('req.sessionID: ', req.sessionID);
  console.log('with auth req.session: ', req.session);
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

function checkPassword(loginPass, password) {
  console.log('loginPass: ', loginPass);
  console.log('hash: ', password);
  return bcrypt.compareSync(loginPass, password)
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);  
}


module.exports = { withAuth, checkPassword, hashPassword };
