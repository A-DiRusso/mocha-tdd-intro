const http = require('http');

const Restaurant = require('../models/restaurants');

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

        res.end(restaurantsJSON);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});