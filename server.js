// start
const express = require('express');

const path = require('path');

const app = express();

const PORT = 3000;

// Middleware for parsing JSON requests (Required for Request Body)
app.use(express.json()); 

// Middleware for serving static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup (EJS for SSR)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Test Route - Just to see everything is working
app.get('/', (req, res) => {
    res.send('Welcome to Elizabeth and Shir\'s Bakery Server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});