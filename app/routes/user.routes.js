// /api/users: GET, POST, DELETE
// /api/users/:id: GET, PUT, DELETE
// /api/users/published: GET
let router = require("express").Router();

const users = require("../controllers/user.controller.js");
// Create a new Users
router.post("/", users.create);
// Retrieve all Userss
router.get("/", users.findAll);
// Retrieve a single Users with id
router.get("/:id", users.findOne);
// Update a Users with id
router.put("/:id", users.update);
// Delete a Users with id
router.delete("/:id", users.delete);
// Create a new Users
router.delete("/", users.deleteAll);

module.exports = router;