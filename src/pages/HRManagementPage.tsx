import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { 
  Users, 
  UserPlus, 
  FileText, 
  Calendar, 
  Target, 
  Award, 
  MessageSquare, 
  BookOpen,
  AlertCircle,
  TrendingUp,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Star,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'closed' | 'draft';
  applications: number;
  postedDate: string;
  closingDate: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  experience: string;
  rating: number;
}

interface PerformanceReview {
  id: string;
  employeeName: string;
  reviewPeriod: string;
  status: 'pending' | 'in-progress' | 'completed';
  overallRating: number;
  goals: number;
  completedGoals: number;
  reviewDate: string;
}

const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'full-time',
    status: 'active',
    applications: 45,
    postedDate: '2024-01-10',
    closingDate: '2024-02-10'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco, CA',
    type: 'full-time',
    status: 'active',
    applications: 23,
    postedDate: '2024-01-08',
    closingDate: '2024-02-08'
  },
  {
    id: '3',
    title: 'Customer Support Representative',
    department: 'Customer Service',
    location: 'Remote',
    type: 'part-time',
    status: 'closed',
    applications: 67,
    postedDate: '2023-12-15',
    closingDate: '2024-01-15'
  }
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    status: 'interview',
    appliedDate: '2024-01-12',
    experience: '5+ years',
    rating: 4.5
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 234-5678',
    position: 'Marketing Manager',
    status: 'offer',
    appliedDate: '2024-01-10',
    experience: '7+ years',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    position: 'Customer Support Representative',
    status: 'hired',
    appliedDate: '2023-12-20',
    experience: '3+ years',
    rating: 4.2
  }
];

const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: '1',
    employeeName: 'Alice Johnson',
    reviewPeriod: 'Q4 2023',
    status: 'completed',
    overallRating: 4.5,
    goals: 8,
    completedGoals: 7,
    reviewDate: '2024-01-05'
  },
  {
    id: '2',
    employeeName: 'Bob Smith',
    reviewPeriod: 'Q4 2023',
    status: 'in-progress',
    overallRating: 0,
    goals: 6,
    completedGoals: 4,
    reviewDate: '2024-01-20'
  },
  {
    id: '3',
    employeeName: 'Carol Davis',
    reviewPeriod: 'Q4 2023',
    status: 'pending',
    overallRating: 0,
    goals: 5,
    completedGoals: 5,
    reviewDate: '2024-01-25'
  }
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    draft: 'bg-yellow-100 text-yellow-800',
    applied: 'bg-blue-100 text-blue-800',
    screening: 'bg-purple-100 text-purple-800',
    interview: 'bg-orange-100 text-orange-800',
    offer: 'bg-green-100 text-green-800',
    hired: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const RecruitmentModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Jobs</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockJobPostings.filter(job => job.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently hiring</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockJobPostings.reduce((sum, job) => sum + job.applications, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>In Interview</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCandidates.filter(c => c.status === 'interview').length}
            </div>
            <p className="text-xs text-muted-foreground">Candidates</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Hired</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCandidates.filter(c => c.status === 'hired').length}
            </div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Postings */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>Manage active job postings and track applications</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Job Posting
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Closing Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockJobPostings.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-muted-foreground">{job.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {job.type.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(job.closingDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Candidates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Candidates</CardTitle>
          <CardDescription>Track candidate progress through the hiring pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">{candidate.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{candidate.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(candidate.status)}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(candidate.appliedDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const PerformanceModule = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPerformanceReviews.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Completed Reviews</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPerformanceReviews.filter(r => r.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">Company average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Goal Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Average completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Reviews */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>Track employee performance and review cycles</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Review
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Review Period</TableHead>
                <TableHead>Goals Progress</TableHead>
                <TableHead>Overall Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Review Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPerformanceReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="font-medium">{review.employeeName}</div>
                  </TableCell>
                  <TableCell>{review.reviewPeriod}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${(review.completedGoals / review.goals) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm">{review.completedGoals}/{review.goals}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {review.overallRating > 0 ? (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{review.overallRating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not rated</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(review.status)}>
                      {review.status.replace('-', ' ').charAt(0).toUpperCase() + review.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(review.reviewDate)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const EngagementModule = () => {
  const announcements = [
    {
      id: '1',
      title: 'New Remote Work Policy',
      content: 'Updated guidelines for remote work arrangements are now available.',
      date: '2024-01-15',
      priority: 'high',
      department: 'All'
    },
    {
      id: '2',
      title: 'Team Building Event',
      content: 'Join us for the quarterly team building event next Friday.',
      date: '2024-01-12',
      priority: 'medium',
      department: 'All'
    },
    {
      id: '3',
      title: 'Health Insurance Updates',
      content: 'Important changes to health insurance benefits for 2024.',
      date: '2024-01-10',
      priority: 'high',
      department: 'All'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Active Announcements</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Employee Satisfaction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-xs text-muted-foreground">Latest survey</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Open Grievances</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Pending resolution</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Company Announcements</CardTitle>
              <CardDescription>Internal communications and updates</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <Badge 
                      variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{formatDate(announcement.date)}</span>
                    <span>Department: {announcement.department}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* HR Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            HR Policies & Handbook
          </CardTitle>
          <CardDescription>Access company policies and employee handbook</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Employee Handbook', updated: '2024-01-01', pages: 45 },
              { title: 'Remote Work Policy', updated: '2024-01-15', pages: 8 },
              { title: 'Code of Conduct', updated: '2023-12-01', pages: 12 },
              { title: 'Benefits Guide', updated: '2024-01-01', pages: 23 },
              { title: 'Leave Policy', updated: '2023-11-15', pages: 6 },
              { title: 'Safety Guidelines', updated: '2023-10-01', pages: 15 }
            ].map((policy, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{policy.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Updated {formatDate(policy.updated)} • {policy.pages} pages
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const HRManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">HR Management</h1>
          <p className="text-muted-foreground">
            Comprehensive HR tools for recruitment, performance management, and employee engagement
          </p>
        </div>

        <Tabs defaultValue="recruitment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recruitment" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Recruitment & Onboarding
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Performance Management
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Employee Engagement
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recruitment">
            <RecruitmentModule />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceModule />
          </TabsContent>
          
          <TabsContent value="engagement">
            <EngagementModule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};