const express = require("express");
const { getAllTransactions, createTransaction, updateTransaction, deleteTransaction } = require("../controllers/transactionsController");

const router = express.Router();

router.get("/", getAllTransactions);
router.post("/create", createTransaction);
router.put("/update", updateTransaction);
router.delete("/delete", deleteTransaction);

module.exports = router;