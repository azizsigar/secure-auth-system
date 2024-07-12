const express = require('express');
const { register, login, authenticateJWT, getProfile, logout } = require('./user');

let app = express();

app.use(express.json());
app.post('/auth/login', login);
app.post('/auth/register', register);
app.post('/auth/logout', logout);
app.get('/auth/profile', authenticateJWT, getProfile);

app.use(express.static('client'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
