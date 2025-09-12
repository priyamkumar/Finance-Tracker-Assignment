import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "./main";

export default function TransactionForm({ initialData }) {
  const [form, setForm] = useState(
    initialData || { title: "", amount: "", date: "", category: "" }
  );
  console.log(form)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post(`${server}/api/transaction/create`, form);
        console.log(data);
    } catch(err) {
        console.log(err);
    }
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto my-50 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Edit Transaction" : "Add Transaction"}
      </h2>
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
