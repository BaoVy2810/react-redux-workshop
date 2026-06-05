import { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import type { Expense } from './types/expense'
import { STORAGE_KEY } from './constants'
import { filterExpenses } from './utils/filterExpenses'
import { AppProvider, AppContext } from './context/AppContext'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SearchBar from './components/SearchBar'
import AppHeader from './components/AppHeader'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Expense[]) : []
  })

  const [query, setQuery] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, query),
    [expenses, query],
  )

  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    [filteredExpenses],
  )

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id))
  }, [])

  function handleAddExpense(expense: Omit<Expense, 'id'>) {
    setExpenses(prev => [
      ...prev,
      { ...expense, id: crypto.randomUUID() },
    ])
  }

  return (
    <AppProvider total={total}>
      <AppBody
        query={query}
        onQueryChange={setQuery}
        filteredExpenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
        onAddExpense={handleAddExpense}
      />
    </AppProvider>
  )
}

interface AppBodyProps {
  query: string
  onQueryChange: (query: string) => void
  filteredExpenses: Expense[]
  onDeleteExpense: (id: string) => void
  onAddExpense: (expense: Omit<Expense, 'id'>) => void
}

function AppBody({ query, onQueryChange, filteredExpenses, onDeleteExpense, onAddExpense }: AppBodyProps) {
  const { theme } = useContext(AppContext)!

  return (
    <div className="app-layout" data-theme={theme}>
      <aside>
        <h1>Expense Manager</h1>
        <AppHeader />
        <ExpenseForm onAddExpense={onAddExpense} />
      </aside>
      <main>
        <SearchBar query={query} onQueryChange={onQueryChange} />
        <ExpenseList
          expenses={filteredExpenses}
          onDeleteExpense={onDeleteExpense}
        />
      </main>
    </div>
  )
}

export default App
