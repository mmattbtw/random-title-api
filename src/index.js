const express = require('express');
const config = require('./config');
const axios = require('axios');
const rateLimit = require('express-rate-limit')

const app = express()

const PORT = config.port || 3000;

app.use(express.json())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

app.use(limiter)

app.get('/string', async function (req, res) {
    const titles = (await axios.get('https://gist.githubusercontent.com/MrAuro/57dc83822707119bf07085408bddf4d0/raw/061b7f2c7545d92a6d80adb9cfff9aef85d34b4c/titles.txt')).data;
    const titlesArray = titles.split('\n');
    const randomTitle = titlesArray[Math.floor(Math.random() * titlesArray.length)];
    
    res.status(200).send(randomTitle)
})

app.get('/json', async function (req, res) {
    const titles = (await axios.get('https://gist.githubusercontent.com/MrAuro/57dc83822707119bf07085408bddf4d0/raw/061b7f2c7545d92a6d80adb9cfff9aef85d34b4c/titles.txt')).data;
    const titlesArray = titles.split('\n');
    const randomTitle = titlesArray[Math.floor(Math.random() * titlesArray.length)];
    
    res.status(200).json({
        "title": randomTitle,
        "status": "200"
    })
})

app.listen(PORT, () => {
    console.log(`🎉 Random Title API is running on port ${PORT}`);
})