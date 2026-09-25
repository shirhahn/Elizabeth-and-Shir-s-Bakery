const gameSteps = require('../data/gameSteps');

function gameValidator(req, res, next) {
    req.body = req.body || {};

    const stageId = req.headers['x-game-stage'];
    
    if (!stageId) return next();

    const stageNum = parseInt(stageId, 10);
    const step = gameSteps.find(s => s.id === stageNum);
    
    if (!step) {
        return res.status(400).json({ gameError: "Stage not found in the server!" });
    }

    const expected = step.expected;
    
    if (req.method !== expected.method) {     
        return res.status(400).json({ 
            gameError: "Wrong HTTP Method. Expected " + expected.method + ", but got " + req.method + "." 
        });
    }

    const requestPath = req.originalUrl.split('?')[0]; 
    if (requestPath !== expected.path) {
        return res.status(400).json({ 
            gameError: "Wrong Path. Expected " + expected.path + ", but got " + requestPath + "." 
        });
    }

    if (expected.queryParams) {
        for (const key in expected.queryParams) {
            if (String(req.query[key]) !== String(expected.queryParams[key])) {
                return res.status(400).json({ gameError: `Missing or incorrect Query Parameter: '${key}'.` });
            }
        }
    }

    if (expected.requiresBody) {
        for (const key of expected.requiredKeys) {
            if (req.body[key] === undefined) {
                return res.status(400).json({ gameError: `Your JSON body is missing the required '${key}' property.` });
            }
        }
    }

    switch (stageNum) {
        case 3: 
            if (req.body.price <= 0 || req.body.stock < 0) {
                return res.status(400).json({ gameError: "Stage 3: Price must be greater than 0 and stock cannot be negative." });
            }
            break;
            
        case 5: 
            if (req.body.pastryId !== 3 || req.body.quantity !== 2 || req.body.status !== 'pending') {
                return res.status(400).json({ gameError: "Stage 5: You must order pastry ID 3, quantity 2, and status 'pending'." });
            }
            break;
            
        case 6: 
            if (req.body.stock !== 0) {
                return res.status(400).json({ gameError: "Stage 6: Almost! You need to set the 'stock' property exactly to 0." });
            }
            if (Object.keys(req.body).length > 2) {
                 return res.status(400).json({ gameError: "Stage 6: Remember, PATCH is for partial updates. Only send the properties that need changing." });
            }
            break;
            
        case 8: 
            if (req.body.pastryId !== 4) {
                return res.status(400).json({ gameError: "Stage 8: The customer wants a Cinnamon Roll (pastry ID 4)." });
            }
            const putKeys = Object.keys(req.body);
            if (!putKeys.includes('customerName') || !putKeys.includes('pastryId') || !putKeys.includes('quantity') || !putKeys.includes('status')) {
                return res.status(400).json({ gameError: "Stage 8: A PUT request requires sending the ENTIRE object. You are missing some properties." });
            }
            break;
    }

    const originalJson = res.json;
    res.json = function(data) {
        if ((res.statusCode >= 200 && res.statusCode < 300) || (stageNum === 10 && res.statusCode === 404)) {
            res.setHeader('X-Game-Result', 'Success');
        }
        return originalJson.call(this, data);
    };

    next();
}

module.exports = gameValidator;