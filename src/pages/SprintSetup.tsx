import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { 
  ArrowLeft,
  ArrowRight,
  Settings,
  Users,
  Building,
  Target,
  Zap,
  Calendar as CalendarIcon,
  Brain,
  CheckCircle,
  Info,
  Plus,
  X,
  Monitor,
  Wifi,
  MapPinIcon,
  Timer,
  Gauge,
  Rocket,
  Wrench,
  Sparkles,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface SprintConfig {
  name: string
  description: string
  mode: 'online' | 'hybrid' | 'irl'
  pace: 'warp' | '1d' | '2d' | '3d' | '4d' | 'tinker' | 'custom'
  customDuration?: number
  customUnit?: 'hours' | 'days' | 'weeks'
  category: string
  sector: string
  orgContext: {
    operations: string
    productService: string
    resources: string
    budget: string
  }
  team: {
    facilitator: string
    members: Array<{
      id: string
      name: string
      email: string
      role: string
      department: string
      skills: string[]
      geography: string
    }>
    stakeholders: Array<{
      id: string
      name: string
      role: string
      involvement: 'high' | 'medium' | 'low'
    }>
  }
  complexity: number
  aiRecommendations: {
    sprintType: string
    estimatedDuration: string
    requiredExperts: string[]
    suggestedAgenda: string[]
  }
  startDate?: Date
  endDate?: Date
}

const steps = [
  { id: 'basic', title: 'Basic Info', icon: Info },
  { id: 'mode', title: 'Mode & Pace', icon: Settings },
  { id: 'context', title: 'Context', icon: Building },
  { id: 'team', title: 'Team Setup', icon: Users },
  { id: 'profile', title: 'Sprint Profile', icon: Brain },
  { id: 'schedule', title: 'Schedule', icon: CalendarIcon },
  { id: 'review', title: 'Review', icon: CheckCircle }
]

const modeOptions = [
  {
    id: 'online',
    title: 'Online',
    description: 'Fully remote collaboration',
    icon: Monitor,
    features: ['Video conferencing', 'Digital whiteboards', 'Real-time collaboration']
  },
  {
    id: 'hybrid',
    title: 'Hybrid',
    description: 'Mix of remote and in-person',
    icon: Wifi,
    features: ['Flexible participation', 'Best of both worlds', 'Inclusive approach']
  },
  {
    id: 'irl',
    title: 'In-Person',
    description: 'Face-to-face collaboration',
    icon: MapPinIcon,
    features: ['Physical workshops', 'Tactile prototyping', 'High engagement']
  }
]

const paceOptions = [
  {
    id: 'warp',
    title: 'Warp Speed',
    duration: '4 hours',
    description: 'Ultra-fast sprint for urgent decisions',
    icon: Zap,
    color: 'bg-red-500'
  },
  {
    id: '1d',
    title: '1 Day Sprint',
    duration: '1 day',
    description: 'Intensive single-day innovation',
    icon: Timer,
    color: 'bg-orange-500'
  },
  {
    id: '2d',
    title: '2 Day Sprint',
    duration: '2 days',
    description: 'Balanced depth and speed',
    icon: Gauge,
    color: 'bg-yellow-500'
  },
  {
    id: '3d',
    title: '3 Day Sprint',
    duration: '3 days',
    description: 'Comprehensive exploration',
    icon: Rocket,
    color: 'bg-green-500'
  },
  {
    id: '4d',
    title: '4 Day Sprint',
    duration: '4 days',
    description: 'Deep dive innovation',
    icon: Target,
    color: 'bg-blue-500'
  },
  {
    id: 'tinker',
    title: 'Tinker Mode',
    duration: '2-4 weeks',
    description: 'Extended exploration and iteration',
    icon: Wrench,
    color: 'bg-purple-500'
  }
]

const categories = [
  'Product Development',
  'MVP Creation',
  'Business Model Innovation',
  'Service Design',
  'Process Optimization',
  'Digital Transformation',
  'Customer Experience',
  'Sustainability Initiative',
  'Technology Integration',
  'Market Expansion'
]

const sectors = [
  'Pharmaceuticals',
  'Information & Communication Technology',
  'Automotive',
  'Financial Services',
  'Healthcare',
  'Energy & Utilities',
  'Retail & E-commerce',
  'Manufacturing',
  'Education',
  'Transportation',
  'Real Estate',
  'Food & Beverage',
  'Entertainment & Media',
  'Agriculture',
  'Aerospace & Defense'
]

const roles = [
  'Product Manager',
  'UX Designer',
  'Software Engineer',
  'Data Scientist',
  'Business Analyst',
  'Marketing Specialist',
  'Sales Representative',
  'Operations Manager',
  'Quality Assurance',
  'Project Manager',
  'Research Scientist',
  'Customer Success',
  'Finance Analyst',
  'HR Specialist',
  'Legal Counsel'
]

const departments = [
  'Product',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
  'Finance',
  'HR',
  'Legal',
  'Research & Development',
  'Quality Assurance',
  'Customer Success',
  'Business Development',
  'Strategy',
  'IT'
]

const skillsOptions = [
  'User Research',
  'Prototyping',
  'Data Analysis',
  'Project Management',
  'Design Thinking',
  'Agile Methodology',
  'Technical Writing',
  'Market Research',
  'Financial Modeling',
  'Strategic Planning',
  'Customer Interviews',
  'Wireframing',
  'A/B Testing',
  'Stakeholder Management',
  'Risk Assessment'
]

export default function SprintSetup() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<SprintConfig>({
    name: '',
    description: '',
    mode: 'hybrid',
    pace: '3d',
    category: '',
    sector: '',
    orgContext: {
      operations: '',
      productService: '',
      resources: '',
      budget: ''
    },
    team: {
      facilitator: '',
      members: [],
      stakeholders: []
    },
    complexity: 5,
    aiRecommendations: {
      sprintType: '',
      estimatedDuration: '',
      requiredExperts: [],
      suggestedAgenda: []
    }
  })

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    skills: [] as string[],
    geography: ''
  })

  const [newStakeholder, setNewStakeholder] = useState({
    name: '',
    role: '',
    involvement: 'medium' as 'high' | 'medium' | 'low'
  })

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addTeamMember = () => {
    if (newMember.name && newMember.email) {
      setConfig(prev => ({
        ...prev,
        team: {
          ...prev.team,
          members: [...prev.team.members, { ...newMember, id: Date.now().toString() }]
        }
      }))
      setNewMember({
        name: '',
        email: '',
        role: '',
        department: '',
        skills: [],
        geography: ''
      })
    }
  }

  const addStakeholder = () => {
    if (newStakeholder.name && newStakeholder.role) {
      setConfig(prev => ({
        ...prev,
        team: {
          ...prev.team,
          stakeholders: [...prev.team.stakeholders, { ...newStakeholder, id: Date.now().toString() }]
        }
      }))
      setNewStakeholder({
        name: '',
        role: '',
        involvement: 'medium'
      })
    }
  }

  const removeTeamMember = (id: string) => {
    setConfig(prev => ({
      ...prev,
      team: {
        ...prev.team,
        members: prev.team.members.filter(member => member.id !== id)
      }
    }))
  }

  const removeStakeholder = (id: string) => {
    setConfig(prev => ({
      ...prev,
      team: {
        ...prev.team,
        stakeholders: prev.team.stakeholders.filter(stakeholder => stakeholder.id !== id)
      }
    }))
  }

  const generateAIRecommendations = () => {
    const recommendations = {
      sprintType: config.category === 'Product Development' ? 'Product Innovation Sprint' : 'Business Innovation Sprint',
      estimatedDuration: config.pace === 'warp' ? '4 hours' : config.pace === 'tinker' ? '3 weeks' : `${config.pace.replace('d', '')} days`,
      requiredExperts: [
        'Domain Expert',
        'Technical Lead',
        'User Experience Researcher',
        'Business Analyst'
      ],
      suggestedAgenda: [
        'Challenge Definition & Context Setting',
        'Stakeholder Mapping & User Journey',
        'Ideation & Concept Development',
        'Rapid Prototyping Session',
        'User Testing & Feedback',
        'Implementation Planning'
      ]
    }

    setConfig(prev => ({
      ...prev,
      aiRecommendations: recommendations
    }))
  }

  const createSprint = () => {
    console.log('Creating sprint with config:', config)
    navigate('/sprint/new-sprint-id')
  }

  const renderBasicStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Sprint Name</Label>
        <Input
          id="name"
          value={config.name}
          onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., AI-Powered Customer Experience Sprint"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={config.description}
          onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the challenge or opportunity you want to address..."
          className="mt-1"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={config.category} onValueChange={(value) => setConfig(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sector">Sector/Vertical</Label>
          <Select value={config.sector} onValueChange={(value) => setConfig(prev => ({ ...prev, sector: value }))}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderModeStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sprint Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modeOptions.map((mode) => (
            <Card 
              key={mode.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                config.mode === mode.id ? "ring-2 ring-indigo-500 bg-indigo-50" : ""
              )}
              onClick={() => setConfig(prev => ({ ...prev, mode: mode.id as any }))}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <mode.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{mode.title}</h4>
                    <p className="text-sm text-gray-600">{mode.description}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {mode.features.map((feature, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sprint Pace</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paceOptions.map((pace) => (
            <Card 
              key={pace.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                config.pace === pace.id ? "ring-2 ring-indigo-500 bg-indigo-50" : ""
              )}
              onClick={() => setConfig(prev => ({ ...prev, pace: pace.id as any }))}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", pace.color)}>
                    <pace.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{pace.title}</h4>
                    <p className="text-sm text-gray-600">{pace.duration}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{pace.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {config.pace === 'custom' && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Custom Duration</h4>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={config.customDuration || ''}
                  onChange={(e) => setConfig(prev => ({ ...prev, customDuration: parseInt(e.target.value) }))}
                  placeholder="Duration"
                  className="w-24"
                />
                <Select value={config.customUnit} onValueChange={(value) => setConfig(prev => ({ ...prev, customUnit: value as any }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const renderContextStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Organizational Context</h3>
        <p className="text-gray-600 mb-6">Provide context about your organization to help AI tailor the sprint experience.</p>
      </div>

      {/* Organization Size & Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="orgSize">Organization Size</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select organization size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup (1-50 employees)</SelectItem>
              <SelectItem value="small">Small Business (51-200 employees)</SelectItem>
              <SelectItem value="medium">Medium Enterprise (201-1000 employees)</SelectItem>
              <SelectItem value="large">Large Enterprise (1000+ employees)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="maturityStage">Innovation Maturity</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select maturity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner - New to innovation sprints</SelectItem>
              <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
              <SelectItem value="advanced">Advanced - Regular sprint practice</SelectItem>
              <SelectItem value="expert">Expert - Innovation-driven culture</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Resource Hub - Tabbed Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Resource Hub
          </CardTitle>
          <CardDescription>Comprehensive organizational context for AI optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Operations Context */}
            <div>
              <Label htmlFor="operations" className="text-base font-semibold">Operations Context</Label>
              <Textarea
                id="operations"
                value={config.orgContext.operations}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  orgContext: { ...prev.orgContext, operations: e.target.value }
                }))}
                placeholder="Describe your current operations, processes, workflows, and operational challenges..."
                className="mt-2"
                rows={4}
              />
            </div>

            {/* Product/Service Conditions */}
            <div>
              <Label htmlFor="productService" className="text-base font-semibold">Product/Service Conditions</Label>
              <Textarea
                id="productService"
                value={config.orgContext.productService}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  orgContext: { ...prev.orgContext, productService: e.target.value }
                }))}
                placeholder="Describe your products/services, market position, competitive landscape, and customer needs..."
                className="mt-2"
                rows={4}
              />
            </div>

            {/* Available Resources */}
            <div>
              <Label htmlFor="resources" className="text-base font-semibold">Available Resources & Tools</Label>
              <Textarea
                id="resources"
                value={config.orgContext.resources}
                onChange={(e) => setConfig(prev => ({ 
                  ...prev, 
                  orgContext: { ...prev.orgContext, resources: e.target.value }
                }))}
                placeholder="List available tools, platforms, technologies, external partnerships, and capabilities..."
                className="mt-2"
                rows={4}
              />
            </div>

            {/* Budget & Investment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetRange">Budget Range</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal ($0-5K)</SelectItem>
                    <SelectItem value="small">Small ($5K-25K)</SelectItem>
                    <SelectItem value="medium">Medium ($25K-100K)</SelectItem>
                    <SelectItem value="large">Large ($100K-500K)</SelectItem>
                    <SelectItem value="enterprise">Enterprise ($500K+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timeframe">Investment Timeframe</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                    <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                    <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                    <SelectItem value="long">Long-term (12+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Constraints & Compliance */}
            <div>
              <Label htmlFor="constraints" className="text-base font-semibold">Constraints & Compliance</Label>
              <Textarea
                id="constraints"
                placeholder="Describe regulatory requirements, technical constraints, security policies, and compliance needs..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Context Analysis */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Brain className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">AI Context Analysis</h3>
              <p className="text-blue-800 text-sm mb-4">
                Based on your organizational context, I recommend focusing on {config.sector || 'your selected sector'} 
                best practices with emphasis on {config.category || 'your chosen category'} methodologies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Recommended Focus</h4>
                  <p className="text-sm text-blue-700">User-centered design with rapid validation cycles</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Risk Factors</h4>
                  <p className="text-sm text-blue-700">Budget constraints may limit prototyping scope</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 text-blue-700 border-blue-300">
                Get Detailed Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTeamStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Team Setup</h3>
        
        <div className="mb-6">
          <Label htmlFor="facilitator">Sprint Facilitator</Label>
          <Input
            id="facilitator"
            value={config.team.facilitator}
            onChange={(e) => setConfig(prev => ({ 
              ...prev, 
              team: { ...prev.team, facilitator: e.target.value }
            }))}
            placeholder="Name of the sprint facilitator"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Team Members</h4>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Add Team Member</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="memberName">Name</Label>
                <Input
                  id="memberName"
                  value={newMember.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="memberEmail">Email</Label>
                <Input
                  id="memberEmail"
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@company.com"
                />
              </div>
              <div>
                <Label htmlFor="memberRole">Role</Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="memberDepartment">Department</Label>
                <Select value={newMember.department} onValueChange={(value) => setNewMember(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="memberGeography">Location</Label>
                <Input
                  id="memberGeography"
                  value={newMember.geography}
                  onChange={(e) => setNewMember(prev => ({ ...prev, geography: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <div>
              <Label>Skills</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {skillsOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={newMember.skills.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewMember(prev => ({ ...prev, skills: [...prev.skills, skill] }))
                        } else {
                          setNewMember(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
                        }
                      }}
                    />
                    <Label htmlFor={skill} className="text-sm">{skill}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={addTeamMember} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>

        {config.team.members.length > 0 && (
          <div className="space-y-2">
            {config.team.members.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                        <p className="text-xs text-gray-500">{member.geography}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                          {member.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">+{member.skills.length - 3}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(member.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h4 className="font-semibold mb-4">Stakeholders</h4>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-base">Add Stakeholder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stakeholderName">Name</Label>
                <Input
                  id="stakeholderName"
                  value={newStakeholder.name}
                  onChange={(e) => setNewStakeholder(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Stakeholder name"
                />
              </div>
              <div>
                <Label htmlFor="stakeholderRole">Role</Label>
                <Input
                  id="stakeholderRole"
                  value={newStakeholder.role}
                  onChange={(e) => setNewStakeholder(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="e.g., VP Product, Customer"
                />
              </div>
              <div>
                <Label>Involvement Level</Label>
                <RadioGroup 
                  value={newStakeholder.involvement} 
                  onValueChange={(value) => setNewStakeholder(prev => ({ ...prev, involvement: value as any }))}
                  className="flex space-x-4 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="text-sm">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="text-sm">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low" className="text-sm">Low</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Button onClick={addStakeholder} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Stakeholder
            </Button>
          </CardContent>
        </Card>

        {config.team.stakeholders.length > 0 && (
          <div className="space-y-2">
            {config.team.stakeholders.map((stakeholder) => (
              <Card key={stakeholder.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{stakeholder.name}</h4>
                      <p className="text-sm text-gray-600">{stakeholder.role}</p>
                      <Badge 
                        variant={stakeholder.involvement === 'high' ? 'default' : stakeholder.involvement === 'medium' ? 'secondary' : 'outline'}
                        className="mt-1"
                      >
                        {stakeholder.involvement} involvement
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStakeholder(stakeholder.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderProfileStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sprint Profile & AI Complexity Screening</h3>
        <p className="text-gray-600 mb-6">AI will analyze your inputs to recommend the optimal sprint configuration, required resources, and expert needs.</p>
      </div>

      {/* Challenge Complexity Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Challenge Complexity Assessment
          </CardTitle>
          <CardDescription>Help AI understand the scope and complexity of your challenge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Overall Challenge Complexity (1-10)</Label>
            <div className="mt-2">
              <input
                type="range"
                min="1"
                max="10"
                value={config.complexity}
                onChange={(e) => setConfig(prev => ({ ...prev, complexity: parseInt(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Simple</span>
                <span className="font-semibold">Complexity: {config.complexity}/10</span>
                <span>Highly Complex</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="technicalComplexity">Technical Complexity</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select technical complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Existing technology solutions</SelectItem>
                  <SelectItem value="medium">Medium - Some technical innovation needed</SelectItem>
                  <SelectItem value="high">High - Cutting-edge technology required</SelectItem>
                  <SelectItem value="research">Research - Experimental/unproven tech</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stakeholderComplexity">Stakeholder Complexity</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select stakeholder complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple - Single team/department</SelectItem>
                  <SelectItem value="moderate">Moderate - Multiple internal teams</SelectItem>
                  <SelectItem value="complex">Complex - Cross-organizational</SelectItem>
                  <SelectItem value="ecosystem">Ecosystem - Multiple external partners</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="marketComplexity">Market/User Complexity</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select market complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="known">Known - Well-understood market</SelectItem>
                  <SelectItem value="emerging">Emerging - Growing market segment</SelectItem>
                  <SelectItem value="new">New - Uncharted market territory</SelectItem>
                  <SelectItem value="disruptive">Disruptive - Market transformation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="regulatoryComplexity">Regulatory Complexity</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select regulatory complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal - Few regulations</SelectItem>
                  <SelectItem value="standard">Standard - Industry norms</SelectItem>
                  <SelectItem value="strict">Strict - Heavy regulation</SelectItem>
                  <SelectItem value="critical">Critical - Life/safety critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="riskTolerance">Risk Tolerance</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative - Minimize risks</SelectItem>
                <SelectItem value="balanced">Balanced - Calculated risks</SelectItem>
                <SelectItem value="aggressive">Aggressive - High-risk, high-reward</SelectItem>
                <SelectItem value="experimental">Experimental - Exploration focused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resource & Budget Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Resource & Budget Planning
          </CardTitle>
          <CardDescription>Define available resources and budget constraints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sprintBudget">Sprint Budget</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal ($0-2K)</SelectItem>
                  <SelectItem value="small">Small ($2K-10K)</SelectItem>
                  <SelectItem value="medium">Medium ($10K-50K)</SelectItem>
                  <SelectItem value="large">Large ($50K-200K)</SelectItem>
                  <SelectItem value="enterprise">Enterprise ($200K+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="expertAccess">External Expert Access</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Expert availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None - Internal team only</SelectItem>
                  <SelectItem value="limited">Limited - Occasional consultation</SelectItem>
                  <SelectItem value="moderate">Moderate - Regular expert input</SelectItem>
                  <SelectItem value="extensive">Extensive - Dedicated experts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="prototypingCapability">Prototyping Capability</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {['Digital Mockups', 'Physical Prototypes', '3D Printing', 'Software Development', 'Hardware Testing', 'User Testing Lab'].map((capability) => (
                <div key={capability} className="flex items-center space-x-2">
                  <Checkbox id={capability} />
                  <Label htmlFor={capability} className="text-sm">{capability}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Button */}
      <Button 
        onClick={generateAIRecommendations}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        size="lg"
      >
        <Brain className="w-5 h-5 mr-2" />
        Generate AI Sprint Profile & Recommendations
      </Button>

      {/* AI Recommendations */}
      {config.aiRecommendations.sprintType && (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-900">
              <Sparkles className="w-5 h-5 mr-2" />
              AI Sprint Profile & Recommendations
            </CardTitle>
            <CardDescription>Comprehensive analysis and recommendations based on your inputs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sprint Profile Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">
                  {config.complexity >= 8 ? 'High' : config.complexity >= 5 ? 'Medium' : 'Low'}
                </div>
                <div className="text-sm text-gray-600">Complexity Level</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {config.complexity <= 3 ? '95%' : config.complexity <= 6 ? '85%' : '75%'}
                </div>
                <div className="text-sm text-gray-600">Success Probability</div>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {config.aiRecommendations.estimatedDuration}
                </div>
                <div className="text-sm text-gray-600">Recommended Duration</div>
              </div>
            </div>

            {/* Detailed Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-indigo-900 mb-3">Sprint Configuration</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sprint Type:</span>
                    <span className="text-sm font-medium">{config.aiRecommendations.sprintType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Recommended Mode:</span>
                    <span className="text-sm font-medium">{config.mode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Optimal Pace:</span>
                    <span className="text-sm font-medium">{config.pace}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-indigo-900 mb-3">Resource Requirements</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Team Size:</span>
                    <span className="text-sm font-medium">
                      {config.complexity <= 3 ? '4-6' : config.complexity <= 6 ? '6-8' : '8-12'} people
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Budget Estimate:</span>
                    <span className="text-sm font-medium">
                      ${config.complexity <= 3 ? '5-15K' : config.complexity <= 6 ? '15-50K' : '50-150K'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expert Hours:</span>
                    <span className="text-sm font-medium">
                      {config.complexity <= 3 ? '10-20' : config.complexity <= 6 ? '20-40' : '40-80'} hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Required Experts */}
            <div>
              <h4 className="font-semibold text-indigo-900 mb-3">Required Experts & Roles</h4>
              <div className="flex flex-wrap gap-2">
                {config.aiRecommendations.requiredExperts.map((expert, index) => (
                  <Badge key={index} className="bg-indigo-100 text-indigo-800">{expert}</Badge>
                ))}
              </div>
            </div>

            {/* Suggested Agenda */}
            <div>
              <h4 className="font-semibold text-indigo-900 mb-3">Suggested Sprint Agenda</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.aiRecommendations.suggestedAgenda.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-indigo-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-3">Risk Assessment & Mitigation</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-amber-800">Medium Risk: </span>
                    <span className="text-sm text-amber-700">Stakeholder alignment may require additional sessions</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-green-800">Mitigation: </span>
                    <span className="text-sm text-green-700">Schedule pre-sprint stakeholder alignment workshop</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Refine Recommendations
              </Button>
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                Accept & Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderScheduleStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sprint Schedule & Calendar Planning</h3>
        <p className="text-gray-600 mb-6">Set up your sprint timeline with Gantt-style planning and session scheduling.</p>
      </div>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Sprint Timeline
          </CardTitle>
          <CardDescription>Define your sprint start and end dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {config.startDate ? format(config.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.startDate}
                    onSelect={(date) => setConfig(prev => ({ ...prev, startDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {config.endDate ? format(config.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.endDate}
                    onSelect={(date) => setConfig(prev => ({ ...prev, endDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {config.startDate && config.endDate && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">
                  Sprint Duration: {Math.ceil((config.endDate.getTime() - config.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gantt-Style Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Sprint Phase Timeline (Gantt View)
          </CardTitle>
          <CardDescription>Visual timeline showing the 6-phase innovation journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Timeline Header */}
            <div className="grid grid-cols-8 gap-2 text-xs text-gray-600 font-medium">
              <div className="col-span-2">Phase</div>
              <div className="text-center">Day 1</div>
              <div className="text-center">Day 2</div>
              <div className="text-center">Day 3</div>
              <div className="text-center">Day 4</div>
              <div className="text-center">Day 5</div>
              <div className="text-center">Day 6</div>
            </div>

            {/* Phase Bars */}
            {[
              { phase: 'Discovery', color: 'bg-blue-500', start: 0, duration: 1 },
              { phase: 'Challenge', color: 'bg-purple-500', start: 0.5, duration: 1.5 },
              { phase: 'Ideation', color: 'bg-green-500', start: 1.5, duration: 1.5 },
              { phase: 'Prototype', color: 'bg-orange-500', start: 2.5, duration: 1.5 },
              { phase: 'Test', color: 'bg-red-500', start: 3.5, duration: 1 },
              { phase: 'Implementation', color: 'bg-indigo-500', start: 4, duration: 2 }
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-8 gap-2 items-center">
                <div className="col-span-2 font-medium text-sm">{item.phase}</div>
                <div className="col-span-6 relative h-8 bg-gray-100 rounded">
                  <div 
                    className={`absolute top-1 bottom-1 ${item.color} rounded flex items-center justify-center text-white text-xs font-medium`}
                    style={{
                      left: `${(item.start / 6) * 100}%`,
                      width: `${(item.duration / 6) * 100}%`
                    }}
                  >
                    {item.duration}d
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Timeline Optimization</h4>
                <p className="text-sm text-amber-700">
                  This timeline is optimized for a {config.pace} sprint. Phases may overlap to maximize efficiency 
                  and maintain momentum throughout the innovation journey.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Session Planning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            Detailed Session Planning
          </CardTitle>
          <CardDescription>AI-generated session schedule based on your sprint configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Session Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sessionDuration">Default Session Duration</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                    <SelectItem value="180">180 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dailyHours">Daily Working Hours</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 hours/day</SelectItem>
                    <SelectItem value="6">6 hours/day</SelectItem>
                    <SelectItem value="8">8 hours/day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="breakDuration">Break Duration</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select break time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-4">
              {['Day 1: Discovery & Challenge', 'Day 2: Ideation & Concept', 'Day 3: Prototype & Test'].map((day, dayIndex) => (
                <div key={dayIndex} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${dayIndex === 0 ? 'bg-blue-500' : dayIndex === 1 ? 'bg-green-500' : 'bg-orange-500'}`} />
                    {day}
                  </h4>
                  <div className="space-y-2">
                    {[
                      { time: '09:00-10:30', activity: dayIndex === 0 ? 'Challenge Definition & Context Setting' : dayIndex === 1 ? 'Ideation Workshop' : 'Prototype Development', type: 'workshop', participants: 'All team members' },
                      { time: '10:45-12:00', activity: dayIndex === 0 ? 'Stakeholder Mapping & User Journey' : dayIndex === 1 ? 'Concept Prioritization' : 'User Testing Setup', type: 'collaboration', participants: 'Core team + stakeholders' },
                      { time: '13:00-14:30', activity: dayIndex === 0 ? 'Problem Validation Research' : dayIndex === 1 ? 'Solution Architecture' : 'Testing & Feedback Collection', type: 'research', participants: 'Research team + users' },
                      { time: '14:45-16:00', activity: dayIndex === 0 ? 'Challenge Refinement' : dayIndex === 1 ? 'Rapid Prototyping Prep' : 'Results Analysis & Next Steps', type: 'synthesis', participants: 'Core team' }
                    ].map((session, sessionIndex) => (
                      <div key={sessionIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{session.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {session.type}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-700 mb-1">{session.activity}</div>
                          <div className="text-xs text-gray-500">{session.participants}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            90 min
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar Integration */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Calendar Integration</h4>
              <p className="text-sm text-green-800 mb-4">
                Export your sprint schedule to popular calendar applications and send invites to team members.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                  Export to Google Calendar
                </Button>
                <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                  Export to Outlook
                </Button>
                <Button variant="outline" size="sm" className="text-green-700 border-green-300">
                  Download .ics File
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Booking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5" />
            Resource & Room Booking
          </CardTitle>
          <CardDescription>Reserve rooms, equipment, and resources for your sprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="meetingRooms">Meeting Rooms Required</Label>
              <div className="space-y-2 mt-2">
                {['Main Workshop Room (20+ people)', 'Breakout Room 1 (6-8 people)', 'Breakout Room 2 (6-8 people)', 'Quiet Focus Room (2-4 people)'].map((room) => (
                  <div key={room} className="flex items-center space-x-2">
                    <Checkbox id={room} />
                    <Label htmlFor={room} className="text-sm">{room}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="equipment">Equipment & Materials</Label>
              <div className="space-y-2 mt-2">
                {['Whiteboards & Markers', 'Sticky Notes & Pens', 'Laptops/Tablets', 'Projector/TV Screens', 'Prototyping Materials', 'Catering/Refreshments'].map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Checkbox id={equipment} />
                    <Label htmlFor={equipment} className="text-sm">{equipment}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Booking Assistance</h4>
                <p className="text-sm text-blue-700">
                  Our AI assistant can help coordinate room bookings and resource allocation based on your sprint schedule and team size.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Review & Launch</h3>
        <p className="text-gray-600 mb-6">Review your sprint configuration before launching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sprint Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Name</Label>
              <p className="font-semibold">{config.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Category</Label>
              <p>{config.category}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Sector</Label>
              <p>{config.sector}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Mode & Pace</Label>
              <div className="flex space-x-2">
                <Badge>{config.mode}</Badge>
                <Badge variant="outline">{config.pace}</Badge>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Complexity</Label>
              <div className="flex items-center space-x-2">
                <Progress value={config.complexity * 10} className="flex-1" />
                <span className="text-sm">{config.complexity}/10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Facilitator</Label>
              <p className="font-semibold">{config.team.facilitator}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Team Members</Label>
              <p>{config.team.members.length} members</p>
              <div className="flex -space-x-2 mt-1">
                {config.team.members.slice(0, 5).map((member) => (
                  <Avatar key={member.id} className="w-8 h-8 border-2 border-white">
                    <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                ))}
                {config.team.members.length > 5 && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-gray-600">+{config.team.members.length - 5}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Stakeholders</Label>
              <p>{config.team.stakeholders.length} stakeholders</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Schedule</Label>
              <p>
                {config.startDate && config.endDate 
                  ? `${format(config.startDate, "MMM d")} - ${format(config.endDate, "MMM d, yyyy")}`
                  : 'Not set'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-900">Ready to Launch!</h3>
              <p className="text-green-700">Your sprint is configured and ready to begin.</p>
            </div>
          </div>
          <Button 
            onClick={createSprint}
            className="w-full bg-green-600 hover:bg-green-700"
            size="lg"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Launch Sprint
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderStepContent = () => {
    const currentStepId = steps[currentStep].id

    switch (currentStepId) {
      case 'basic':
        return renderBasicStep()
      case 'mode':
        return renderModeStep()
      case 'context':
        return renderContextStep()
      case 'team':
        return renderTeamStep()
      case 'profile':
        return renderProfileStep()
      case 'schedule':
        return renderScheduleStep()
      case 'review':
        return renderReviewStep()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sprint Setup Wizard</h1>
              <p className="text-gray-600">Configure your innovation sprint step by step</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="w-32" />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Steps Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  index === currentStep 
                    ? "bg-indigo-50 text-indigo-700 border border-indigo-200" 
                    : index < currentStep 
                      ? "bg-green-50 text-green-700" 
                      : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  index === currentStep 
                    ? "bg-indigo-600 text-white" 
                    : index < currentStep 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-200 text-gray-600"
                )}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-xs opacity-75">
                    {index === currentStep ? 'Current' : index < currentStep ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {React.createElement(steps[currentStep].icon, { className: "w-5 h-5 mr-2" })}
                  {steps[currentStep].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button 
                  onClick={createSprint}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch Sprint
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}