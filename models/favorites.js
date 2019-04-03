const db = require('./conn');

class Favorites {
    constructor(id, user_id, restaurant_id){
        this.id = id;
        this.userId = user_id;
        this.restId = restaurant_id;
    }

    static getAll() {
        return db.any(`select * from favorites fav where id=${id}`)
            .catch(() => {
                return null;
            });
    }

    static getById(id) {
        return db.one(`select * from favorites fav where id=${id}`)
            .then((favData) => {
                const favInstance = new Favorites(
                                    favData.id,
                                    favData.user_id,
                                    favData.restaurant_id  
                );
                return favInstance;
            })
            .catch(() => {
                return null;
            });
        }
        save() {
            return db.result(`update favorites set
                                user_id=${this.userId},
                                restaurant_id=${this.restId},
                            where id=${this.id}
                            `);
        }
}

module.exports = Favorites;