function ValidateProjectUpdate(req, res, next) {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: 'At least one field is required for update.'
        });
    }

    const { name, description, status } = req.body;
    

    if(name !== undefined) {
        if(typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({
                error: 'Name must be a non-empty string.'
            })
        }
    }

    if(description !== undefined) {
        if(typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({
                error: 'Description must be a non-empty string.'
            })
        }
    }

    if(status !== undefined) {
        const allowedStatuses = [
            'active',
            'completed',
            'archived'
        ];

        if(!allowedStatuses.includes(status)) {
            return res.status(400).json({
                error: 'Invalid status.'
            })
        }
    }

    next();
}

module.exports = ValidateProjectUpdate;