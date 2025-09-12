import React, { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import { server } from "./main";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditTransaction({ transactions, onEdit }) {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${server}/api/transaction/${id}`);
      console.log(data);
      setInitialData(data.transaction);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(initialData);

  useEffect(() => {
    fetchData(id);
  }, []);

  if (!initialData) return null;

  return (
    <TransactionForm
      initialData={initialData}
      onSubmit={(initialData) => onEdit(id, initialData)}
    />
  );
}
