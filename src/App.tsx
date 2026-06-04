import { useEffect, useState } from "react";
import type { Expense } from "./types/expense";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // TODO: load expenses from localStorage on mount
  // TODO: save expenses to localStorage whenever the list changes
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");

    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  function handleAddExpense(expense: Omit<Expense, "id">) {
    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }]);
  }

  function handleDeleteExpense(id: string) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="app-layout">
      <aside>
        <h1>Expense Manager</h1>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </aside>
      <main>
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </main>
    </div>
  );
}

export default App;
