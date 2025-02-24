const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const tasksFile = path.join(__dirname, '../tasks.json');

router.get('/', async (req, res) => {
    try {
        const tasksData = await fs.readFile(tasksFile, 'utf8');
        const tasks = JSON.parse(tasksData);
        res.render('tasks', { tasks });
    } catch (error) {
        console.error('Error reading tasks:', error);
        res.status(500).send('Error reading tasks');
    }
});

module.exports = router;