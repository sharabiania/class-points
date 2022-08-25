const db = require('../connection/connection');

function getStudents(cohortId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM students WHERE c_id=?';
    db.query(query, [cohortId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function addStudent(name, nickName, cohortId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO students (name, nick_name, c_id) VALUE (?, ?, ?)';
    db.query(query, [name, nickName, cohortId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getLeaderboard(cohortId) {
  return new Promise((resolve, reject) => {
    const query = 'call leaderboard(?)';
    db.query(query, [cohortId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function getTransactions() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM transactions';
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function addTransaction(studentId, pointTypeId, notes) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO transactions (st_id, ty_id, note) values (?, ?, ?)';
    db.query(query, [studentId, pointTypeId, notes], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });

  });
}

function getTransactionHistory(pageNumber, pageSize = 20) {
  const offset = pageNumber * pageSize;
  return new Promise((resolve, reject) => {
    const countQuery = 'SELECT COUNT(*) FROM transactions;';
    db.query(countQuery, (err, countRes) => {
      if (err) reject(err);
      const query = 'call transaction_history(?, ?)';
      db.query(query, [pageSize, offset], (err, res) => {
        if (err) reject(err);
        resolve({
          total: countRes[0]["COUNT(*)"],
          pageSize,
          page: pageNumber,
          data: res[0],
        });
      });
    });
  });
}

function getPointTypes() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM point_types';
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function createPointType(name, pointValue, description) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO point_types (name, point_value, description) value (?, ?, ?)'
    db.query(query, [name, pointValue, description], (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
  });
}

function getActiveCohort() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM cohorts WHERE finalized=false';
    db.query(query, (err, res) => {
      if (err) reject(err);
      if (res && res.length !== 1)
        reject('there are multiple active cohorts. correct the data in database.');
      resolve(res);
    });
  });
}

function getCohorts() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM cohorts';
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function addCohort(name) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO cohorts (name) value (?)';
    db.query(query, [name], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function createUser(username, hashedPassword, cohortId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, password, c_id) VALUE (?, ?, ?);';
    db.query(query, [username, hashedPassword, cohortId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

function findUser(username) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username=?;';
    db.query(query, [username], (err, res) => {
      if (err) reject(err);
      if(!res || res.length !== 1) 
        reject('No user found or, multiple users with the same username');
      resolve(res[0]);
    })
  });
}

module.exports = {
  addStudent,
  getStudents,
  getLeaderboard,

  addTransaction,
  getTransactions,
  getTransactionHistory,

  createPointType,
  getPointTypes,

  addCohort,
  getCohorts,
  getActiveCohort,

  createUser,
  findUser
};