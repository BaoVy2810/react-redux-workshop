import { CATEGORIES } from "../constants";
import type { Expense } from "../types/expense";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: create a new expense and add it to the list
    const form = e.currentTarget;

    const expense: Expense = {
      id: crypto.randomUUID(),
      description: (form.elements.namedItem("description") as HTMLInputElement)
        .value,
      amount: Number(
        (form.elements.namedItem("amount") as HTMLInputElement).value,
      ),
      category: (form.elements.namedItem("category") as HTMLSelectElement)
        .value,
      date: new Date().toISOString().split("T")[0],
    };

    onAddExpense(expense);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>
      <label>
        Name
        <input name="description" placeholder="e.g. Lunch" required />
      </label>
      <label>
        Amount ($)
        <input
          name="amount"
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>
      <label>
        Category
        <select name="category" required>
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
