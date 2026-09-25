// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// --- Middleware ---
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- API Routes & Game Validation ---
const apiRoutes = require('./routes/api');
const gameValidator = require('./routes/game');
app.use('/api', gameValidator, apiRoutes);

// --- Frontend Routes (SSR) ---
const gameSteps = require('./data/gameSteps');

// Main Game Route
app.get('/', (req, res) => {
    const clientSteps = gameSteps.map(step => ({
        id: step.id,
        title: step.title,
        description: step.description
    }));
    res.render('index', { steps: clientSteps, totalStages: clientSteps.length });
});

// Schemas Route
app.get('/schemas', (req, res) => {
    const resourceSchemas = {
        Pastries: {
            id: "Number",
            name: "String",
            category: "String",
            price: "Number",
            isGlutenFree: "Boolean",
            stock: "Number"
        },
        Orders: {
            id: "Number",
            customerName: "String",
            pastryId: "Number (Reference to Pastries)",
            quantity: "Number",
            status: "String ('pending', 'completed', 'cancelled')"
        }
    };
    res.render('schemas', { schemas: resourceSchemas });
});

app.use('/api', (req, res) => {
    res.status(404).json({ error: "API route not found" });
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: status === 400 ? "Invalid JSON in request body" : "Internal server error"
    });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});