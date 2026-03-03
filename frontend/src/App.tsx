import { useState } from 'react'
import { ThemeProvider } from "@/components/ThemeProvider"
// import AssessmentResults from './components/AssessmentResults'
// import './App.css'
import AppLayout from './layouts/AppLayout'
import Dashboard from './features/Dashboard'
import DashboardSkeleton from './components/DashboardSkeleton'
import Empty from './components/Empty'
import Error from './components/Error'

function App() {
  const [instanceId, setInstanceId] = useState('d1111111-1111-1111-1111-111111111111')

  return (
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    {/* <div className="app">
      <header className="app-header">
        <h1>Assessment Results System</h1>
        <p>Technical Interview Task</p>
      </header>

      <main className="app-main">
        <div className="instance-selector">
          <label htmlFor="instance-id">Assessment Instance ID:</label>
          <input
            id="instance-id"
            type="text"
            value={instanceId}
            onChange={(e) => setInstanceId(e.target.value)}
            placeholder="Enter instance ID"
          />
        </div>

        <AssessmentResults instanceId={instanceId} />
      </main>
      </div> */}
      <AppLayout/>
      </ThemeProvider>
  )
}

export default App
