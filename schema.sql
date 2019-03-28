
create table users (
    id serial primary key,
    first_name varchar(100), --'varchar' is equivalent to 'character varying'
    last_name varchar(100), --'varying' just means it won't be filled with 
    email varchar(200),         --empty spaces
    password varchar(500) --NEVER NEVER store passwords - STORE 'hashes'

);

create table restaurants (
    id serial primary key,
    name varchar(200),
    address varchar(200),
    street varchar(200),
    city varchar(200),
    state varchar(50),
    phone varchar(20),
    menu varchar(200),
    picture varchar(500) --Never try to store images in your database
                         -- instead, store a URL
                         --restaurants have many reviews
                         --but I don't put a foreign key here
                         --that FK goes in the reviews table
);

create table reviews (
    id serial primary key,
    score integer,
    content text,
    --a single review belongs to a single restaurant
    restaurant_id integer references restaurants(id),
    --a single review belongs to a single user
    user_id integer references users(id)
    --While we could capture the 'favorite' info here,
    --we dont want to require users to write a review just
    --to add a restaurant to their favorites
    --is_favorite boolean,
);

--This is a 'linking table' which describes the following relationships:
--users can have many favorites
--restaurants can have many favorites
--users have many restaurants through favorites
--restaurants have many users through favorites
create table favorites (
    id serial primary key, --this id is optional
    user_id integer references users(id), --this is a foreign key to users
    restaurant_id integer references restaurants(id) -- FK to restaurants
    --reviews text -- this is 'metadata' about the relationship 
                  --uh oh. this field has a plural name.
                  --that is no good.:)
);