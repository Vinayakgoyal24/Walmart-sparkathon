const express = require("express");
const router = express.Router();
const StoreLayoutController = require("../Controllers/StoreLayout");
router.get("/api/store-layouts/:storeId", async (req, res) => {
  const storeId = req.params.storeId;
  const controller = new StoreLayoutController();

  try {
    const layout = await controller.read(storeId);
    res.json(layout);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
