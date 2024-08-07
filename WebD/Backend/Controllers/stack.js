const Stack = require("../Models/stack");

// Get all stacks
exports.getAllStacks = async (req, res) => {
  try {
    const stacks = await Stack.find();
    res.json(stacks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stacks" });
  }
};

// Get a stack by its number
exports.getStackByNumber = async (req, res) => {
  try {
    const stack = await Stack.findOne({ stackNumber: req.params.stackNumber });
    if (!stack) {
      return res.status(404).json({ error: "Stack not found" });
    }
    res.json(stack);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the stack" });
  }
};

// Update a stack by its number
exports.updateStackByNumber = async (req, res) => {
  try {
    const { stackNumber } = req.params;
    const { items } = req.body;

    const stack = await Stack.findOneAndUpdate(
      { stackNumber },
      { items },
      { new: true, upsert: true }
    );

    res.json(stack);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the stack" });
  }
};
