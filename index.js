//#region Initial part of tutorial
// const Person = require('./person');
// //import Person from './person';
// const person1 = new Person('John Doe', 30);

// person1.greeting();
//#endregion

//#region Using http to create server
// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const { Console } = require('console');
// const { extname } = require('path');

// const server = http.createServer((req, res) => {
//     //Inefficient because you have to have a check for every route possible

//     // if (req.url === '/') {
//     //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
//     //         if (err) throw err;
//     //         res.writeHead(200, {'Content-Type': 'text/html'});
//     //         res.end(content);
//     //     });
//     // }
//     // if (req.url === '/api/users') {
//     //     const users = [
//     //         {name: 'Bob Smith', age: 40},
//     //         {name: 'Jon Doe', age: 30}
//     //     ];
//     //     res.writeHead(200, {'Content-type': 'application/json'});
//     //     res.end(JSON.stringify(users));
//     // }

//     let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

//     //Get extension of file
//     let extName = path.extname(filePath);

//     //Intial content type
//     let contentType = 'text/html'

//     //Check extension and set content type appropriately
//     switch(extName){
//         case '.js':
//             contentType = 'text/javascript';
//             break;
//         case '.css':
//             contentType = 'text/css';
//             break;
//         case '.json':
//             contentType = 'application/json';
//             break;
//         case '.png':
//             contentType = 'image/png';
//             break;
//         case '.jpg':
//             contentType = 'image/jpg';
//             break;
//     }

//     //Read File
//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 //Page not found
//                 fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
//                     res.writeHead(200, {'Content-Type': 'text/html'});
//                     res.end(content, 'utf-8');
//                 })
//             } else {
//                 //Some Server error
//                 res.writeHead(500);
//                 res.end(`Server Error: ${err.code}`);
//             }
//         } else {
//             //Success
//             res.writeHead(200, {'Content-Type': contentType});
//             res.end(content, 'utf-8');
//         }
//     });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//#endregion

//#region Using ExpressJS
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const exphbs = require('express-handlebars');
const logger = require("./middleware/logger");
const members = require("./Members");

//Initialize logger middleware
//app.use(logger);

//We don't need to do this if we're using a static folder with ExpressJS
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

//Init Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//Set static folder (commented out to use handlebars)
//app.use(express.static(path.join(__dirname, "/public")));

//Use body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Moved routes to another file
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`Server started on ${PORT}...`));

//#endregion
