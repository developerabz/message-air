import db from "../db.js";


const createSession = (username: string) => {
  const stmt = db.prepare(`INSERT INTO Session VALUES (@username, @sessionId);`);
  const sessionId = crypto.randomUUID()
  stmt.run({
    username,
    sessionId
  })

  return getSession(sessionId);
}

const getSession = (sessionId: string) => {
  const stmt = db.prepare(`SELECT * FROM Session WHERE sessionId = ?`);
  console.log("Getting session");
  console.log(stmt.get(sessionId))
  return stmt.get(sessionId);
}

export {
  createSession,
  getSession
};
