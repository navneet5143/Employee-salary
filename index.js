const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Here, you can implement your login logic
    // For simplicity, we are just printing the values for now.
    console.log(`Login request - Username: ${username}, Password: ${password}`);
    res.send('Login successful!');
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Here, you can implement your signup logic
    // For simplicity, we are just printing the values for now.
    console.log(`Signup request - Username: ${username}, Password: ${password}`);
    res.send('Signup successful!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
