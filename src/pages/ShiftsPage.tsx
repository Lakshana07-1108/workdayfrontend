import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  department: string;
  status: 'upcoming' | 'completed' | 'in-progress';
  colleagues?: string[];
}

const mockShifts: Shift[] = [
  {
    id: '1',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '17:00',
    duration: '8h',
    location: 'Main Office - Floor 3',
    department: 'Customer Service',
    status: 'upcoming',
    colleagues: ['Alice Johnson', 'Bob Smith', 'Carol Davis']
  },
  {
    id: '2',
    date: '2024-01-16',
    startTime: '08:30',
    endTime: '16:30',
    duration: '8h',
    location: 'Main Office - Floor 3',
    department: 'Customer Service',
    status: 'upcoming',
    colleagues: ['Dave Wilson', 'Eve Brown']
  },
  {
    id: '3',
    date: '2024-01-17',
    startTime: '10:00',
    endTime: '18:00',
    duration: '8h',
    location: 'Main Office - Floor 3',
    department: 'Customer Service',
    status: 'upcoming',
    colleagues: ['Alice Johnson', 'Frank Miller']
  },
  {
    id: '4',
    date: '2024-01-12',
    startTime: '09:00',
    endTime: '17:00',
    duration: '8h',
    location: 'Main Office - Floor 3',
    department: 'Customer Service',
    status: 'completed',
    colleagues: ['Bob Smith', 'Carol Davis']
  },
  {
    id: '5',
    date: '2024-01-11',
    startTime: '08:00',
    endTime: '16:00',
    duration: '8h',
    location: 'Main Office - Floor 3',
    department: 'Customer Service',
    status: 'completed',
    colleagues: ['Alice Johnson', 'Dave Wilson']
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export const ShiftsPage = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  const upcomingShifts = mockShifts.filter(shift => shift.status === 'upcoming');
  const completedShifts = mockShifts.filter(shift => shift.status === 'completed');
  
  const totalHoursThisWeek = upcomingShifts.reduce((total, shift) => {
    return total + parseInt(shift.duration);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>My Shifts</h1>
          <p className="text-muted-foreground">
            View your work schedule and upcoming shifts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Previous Week
          </Button>
          <Button variant="outline" size="sm">
            Next Week
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHoursThisWeek}h</div>
            <p className="text-xs text-muted-foreground">
              Total scheduled hours
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Upcoming Shifts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingShifts.length}</div>
            <p className="text-xs text-muted-foreground">
              In the next 7 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Department</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">CS</div>
            <p className="text-xs text-muted-foreground">
              Customer Service
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Shifts Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
          <TabsTrigger value="completed">Completed Shifts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingShifts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3>No upcoming shifts</h3>
                <p className="text-muted-foreground text-center">
                  You don't have any shifts scheduled for the upcoming week.
                </p>
              </CardContent>
            </Card>
          ) : (
            upcomingShifts.map((shift) => (
              <Card key={shift.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {formatDate(shift.date)}
                        <Badge className={getStatusColor(shift.status)}>
                          {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {shift.startTime} - {shift.endTime} ({shift.duration})
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{shift.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Working with {shift.colleagues?.length || 0} colleagues</span>
                    </div>
                  </div>
                  {shift.colleagues && shift.colleagues.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Team Members:</p>
                      <div className="flex flex-wrap gap-2">
                        {shift.colleagues.map((colleague, index) => (
                          <Badge key={index} variant="secondary">
                            {colleague}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedShifts.map((shift) => (
            <Card key={shift.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {formatDate(shift.date)}
                      <Badge className={getStatusColor(shift.status)}>
                        {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {shift.startTime} - {shift.endTime} ({shift.duration})
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{shift.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Worked with {shift.colleagues?.length || 0} colleagues</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};