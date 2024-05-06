const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/index');
const databaseConnection = require('./config/database');

const app = express();

databaseConnection();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);

app.listen(3000);