const express = require('express');
const port = 3000;
const app = express(); //import the library

app.listen(port, ()=>{
    console.log("Listening on port: "+port); 
})

app.get('/',(request,response)=>{response.send("Hello")}); //responds



