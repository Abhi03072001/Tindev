const express = require('express');


const app = express();

app.use("/", (req, res)=>{
    res.send('server is running sasscsdvsdvds');
})

app.use("/test", (req, res)=>{
    res.send('server is running sasscsdvsdvds cfcesefe scscw');
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
}); 