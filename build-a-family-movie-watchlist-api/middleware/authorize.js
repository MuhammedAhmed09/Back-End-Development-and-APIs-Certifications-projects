export function authorizeModification(req, res, next) {
    const userId = Number(req.params.userId);
    const requesterId = Number(req.user.id);

    if(req.user.role !== "parent" &&
        ( 
            req.user.role !== "child" || 
            requesterId !== userId
        )
    ) {
        return res.status(403).json({
            error: "Access denied"
        })
    }

    next();
}