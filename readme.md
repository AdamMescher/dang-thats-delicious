# dang-thats-delicious


## About

Full stack application using Node and MongoDB on the backend and pug.js for the view layer.

[Live on Heroku](https://dangdelicious.herokuapp.com/)

![dangdelicious](https://user-images.githubusercontent.com/6540117/51416428-bdeb2900-1b36-11e9-9e0f-2c4602b4c0db.png)

![dangdelicious-mobile](https://user-images.githubusercontent.com/6540117/51416499-00ad0100-1b37-11e9-8084-b7bcc610e82b.png)


## Technologies

* [Node](https://nodejs.org/en/) -- JavaScript runtime built on Chrome’s V8 JavaScript engine that uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
* [Express](https://expressjs.com/) -- A light-weight web application framework to help organize a web application into an MVC architecture on the server side.
* [MongoDB](https://www.mongodb.com/) -- A NoSQL, cross-platform document-oriented database program.
  * [mLab](https://mlab.com/) -- hosted DBaaS recommended by Wes Bos
* [Passport JS](http://www.passportjs.org/) -- Authentication middleware for Node.js
* [Pug JS](https://pugjs.org/api/getting-started.html) --  High-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers
* [Sass](https://sass-lang.com/) -- CSS preprocessor
*
* [Google Maps API](https://developers.google.com/maps/documentation/) -- Build customized, agile experiences that bring the real world to your users with static and dynamic maps, Street View imagery, and 360° views.
  * Place Autocomplete -- You can use autocomplete to give your applications the type-ahead-search behavior of the Google Maps search field. When a user starts typing an address, autocomplete will fill in the rest.
  * Static Maps -- Creates your map based on URL parameters sent through a standard HTTP request and returns the map as an image you can display on your web page.
* [Gravatar](https://en.gravatar.com/) -- An image that follows you from site to site appearing beside your name when you do things like comment or post on a blog. Avatars help identify your posts on blogs and web forums.

## Setup
1. Clone Repo
2. ```npm install``
3. ```npm run dev``

## Sample Data

To load sample data, run the following command in your terminal:

`npm run sample`

If you have previously loaded in this data, you can wipe your database 100% clean with:

`npm run blowitallaway`

That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|


