const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



//setup middleware
app.use(express.static('./public'));
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notFound);
app.use(errorHandlerMiddleware)


const start = async() => {
    try {
        await connectDB();
        app.listen(PORT, console.log(`Server is listening on Port ${3000}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start()