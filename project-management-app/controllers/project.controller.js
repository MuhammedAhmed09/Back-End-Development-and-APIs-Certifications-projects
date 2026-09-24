const projects = require('../data/projects');

const getProjects = (req, res) => {
    res.json(projects);
};

const createProject = (req, res) => {
    const { name, description, status } = req.body;

    const newProject = {
        id: projects.length + 1,
        name,
        description,
        status,
        createdAt: new Date()
    }

    console.log(`Received project:`, newProject);

    projects.push(newProject)

    res.status(201).json({
        message: 'Project created',
        project: newProject
    });
}

const patchProject = (req, res) => {
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    if(!project) {
        return res.status(404).json({ 'error': 'Project not found' })
    }

    const { name, description, status } = req.body;

    if(name !== undefined) {
        project.name = name;
    }

    if(description !== undefined) {
        project.description = description;
    }

    if(status !== undefined) {
        project.status = status;
    }

    res.json({
        message: 'Project updated successfully',
        data: project
    })
}

const getProject = (req, res) => {
    const id = Number(req.params.id);
    
    const project = projects.find(project => project.id === id);

    if(!project) {
        return res.status(404).json({ "error": "Project not found" });
    }

    res.status(200).json(project)
}

const deleteProject = (req, res) => {
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
}

module.exports = {
    getProjects, 
    createProject, 
    patchProject,
    getProject,
    deleteProject
}