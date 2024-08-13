const express = require("express");
const freqRouter = express.Router();
const stackController = require("../Controllers/freq");

// Route to get all stacks
freqRouter.get("", stackController.getAllStacks);

module.exports = freqRouter;
