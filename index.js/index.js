// const http = require('http');
const express = require('express'); // express is a function that will make an app for you :)
const es6Renderer = require('express-es6-template-engine');
const app = express(); // app is the server
const http = require('http');
const qureystring = require('querystring');
const Restaurant = require('../models/restaurants');
const User = require('../models/users');
const Review = require('../models/reviews');

// const hostname = '127.0.0.1';
const port = 3000;

app.engine('html', es6Renderer);
app.set('view engine', 'html');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    // res.send('This is the login form');
    res.render('login-form');
});
app.post('/login', (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    res.send('anything');
});



app.get('/', (req, res) => {res.send(`Welcome to Welp - an app:)`)})

app.get('/restaurants', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    //res.json will do two thing 1. converts js to json string 2. it puts 
    // the correct content type header on the responce 
    res.json(allRestaurants);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
});

app.get('/reviews', async (req, res) => {
    const allReviews = await Review.getAll();
    res.json(allReviews);

});

app.get('/users/:id', async (req, res) => {
    //how to grab a piece out req.pramas(or any object)
    //this is know as destructuring 
    const {id} = req.pramas;
    const theUser = await User.getById(id);
    res.json(theUser);
});

app.get('/review/:id', async (req, res) => {
    const {id} = req.params;
     const aReview = await Review.getReviewContent(id);
     res.json(aReview);
});




app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});