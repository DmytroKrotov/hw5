import { useState, createContext } from 'react'
import Show from './Show'
import './App.css'

export const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  console.log(theme);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Show />
      </ThemeContext.Provider>
      <button onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}>
        Change theme
      </button>
    </>
  )
}

export default App
