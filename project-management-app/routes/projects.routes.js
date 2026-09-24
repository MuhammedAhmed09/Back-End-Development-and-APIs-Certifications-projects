const express = require('express');
const router = express.Router();

const ValidateProject = require('../middleware/validateProject');
const ValidateProjectUpdate = require('../middleware/validateProjectUpdate');

const { 
    getProjects,
    createProject,
    patchProject,
    getProject,
    deleteProject,
} = require('../controllers/project.controller');

router.get('/projects', getProjects);

router.post('/projects', ValidateProject, createProject);

router.patch('/projects/:id', ValidateProjectUpdate, patchProject);

router.get('/projects/:id', getProject);

router.delete('/projects/:id', deleteProject);

module.exports = router;