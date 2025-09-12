const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

const singleTransaction = asyncHandler(async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }
    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }
    const transaction = await Transaction.create({ title, amount, category, date });
    res.status(201).json({
      success: true,
      transaction,
      message: "Your transaction has been registered.",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400);
      throw new Error("Validation Error");
    } else {
      throw err;
    }
  }
});

const updateTransaction = asyncHandler(async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }
    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      success: true,
      transaction,
      message: "Your transaction has been updated.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400);
      throw new Error("Invalid division ID");
    } else if (err.name === "ValidationError") {
      res.status(400);
      throw new Error("Validation Error");
    } else {
      throw err;
    }
  }
});

const deleteTransaction = asyncHandler(async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Your transaction has been deleted.",
    });
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400);
      throw new Error("Invalid division ID");
    } else {
      throw err;
    }
  }
});

module.exports = {
  getAllTransactions,
  singleTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
