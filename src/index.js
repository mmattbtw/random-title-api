const express = require('express');
const config = require('./config');
const axios = require('axios');
const rateLimit = require('express-rate-limit')

const app = express()

const PORT = config.port || 3000;

var cors = require('cors');

app.use(express.json())
app.use(cors())

const GIST_URL = 'https://gist.githubusercontent.com/mmattbtw/91312bce7be2d89b9d21cc8ba050fc2d/raw/915bb3ba7759f4380076b0d37359e8698145b229/new_titles.txt'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes'
})

app.use(limiter)

app.get('/string', async function (req, res) {
    const titles = (await axios.get(GIST_URL)).data;
    const titlesArray = titles.split('\n');
    const randomTitle = titlesArray[Math.floor(Math.random() * titlesArray.length)];
    
    res.status(200).send(randomTitle)
})

app.get('/json', async function (req, res) {
    const titles = (await axios.get(GIST_URL)).data;
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
