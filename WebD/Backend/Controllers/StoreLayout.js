const StoreLayout = require("../Models/StoreLayout");

class StoreLayoutController {
  async read(storeId) {
    try {
      const layout = await StoreLayout.findOne({ storeId });
      if (layout) {
        return layout;
      } else {
        throw new Error("Layout not found");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = StoreLayoutController;
