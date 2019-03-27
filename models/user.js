// Bring in the database connection
const db = require('./conn');

//Need a User class
//Classes should start with an unppercase letter
class User {
    
    constructor(id, first_name, last_name, email, password) {
        //In python, we say 'self'
        //in javascript we say 'this'
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }


    //"static" means that the function is something
    // the class can do but an instance cannot
    static getById(id) {
        //.any always returns an array
        //Instead we will user .one
        return db.one(`select * from users where id=${id}`)
            .then((userData) => {
                // you *must* user the 'new' keyword
                //when you call a javascript constructor
                const userInstance = new User(userData.id,
                                              userData.first_name,
                                              userData.last_name,
                                              userData.email,
                                              userData.password 
                                              );
                return userInstance;
            })
            .catch(() => {
                return null; //signal an invalid value
            })
    }

    // no 'static' since this is an 'instance method'
    //(It belongs to the indvidual instance)
    save() {
        //use .result when you might want a report
        //about how many rows got affected
        return db.result(`
        update users set
            first_name='${this.firstName}',
            last_name='${this.lastName}',
            email='${this.email}',
            password=${this.id}
        where id=${this.id}
        `);
    }

    // get all reviews written by this user
    getReviews() {

    }

}   

//User.getById(3)
//  .then((user) => { 
    // console.log(user);
// });

//export my User model
module.exports = User;
