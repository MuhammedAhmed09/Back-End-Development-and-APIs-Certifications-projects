const express = require('express');
const app = express();
const PORT = 3000;

// importing the api routers;
const projectRoutes = require('./routes/projects.routes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/api', projectRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})