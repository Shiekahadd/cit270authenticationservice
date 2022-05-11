const express = require('express');
const bodyParser = require('body-parser'); //body parser is called middleware
const port = 3000;
const app = express(); //import the library
const md5 = require('md5');
app.use(bodyParser.json()); //use the middleware (call it before anything else happens on each request)

app.listen(port, ()=>{
    console.log("Listening on port: "+port); 
})



app.post('/login',(request,response)=>{//a post is when a client sends new information to an API
const loginRequest = request.body;
console.log("Request Body", JSON.stringify(request.body));
//search database for username, and retrieve current password

//compare the hashed version of the password that was sent with the hashed version from the database

if (loginRequest.userName=="sali@gmail.com" && loginRequest.password=="Digt1#"){
    response.status(200); //200 means OK
    response.send("Welcome");
} else{ 
    response.status(401); //401 means unauthorized
    response.send("Unauthorized");
}
});

app.get('/',(request,response)=>{//every time something calls your API that is a request

    response.send("Hello");}) //a response is when the API gives the information requested



