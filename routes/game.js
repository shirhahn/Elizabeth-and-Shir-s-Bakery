const gameSteps = require('../data/gameSteps');

function gameValidator(req, res, next) {
    // 1. Get the stage ID from the headers (the frontend will send this)
    const stageId = req.headers['x-game-stage'];
    
    // If there's no stage ID, just let the API work normally (useful for standard testing)
    if (!stageId) return next();

    // 2. Find the correct stage in our secret steps file
    const step = gameSteps.find(s => s.id === parseInt(stageId));
    if (!step) {
        return res.status(400).json({ gameError: "Stage not found in the server!" });
    }

    const expected = step.expected;
    
    // 3. Validate HTTP Method
    if (req.method !== expected.method) {
        return res.status(400).json({ gameError: `Wrong HTTP Method. Expected ${expected.method}, but got ${req.method}.` });
    }

    // 4. Validate Path (ignoring query parameters for this check)
    const requestPath = req.originalUrl.split('?')[0]; // Gets '/api/pastries' out of '/api/pastries?isGlutenFree=true'
    if (requestPath !== expected.path) {
        return res.status(400).json({ gameError: `Wrong Path. Expected ${expected.path}, but got ${requestPath}.` });
    }

    // 5. Validate Query Parameters (if the stage requires them)
    if (expected.queryParams) {
        for (const key in expected.queryParams) {
            if (req.query[key] !== expected.queryParams[key]) {
                return res.status(400).json({ gameError: `Missing or incorrect Query Parameter: '${key}'.` });
            }
        }
    }

    // 6. Validate Request Body (if the stage requires it)
    if (expected.requiresBody) {
        for (const key of expected.requiredKeys) {
            if (req.body[key] === undefined) {
                return res.status(400).json({ gameError: `Your JSON body is missing the required '${key}' property.` });
            }
        }
    }

    // 🎉 If we reached here, the user solved the stage perfectly!
    // We add a custom header so the frontend knows they passed the level, 
    // and then call next() to actually execute the real API request.
    res.setHeader('X-Game-Result', 'Success');
    next();
}

module.exports = gameValidator;