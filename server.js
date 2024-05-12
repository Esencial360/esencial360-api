const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
// const PORT = process.env.PORT || 3000;
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials')

const PORT = process.env.PORT || 3000;

const options = {
  explorer: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yoga Website API',
      version: '1.0.0',
      description: 'A Express API with Swagger documentation'
    },
    servers: [
      { url: 'http://localhost:3000' } // Update with your server URL
    ]
  },
  apis:  ["./routes/*.js"] // Path to your API route files
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//custom middleware logger
app.use(logger);

//Handle options credentials check
//and fetch cookies credentials requirements
app.use(credentials)

//Cross Origin Resource Sharing
app.use(cors());

app.use(express.urlencoded({ extended: false }));

//built-in middleware
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));



//routes with verifyJWT
app.use(verifyJWT)
app.use("employees", require("./routes/employees"))



// app.get("/*", (req, res) => {
//   res.status(404).sendFile("./views/404.html", { root: __dirname });
// });

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
