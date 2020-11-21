const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

// Bring in the route
const Freelancerroutes = require("./app/routes/freelancer.routes");
const Projectroutes = require("./app/routes/project.routes");

var corsOptions = {
    origin: "http://localhost:4200",
  };


  app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.use("/api/freelancer", Freelancerroutes);
app.use("/api/project", Projectroutes);

// Define PORT
const PORT = process.env.PORT || 8080;

// Listen to the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  