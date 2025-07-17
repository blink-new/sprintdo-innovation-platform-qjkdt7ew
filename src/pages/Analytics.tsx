import React, { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Zap,
  Users,
  Target,
  Rocket,
  DollarSign,
  Leaf,
  Award,
  Globe,
  Shield,
  Lightbulb,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

const timeframeData = {
  '7d': {
    sprints: 3,
    engagement: 89,
    roi: 2.1,
    ideas: 47,
    trend: 'up'
  },
  '30d': {
    sprints: 12,
    engagement: 92,
    roi: 3.4,
    ideas: 234,
    trend: 'up'
  },
  '90d': {
    sprints: 35,
    engagement: 88,
    roi: 3.1,
    ideas: 678,
    trend: 'down'
  },
  '1y': {
    sprints: 147,
    engagement: 91,
    roi: 3.8,
    ideas: 2456,
    trend: 'up'
  }
}

const sprintCategories = [
  { name: 'Product Development', count: 45, percentage: 38, color: 'bg-blue-500' },
  { name: 'Service Design', count: 32, percentage: 27, color: 'bg-green-500' },
  { name: 'Business Model', count: 28, percentage: 24, color: 'bg-purple-500' },
  { name: 'MVP Development', count: 13, percentage: 11, color: 'bg-yellow-500' }
]

const verticalData = [
  { name: 'ICT', sprints: 34, roi: 4.2, success: 96 },
  { name: 'Healthcare', sprints: 28, roi: 3.8, success: 91 },
  { name: 'Energy', sprints: 22, roi: 3.1, success: 89 },
  { name: 'Retail', sprints: 18, roi: 2.9, success: 87 },
  { name: 'Finance', sprints: 15, roi: 4.1, success: 93 }
]

const modePerformance = [
  { mode: 'Hybrid', sprints: 67, avgDuration: 7.8, engagement: 94, success: 92 },
  { mode: 'Online', sprints: 45, avgDuration: 8.5, engagement: 89, success: 88 },
  { mode: 'IRL', sprints: 35, avgDuration: 9.2, engagement: 96, success: 95 }
]

const paceAnalysis = [
  { pace: 'Warp (4h)', sprints: 23, success: 78, engagement: 85, bestFor: 'Quick decisions' },
  { pace: '1D', sprints: 34, success: 89, engagement: 91, bestFor: 'Rapid prototyping' },
  { pace: '2D', sprints: 41, success: 94, engagement: 93, bestFor: 'Balanced approach' },
  { pace: '3D', sprints: 28, success: 92, engagement: 89, bestFor: 'Complex challenges' },
  { pace: '4D', sprints: 15, success: 87, engagement: 84, bestFor: 'Deep research' },
  { pace: 'Tinker (2-4wk)', sprints: 6, success: 83, engagement: 79, bestFor: 'Long-term innovation' }
]

const periodizationData = [
  { month: 'Jan', sprints: 8, engagement: 87, roi: 2.8, ideas: 156 },
  { month: 'Feb', sprints: 12, engagement: 91, roi: 3.2, ideas: 203 },
  { month: 'Mar', sprints: 15, engagement: 89, roi: 3.1, ideas: 234 },
  { month: 'Apr', sprints: 18, engagement: 94, roi: 3.6, ideas: 287 },
  { month: 'May', sprints: 22, engagement: 92, roi: 3.8, ideas: 312 },
  { month: 'Jun', sprints: 19, engagement: 88, roi: 3.4, ideas: 298 },
  { month: 'Jul', sprints: 16, engagement: 90, roi: 3.7, ideas: 276 }
]

const correlationInsights = [
  {
    title: 'Team Size vs Success Rate',
    correlation: 0.73,
    insight: '4-5 member teams show optimal performance',
    strength: 'Strong'
  },
  {
    title: 'Sprint Duration vs Engagement',
    correlation: -0.42,
    insight: 'Shorter sprints maintain higher engagement',
    strength: 'Moderate'
  },
  {
    title: 'Hybrid Mode vs ROI',
    correlation: 0.68,
    insight: 'Hybrid approach delivers superior ROI',
    strength: 'Strong'
  },
  {
    title: 'Ideation Phase vs Final Success',
    correlation: 0.81,
    insight: 'Quality ideation predicts sprint success',
    strength: 'Very Strong'
  }
]

const iprData = [
  { type: 'Patents Filed', count: 12, status: 'Pending', value: '$2.4M' },
  { type: 'Trademarks', count: 8, status: 'Approved', value: '$450K' },
  { type: 'Trade Secrets', count: 23, status: 'Protected', value: '$1.8M' },
  { type: 'Copyrights', count: 15, status: 'Registered', value: '$320K' }
]

const newProductsData = [
  { 
    name: 'EcoSmart Packaging', 
    launch: '2024-Q2', 
    revenue: '$1.2M', 
    marketShare: '3.2%', 
    units: '45K',
    category: 'Sustainability'
  },
  { 
    name: 'AI Customer Assistant', 
    launch: '2024-Q1', 
    revenue: '$890K', 
    marketShare: '1.8%', 
    units: '12K',
    category: 'AI/ML'
  },
  { 
    name: 'Mobile Wellness App', 
    launch: '2024-Q3', 
    revenue: '$650K', 
    marketShare: '2.1%', 
    units: '78K',
    category: 'Healthcare'
  }
]

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  const currentData = timeframeData[selectedTimeframe as keyof typeof timeframeData]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
              <p className="text-gray-600 mt-1">Deep insights into innovation performance and patterns</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="periodization">Trends</TabsTrigger>
              <TabsTrigger value="correlations">Insights</TabsTrigger>
              <TabsTrigger value="ipr">IP & Products</TabsTrigger>
              <TabsTrigger value="sustainability">ESG</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Sprint Execution</p>
                        <p className="text-3xl font-bold text-gray-900">{currentData.sprints}</p>
                        <div className="flex items-center mt-1">
                          {currentData.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                          )}
                          <span className={`text-xs ${currentData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {currentData.trend === 'up' ? '+12%' : '-5%'}
                          </span>
                        </div>
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
                        <p className="text-sm font-medium text-gray-600">Team Engagement</p>
                        <p className="text-3xl font-bold text-gray-900">{currentData.engagement}%</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">+3%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">ROI Multiplier</p>
                        <p className="text-3xl font-bold text-gray-900">{currentData.roi}x</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">+0.3x</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ideas Generated</p>
                        <p className="text-3xl font-bold text-gray-900">{currentData.ideas}</p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">+18%</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sprint Categories Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                      Sprint Categories
                    </CardTitle>
                    <CardDescription>Distribution by innovation type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sprintCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${category.color}`} />
                            <span className="font-medium text-gray-900">{category.name}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{category.percentage}%</span>
                            <span className="font-bold text-gray-900">{category.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-green-600" />
                      Vertical Performance
                    </CardTitle>
                    <CardDescription>Success metrics by industry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {verticalData.map((vertical, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{vertical.name}</div>
                            <div className="text-sm text-gray-600">{vertical.sprints} sprints</div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900">{vertical.roi}x</div>
                              <div className="text-xs text-gray-600">ROI</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-bold text-gray-900">{vertical.success}%</div>
                              <div className="text-xs text-gray-600">Success</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Mode Performance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                    Sprint Mode Performance
                  </CardTitle>
                  <CardDescription>Comparative analysis across delivery modes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {modePerformance.map((mode, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-lg text-gray-900">{mode.mode}</h3>
                          <p className="text-sm text-gray-600">{mode.sprints} sprints completed</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Avg Duration</span>
                            <span className="font-medium">{mode.avgDuration}d</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Engagement</span>
                            <span className="font-medium">{mode.engagement}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Success Rate</span>
                            <span className="font-medium">{mode.success}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pace Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    Sprint Pace Optimization
                  </CardTitle>
                  <CardDescription>Performance metrics by sprint duration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paceAnalysis.map((pace, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{pace.pace}</h4>
                            <Badge variant="outline">{pace.bestFor}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{pace.sprints} sprints completed</p>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{pace.success}%</div>
                            <div className="text-xs text-gray-600">Success</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{pace.engagement}%</div>
                            <div className="text-xs text-gray-600">Engagement</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="periodization" className="space-y-6">
              {/* Periodization Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="w-5 h-5 mr-2 text-blue-600" />
                    Performance Trends Over Time
                  </CardTitle>
                  <CardDescription>Monthly tracking of key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Monthly Data Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Month</th>
                            <th className="text-center p-2">Sprints</th>
                            <th className="text-center p-2">Engagement</th>
                            <th className="text-center p-2">ROI</th>
                            <th className="text-center p-2">Ideas</th>
                            <th className="text-center p-2">Trend</th>
                          </tr>
                        </thead>
                        <tbody>
                          {periodizationData.map((data, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-medium">{data.month}</td>
                              <td className="p-2 text-center">{data.sprints}</td>
                              <td className="p-2 text-center">{data.engagement}%</td>
                              <td className="p-2 text-center">{data.roi}x</td>
                              <td className="p-2 text-center">{data.ideas}</td>
                              <td className="p-2 text-center">
                                {index > 0 && periodizationData[index].sprints > periodizationData[index - 1].sprints ? (
                                  <TrendingUp className="w-4 h-4 text-green-600 mx-auto" />
                                ) : index > 0 ? (
                                  <TrendingDown className="w-4 h-4 text-red-600 mx-auto" />
                                ) : (
                                  <div className="w-4 h-4 mx-auto" />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Peak Performance Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-900">May</div>
                          <div className="text-sm text-green-700">Peak Sprint Month</div>
                          <div className="text-xs text-green-600 mt-1">22 sprints completed</div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-900">Apr</div>
                          <div className="text-sm text-blue-700">Peak Engagement</div>
                          <div className="text-xs text-blue-600 mt-1">94% team engagement</div>
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-900">May</div>
                          <div className="text-sm text-purple-700">Peak ROI</div>
                          <div className="text-xs text-purple-600 mt-1">3.8x return multiplier</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="correlations" className="space-y-6">
              {/* Correlation Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-600" />
                    Pattern Analysis & Correlations
                  </CardTitle>
                  <CardDescription>Statistical insights into performance drivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {correlationInsights.map((insight, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <Badge variant={
                            insight.strength === 'Very Strong' ? 'default' :
                            insight.strength === 'Strong' ? 'secondary' : 'outline'
                          }>
                            {insight.strength}
                          </Badge>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Correlation</span>
                            <span className="font-bold">{insight.correlation}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full" 
                              style={{ width: `${Math.abs(insight.correlation) * 100}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{insight.insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Deviation Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                    Performance Deviations
                  </CardTitle>
                  <CardDescription>Anomalies and outliers in sprint performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Engagement Drop in June</h4>
                          <p className="text-sm text-yellow-700">Team engagement dropped to 88% (4% below average). Likely due to summer vacation period.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">ROI Spike in May</h4>
                          <p className="text-sm text-green-700">ROI reached 3.8x (18% above average). Driven by successful product launches from Q1 sprints.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ipr" className="space-y-6">
              {/* Intellectual Property Rights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-600" />
                    Intellectual Property Portfolio
                  </CardTitle>
                  <CardDescription>Patents, trademarks, and IP value creation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {iprData.map((ipr, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{ipr.type}</h4>
                          <Badge variant={ipr.status === 'Approved' ? 'default' : 'secondary'}>
                            {ipr.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Count</span>
                            <span className="font-bold text-2xl text-gray-900">{ipr.count}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Est. Value</span>
                            <span className="font-medium text-gray-900">{ipr.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* New Products & Launches */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Rocket className="w-5 h-5 mr-2 text-purple-600" />
                    Product Launches & Market Performance
                  </CardTitle>
                  <CardDescription>Commercial outcomes from innovation sprints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newProductsData.map((product, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category} • Launched {product.launch}</p>
                          </div>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{product.revenue}</div>
                            <div className="text-xs text-gray-600">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{product.marketShare}</div>
                            <div className="text-xs text-gray-600">Market Share</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">{product.units}</div>
                            <div className="text-xs text-gray-600">Units Sold</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">+23%</div>
                            <div className="text-xs text-gray-600">Growth</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sustainability" className="space-y-6">
              {/* ESG & Sustainability Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-green-600" />
                    Environmental, Social & Governance Impact
                  </CardTitle>
                  <CardDescription>Sustainability outcomes from innovation initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-3xl font-bold text-green-900">145</div>
                      <div className="text-sm text-green-700">Tons CO₂ Saved</div>
                      <div className="text-xs text-green-600 mt-1">+23% vs last quarter</div>
                    </div>
                    <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-3xl font-bold text-blue-900">9/17</div>
                      <div className="text-sm text-blue-700">SDG Alignment</div>
                      <div className="text-xs text-blue-600 mt-1">UN Sustainable Development Goals</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-3xl font-bold text-purple-900">82</div>
                      <div className="text-sm text-purple-700">ESG Score</div>
                      <div className="text-xs text-purple-600 mt-1">Industry top 15%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sustainability Initiatives */}
              <Card>
                <CardHeader>
                  <CardTitle>Green Innovation Initiatives</CardTitle>
                  <CardDescription>Environmental impact of recent sprints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">Circular Economy Solutions</h4>
                      <p className="text-sm text-green-700 mb-3">3 sprints focused on waste reduction and material reuse</p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-green-900">67%</div>
                          <div className="text-xs text-green-600">Waste Reduction</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-900">$340K</div>
                          <div className="text-xs text-green-600">Cost Savings</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-900">89t</div>
                          <div className="text-xs text-green-600">CO₂ Avoided</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Renewable Energy Integration</h4>
                      <p className="text-sm text-blue-700 mb-3">2 sprints developing clean energy solutions</p>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-900">45%</div>
                          <div className="text-xs text-blue-600">Energy Efficiency</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-900">$180K</div>
                          <div className="text-xs text-blue-600">Annual Savings</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-900">56t</div>
                          <div className="text-xs text-blue-600">CO₂ Reduced</div>
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