const express = require('express')
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: axios } = require('axios');
const port = process.env.PORT || 5000


app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors('*'));

require("dotenv").config();


app.get('/popular', async (req, res) => {

    try {
        const popMovies = await axios.get(`https://imdb-api.com/en/API/MostPopularMovies/${process.env.apiKey}`);
        res.send(popMovies.data)
    } catch (error) {
        res.status(500).send(error.message)

    }


})

app.get('/:query', async (req, res) => {
    try {
        const oneMovie = await axios.get(`https://imdb-api.com/en/API/SearchMovie/${process.env.apiKey}/${req.params.query}`
        );
        res.send(oneMovie.data)
    } catch (error) {
        res.status(500).send(error.message)
    }



})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});