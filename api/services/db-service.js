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
      resolve(res[0]);
    });
  });
}

function getOldRanks(cohortId) {
  return new Promise((resolve, reject) => {

    const query = 'SELECT * FROM old_ranks JOIN students ON old_ranks.st_id=students.st_id WHERE students.c_id=?';
    db.query(query, [cohortId], (err, res) => {
      if (err) reject(err);
      resolve(res);
    });

  });
}


async function getCohortId(stId) {
  console.log('getCohortId - stId: ', stId);
  const query1 = 'SELECT c_id FROM students WHERE st_id = ?';
  const { c_id: cohortId } = await runQuery(query1, [stId]);
  return cohortId;
}

function runQuery(query, params) {
  console.log('running query: ', query, 'params: ', params);
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, res) => {
      if (err) return reject(err);
      console.log('runQuery res: ', res);
      if (!res || res === []) return resolve([]);
      else if (res.length === 2) return resolve(res[0]);
      else return resolve(res);
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

async function addTransaction(studentId, pointTypeId, notes) {
  const cohortId = await getCohortId(studentId);
  /// store the current ranks (old)
  const leaders = await getLeaderboard(cohortId);
  for (const leader of leaders) {
    await saveOldRank(leader.st_id, leader.ranking)
  }
  /// add transaction, this will make new rankings 
  const query = 'INSERT INTO transactions (st_id, ty_id, note) VALUE (?, ?, ?)';
  return await runQuery(query, [studentId, pointTypeId, notes]);  
}

async function saveOldRank(st_id, ranking) {
  const query='INSERT INTO old_ranks (st_id, ranking) VALUE (?, ?) ON DUPLICATE KEY UPDATE st_id=?, ranking=?;';
  await runQuery(query, [st_id, ranking, st_id, ranking]);
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
      if (!res || res.length !== 1)
        reject('No user found or, multiple users with the same username');
      resolve(res[0]);
    })
  });
}

module.exports = {
  addStudent,
  getStudents,
  getLeaderboard,
  getOldRanks,

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