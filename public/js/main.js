// public/js/main.js

// --- State Management ---
let currentStageIndex = 0;

// --- DOM Elements ---
const stageTitle = document.getElementById('stage-title');
const stageDescription = document.getElementById('stage-description');
const currentStageSpan = document.getElementById('current-stage');

const httpMethodSelect = document.getElementById('http-method');
const apiPathInput = document.getElementById('api-path');
const requestBodyInput = document.getElementById('request-body');
const sendBtn = document.getElementById('send-btn');

const statusCodeDisplay = document.getElementById('status-code');
const responseBodyDisplay = document.getElementById('response-body');
const gameFeedback = document.getElementById('game-feedback');
const nextBtn = document.getElementById('next-btn');

// --- Initialization ---
function loadStage() {
    // gameStepsData is injected from the server via EJS
    const stage = gameStepsData[currentStageIndex];
    
    // Update UI with stage instructions
    currentStageSpan.textContent = currentStageIndex + 1;
    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;
    
    // Reset inputs and displays for the new level
    httpMethodSelect.value = 'GET';
    apiPathInput.value = '';
    requestBodyInput.value = '';
    statusCodeDisplay.textContent = '-';
    responseBodyDisplay.textContent = 'Awaiting request...';
    
    // Hide feedback and next button
    gameFeedback.className = 'feedback-message hidden';
    gameFeedback.textContent = '';
    nextBtn.classList.add('hidden');
}

// --- Main Game Logic (AJAX) ---
async function sendRequest() {
    const method = httpMethodSelect.value;
    const path = apiPathInput.value.trim();
    const bodyText = requestBodyInput.value.trim();
    const stage = gameStepsData[currentStageIndex];

    // Basic frontend validation
    if (!path) {
        showFeedback("Please enter an API path.", "error");
        return;
    }

    // Prepare fetch options (AJAX)
    const options = {
        method: method,
        headers: {
            'x-game-stage': stage.id.toString(), // Sending the stage ID to the server
            'Content-Type': 'application/json'
        }
    };

    // Parse body if it's a request that typically has one
    if (method !== 'GET' && method !== 'DELETE' && bodyText) {
        try {
            options.body = JSON.stringify(JSON.parse(bodyText)); // Validate it's proper JSON
        } catch (e) {
            showFeedback("Invalid JSON format in Request Body.", "error");
            return;
        }
    }

    try {
        // Send the actual AJAX request to our Express server
        const response = await fetch(path, options);
        
        // Parse the response from the server
        const responseData = await response.json().catch(() => ({}));
        
        // Update UI with the server's response
        statusCodeDisplay.textContent = response.status;
        responseBodyDisplay.textContent = JSON.stringify(responseData, null, 2);

        // --- Check Game Validation ---
        // We look for the custom header we set in the server's middleware
        const gameResult = response.headers.get('X-Game-Result');
        
        if (gameResult === 'Success') {
            showFeedback("Great job! Request successful.", "success");
            
            // Handle game completion
            if (currentStageIndex === gameStepsData.length - 1) {
                nextBtn.textContent = "Finish Game 🎉";
            }
            nextBtn.classList.remove('hidden');
        } else if (responseData.gameError) {
            // The server caught a mistake in the game logic
            showFeedback(responseData.gameError, "error");
        } else {
            // A standard server error occurred (e.g., standard 404)
            // Note: Stage 10 specifically requires handling a 404 correctly, 
            // the server will mark it as 'Success' if expected.
            showFeedback("Request processed, but not what the stage expected.", "error");
        }

    } catch (error) {
        // Handle network errors (e.g., server is down)
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
        currentStageIndex = 0; // Restart game
        loadStage();
    }
});

// --- Boot up ---
loadStage();