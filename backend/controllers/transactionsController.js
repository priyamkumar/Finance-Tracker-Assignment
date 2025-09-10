const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      transactions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

const createTransaction = asyncHandler(async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Please fill all the fields.",
      });
    }
    const transaction = await Transaction.create({ title, amount, category });
    res.status(201).json({
      success: true,
      transaction,
      message: "Your transaction has been registered.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
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
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

const deleteTransaction = asyncHandler(async (req, res) => {});

module.exports = {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
