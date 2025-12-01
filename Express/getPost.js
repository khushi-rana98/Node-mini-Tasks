const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));


// Home route → serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'getPost.html'));
});

// GET handler
app.get('/get-example', (req, res) => {
  const { name, age } = req.query;
  res.send(`
    <h2>GET Request Received</h2>
    <p>Name: ${name}</p>
    <p>Age: ${age}</p>
    <a href="/">Go Back</a>
  `);
});

// POST handler
app.post('/post-example', (req, res) => {
  const { name, age } = req.body;
  res.send(`
    <h2>POST Request Received</h2>
    <p>Name: ${name}</p>
    <p>Age: ${age}</p>
    <a href="/">Go Back</a>
  `);
});

// Start server
app.listen(4000, () =>
  console.log("Server running at http://localhost:4000")
);
