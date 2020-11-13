const express = require('express');
const app = express(); // Creating an Express application

// A port where our application will be mounted
const APP_PORT = 4001;

// GET / -> First route
app.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to my first Express app',
    });
});

// Mounting express application on specific port
app.listen(APP_PORT, () => {
    console.log(`Express on port ${APP_PORT}`);
});