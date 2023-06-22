const DashboardService = require("../services/dashboard");

const CountDocument = async (req, res, next) => {
    const {} = req.body;
  
    const { status, status_code, message, data } =
      await DashboardService.Count({});
  
    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
  };

  module.exports = {
    CountDocument
  }
  