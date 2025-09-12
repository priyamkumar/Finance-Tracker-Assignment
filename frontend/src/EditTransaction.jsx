import React, { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import { server } from "./main";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditTransaction() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${server}/api/transaction/${id}`);
      setInitialData(data.transaction);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  if (!initialData) return null;

  return <TransactionForm initialData={initialData} />;
}
