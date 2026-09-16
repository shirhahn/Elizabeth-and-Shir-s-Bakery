# 🥐 Elizabeth & Shir's Bakery - API Game

Welcome to **Elizabeth & Shir's Bakery**! 🥖🧁 
It’s a busy Friday morning, the smell of fresh croissants is in the air, and our bakery is packed with customers. But we have a problem: our digital order system is completely manual today! 

We need your help to manage the bakery's inventory, take customer orders, and even handle a few kitchen disasters along the way. In this interactive game, you will act as our head cashier and API architect. By constructing the right RESTful HTTP requests, you'll advance through the levels and save the shift. Can you pass all 10 stages and become the Ultimate API Master? 🏆

---

## 🎓 About This Project

This project was built as **Assignment 3** for the Web Application Development course. 
The main goal of this game is to practice and demonstrate a deep understanding of Client-Server communication using RESTful API principles.

### Key Features:
* **Interactive UI:** Built entirely with Vanilla JavaScript and AJAX (Fetch API) for a seamless, single-page experience without reloads.
* **Server-Side Validation:** The frontend only sends requests. All game logic, solution validation, and error handling are securely processed on the Node.js server.
* **Dynamic SSR:** Server-Side Rendering using EJS to generate the game interface and the database schemas dynamically.
* **RESTful Architecture:** Proper utilization of HTTP Methods (GET, POST, PUT, PATCH, DELETE), Status Codes, Route Parameters, and Query Parameters.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation
1. Clone the repository to your local machine:
   git clone https://github.com/shirhahn/Elizabeth-and-Shir-s-Bakery.git
2. Open your terminal and navigate to the project directory:
   cd Elizabeth-and-Shir-s-Bakery
3. Install the required server dependencies (Express & EJS):
   npm install

### Running the Server
To start the application, simply run:
node server.js

You should see a message in the terminal saying: Server is running on http://localhost:3000

### Playing the Game
1. Open your favorite web browser.
2. Navigate to: http://localhost:3000
3. Follow the on-screen instructions for each level. Construct your HTTP requests by selecting the right method, URL path, and JSON body.
4. **Need a hint?** To view the database schemas and understand the data structure at any time, click the "View Database Schemas" link in the header or navigate directly to: http://localhost:3000/schemas

---

## 🛠️ Technologies Used
* **Backend:** Node.js, Express.js
* **Frontend:** Vanilla JavaScript, HTML5, CSS3 (Flexbox for Responsive Design)
* **View Engine:** EJS (Embedded JavaScript templating)
* **Architecture:** RESTful API, AJAX