const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const tasksFile = path.join(__dirname, '../tasks.json');

router.get('/', (req, res) => {
    res.render('addTask');
});

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const tasksData = await fs.readFile(tasksFile, 'utf8');
        const tasks = JSON.parse(tasksData);
        
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
        
        res.redirect('/tasks');
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send('Error adding task');
    }
});

module.exports = router;