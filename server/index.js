const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const dbPath = path.join(__dirname, "accounts.db");
const app = express();
app.use(express.json());
app.use(cors());

let db = null;

// Initialization
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("Server Running at http://localhost:5000");
    });
  } catch (e) {
    console.log(`DBError: ${e.message}`);
  }
};

initializeDbAndServer();

app.get("/api", (req, res) => {
  res.json({ msg: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/api/signup/", async (req, res) => {
  const { userDetails } = req.body;
  const { username, password, category } = userDetails;

  const insertUserQuery = `
  INSERT INTO
    ${category} (username, password)
  VALUES
    ('${username}', '${password}');`;

  try {
    const result = await db.run(insertUserQuery);
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.post("/api/login/", async (req, res) => {
  const { userDetails } = req.body;
  const { username, password, category } = userDetails;

  const getUserQuery = `
  SELECT
    *
  FROM
    ${category}
  WHERE
    (Username = '${username}' AND Password = '${password}');`;

  try {
    const result = await db.get(getUserQuery);
    console.log(result);
    if (result === undefined) {
      res.status(400);
      res.send("Invalid User Credentials");
    } else {
      const token = jwt.sign({ id: result.ID }, "secret", { expiresIn: "1h" });
      console.log(token);
      res.json({ result: result, jwt_token: token });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
