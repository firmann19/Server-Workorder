const { Checkout } = require("../models");

module.exports = {
  CountAll: async (req, res) => {
    const WorkOrder = await Checkout.count();

    return WorkOrder;
  },
};
