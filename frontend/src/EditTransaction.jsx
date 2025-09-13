import React, { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import { server } from "./main";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function EditTransaction() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/transaction/${id}`);
      setLoading(false);
      setInitialData(data.transaction);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!initialData) return null;
  return <TransactionForm initialData={initialData} />;
}
