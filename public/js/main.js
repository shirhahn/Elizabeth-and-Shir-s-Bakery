// public/js/main.js

// --- State Management ---
let currentStageIndex = 0;


// --- DOM Elements ---
const stageTitle = document.getElementById('stage-title');
const stageDescription = document.getElementById('stage-description');
const currentStageSpan = document.getElementById('current-stage');
const stageSelector = document.getElementById('stage-selector');

const httpMethodSelect = document.getElementById('http-method');
const apiPathInput = document.getElementById('api-path');
const requestBodyInput = document.getElementById('request-body');
const sendBtn = document.getElementById('send-btn');

const statusCodeDisplay = document.getElementById('status-code');
const responseBodyDisplay = document.getElementById('response-body');
const gameFeedback = document.getElementById('game-feedback');
const nextBtn = document.getElementById('next-btn');

const hintBtn = document.getElementById('hint-btn');
const hintDisplay = document.getElementById('hint-display');
const loadTemplateBtn = document.getElementById('load-template-btn');

// --- Initialization ---
function loadStage() {
    const stage = gameStepsData[currentStageIndex];
    
    currentStageSpan.textContent = currentStageIndex + 1;
    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;
    
    // Sync the selector dropdown
    if (stageSelector) {
        stageSelector.value = currentStageIndex;
    }
    
    // Reset form controls
    httpMethodSelect.value = 'GET';
    apiPathInput.value = '';
    requestBodyInput.value = '';
    statusCodeDisplay.textContent = '-';
    responseBodyDisplay.textContent = 'Awaiting request...';
    
    // Reset messages and action buttons
    gameFeedback.className = 'feedback-message hidden';
    gameFeedback.textContent = '';
    nextBtn.classList.add('hidden');
    
    // Reset hint
    hintDisplay.classList.add('hidden');
    hintDisplay.textContent = '';
}

// --- Main Game Logic (AJAX) ---
async function sendRequest() {
    const method = httpMethodSelect.value;
    const path = apiPathInput.value.trim();
    const bodyText = requestBodyInput.value.trim();
    const stage = gameStepsData[currentStageIndex];

    if (!path) {
        showFeedback("Please enter an API path.", "error");
        return;
    }

    const options = {
        method: method,
        headers: {
            'x-game-stage': stage.id.toString(), 
            'Content-Type': 'application/json'
        }
    };

    if (method !== 'GET' && method !== 'DELETE' && bodyText) {
        try {
            options.body = JSON.stringify(JSON.parse(bodyText)); 
        } catch (e) {
            showFeedback("Invalid JSON format in Request Body.", "error");
            return;
        }
    }

    try {
        const response = await fetch(path, options);
        const responseData = await response.json().catch(() => ({}));
        
        statusCodeDisplay.textContent = response.status;
        responseBodyDisplay.textContent = JSON.stringify(responseData, null, 2);

        const gameResult = response.headers.get('X-Game-Result');
        
        if (gameResult === 'Success') {
            showFeedback("Great job! Request successful.", "success");
            
            if (currentStageIndex === gameStepsData.length - 1) {
                nextBtn.textContent = "Finish Game 🎉";
            }
            nextBtn.classList.remove('hidden');
        } else if (responseData.gameError) {
            showFeedback(responseData.gameError, "error");
        } else {
            showFeedback("Request processed, but not what the stage expected.", "error");
        }
    } catch (error) {
        statusCodeDisplay.textContent = "Error";
        responseBodyDisplay.textContent = "Could not connect to the server.";
        showFeedback("Network error. Make sure the path is correct.", "error");
    }
}

// --- Helper Functions ---
function showFeedback(message, type) {
    gameFeedback.textContent = message;
    gameFeedback.className = `feedback-message ${type}`;
}

// --- Event Listeners ---
sendBtn.addEventListener('click', sendRequest);

nextBtn.addEventListener('click', () => {
    if (currentStageIndex < gameStepsData.length - 1) {
        currentStageIndex++;
        loadStage();
    } else {
        alert("Congratulations! You completed all the stages and became an API Master! 🏆");
        currentStageIndex = 0; 
        loadStage();
    }
});

stageSelector.addEventListener('change', (e) => {
    currentStageIndex = parseInt(e.target.value, 10);
    loadStage();
});

// Display customized hint for the current stage
hintBtn.addEventListener('click', async () => {
    const stage = gameStepsData[currentStageIndex];
    try {
        const res = await fetch(`/api/game/stages/${stage.id}/hint`);
        const data = await res.json();
        hintDisplay.textContent = data.hint || "No hint available.";
    } catch {
        hintDisplay.textContent = "Could not load hint.";
    }
    hintDisplay.classList.remove('hidden');
});

// Load context-aware JSON template based on stage and resource type
loadTemplateBtn.addEventListener('click', () => {
    const stage = gameStepsData[currentStageIndex];
    const stageId = stage ? stage.id : (currentStageIndex + 1);
    const path = apiPathInput.value.trim().toLowerCase();
    const method = httpMethodSelect.value;

    if (method === 'GET' || method === 'DELETE') {
        requestBodyInput.value = "";
        showFeedback("Body is not typically required for GET or DELETE requests.", "error");
        return;
    }

    // Specific template for Stage 6 partial update (PATCH)
    if (stageId === 6) {
        requestBodyInput.value = JSON.stringify({ stock: 0 }, null, 2);
        return;
    }

    // Order template for orders stages (5, 7) or if the path indicates orders
    if (stageId === 5 || stageId === 8 || path.includes('orders')) {
        requestBodyInput.value = JSON.stringify({
            customerName: "Alice Smith",
            pastryId: 1,
            quantity: 2,
            status: "pending"
        }, null, 2);
        return;
    }

    // Default pastry template for pastries stages
    requestBodyInput.value = JSON.stringify({
        name: "Blueberry Muffin",
        category: "Muffin",
        price: 14,
        isGlutenFree: false,
        stock: 15
    }, null, 2);
});

// --- Boot up ---
loadStage();