function ValidateProject(req, res, next) {
    const { name, description, status } = req.body;

    if(!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'Name is required and must be a non-empty string.'
        })
    }

    if(!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({
            error: 'Description is required and must be a non-empty string.'
        })
    }

    const allowedStatuses = ['active', 'completed', 'archived'];
    if(!status || !allowedStatuses.includes(status)) {
        return res.status(400).json({
            error: 'Invalid status.'
        })
    }

    next();
}

module.exports = ValidateProject;