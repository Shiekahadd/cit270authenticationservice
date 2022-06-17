const express = require('express');
const https = require('https');
const fs = require ('fs');
const port = 3000; 
const app = express(); //import the library.
const md5 = require('md5'); //import md5.
const bodyParser = require('body-parser'); //body parser is called middleware. Require imports it.
const {createClient} = require('redis'); //This is called destructuring.
const { fstat } = require('fs');

const client = createClient({ url: 'redis://default:@10.128.0.2:6379', }); //This 



app.use(bodyParser.json()); //use the middleware (call it before anything else happens on each request)

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd'
}, app).listen(port, async ()=>{
    await redisClient.connect();//creating a TCP socket with Redis
    console.log("Listening on port: "+port); 
});

const validatePassword = async (request, response)=> {
     //await redis.Client.connect(); //creating a TCP socket with Redis
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





const savePassword =  async (request, response)=>{
    const clearTextPassword = request.body.password;
    const hashedTextPassword = md5(clearTextPassword);
    await redisClient.hSet('passwords', request.body.userName, hashedTextPassword);//this is wrong
    response.status(200);//status 200 means ok
    response.send({result:"Saved"});
}

app.get('/', (request,response)=>{//everytime something calls your API that is a request
    response.send("Hello"); //a response is when the API gives the information requested

})

/*async function savePassword(request,response){


}*/

app.post('/signup', savePassword);
app.post('/login', validatePassword);




