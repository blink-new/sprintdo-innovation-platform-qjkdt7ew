import React, { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Star, 
  Award,
  TrendingUp,
  Clock,
  Target,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  skills: string[]
  avatar?: string
  location: string
  joinDate: string
  sprintsCompleted: number
  avgRating: number
  status: 'active' | 'busy' | 'offline'
  expertise: string[]
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'Product Manager',
    department: 'Product',
    skills: ['Strategy', 'User Research', 'Roadmapping'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    location: 'San Francisco, CA',
    joinDate: '2023-01-15',
    sprintsCompleted: 12,
    avgRating: 4.8,
    status: 'active',
    expertise: ['Product Strategy', 'Market Research', 'Agile']
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.r@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    skills: ['React', 'Node.js', 'System Design'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    location: 'Austin, TX',
    joinDate: '2022-08-20',
    sprintsCompleted: 18,
    avgRating: 4.9,
    status: 'active',
    expertise: ['Frontend Development', 'API Design', 'DevOps']
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily.watson@company.com',
    role: 'UX Designer',
    department: 'Design',
    skills: ['Figma', 'User Testing', 'Prototyping'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    location: 'New York, NY',
    joinDate: '2023-03-10',
    sprintsCompleted: 8,
    avgRating: 4.7,
    status: 'busy',
    expertise: ['User Experience', 'Design Systems', 'Research']
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    role: 'Data Scientist',
    department: 'Analytics',
    skills: ['Python', 'Machine Learning', 'Statistics'],
    location: 'Seattle, WA',
    joinDate: '2022-11-05',
    sprintsCompleted: 15,
    avgRating: 4.6,
    status: 'offline',
    expertise: ['Data Analysis', 'AI/ML', 'Visualization']
  }
]

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Available'
      case 'busy': return 'In Sprint'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-2">Manage your cross-functional innovation teams</p>
            </div>
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                  <DialogDescription>
                    Invite a new member to join your innovation team
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-manager">Product Manager</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="data-scientist">Data Scientist</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="stakeholder">Stakeholder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setIsAddMemberOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                      Send Invite
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Team Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-indigo-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Members</p>
                    <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Sprints</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                    <p className="text-2xl font-bold text-gray-900">4.7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-amber-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="skills">Skills Matrix</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {member.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {member.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {member.department}
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Status</span>
                          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                            {getStatusText(member.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Rating</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{member.avgRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Sprints</span>
                          <span className="text-sm font-medium">{member.sprintsCompleted}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {member.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Skills Matrix</CardTitle>
                  <CardDescription>
                    Overview of skills distribution across your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {['Product Strategy', 'Frontend Development', 'User Experience', 'Data Analysis', 'Research', 'System Design'].map((skill) => (
                      <div key={skill}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{skill}</span>
                          <span className="text-sm text-gray-600">
                            {Math.floor(Math.random() * 3) + 2} members
                          </span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>
                      Team members with highest sprint ratings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamMembers
                        .sort((a, b) => b.avgRating - a.avgRating)
                        .slice(0, 3)
                        .map((member, index) => (
                          <div key={member.id} className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                              {index + 1}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-600">{member.role}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium ml-1">{member.avgRating}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sprint Completion</CardTitle>
                    <CardDescription>
                      Total sprints completed by team members
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {teamMembers
                        .sort((a, b) => b.sprintsCompleted - a.sprintsCompleted)
                        .map((member) => (
                          <div key={member.id} className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <div className="flex items-center mt-1">
                                <Progress value={(member.sprintsCompleted / 20) * 100} className="h-2 flex-1 mr-3" />
                                <span className="text-sm font-medium text-gray-600">
                                  {member.sprintsCompleted}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}