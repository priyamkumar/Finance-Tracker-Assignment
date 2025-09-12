import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "./main";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

export default function TransactionForm({ initialData }) {
  const [form, setForm] = useState(
    initialData || { title: "", amount: "", date: "", category: "" }
  );
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      try {
        const { data } = await axios.put(
          `${server}/api/transaction/${initialData._id}`,
          form
        );
        toast.success("Transaction updated successfully.");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${server}/api/transaction/create`,
          form
        );
        toast.success("Transaction recorded successfully.");
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto my-50 bg-white p-6 rounded-2xl shadow-md">
      <div className="flex gap-5 items-center mb-5">
        <ArrowLeft
          className="cursor-pointer hover:text-gray-500"
          onClick={() => navigate("/")}
        />
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Transaction" : "Add Transaction"}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount (+/-)"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}
