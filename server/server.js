const express = require('express');

const app = express();
const port = 3000;

// API Route Example
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is running!" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});