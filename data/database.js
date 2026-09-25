const initialPastries = [
    { id: 1, name: "Chocolate Croissant", category: "Viennoiserie", price: 15, isGlutenFree: false, stock: 20 },
    { id: 2, name: "Pistachio Croissant", category: "Viennoiserie", price: 18, isGlutenFree: false, stock: 12 },
    { id: 3, name: "New York Cheesecake", category: "Cakes", price: 35, isGlutenFree: true, stock: 8 },
    { id: 4, name: "Cinnamon Roll", category: "Pastries", price: 14, isGlutenFree: false, stock: 15 }
];

const initialOrders = [
    { id: 1, customerName: "David", pastryId: 1, quantity: 2, status: "completed" },
    { id: 2, customerName: "Sarah", pastryId: 3, quantity: 1, status: "pending" }
];

let pastries = structuredClone(initialPastries);
let orders = structuredClone(initialOrders);

function reset() {
    pastries.splice(0, pastries.length, ...structuredClone(initialPastries));
    orders.splice(0, orders.length, ...structuredClone(initialOrders));
}

module.exports = { pastries, orders, reset };