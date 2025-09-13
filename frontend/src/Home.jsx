import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "./main";
import Loader from "./Loader";

export default function TransactionsApp() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/transaction/`);
      setLoading(false);
      setTransactions(data.transactions);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  function formatAmt(amount) {
    if (amount > 0) return `+₹${amount}`;
    return `-₹${Math.abs(amount)}`;
  }

  useEffect(() => {
    fetchTransactions();
  }, []);
  return loading ? (
    <div className="min-h-screen flex items-center justify-center">

    <Loader />
    </div>
  ) : (
    <div className="max-w-2xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link
          to="/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Add
        </Link>
      </div>
      <ul className="space-y-3">
        {transactions.length === 0 && (
          <p className="text-gray-500">No transactions yet.</p>
        )}
        {transactions.map((t) => (
          <li
            key={t._id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm text-gray-500">
                {t.category} • {t.date}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`font-bold ${
                  t.amount >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {formatAmt(t.amount)}
              </span>
              <Link
                to={`/${t._id}/edit`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                to={`/${t._id}/delete`}
                className="text-red-600 hover:underline"
              >
                Delete
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
