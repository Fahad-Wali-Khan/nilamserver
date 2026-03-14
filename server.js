const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

/* MySQL connection */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'ztdmgkqq_admin',     // e.g. ztdmgkqq_dbuser
  password: 'Nilam@123',
  database: 'ztdmgkqq_nilamdb'  // e.g. ztdmgkqq_nilamdb
});


db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected Successfully");
  }
});

/* Route */
app.get("/", (req, res) => {

  db.query("SELECT NOW() AS time", (err, result) => {

    if (err) {
      res.send(`
        <html>
        <body style="font-family:Arial;text-align:center;margin-top:100px;">
        <h1 style="color:red;">Database Connection Failed ❌</h1>
        <p>${err.message}</p>
        </body>
        </html>
      `);
    } else {
      res.send(`
        <html>
        <body style="font-family:Arial;text-align:center;margin-top:100px;">
        <h1 style="color:green;">MySQL Connected Successfully ✅</h1>
        <p>Server Time: ${result[0].time}</p>
        </body>
        </html>
      `);
    }

  });

});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
