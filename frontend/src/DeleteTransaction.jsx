import axios from "axios";
import { server } from "./main";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "./Loader";

export default function DeleteTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleClick = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${server}/api/transaction/${id}`);
      setLoading(false);
      toast.success("Record deleted successfully.");
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  return loading ? (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4">Delete Transaction</h2>
      <p className="mb-4">Are you sure you want to delete?</p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer px-4 py-2 rounded-lg border"
        >
          Cancel
        </button>
        <button
          onClick={() => handleClick(id)}
          className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
