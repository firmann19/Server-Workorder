const { Checkout } = require("../models");

class DashboardService {
  static async Count() {
    try {
      const WorkOrder = await Checkout.count();

      return {
        status: true,
        status_code: 200,
        message: "Count successfully",
        data: {
          WorkOrder: WorkOrder,
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          WorkOrder: null,
        },
      };
    }
  }
}

module.exports = DashboardService
