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

function getTransactionHistory() {
  return new Promise((resolve, reject) => {
    const query = 'call transaction_history()';
    db.query(query, (err, res) => {
      if (err) reject(err);
      resolve(res);
    })
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
 };