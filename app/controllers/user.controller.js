const db = require("../models");
const UserModel = db.usersModel;

// CRUD - Create and Save a new User
exports.create = (req, res) => {
   const {
      firstName,
      lastName,
      email,
      phoneNumber,
      imageUrl,
      dateOfBirth,
      role,
      badges,
      isActive,
      enrolledClasses,
   } = req.body;

   // Validate request
   if (!req.body.firstName || !req.body.phoneNumber) {
      res.status(400).send({ message: "First name and Phone number needed!" });
      return;
   }
   // Create a User
   const user = new UserModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      imageUrl,
      dateOfBirth,
      role,
      badges,
      isActive,
      enrolledClasses,
   });
   // Save User in the database
   user
      .save(user)
      .then(data => {
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the User."
         });
      });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
   const firstName = req.query.firstName;
   var condition = firstName ? { firstName: { $regex: new RegExp(firstName), $options: "i" } } : {};
   UserModel.find(condition)
      .then(data => {
         res.send(data);
      })
      .catch(err => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving tutorials."
         });
      });
};


// Find a single User with an id
exports.findOne = (req, res) => {
   const id = req.params.id;
   UserModel.findById(id)
      .then(data => {
         if (!data)
            res.status(404).send({ message: "Not found User with id " + id });
         else res.send(data);
      })
      .catch(err => {
         res
            .status(500)
            .send({ message: "Error retrieving User with id=" + id });
      });
};


// Update a User by the id in the request
exports.update = (req, res) => {
   if (!req.body) {
      return res.status(400).send({
         message: "Data to update cannot be empty!"
      });
   }
   const id = req.params.id;
   UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
         if (!data) {
            res.status(404).send({
               message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
         } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
         res.status(500).send({
            message: "Error updating User with id=" + id
         });
      });
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
   const id = req.params.id;
   UserModel.findByIdAndRemove(id)
      .then(data => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
         } else {
            res.send({
               message: "User was deleted successfully!"
            });
         }
      })
      .catch(err => {
         res.status(500).send({
            message: "Could not delete User with id=" + id
         });
      });
};


// Delete all Users from the database.
exports.deleteAll = (req, res) => {
   Tutorial.deleteMany({})
      .then(data => {
         res.send({
            message: `${data.deletedCount} Users were deleted successfully!`
         });
      })
      .catch(err => {
         res.status(500).send({
            message:
               err.message || "Some error occurred while removing all users."
         });
      });
};