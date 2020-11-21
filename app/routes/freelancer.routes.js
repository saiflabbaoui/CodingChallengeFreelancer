// Bring in the express server
const express = require("express");

// Bring in the Express Router
const router = express.Router();

// Import the Controller
const freelancerController = require("../controllers/freelancer.controller");

// Create a new Note
router.post("/", freelancerController.create);

// Get all Notes
router.get("/", freelancerController.findAll);

// Get Note by Id
router.get("/:id", freelancerController.findById);

// Modify existing Note
router.put("/:id", freelancerController.update);

// // Delete Note by Id
// router.delete("/:id", freelancerController.delete);

module.exports = router;