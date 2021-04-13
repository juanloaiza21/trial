const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load('./docs/swagger.yml');
const cors =  require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
//app.use(express.static('public'));


//const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//app.use('/', express.static('public'));
//app.use('/auth', authRoutes);
app.use('/users', userRoutes);


module.exports = app;