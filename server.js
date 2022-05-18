const express = require('express');
const port = 3000;
const app = express(); //import the library.
const md5 = require('md5'); //import md5.
const bodyParser = require('body-parser'); //body parser is called middleware. Require imports it.
const {createClient} = require('redis'); //This is called destructuring.


const redisClient = createClient(
    {  socket:{
        port:6379,
        host:"127.0.0.1",

         },
    }
); 

 redisClient.connect(); //await redis.Client.connect(); //creating a TCP socket with Redis


app.use(bodyParser.json()); //use the middleware (call it before anything else happens on each request)

app.listen(port, ()=>{
    console.log("Listening on port: "+port); 
});

const validatePassword = async (request, response)=> {
    
    const requestHashPassword = md5(request.body.password); //get the password from the body and hash it.
    const redisHashPassword = await redisClient.hmGet('passwords', request.body.userName);
    const loginRequest = request.body;
    console.log("Request Body", JSON.stringify(request.body));
    //search database for username, and retrieve current password

    //compare the hashed version of the password that was sent with the hashed version from the database
    if (requestHashPassword==redisHashPassword){
        response.status(200); //200 means OK
        response.send("Welcome");
    } else {
        response.status(401); //401 means unauthorized
        response.send("Unauthorized");
    }


}

app.get('/', (request,response)=>{//everytime something calls your API that is a request
    response.send("Hello"); //a response is when the API gives the information requested

})

app.post('/login', validatePassword);

