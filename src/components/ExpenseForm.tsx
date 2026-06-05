import { useReducer } from "react";
import { CATEGORIES } from "../constants";
import type { Expense } from "../types/expense";

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

const initialFormState = {
  description: "",
  amount: "",
  category: "",
};

type FormState = typeof initialFormState;

type Action =
  | {
      type: "SET_FIELD";
      field: keyof FormState;
      value: string;
    }
  | {
      type: "RESET";
    };

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET":
      return initialFormState;

    default:
      return state;
  }
}

function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const { description, amount, category } = state;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description || !amount || !category) return;

    onAddExpense({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().split("T")[0],
    });

    dispatch({ type: "RESET" });
  }

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h2>Add Expense</h2>

      <label>
        Name
        <input
          value={description}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "description",
              value: e.target.value,
            })
          }
          placeholder="e.g. Lunch"
          required
        />
      </label>

      <label>
        Amount ($)
        <input
          value={amount}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "amount",
              value: e.target.value,
            })
          }
          type="number"
          placeholder="0.00"
          min={0}
          step="0.01"
          required
        />
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "category",
              value: e.target.value,
            })
          }
          required
        >
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
