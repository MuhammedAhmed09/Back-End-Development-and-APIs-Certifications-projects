const express = require('express');
const router = express.Router();

const projects = [];

router.get('/projects', (req, res) => {
    res.json(projects);
});

router.post('/projects', (req, res) => {
    const { name, description, status } = req.body;

    if( !name || !description || !status) {
        return res
        .status(400)
        .json({ 
            error: 'Name, description and status are required.' 
        });
    }

    const newProject = {
        id: projects.length + 1,
        name: name,
        description: description,
        status: status,
        createdAt: new Date()
    }

    console.log(`Received project:`, newProject);

    projects.push(newProject)

    res.status(201).json({
        message: 'Project created',
        project: newProject
    });
});

router.patch('/projects/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, description, status } = req.body;

    const project = projects.find(project => project.id === id);

    if(!project) {
        return res.status(404).json({ 'error': 'Project not found' })
    }

    if(name !== undefined){
        if(name.trim() === "") {
            return res.status(400).json({ error: 'name cannot be empty' });
        }

        project.name = name;
    }

    if(description !== undefined){
        if(description.trim() === "") {
            return res.status(400).json({ error: 'description cannot be empty' });
        }

        project.description = description;
    }

    if(status !== undefined){
        if(status.trim() === "") {
            return res.status(400).json({ error: 'status cannot be empty' });
        }

        project.status = status;
    }

    res.json({
        message: 'Project updated successfully',
        data: project
    })
});

router.get('/projects/:id', (req, res) => {
    const id = Number(req.params.id);
    
    const project = projects.find(project => project.id === id);

    if(!project) {
        return res.status(404).json({ "error": "Project not found" });
    }

    res.status(200).json(project)
});

router.delete('/projects/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = projects.findIndex(project => project.id === id);

    if(index === -1) {
        return res.status(404).json({"error": "Project not found"})
    } 
    
    const deletedProject = projects.splice(index, 1)[0];

    res.json({
        message: 'Project deleted successfully',
        data: deletedProject
    });
});

module.exports = router;