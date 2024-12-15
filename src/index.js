const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config()
const filterRouter = require('./routers/filterRouter');
const authRouter = require('./routers/authRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/auth',authRouter);
app.use('/filter', filterRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
require("dotenv").config();