# dang-thats-delicious

Wes Bos [Learn Node Course](https://learnnode.com)

Useful Node Refresher

[Turing Express and Postgresql Lesson](http://frontend.turing.io/lessons/module-4/knex-postgres)

## About

Full stack application using Node and MongoDB on the backend.

## Technologies

* [Node](https://nodejs.org/en/) -- JavaScript runtime built on Chrome’s V8 JavaScript engine that uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
* [Express](https://expressjs.com/) -- A light-weight web application framework to help organize a web application into an MVC architecture on the server side.
* [MongoDB](https://www.mongodb.com/) -- A NoSQL, cross-platform document-oriented database program.
  * [mLab](https://mlab.com/) -- hosted DBaaS recommended by Wes Bos
* [Passport JS](http://www.passportjs.org/) -- Authentication middleware for Node.js
* [Pug JS](https://pugjs.org/api/getting-started.html) --  High-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers
* [Sass](https://sass-lang.com/) -- CSS preprocessor
* [Google Maps API](https://developers.google.com/maps/documentation/) - used for address autocomplete and static map images


## Setup

[Node Setup Instructions](https://github.com/creationix/nvm)

### Install Latest Version of NVM

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

### Install Latest LTS Version

```
nvm install --lts
```

----------------------

[WSL MongoDB Setup Instructions](https://gist.github.com/Mikeysax/cc86c30903727c556bcce960f7e4d59b)

### Navigate to root directory

```
cd ~
```
### Import the MongoDB public GPG Key

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
```

### Add the deb to sources list

```
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```

### Reload local pkg database

```
sudo apt-get update
```

### Run the Mongo install command

```
sudo apt-get install -y mongodb-org
```

### Add data/db directories

```
cd ~
sudo mkdir -p data/db
```

### Run mongod server and mongo shell

In one terminal window, start the mongod service:

```
sudo mongod --dbpath ~/data/db
```

In a new terminal window, connect to the mongod service:

```
mongo
```
---------------

## Sample Data

To load sample data, run the following command in your terminal:

```bash
npm run sample
```

If you have previously loaded in this data, you can wipe your database 100% clean with:

```bash
npm run blowitallaway
```

That will populate 16 stores with 3 authors and 41 reviews. The logins for the authors are as follows:

|Name|Email (login)|Password|
|---|---|---|
|Wes Bos|wes@example.com|wes|
|Debbie Downer|debbie@example.com|debbie|
|Beau|beau@example.com|beau|


