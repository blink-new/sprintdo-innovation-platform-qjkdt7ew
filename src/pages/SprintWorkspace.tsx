import React from 'react'
import Sidebar from '@/components/layout/Sidebar'

export default function SprintWorkspace() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900">Sprint Workspace</h1>
          <p className="text-gray-600 mt-2">Collaborative innovation workspace coming soon...</p>
        </div>
      </main>
    </div>
  )
}