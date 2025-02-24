const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/tasks', require('./views/tasks'));
app.use('/task', require('./views/task'));
app.use('/add-task', require('./views/addTask'));

app.listen(port, () => {
    console.log(`Todo app listening at http://localhost:${port}`);
});