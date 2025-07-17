import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Dashboard from '@/pages/Dashboard'
import SprintWorkspace from '@/pages/SprintWorkspace'
import SprintSetup from '@/pages/SprintSetup'
import Analytics from '@/pages/Analytics'
import TeamManagement from '@/pages/TeamManagement'
import Settings from '@/pages/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sprint/setup" element={<SprintSetup />} />
          <Route path="/sprint/:id" element={<SprintWorkspace />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/team" element={<TeamManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App