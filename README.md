# 🥐 Elizabeth & Shir's Bakery - API Game

An interactive web-based educational application designed to practice RESTful API concepts and HTTP client-server communication. 

## Overview

This project serves as an API learning environment where users construct HTTP requests (GET, POST, PUT, PATCH, DELETE) to interact with a mock bakery management system. The application enforces server-side validation for every request and provides real-time JSON responses and stage-specific feedback.

## Prerequisites

Follow these instructions to get a copy of the project up and running on your local machine.

Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (LTS version recommended)
* Git

## Installation

1. Clone the repository to your local environment:
```bash
git clone https://github.com/shirhahn/Elizabeth-and-Shir-s-Bakery.git
cd Elizabeth-and-Shir-s-Bakery
```

Install the required Node.js dependencies (Express and EJS):

```Bash
npm install
```
Running the Application
Start the Express server:

```Bash
node server.js
```

Once the terminal displays Server is running on http://localhost:3000, open your web browser and navigate to: `http://localhost:3000`

## Usage & Features

Interactive Request Builder: Use the left panel to select an HTTP method, define the API path (with auto-complete support), and inject a JSON body template based on the current context.

Stage Navigation: Progress sequentially or use the dropdown menu to jump directly to specific stages.

Hint System: Click the hint button to receive stage-specific documentation and payload requirements.

Database Schemas: View the strict data structure required for API interactions by navigating to the Schema Reference page:

`http://localhost:3000/schemas`


## Technologies Used
* **Backend:** Node.js, Express.js
* **Frontend:** Vanilla JavaScript, HTML5, CSS3 (Flexbox for Responsive Design)
* **View Engine:** EJS (Embedded JavaScript templating)
* **Architecture:** RESTful API, AJAX
---
