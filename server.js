const express = require('express');
const bodyParser = require('body-parser'); //body parser is called middleware
const port = 3000;
const app = express(); //import the library
const md5 = require('md5');
const {createClient} = require('redis');


const redisClient = createClient(); 


app.use(bodyParser.json()); //use the middleware (call it before anything else happens on each request)

app.listen(port, ()=>{
    console.log("Listening on port: "+port); 
});

app.get('/', (request,response)=>{
    response.send("Hello");

});

app.post('/login', async(request,response)=>{
    redisClient.connect();
    const redisHashedPassword = await redisClient.hGet('passwords',request.body.userName);
    const userHashedPassword = md5(request.body.password); 
      if (userHashedPassword == redisHashedPassword) {
        response.status(200); //200 means OK
        response.send('Welcome');
    } else {
        response.status(401); //401 means unauthorized
        response.send('Unauthorized');
 }});


