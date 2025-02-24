const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const tasksFile = path.join(__dirname, '../tasks.json');

router.get('/', async (req, res) => {
    try {
        const taskId = parseInt(req.query.id);
        const tasksData = await fs.readFile(tasksFile, 'utf8');
        const tasks = JSON.parse(tasksData);
        const task = tasks.find(t => t.id === taskId);
        
        if (!task) {
            return res.status(404).send('Task not found');
        }
        
        res.render('task', { task });
    } catch (error) {
        console.error('Error reading task:', error);
        res.status(500).send('Error reading task');
    }
});

module.exports = router;