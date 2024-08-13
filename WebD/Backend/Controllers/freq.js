const mongoose = require("mongoose");

// Fetch all stacks
exports.getAllStacks = async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("csvSync");
    const stacks = await collection.find({}).toArray();
    res.status(200).json(stacks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stacks", error });
  }
};
