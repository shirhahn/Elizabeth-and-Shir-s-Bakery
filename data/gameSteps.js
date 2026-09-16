const gameSteps = [
    {
        id: 1,
        title: "Morning Setup",
        description: "Good morning! You just arrived for your shift. Let's see what we have in the display today. Send a request to fetch all available pastries.",
        expected: {
            method: "GET",
            path: "/api/pastries"
        }
    },
    {
        id: 2,
        title: "Price Check",
        description: "A customer wants to know the details of the 'Chocolate Croissant'. Its ID is 1. Fetch only this specific pastry.",
        expected: {
            method: "GET",
            path: "/api/pastries/1"
        }
    },
    {
        id: 3,
        title: "Fresh Out of the Oven",
        description: "Elizabeth just finished baking a fresh batch of Apple Pies! Add a new pastry to the system. Make sure to include 'name', 'category', 'price', 'isGlutenFree', and 'stock' in your JSON body.",
        expected: {
            method: "POST",
            path: "/api/pastries",
            requiresBody: true,
            requiredKeys: ["name", "category", "price", "isGlutenFree", "stock"]
        }
    },
    {
        id: 4,
        title: "The Picky Customer",
        description: "A customer is looking for a gluten-free pastry and has a budget of 40 shekels. Fetch pastries using two query parameters: 'isGlutenFree=true' and 'maxPrice=40'.",
        expected: {
            method: "GET",
            path: "/api/pastries",
            queryParams: {
                isGlutenFree: "true",
                maxPrice: "40"
            }
        }
    },
    {
        id: 5,
        title: "Taking an Order",
        description: "The customer decided! They want to order 2 New York Cheesecakes (pastry ID 3). Create a new order with 'customerName', 'pastryId' (set to 3), 'quantity' (set to 2), and 'status' (set to 'pending').",
        expected: {
            method: "POST",
            path: "/api/orders",
            requiresBody: true,
            requiredKeys: ["customerName", "pastryId", "quantity", "status"]
        }
    },
    {
        id: 6,
        title: "Kitchen Disaster!",
        description: "Oh no! A whole tray of Pistachio Croissants (ID 2) just fell on the floor. Update the stock of pastry ID 2 to 0 so no one else orders it. (Hint: Use the method for partial updates).",
        expected: {
            method: "PATCH",
            path: "/api/pastries/2",
            requiresBody: true,
            requiredKeys: ["stock"]
        }
    },
    {
        id: 7,
        title: "End of Day Analysis",
        description: "The shift is almost over. Let's check how many completed orders we had for the Chocolate Croissant (ID 1). Fetch orders for pastry ID 1, but filter them using a query parameter 'status=completed'.",
        expected: {
            method: "GET",
            path: "/api/pastries/1/orders",
            queryParams: {
                status: "completed"
            }
        }
    },
    {
        id: 8,
        title: "Total Change of Heart",
        description: "The customer from order ID 2 called. They want to completely change their order to a Cinnamon Roll (pastry ID 4). Overwrite order ID 2 entirely with new details.",
        expected: {
            method: "PUT",
            path: "/api/orders/2",
            requiresBody: true,
            requiredKeys: ["customerName", "pastryId", "quantity", "status"]
        }
    },
    {
        id: 9,
        title: "No-Show",
        description: "Order ID 1 was never picked up by the customer. Delete this order from the system.",
        expected: {
            method: "DELETE",
            path: "/api/orders/1"
        }
    },
    {
        id: 10,
        title: "Ghost Order",
        description: "A delivery driver arrived to pick up order number 9999. Try to fetch this order to see how our system handles non-existent resources.",
        expected: {
            method: "GET",
            path: "/api/orders/9999",
            expectError: true 
        }
    }
];

module.exports = gameSteps;