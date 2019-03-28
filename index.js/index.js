const http = require('http');

const Restaurant = require('../models/restaurants');
const User = require('../models/users');

const hostname = '127.0.0.1';
const port = 3000;


const server = http.createServer( async (req, res) => {
    console.log(req.url);


    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // res.end('Hello World\n');

    if (req.url === '/restaurants') {
        const allRestaurants = await Restaurant.getAll();
        const restaurantsJSON = JSON.stringify(allRestaurants);
        const method = req.method;

        if (method === "GET") {
            res.end(`{message: "What you trin' get?"}`);
        } else if (method === "PUT") {
            res.end(`{message: "What you trina' put?"}`);
        } else if (method === "DELETE") {
            res.end(`{message: "Not like this..."}`);
        }

        res.end(restaurantsJSON);
    } else if (req.url.startsWith("/users")) {
        const method = req.method;

        if (method === "GET") {
            const parts = req.url.split("/");
            console.log(parts);
            if (parts.length === 2) {
                const allUsers = await User.getAll();
                const usersJSON = JSON.stringify(allUsers);

                res.end(usersJSON);
            } else if (parts.length === 3) {
                const userId = parts[2];
                const theUser = await User.getById(userId);
                const userJSON = JSON.stringify(theUser);

                res.end(userJSON);
            } else {
                res.statusCode = 404;
                res.end('Resource not found.');
            }
        } else if (method === "POST") {
            res.end(`{message: "It sounds like you would like to create"}`);
        } else if (method === "PUT") {
            res.end(`{message: "You wanna update don't you.}`);
        } else if (method === "DELETE") {
            res.end(`{message: "rm the user"}`);
        }
    } else {
        res.end(`{message: "Thank you for your patronage. Please send bitcoin!}`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});