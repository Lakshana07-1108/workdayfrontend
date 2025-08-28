import React, { useState } from 'react';
import { Calendar, Clock, Users, Search, Filter, Download, CheckCircle, XCircle, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'partial';
  location: string;
  notes?: string;
}

interface EmployeeStats {
  id: string;
  name: string;
  department: string;
  avatar: string;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  totalHours: number;
  averageHours: number;
  attendanceRate: number;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Smith',
    department: 'Customer Service',
    date: '2024-01-15',
    clockIn: '09:00',
    clockOut: '17:00',
    totalHours: 8,
    status: 'present',
    location: 'Main Office'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Alice Johnson',
    department: 'Sales',
    date: '2024-01-15',
    clockIn: '09:15',
    clockOut: '17:30',
    totalHours: 8.25,
    status: 'late',
    location: 'Main Office',
    notes: '15 minutes late due to traffic'
  },
  {
    id: '3',
    employeeId: 'EMP003',
    employeeName: 'Bob Wilson',
    department: 'IT',
    date: '2024-01-15',
    clockIn: null,
    clockOut: null,
    totalHours: 0,
    status: 'absent',
    location: 'N/A',
    notes: 'Sick leave approved'
  },
  {
    id: '4',
    employeeId: 'EMP004',
    employeeName: 'Carol Davis',
    department: 'HR',
    date: '2024-01-15',
    clockIn: '08:30',
    clockOut: '16:30',
    totalHours: 8,
    status: 'present',
    location: 'Main Office'
  },
  {
    id: '5',
    employeeId: 'EMP005',
    employeeName: 'Dave Brown',
    department: 'Customer Service',
    date: '2024-01-15',
    clockIn: '10:00',
    clockOut: '14:00',
    totalHours: 4,
    status: 'partial',
    location: 'Remote',
    notes: 'Half day - medical appointment'
  }
];

const mockEmployeeStats: EmployeeStats[] = [
  {
    id: 'EMP001',
    name: 'John Smith',
    department: 'Customer Service',
    avatar: '',
    presentDays: 20,
    absentDays: 1,
    lateDays: 2,
    totalHours: 168,
    averageHours: 8.2,
    attendanceRate: 95.2
  },
  {
    id: 'EMP002',
    name: 'Alice Johnson',
    department: 'Sales',
    avatar: '',
    presentDays: 19,
    absentDays: 2,
    lateDays: 3,
    totalHours: 156,
    averageHours: 7.8,
    attendanceRate: 91.3
  },
  {
    id: 'EMP003',
    name: 'Bob Wilson',
    department: 'IT',
    avatar: '',
    presentDays: 21,
    absentDays: 1,
    lateDays: 1,
    totalHours: 172,
    averageHours: 8.4,
    attendanceRate: 96.7
  },
  {
    id: 'EMP004',
    name: 'Carol Davis',
    department: 'HR',
    avatar: '',
    presentDays: 22,
    absentDays: 0,
    lateDays: 1,
    totalHours: 176,
    averageHours: 8.0,
    attendanceRate: 100
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'present':
      return 'bg-green-100 text-green-800';
    case 'absent':
      return 'bg-red-100 text-red-800';
    case 'late':
      return 'bg-yellow-100 text-yellow-800';
    case 'partial':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'present':
      return CheckCircle;
    case 'absent':
      return XCircle;
    case 'late':
      return AlertCircle;
    case 'partial':
      return Clock;
    default:
      return AlertCircle;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const DailyAttendanceView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredRecords = mockAttendanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const presentCount = mockAttendanceRecords.filter(r => r.status === 'present').length;
  const absentCount = mockAttendanceRecords.filter(r => r.status === 'absent').length;
  const lateCount = mockAttendanceRecords.filter(r => r.status === 'late').length;
  const totalEmployees = mockAttendanceRecords.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Active today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((presentCount / totalEmployees) * 100)}% attendance rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Late Arrivals</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((lateCount / totalEmployees) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Absent</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((absentCount / totalEmployees) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Customer Service">Customer Service</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance - {formatDate('2024-01-15')}</CardTitle>
          <CardDescription>
            Real-time attendance tracking for all employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => {
                const StatusIcon = getStatusIcon(record.status);
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {record.employeeName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{record.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>
                      {record.clockIn ? (
                        <span className="font-mono">{record.clockIn}</span>
                      ) : (
                        <span className="text-muted-foreground">--:--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.clockOut ? (
                        <span className="font-mono">{record.clockOut}</span>
                      ) : (
                        <span className="text-muted-foreground">--:--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.totalHours > 0 ? (
                        <span>{record.totalHours}h</span>
                      ) : (
                        <span className="text-muted-foreground">0h</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{record.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {record.notes || '-'}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const MonthlyStatsView = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStats = mockEmployeeStats.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* Monthly Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Statistics</CardTitle>
          <CardDescription>
            January 2024 attendance summary by employee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Present Days</TableHead>
                <TableHead>Absent Days</TableHead>
                <TableHead>Late Days</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Avg Hours/Day</TableHead>
                <TableHead>Attendance Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStats.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600 font-medium">{employee.presentDays}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-red-600 font-medium">{employee.absentDays}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-yellow-600 font-medium">{employee.lateDays}</span>
                  </TableCell>
                  <TableCell>{employee.totalHours}h</TableCell>
                  <TableCell>{employee.averageHours}h</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        employee.attendanceRate >= 95 ? 'text-green-600' :
                        employee.attendanceRate >= 90 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {employee.attendanceRate}%
                      </span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            employee.attendanceRate >= 95 ? 'bg-green-500' :
                            employee.attendanceRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${employee.attendanceRate}%` }}
                        />
                      </div>
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

export const TeamAttendancePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Team Attendance</h1>
          <p className="text-muted-foreground">
            Monitor and manage team attendance across the organization
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily">
          <DailyAttendanceView />
        </TabsContent>
        
        <TabsContent value="monthly">
          <MonthlyStatsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};