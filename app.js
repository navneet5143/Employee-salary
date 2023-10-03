const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const employeeModule = require('./views/employeeModule'); // Import the employee module

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/employee', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'employee.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/signup.html'));
});

/* ============ Login Page ==========*/
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.appendFile('Login.txt', username + '\n' + password, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data.');
    } else {
      console.log(`Data saved: ${username}`);
      console.log(`Data saved: ${password}`);
      res.send('Data saved successfully!');
    }
  })
});

/* ============ Sigup Page ==========*/
app.post('/save', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send('Passwords do not match. Please try again.');
  }
  fs.appendFile('signup.txt', username + '\n' + email + '\n' + password, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving data.');
    } else {
      console.log(`Data saved: ${username}`);
      console.log(`Data saved: ${email}`);
      console.log(`Data saved: ${password}`);
      res.send('Data saved successfully!');
    }
  })
});


app.post('/add', (req, res) => {
  const name = req.body.name;
  const salary = parseFloat(req.body.salary);
  const hours = parseFloat(req.body.hours);

  // Use the employee module to add an employee
  employeeModule.addEmployee(name, salary, hours);
  res.redirect('/employee');
});

app.get('/calculate', (req, res) => {
  // Use the employee module to calculate and display salaries
  const output = employeeModule.calculateSalaries();
  res.send(output.join('<br>'));
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
