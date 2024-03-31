const asyncHandler = require("express-async-handler");

const LifePathNumbers = require("../models/LifePathNumbersModel");

const get_Your_Life_Path_Number_Evaluation = asyncHandler(async (req, res) => {
  const { date } = req.body;

  const givenDate = new Date(date);
  try {
    if (givenDate.toString().toLowerCase() === "invalid date") {
      throw new Error("Date is not valid!");
    }

    const pathNumber = calculateLiftPathNumber(givenDate);
    LifePathNumbers.findOne({ lifePathNumber: pathNumber })
      .then((data) =>
        res.status(200).json({
          lifePathNumber: data.lifePathNumber,
          description: data.description,
        })
      )
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  get_Your_Life_Path_Number_Evaluation,
};

//helper functions
const checkIfMasterNumbers = (number) => {
  return number === 11 || number === 22 || number === 33 ? true : false;
};

const getTotal = (arg1) => {
  let sum = arg1;
  if (checkIfMasterNumbers(arg1)) {
    return arg1;
  }

  while (sum > 9) {
    let tempSum = 0;
    while (sum > 0) {
      tempSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = tempSum;
    if (checkIfMasterNumbers(sum)) break;
  }
  return sum;
};

const calculateLiftPathNumber = (arg1) => {
  const fullDate = new Date(arg1);
  const year = getTotal(fullDate.getFullYear());
  const month = getTotal(fullDate.getMonth() + 1);
  const date = getTotal(fullDate.getDate());

  return getTotal(year + month + date);
};
