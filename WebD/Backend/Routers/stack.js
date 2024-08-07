const express = require("express");
const router = express.Router();
const stackController = require("../Controllers/stack");

// GET all stacks
router.get("/", stackController.getAllStacks);

// GET a specific stack by number
router.get("/:stackNumber", stackController.getStackByNumber);

// PUT update a specific stack by number
router.put("/:stackNumber", stackController.updateStackByNumber);

module.exports = router;
