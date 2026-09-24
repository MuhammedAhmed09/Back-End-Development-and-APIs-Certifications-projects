const express = require('express');
const app = express();
const PORT = 3000;

// importing the api routers;
const apiRoutes = require('./routes/projects.routes');

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})