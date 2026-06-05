import { createContext, useState, type ReactNode } from 'react'

export interface AppContextValue {
  currency: 'USD' | 'VND'
  setCurrency: (c: 'USD' | 'VND') => void
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  currencySymbol: string
  total: number
}

export const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children, total }: { children: ReactNode; total: number }) {
  const [currency, setCurrency] = useState<'USD' | 'VND'>('USD')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const currencySymbol = currency === 'USD' ? '$' : '₫'

  return (
    <AppContext.Provider value={{ currency, setCurrency, theme, setTheme, currencySymbol, total }}>
      {children}
    </AppContext.Provider>
  )
}
