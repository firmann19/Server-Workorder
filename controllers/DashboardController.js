const { CountAll } = require("../services/dashboard");

const count = async (req, res, next) => {
  try {
    const result = await CountAll(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  count,
};
