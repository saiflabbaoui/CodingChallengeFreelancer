// Bring in the express server
const express = require("express");

// Bring in the Express Router
const router = express.Router();

// Import the Controller
const projectController = require("../controllers/project.controller");

// Create a new Note
router.post("/", projectController.create);

// Get all Notes
router.get("/", projectController.findAll);

// Get Note by Id
router.get("/:id", projectController.findById);

// Modify existing Note
router.put("/:id", projectController.update);

// Delete Note by Id
router.delete("/:id", projectController.delete);

module.exports = router;