//Bring in the database connection
const db = require('./conn');
//const Restaurant = require('./restaurants');

//declare the class
class Review {
    constructor(id, score, content, restaurant_id, user_id) {
        //I want this.<whatevs> to be camelCase
        //because my properties should follow javaScript style
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurantID = restaurant_id;
        this.user_id = user_id;
    }

    static getReviewContent(id) {
        return db.one(`select * from reviews where id=${id}`)
            .then((reviewData) => {
                const reviewContent = new Review(
                                         reviewData.content
                )
                return reviewContent;
            })
    }

    static getById(id) {
        return db.one(`select * from reviews where id=${id}`)
            .then((reviewData) => {
                return new Review(
                    reviewData.id,
                    reviewData.score,
                    reviewData.content,
                    reviewData.restaurant_id,
                    reviewData.user_id
                );
            });
    }
    // getAll is a static method
    static getAll() {
        return db.any(`select * from reviews`)
            .then((arrayOfReviews) => {
                return arrayOfReviews.map((reviewData) => {
                    //console.log('===================================');
                    // console.log(reviewData);
                    //console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                    const aReview = new Review(
                        reviewData.id,
                        reviewData.score,
                        reviewData.content,
                        reviewData.restaurant_id,
                        reviewData.user_id
                    );
                    // console.log(aReview);
                    return aReview;
                });
            });
    }

    // static getall() {
    //     //.any returns 0 or more results in an array
    //     // but that's async so we  'return' the call to db.any
    //     return db.any(`select * from reviews`);
    // }

    // static getLatest(howMany=10) {
    //     //grab 10 latest, for any restaurants
    // }

    // restaurant() {
    //     //get the restaurant instance for this 
    //     //review form the database
    //     //and turn it into and instance of Restaurant
    // }

    // //convenience methods for formatting
    // //summary() {
    //     return this.content.substring(0, 200);
    // }
    
}

//export the class
module.exports = Review;