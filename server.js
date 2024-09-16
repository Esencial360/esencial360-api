require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const swaggerDocument = require("./swagger.json");
const axios = require("axios");
const { auth } = require("express-oauth2-jwt-bearer");
const session = require('express-session');
const PORT = process.env.PORT || 3000;

// Auth0 configurations
// // Session middleware
// app.use(
//   session({
//     secret: config.secret,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// Auth0 middleware
// const checkJwt = auth({
//   audience: "https://test-assign-roles.com",
//   issuerBaseURL: config.issuerBaseURL,
// });

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const jwtCheck = auth({
  audience: "https://test-assign-roles.com",
  issuerBaseURL: "https://dev-syvyfpm6kjwu0kzp.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// // Login route
// app.get("/api/auth/login", (req, res) => {
//   res.redirect(
//     `${config.issuerBaseURL}/authorize?response_type=code&client_id=${config.clientID}&redirect_uri=${config.baseURL}/callback&scope=openid profile email`
//   );
// });

// // Callback route
// app.get("/api/auth/callback", async (req, res) => {
//   try {
//     const tokenResponse = await axios.post(
//       `${config.issuerBaseURL}/oauth/token`,
//       {
//         grant_type: "authorization_code",
//         client_id: config.clientID,
//         client_secret: "YOUR_AUTH0_CLIENT_SECRET",
//         code: req.query.code,
//         redirect_uri: `${config.baseURL}/callback`,
//       }
//     );

//     req.session.token = tokenResponse.data.access_token;
//     res.redirect("/");
//   } catch (error) {
//     res.status(500).json({ error: "Authentication failed" });
//   }
// });

// // Logout route
// app.get("/api/auth/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect(
//     `${config.issuerBaseURL}/v2/logout?client_id=${config.clientID}&returnTo=${config.baseURL}`
//   );
// });

// // User info route
// app.get("/api/auth/user", checkJwt, async (req, res) => {
//   try {
//     const userInfoResponse = await axios.get(
//       `${config.issuerBaseURL}/userinfo`,
//       {
//         headers: { Authorization: `Bearer ${req.session.token}` },
//       }
//     );
//     res.json(userInfoResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch user info" });
//   }
// });

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/instructors", require("./routes/instructors"));
app.use("/blog", require("./routes/blog"));
app.use("/news", require("./routes/news"));
app.use("/users", require("./routes/users"));
app.use("/categories", require("./routes/categories"));
app.use("/upload", require("./routes/fileUpload"));
app.use("/logout", require("./routes/logout"));
app.use("/email", require("./routes/email"));
// app.use(jwtCheck);
app.get("/getRoles", async (req, res) => {
  const config = {
    method: "get",
    url: "https://test-assign-roles.com/roles/google-oauth2%7C113363225834198199415",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVtTDhMQ0Q0MWRhdlZvNUpVczJJdSJ9.eyJpc3MiOiJodHRwczovL2Rldi1zeXZ5ZnBtNmtqd3Uwa3pwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJCaE9QUGJLN21jUU9YTnhpSjRCZnBlQ1JaUWsxeWJyd0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly90ZXN0LWFzc2lnbi1yb2xlcy5jb20iLCJpYXQiOjE3MjIxOTg4NzQsImV4cCI6MTcyMjI4NTI3NCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiQmhPUFBiSzdtY1FPWE54aUo0QmZwZUNSWlFrMXlicncifQ.2K4VnOE0ApWwPyr87wyaV-payrzwiqZe7gQL5xHgNW5dSrShm8xJ27kRQ2MAOEe7vGlzkeBXhbcmAUEy6TYgK1Nb7OLaKo9Qi8Nri1BazHq1GTrw9aPE9lyCIvYtd2AmBTwJQjDMXVz82okPIAREDQNVzBiUtbOWG0HMlmxj5dS961SLukCnOp5GatY00NMMuv91PiSGSdNYA9Xy_xgsDBUivgXSYdHfceiGTJoLtqPdFPctx_CG7TtqhE8Dc09gyZUW0YpSK05RTLHMM0aOXFTmWTP8t5B51dpsYX7IdK8-XCBRw7KISsd3HlAQ5FRLaGnGiCJEYZsOIjdv_qLUBw", // Replace with actual token
    },
  };

  try {
    const response = await axios.request(config);
    res.json(response.data); // Send the roles as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch roles" }); // Send an error response
  }
});

app.use(verifyJWT);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
