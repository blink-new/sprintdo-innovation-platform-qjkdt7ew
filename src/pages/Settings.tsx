import React, { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Zap,
  Clock,
  Users,
  Target,
  Briefcase,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SprintTemplate {
  id: string
  name: string
  description: string
  phases: string[]
  duration: string
  category: string
}

const sprintTemplates: SprintTemplate[] = [
  {
    id: '1',
    name: 'Product Innovation Sprint',
    description: 'Full 6-phase innovation journey for product development',
    phases: ['Discovery', 'Challenge', 'Ideation', 'Prototype', 'Test', 'Implementation'],
    duration: '2-4 weeks',
    category: 'Product Development'
  },
  {
    id: '2',
    name: 'MVP Validation Sprint',
    description: 'Rapid validation sprint for minimum viable products',
    phases: ['Challenge', 'Ideation', 'Prototype', 'Test'],
    duration: '1-2 weeks',
    category: 'MVP'
  },
  {
    id: '3',
    name: 'Business Model Sprint',
    description: 'Strategic sprint for business model innovation',
    phases: ['Discovery', 'Challenge', 'Ideation', 'Implementation'],
    duration: '1-3 weeks',
    category: 'Business Strategy'
  }
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // General Settings
    organizationName: 'Acme Innovation Labs',
    timezone: 'America/New_York',
    language: 'en',
    
    // Sprint Configuration
    defaultSprintMode: 'hybrid',
    defaultSprintPace: '2d',
    autoAssignFacilitator: true,
    requireApproval: false,
    
    // Notifications
    emailNotifications: true,
    slackIntegration: false,
    dailyDigest: true,
    sprintReminders: true,
    
    // AI & Automation
    aiCoaching: true,
    autoInsights: true,
    smartSuggestions: true,
    
    // Privacy & Security
    dataRetention: '12months',
    anonymizeData: false,
    twoFactorAuth: false
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Saving settings:', settings)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">Configure your Sprintdo platform preferences</p>
            </div>
            <Button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">
                <SettingsIcon className="w-4 h-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="sprint">
                <Target className="w-4 h-4 mr-2" />
                Sprint Config
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="ai">
                <Zap className="w-4 h-4 mr-2" />
                AI & Automation
              </TabsTrigger>
              <TabsTrigger value="security">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="advanced">
                <Briefcase className="w-4 h-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Settings</CardTitle>
                  <CardDescription>
                    Basic configuration for your organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input 
                        id="orgName"
                        value={settings.organizationName}
                        onChange={(e) => handleSettingChange('organizationName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                          <SelectItem value="Europe/Berlin">Berlin (CET)</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                      <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your workspace
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact Layout</Label>
                      <p className="text-sm text-gray-600">Use more compact spacing</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sprint Configuration */}
            <TabsContent value="sprint" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Sprint Settings</CardTitle>
                  <CardDescription>
                    Configure default settings for new sprints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="sprintMode">Default Sprint Mode</Label>
                      <Select value={settings.defaultSprintMode} onValueChange={(value) => handleSettingChange('defaultSprintMode', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="irl">In-Person (IRL)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sprintPace">Default Sprint Pace</Label>
                      <Select value={settings.defaultSprintPace} onValueChange={(value) => handleSettingChange('defaultSprintPace', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warp">Warp (4 hours)</SelectItem>
                          <SelectItem value="1d">1 Day</SelectItem>
                          <SelectItem value="2d">2 Days</SelectItem>
                          <SelectItem value="3d">3 Days</SelectItem>
                          <SelectItem value="4d">4 Days</SelectItem>
                          <SelectItem value="tinker">Tinker (2-4 weeks)</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-assign Facilitator</Label>
                        <p className="text-sm text-gray-600">Automatically assign a facilitator to new sprints</p>
                      </div>
                      <Switch 
                        checked={settings.autoAssignFacilitator}
                        onCheckedChange={(checked) => handleSettingChange('autoAssignFacilitator', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Approval</Label>
                        <p className="text-sm text-gray-600">Require manager approval before starting sprints</p>
                      </div>
                      <Switch 
                        checked={settings.requireApproval}
                        onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sprint Templates</CardTitle>
                  <CardDescription>
                    Manage your organization's sprint templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sprintTemplates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {template.duration}
                            </span>
                            <span>{template.phases.length} phases</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Create New Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Daily Digest</Label>
                        <p className="text-sm text-gray-600">Daily summary of sprint activities</p>
                      </div>
                      <Switch 
                        checked={settings.dailyDigest}
                        onCheckedChange={(checked) => handleSettingChange('dailyDigest', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Sprint Reminders</Label>
                        <p className="text-sm text-gray-600">Reminders for upcoming sprint activities</p>
                      </div>
                      <Switch 
                        checked={settings.sprintReminders}
                        onCheckedChange={(checked) => handleSettingChange('sprintReminders', checked)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label>Slack Integration</Label>
                    <p className="text-sm text-gray-600 mb-4">Connect your Slack workspace for notifications</p>
                    {settings.slackIntegration ? (
                      <div className="flex items-center gap-3">
                        <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="outline" size="sm">Disconnect</Button>
                      </div>
                    ) : (
                      <Button variant="outline">
                        <Globe className="w-4 h-4 mr-2" />
                        Connect Slack
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI & Automation */}
            <TabsContent value="ai" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Features</CardTitle>
                  <CardDescription>
                    Configure AI-powered features and automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>AI Coaching</Label>
                        <p className="text-sm text-gray-600">Get AI-powered coaching during sprints</p>
                      </div>
                      <Switch 
                        checked={settings.aiCoaching}
                        onCheckedChange={(checked) => handleSettingChange('aiCoaching', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Insights</Label>
                        <p className="text-sm text-gray-600">Automatically generate insights from sprint data</p>
                      </div>
                      <Switch 
                        checked={settings.autoInsights}
                        onCheckedChange={(checked) => handleSettingChange('autoInsights', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Smart Suggestions</Label>
                        <p className="text-sm text-gray-600">Receive AI suggestions for sprint optimization</p>
                      </div>
                      <Switch 
                        checked={settings.smartSuggestions}
                        onCheckedChange={(checked) => handleSettingChange('smartSuggestions', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Automation Rules</CardTitle>
                  <CardDescription>
                    Set up automated workflows for your sprints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Auto-assign team members</h4>
                        <Switch />
                      </div>
                      <p className="text-sm text-gray-600">Automatically assign team members based on skills and availability</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Phase completion notifications</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-gray-600">Send notifications when sprint phases are completed</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Generate sprint reports</h4>
                        <Switch defaultChecked />
                      </div>
                      <p className="text-sm text-gray-600">Automatically generate reports at the end of each sprint</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Privacy</CardTitle>
                  <CardDescription>
                    Manage your security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Anonymize Data</Label>
                        <p className="text-sm text-gray-600">Remove personal identifiers from analytics</p>
                      </div>
                      <Switch 
                        checked={settings.anonymizeData}
                        onCheckedChange={(checked) => handleSettingChange('anonymizeData', checked)}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="dataRetention">Data Retention Period</Label>
                    <Select value={settings.dataRetention} onValueChange={(value) => handleSettingChange('dataRetention', value)}>
                      <SelectTrigger className="w-full md:w-1/2 mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3months">3 months</SelectItem>
                        <SelectItem value="6months">6 months</SelectItem>
                        <SelectItem value="12months">12 months</SelectItem>
                        <SelectItem value="24months">24 months</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-2">How long to keep sprint data and analytics</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access Control</CardTitle>
                  <CardDescription>
                    Manage user permissions and access levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Admin Users</h4>
                      <p className="text-sm text-gray-600 mb-3">Users with full platform access</p>
                      <div className="flex items-center gap-2">
                        <Badge>3 users</Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Facilitators</h4>
                      <p className="text-sm text-gray-600 mb-3">Users who can create and manage sprints</p>
                      <div className="flex items-center gap-2">
                        <Badge>8 users</Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Team Members</h4>
                      <p className="text-sm text-gray-600 mb-3">Regular users who participate in sprints</p>
                      <div className="flex items-center gap-2">
                        <Badge>24 users</Badge>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced */}
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>
                    Import, export, and manage your platform data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Download className="w-6 h-6 mb-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Upload className="w-6 h-6 mb-2" />
                      Import Data
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">API Access</h4>
                    <p className="text-sm text-gray-600 mb-4">Generate API keys for integrations</p>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions that affect your entire organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      These actions cannot be undone. Please proceed with caution.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete All Sprint Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Reset Platform Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Organization
                    </Button>
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