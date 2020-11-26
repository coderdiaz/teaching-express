const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const app = express(); // Creating an Express application

// A port where our application will be mounted
const APP_PORT = 4001;

// Example: Global middleware
// app.use((req, res, next) => {
//     console.log('Estoy dentro del middleware');
//     next();
// });

// Example: Single middleware
// const exampleMiddleware = (req, res, next) => {
//     next();
// }
// app.get('/protectedRoute', exampleMiddleware, (req, res) => {
//     return res.json();
// });

app.use(helmet()); // Basic configuration for helmet
app.use(cors()); // Basic configuration for enable CORS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET / -> First route
app.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to my first Express app',
    });
});

// Other modules routes
app.use('/api', require('./routes'));

// mongodb://<host>:<port>@<user>:<password>/<database>
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // Mounting express application on specific port
    app.listen(APP_PORT, () => {
        console.log(`Express on port ${APP_PORT}`);
        console.log(`Connected to MongoDB successfully`);
    });
}).catch(err => {
    throw err;
});