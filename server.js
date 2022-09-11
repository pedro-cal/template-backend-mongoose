const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;
const users = require("./app/routes/user.routes")

// middleware - cors
let corsOptions = {
   origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// middleware - bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routers
app.use('/users', users);

// db connection
const db = require("./app/models");
db.mongoose
   .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("Connected to the database!");
   })
   .catch(err => {
      console.log("Cannot connect to the database:\n", err);
      process.exit();
   });

// routes
app.get('/', (req, res) => {
   res.json({ message: 'backend server is working' });
});

app.listen(PORT, () => {
   console.log(`Door ${PORT} open! It's serving time!!`);
});