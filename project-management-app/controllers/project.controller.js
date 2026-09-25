const projects = require('../data/projects');
const AppError = require('../error/appError');

const getProjects = async (req, res) => {
    const { 
        search, 
        sortBy = 'createdAt', 
        sortOrder = 'desc',
        status, 
        page = 1, 
        limit = 10 
    } = req.query;

    let result = [...projects];

    // Fillter
    if(status) {
        result = result.filter(
            project => project.status === status
        );
    };

    // search
    if(search){
        result = result.filter(
            project => project.name.toLowerCase()
            .includes(search.toLowerCase())
        )
    }

    // sort validation
    const allowedSortFields = [
        'name', 'description', 'status', 'createdAt'
    ]
    
    if(!allowedSortFields.includes(sortBy)) {
        throw new AppError('Invalid sort field', 400)
    };

    if(!['asc', 'desc'].includes(sortOrder)) {
        throw new AppError('sortOrder must be asc or desc', 400)
    };

    // sort
    result.sort((project1, project2) => {
        if(sortOrder === 'asc'){
            return project1[sortBy] > project2[sortBy] ? 1 : -1
        }
        return project1[sortBy] < project2[sortBy] ? 1 : -1
    })

    // Pagination 
    const pageNum = Number(page);
    const limitNum = Number(limit);

    if(!Number.isInteger(pageNum) || pageNum < 1) {
        throw new AppError('Page must be a positive integer', 400);
    }

    if(!Number.isInteger(limitNum) || limitNum < 1 || limitNum > 100) {
        throw new AppError('Limit must be between 1 and 100', 400);
    }
    
    const startIdx = (pageNum - 1) * limitNum;
    
    const paginatedProjects = result.slice(
        startIdx,
        startIdx + limitNum
    );

    const total = result.length;
    const totalPages = Math.ceil(total / limitNum);

    res.json({
        data: paginatedProjects,
        pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            totalPages
        }
    });
};

const createProject = async (req, res) => {
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

const patchProject = async (req, res) => {
    const id = Number(req.params.id);

    const project = projects.find(project => project.id === id);

    if(!project) {
        throw new AppError('Project not found', 404);
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

const getProject = async (req, res) => {
    const id = Number(req.params.id);
    
    const project = projects.find(project => project.id === id);

    if(!project) {
        throw new AppError('Project not found', 404);
    }

    res.status(200).json(project);
}

const deleteProject = async (req, res) => {
    const id = Number(req.params.id);

    const index = projects.findIndex(project => project.id === id);

    if(index === -1) {
        throw new AppError('Project not found', 404);
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