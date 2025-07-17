import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  Zap, 
  BarChart3, 
  Users, 
  Settings, 
  Lightbulb,
  Target,
  Rocket,
  TestTube,
  CheckCircle,
  Play
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const phases = [
  { name: 'Discovery', icon: Lightbulb, color: 'bg-purple-500', progress: 100 },
  { name: 'Challenge', icon: Target, color: 'bg-blue-500', progress: 85 },
  { name: 'Ideation', icon: Zap, color: 'bg-yellow-500', progress: 60 },
  { name: 'Prototype', icon: Rocket, color: 'bg-green-500', progress: 30 },
  { name: 'Test', icon: TestTube, color: 'bg-orange-500', progress: 0 },
  { name: 'Implementation', icon: CheckCircle, color: 'bg-red-500', progress: 0 },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">Sprintdo</span>
        </div>
      </div>

      {/* Current Sprint */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Current Sprint</h3>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Active
          </Badge>
        </div>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
          <h4 className="font-medium text-gray-900 mb-1">AI-Powered Mobile App</h4>
          <p className="text-sm text-gray-600 mb-2">Product Development Sprint</p>
          <div className="flex items-center space-x-2">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <Play className="w-3 h-3 mr-1" />
              Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Innovation Phases */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Innovation Journey</h3>
        <div className="space-y-2">
          {phases.map((phase, index) => (
            <div key={phase.name} className="flex items-center space-x-3">
              <div className={cn('w-6 h-6 rounded-full flex items-center justify-center', phase.color)}>
                <phase.icon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-900">{phase.name}</span>
                  <span className="text-xs text-gray-500">{phase.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div 
                    className={cn('h-1 rounded-full transition-all', phase.color)}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}