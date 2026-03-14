const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Node Server Test</title>
        <style>
            body{
                font-family: Arial;
                text-align:center;
                margin-top:100px;
                background:#f4f4f4;
            }
            h1{color:green;}
        </style>
    </head>
    <body>
        <h1>Node.js Server is Running 🚀</h1>
        <p>If you see this page, your server is working correctly.</p>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
