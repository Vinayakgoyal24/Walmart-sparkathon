const mongoose = require("mongoose");

const layoutElementSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'shelf', 'checkout', 'aisle'
  position: { type: { x: Number, y: Number }, required: true }, // Coordinates
  size: { type: { width: Number, height: Number }, required: true }, // Dimensions
  // Add other relevant properties
});

const storeLayoutSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true },
  elements: [layoutElementSchema], // Array of layout elements
});

const StoreLayout = mongoose.model("StoreLayout", storeLayoutSchema);

module.exports = StoreLayout;
