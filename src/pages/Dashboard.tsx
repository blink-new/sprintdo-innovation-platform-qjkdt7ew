import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Clock, 
  Users, 
  TrendingUp, 
  Zap, 
  Brain,
  Target,
  Rocket,
  Award,
  Calendar,
  MessageSquare,
  BarChart3,
  Activity,
  Gauge,
  Radar,
  PieChart,
  LineChart,
  Trophy,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Leaf,
  DollarSign,
  Star,
  FileText,
  Shield,
  Globe
} from 'lucide-react'

const recentSprints = [
  {
    id: 1,
    title: 'AI-Powered Mobile App',
    category: 'Product Development',
    progress: 65,
    phase: 'Ideation',
    team: ['JD', 'SM', 'AL', 'MK'],
    daysLeft: 3,
    status: 'active',
    mode: 'Hybrid',
    pace: '3D',
    vertical: 'ICT'
  },
  {
    id: 2,
    title: 'Customer Experience Redesign',
    category: 'Service Design',
    progress: 90,
    phase: 'Test',
    team: ['EM', 'RJ', 'TL'],
    daysLeft: 1,
    status: 'active',
    mode: 'Online',
    pace: 'Warp',
    vertical: 'Retail'
  },
  {
    id: 3,
    title: 'Sustainability Initiative',
    category: 'Business Model',
    progress: 100,
    phase: 'Implementation',
    team: ['KP', 'DN', 'FG', 'HS'],
    daysLeft: 0,
    status: 'completed',
    mode: 'IRL',
    pace: '2D',
    vertical: 'Energy'
  }
]

const kpiData = {
  execution: {
    speed: 87, // 0-100
    sprintCount: 47,
    avgDuration: 8.2,
    completionRate: 94
  },
  engagement: {
    pulse: 92, // 0-100
    inputs: 1247,
    votes: 892,
    collabPoints: 3456
  },
  roi: {
    score: 78, // 0-100
    ideaCost: 12500,
    mvpConversion: 67,
    roiMultiplier: 3.4
  },
  innovation: {
    ideaCount: 234,
    topRatedIdeas: 18,
    okrAlignment: 85,
    techReadiness: 7.2
  },
  sustainability: {
    esgScore: 82,
    co2Saved: 145,
    sdgAlignment: 9
  }
}

const successRanks = [
  { rank: 'Grand Slam', count: 8, color: 'bg-yellow-500' },
  { rank: 'Gold', count: 15, color: 'bg-yellow-400' },
  { rank: 'Silver', count: 12, color: 'bg-gray-400' },
  { rank: 'Bronze', count: 9, color: 'bg-orange-400' },
  { rank: 'Iron', count: 3, color: 'bg-gray-600' }
]

const tangiblesData = [
  {
    category: 'Lessons Learned',
    count: 156,
    icon: Lightbulb,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    category: 'Failed Sprint Insights',
    count: 23,
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    category: 'Success Factors',
    count: 89,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    category: 'Patents Filed',
    count: 12,
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  }
]

const SpeedometerGauge = ({ value, title, max = 100 }: { value: number; title: string; max?: number }) => {
  const percentage = (value / max) * 100
  const rotation = (percentage / 100) * 180 - 90
  
  return (
    <div className="relative w-32 h-20 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 60">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="#6366f1"
          strokeWidth="8"
          fill="none"
          strokeDasharray={`${percentage * 1.26} 126`}
          className="transition-all duration-1000"
        />
      </svg>
      <div 
        className="absolute top-8 left-1/2 w-0.5 h-6 bg-gray-800 origin-bottom transition-transform duration-1000"
        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
      />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-600 text-center">{title}</div>
      </div>
    </div>
  )
}

const PulseChart = ({ value, title }: { value: number; title: string }) => {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse" />
      <div className="absolute inset-2 rounded-full border-4 border-green-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute inset-4 rounded-full bg-green-500 flex items-center justify-center">
        <Activity className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xl font-bold text-gray-900">{value}%</div>
        <div className="text-xs text-gray-600">{title}</div>
      </div>
    </div>
  )
}

