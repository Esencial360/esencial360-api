const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const cors = require("cors");
const corsOptions = require('./config/corsOptions')
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//custom middleware logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

//built-in middleware
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use('/employees', require('./routes/api/employees'));


app.get("/*", (req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
