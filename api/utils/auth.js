const bcrypt = require('bcrypt');

const withAuth = (req, res, next) => {  
  if (!req.session.userId) {
    // res.redirect("/login");
    res.status(403).json('you must login for this action');
  } else {
    next();
  }
};

function checkPassword(loginPass, password) {  
  return bcrypt.compareSync(loginPass, password)
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);  
}


module.exports = { withAuth, checkPassword, hashPassword };
