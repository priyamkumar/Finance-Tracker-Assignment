import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error.jsx";
import Home from "./Home.jsx";
import TransactionForm from "./TransactionForm.jsx";
import DeleteTransaction from "./DeleteTransaction.jsx";
import EditTransaction from "./EditTransaction.jsx";

export const server = import.meta.env.VITE_SERVER;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/add",
        element: <TransactionForm/>,
      },
      {
        path: "/:id/edit",
        element: <EditTransaction />,
      },
      {
        path: "/:id/delete",
        element: <DeleteTransaction />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
);