const RadarChart = ({ data, title }: { data: any; title: string }) => {
  const metrics = [
    { label: 'Speed', value: data.execution.speed },
    { label: 'Engagement', value: data.engagement.pulse },
    { label: 'ROI', value: data.roi.score },
    { label: 'Innovation', value: data.innovation.okrAlignment },
    { label: 'ESG', value: data.sustainability.esgScore }
  ]
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((radius) => (
          <circle
            key={radius}
            cx="50"
            cy="50"
            r={radius / 2.5}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Grid lines */}
        {metrics.map((_, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180)
          const x = 50 + 40 * Math.cos(angle)
          const y = 50 + 40 * Math.sin(angle)
          return (
            <line
              key={index}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          )
        })}
        
        {/* Data polygon */}
        <polygon
          points={metrics.map((metric, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180)
            const radius = (metric.value / 100) * 40
            const x = 50 + radius * Math.cos(angle)
            const y = 50 + radius * Math.sin(angle)
            return `${x},${y}`
          }).join(' ')}
          fill="rgba(99, 102, 241, 0.2)"
          stroke="#6366f1"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {metrics.map((metric, index) => {
          const angle = (index * 72 - 90) * (Math.PI / 180)
          const radius = (metric.value / 100) * 40
          const x = 50 + radius * Math.cos(angle)
          const y = 50 + radius * Math.sin(angle)
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="#6366f1"
            />
          )
        })}
      </svg>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-gray-600">{title}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Innovation Command Center</h1>
              <p className="text-gray-600 mt-1">Real-time sprint telemetry and performance analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Sprint
              </Button>
              <Link to="/sprint/setup">
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Sprint
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="discovery">Discovery</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* HUD-Style Central Display */}
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-900">
                    <Gauge className="w-5 h-5 mr-2" />
                    Mission Control HUD
                  </CardTitle>
                  <CardDescription>Real-time performance metrics and team pulse</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <SpeedometerGauge value={kpiData.execution.speed} title="Execution Speed" />
                    </div>
                    <div className="text-center">
                      <PulseChart value={kpiData.engagement.pulse} title="Team Pulse" />
                    </div>
                    <div className="text-center">
                      <RadarChart data={kpiData} title="Performance Radar" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sprint Execution Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Sprints</p>
                        <p className="text-3xl font-bold text-gray-900">{kpiData.execution.sprintCount}</p>
                        <p className="text-xs text-green-600 mt-1">+12% this month</p>
                      </div>
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                        <p className="text-3xl font-bold text-gray-900">{kpiData.execution.avgDuration}d</p>
                        <p className="text-xs text-green-600 mt-1">-0.8d faster</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Success Rate</p>
                        <p className="text-3xl font-bold text-gray-900">{kpiData.execution.completionRate}%</p>
                        <p className="text-xs text-green-600 mt-1">+2% improvement</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">ROI Multiplier</p>
                        <p className="text-3xl font-bold text-gray-900">{kpiData.roi.roiMultiplier}x</p>
                        <p className="text-xs text-green-600 mt-1">+0.4x growth</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Success Ranks & Tangibles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                      Success Rankings
                    </CardTitle>
                    <CardDescription>Sprint performance distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {successRanks.map((rank, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${rank.color}`} />
                            <span className="font-medium text-gray-900">{rank.rank}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">{rank.count}</span>
                            <span className="text-sm text-gray-600">sprints</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-600" />
                      Knowledge Catalog
                    </CardTitle>
                    <CardDescription>Tangibles & intangibles captured</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {tangiblesData.map((item, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{item.count}</div>
                          <div className="text-xs text-gray-600">{item.category}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Sprints with Enhanced Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Sprint Portfolio</CardTitle>
                  <CardDescription>Real-time sprint telemetry and progress tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSprints.map((sprint) => (
                      <div key={sprint.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{sprint.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant={sprint.status === 'active' ? 'default' : 'secondary'}>
                                {sprint.status}
                              </Badge>
                              <Badge variant="outline">{sprint.mode}</Badge>
                              <Badge variant="outline">{sprint.pace}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-gray-600">
                              {sprint.category} • {sprint.phase} Phase • {sprint.vertical}
                            </p>
                            <div className="flex items-center space-x-2">
                              <div className="flex -space-x-2">
                                {sprint.team.map((member, index) => (
                                  <Avatar key={index} className="w-6 h-6 border-2 border-white">
                                    <AvatarFallback className="text-xs">{member}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">{sprint.team.length} members</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Progress value={sprint.progress} className="w-24" />
                                <span className="text-sm font-medium text-gray-900">{sprint.progress}%</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {sprint.daysLeft > 0 ? `${sprint.daysLeft} days left` : 'Completed'}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Innovation KPIs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                      Idea Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Ideas</span>
                        <span className="font-bold">{kpiData.innovation.ideaCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Top-Rated</span>
                        <span className="font-bold">{kpiData.innovation.topRatedIdeas}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">OKR Alignment</span>
                        <span className="font-bold">{kpiData.innovation.okrAlignment}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tech Readiness</span>
                        <span className="font-bold">{kpiData.innovation.techReadiness}/10</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      Team Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Inputs</span>
                        <span className="font-bold">{kpiData.engagement.inputs.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Votes Cast</span>
                        <span className="font-bold">{kpiData.engagement.votes.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Collab Points</span>
                        <span className="font-bold">{kpiData.engagement.collabPoints.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Engagement Score</span>
                        <span className="font-bold">{kpiData.engagement.pulse}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-green-600" />
                      Sustainability Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">ESG Score</span>
                        <span className="font-bold">{kpiData.sustainability.esgScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">CO₂ Saved (tons)</span>
                        <span className="font-bold">{kpiData.sustainability.co2Saved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">SDG Alignment</span>
                        <span className="font-bold">{kpiData.sustainability.sdgAlignment}/17</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Green Innovations</span>
                        <span className="font-bold">23</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ROI & Financial Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Financial Performance & ROI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">${kpiData.roi.ideaCost.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Avg Idea Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{kpiData.roi.mvpConversion}%</div>
                      <div className="text-sm text-gray-600">MVP Conversion</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{kpiData.roi.roiMultiplier}x</div>
                      <div className="text-sm text-gray-600">ROI Multiplier</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">$2.4M</div>
                      <div className="text-sm text-gray-600">Total Value Created</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                    AI-Powered Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Performance Patterns</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start space-x-2">
                            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-green-900">Peak Performance Window</p>
                              <p className="text-sm text-green-700">Teams perform 34% better during 2-3 day sprints vs longer cycles</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-2">
                            <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-blue-900">Optimal Team Size</p>
                              <p className="text-sm text-blue-700">4-5 member teams show highest engagement and idea quality scores</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Recommendations</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-yellow-900">Ideation Boost</p>
                              <p className="text-sm text-yellow-700">Schedule ideation sessions on Tuesdays for 23% more creative output</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="flex items-start space-x-2">
                            <Rocket className="w-5 h-5 text-purple-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-purple-900">Prototype Acceleration</p>
                              <p className="text-sm text-purple-700">Consider hybrid mode for prototyping phase to reduce time by 1.2 days</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discovery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-600" />
                    Challenge Discovery Hub
                  </CardTitle>
                  <CardDescription>Pre-sprint challenge identification and contextual analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Challenge Brief Generator</h3>
                      <div className="space-y-4">
                        <Button className="w-full justify-start" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Generate New Challenge Brief
                        </Button>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Recent Challenge Briefs</h4>
                          <div className="space-y-2">
                            <div className="text-sm text-gray-600">• Sustainable Packaging Solutions (ICT)</div>
                            <div className="text-sm text-gray-600">• Customer Onboarding Experience (Fintech)</div>
                            <div className="text-sm text-gray-600">• Remote Team Collaboration (HR Tech)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">AI Contextual Analysis</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-start space-x-2">
                            <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
                            <div>
                              <p className="font-medium text-indigo-900">Complexity Assessment</p>
                              <p className="text-sm text-indigo-700">AI analyzes industry trends, market dynamics, and organizational context to estimate challenge complexity and resource requirements</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-white rounded-lg border">
                            <div className="text-2xl font-bold text-gray-900">7.2</div>
                            <div className="text-xs text-gray-600">Complexity Score</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg border">
                            <div className="text-2xl font-bold text-gray-900">12-15d</div>
                            <div className="text-xs text-gray-600">Est. Duration</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}