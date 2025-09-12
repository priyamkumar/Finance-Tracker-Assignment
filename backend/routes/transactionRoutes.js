const express = require("express");
const {
  getAllTransactions,
  singleTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/", getAllTransactions);
router.post("/create", createTransaction);
router
  .route("/:id")
  .get(singleTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
