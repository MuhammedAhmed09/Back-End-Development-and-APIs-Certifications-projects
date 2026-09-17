const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.urlencoded({ extended: false }));

const {
    inputCleaner, 
    inputValidator
} = require('./middleware');

app.get('/', (req, res) => {
    res.redirect('/form');
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.post(
    '/submit', 
    inputCleaner, 
    inputValidator,
    (req, res) => {
        res.send(`
            <h1>Submitted Data</h1>
            <p>Username: ${req.body.username}</p>
            <p>Comment: ${req.body.comment}</p>
        `)
    }
)


app.listen(port, () => {
  console.log('Server running on port 3000');
})