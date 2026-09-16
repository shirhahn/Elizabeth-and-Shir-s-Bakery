const express = require('express');
const router = express.Router();
const db = require('../data/database');

// --- Pastries Routes ---

// GET all pastries (with optional Query Parameters for filtering)
router.get('/pastries', (req, res) => {
    let result = db.pastries;

    // Handle Query Parameters (e.g., ?isGlutenFree=true&maxPrice=40)
    if (req.query.isGlutenFree) {
        const isGF = req.query.isGlutenFree === 'true';
        result = result.filter(p => p.isGlutenFree === isGF);
    }
    if (req.query.maxPrice) {
        result = result.filter(p => p.price <= parseInt(req.query.maxPrice));
    }

    res.status(200).json(result);
});

// GET a specific pastry by ID
router.get('/pastries/:id', (req, res) => {
    const pastry = db.pastries.find(p => p.id === parseInt(req.params.id));
    if (!pastry) return res.status(404).json({ error: "Pastry not found" });
    res.status(200).json(pastry);
});

// POST a new pastry
router.get('/pastries/:id', (req, res) => {
    const pastry = db.pastries.find(p => p.id === parseInt(req.params.id));
    if (!pastry) return res.status(404).json({ error: "Pastry not found" });
    res.status(200).json(pastry);
});

router.post('/pastries', (req, res) => {
    const newPastry = {
        id: db.pastries.length ? Math.max(...db.pastries.map(p => p.id)) + 1 : 1,
        ...req.body
    };
    db.pastries.push(newPastry);
    res.status(201).json(newPastry);
});

// PATCH (partial update) a pastry
router.patch('/pastries/:id', (req, res) => {
    const pastry = db.pastries.find(p => p.id === parseInt(req.params.id));
    if (!pastry) return res.status(404).json({ error: "Pastry not found" });
    
    Object.assign(pastry, req.body);
    res.status(200).json(pastry);
});

// --- Orders Routes ---

// GET orders for a specific pastry (Relationship)
router.get('/pastries/:id/orders', (req, res) => {
    const pastryId = parseInt(req.params.id);
    let result = db.orders.filter(o => o.pastryId === pastryId);

    // Filter by status if provided in query
    if (req.query.status) {
        result = result.filter(o => o.status === req.query.status);
    }

    res.status(200).json(result);
});

// GET a specific order
router.get('/orders/:id', (req, res) => {
    const order = db.orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
});

// POST a new order
router.post('/orders', (req, res) => {
    const newOrder = {
        id: db.orders.length ? Math.max(...db.orders.map(o => o.id)) + 1 : 1,
        ...req.body
    };
    db.orders.push(newOrder);
    res.status(201).json(newOrder);
});

// PUT (completely replace) an order
router.put('/orders/:id', (req, res) => {
    const index = db.orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Order not found" });

    db.orders[index] = { id: parseInt(req.params.id), ...req.body };
    res.status(200).json(db.orders[index]);
});

// DELETE an order
router.delete('/orders/:id', (req, res) => {
    const index = db.orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Order not found" });

    const deletedOrder = db.orders.splice(index, 1);
    res.status(200).json(deletedOrder[0]);
});

module.exports = router;