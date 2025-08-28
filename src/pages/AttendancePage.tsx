import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { UniversalBackButton } from '../components/UniversalBackButton';
import { 
  Clock, 
  Play, 
  Square, 
  Coffee, 
  Calendar,
  MapPin,
  Timer
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours: number;
  status: 'present' | 'absent' | 'late' | 'early-leave';
  location?: string;
}

export const AttendancePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);

  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2025-01-27',
      clockIn: '09:00',
      clockOut: '17:30',
      breakStart: '12:00',
      breakEnd: '13:00',
      totalHours: 7.5,
      status: 'present',
      location: 'Office - Main Building'
    },
    {
      id: '2',
      date: '2025-01-26',
      clockIn: '09:15',
      clockOut: '17:15',
      breakStart: '12:30',
      breakEnd: '13:30',
      totalHours: 7,
      status: 'late',
      location: 'Office - Main Building'
    },
    {
      id: '3',
      date: '2025-01-25',
      clockIn: '08:45',
      clockOut: '16:30',
      breakStart: '12:00',
      breakEnd: '13:00',
      totalHours: 6.75,
      status: 'early-leave',
      location: 'Remote'
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCurrentDateString = () => {
    return currentTime.toISOString().split('T')[0];
  };

  const handleClockIn = () => {
    const now = getCurrentTimeString();
    const today = getCurrentDateString();
    
    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      date: today,
      clockIn: now,
      totalHours: 0,
      status: 'present',
      location: 'Office - Main Building'
    };

    setTodayRecord(newRecord);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    if (!todayRecord) return;

    const now = getCurrentTimeString();
    const clockInTime = new Date(`2025-01-01 ${todayRecord.clockIn}`);
    const clockOutTime = new Date(`2025-01-01 ${now}`);
    const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

    const updatedRecord = {
      ...todayRecord,
      clockOut: now,
      totalHours: Math.round(totalHours * 100) / 100
    };

    setTodayRecord(updatedRecord);
    setAttendanceHistory([updatedRecord, ...attendanceHistory]);
    setIsClockedIn(false);
    setIsOnBreak(false);
  };

  const handleBreakToggle = () => {
    if (!todayRecord) return;

    const now = getCurrentTimeString();
    
    if (isOnBreak) {
      // End break
      setTodayRecord({
        ...todayRecord,
        breakEnd: now
      });
    } else {
      // Start break
      setTodayRecord({
        ...todayRecord,
        breakStart: now
      });
    }
    
    setIsOnBreak(!isOnBreak);
  };

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary',
      'early-leave': 'outline'
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const calculateWeeklyHours = () => {
    const thisWeek = attendanceHistory
      .filter(record => {
        const recordDate = new Date(record.date);
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        return recordDate >= weekStart;
      })
      .reduce((total, record) => total + record.totalHours, 0);
    
    return Math.round(thisWeek * 100) / 100;
  };

  const calculateMonthlyHours = () => {
    const thisMonth = attendanceHistory
      .filter(record => {
        const recordDate = new Date(record.date);
        const now = new Date();
        return recordDate.getMonth() === now.getMonth() && 
               recordDate.getFullYear() === now.getFullYear();
      })
      .reduce((total, record) => total + record.totalHours, 0);
    
    return Math.round(thisMonth * 100) / 100;
  };

  return (
    <div className="space-y-6">
      <UniversalBackButton />
      
      <div>
        <h1 className="text-3xl font-bold">Attendance Tracking</h1>
        <p className="text-muted-foreground">
          Track your daily attendance with clock-in/out and break management.
        </p>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Current Status</span>
            </CardTitle>
            <CardDescription>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-mono">
                {getCurrentTimeString()}
              </div>
              
              <div className="space-y-2">
                {!isClockedIn ? (
                  <Button onClick={handleClockIn} size="lg" className="w-full">
                    <Play className="mr-2 h-5 w-5" />
                    Clock In
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button onClick={handleClockOut} size="lg" variant="destructive" className="w-full">
                      <Square className="mr-2 h-5 w-5" />
                      Clock Out
                    </Button>
                    <Button 
                      onClick={handleBreakToggle} 
                      size="lg" 
                      variant={isOnBreak ? "default" : "outline"} 
                      className="w-full"
                    >
                      <Coffee className="mr-2 h-5 w-5" />
                      {isOnBreak ? 'End Break' : 'Start Break'}
                    </Button>
                  </div>
                )}
              </div>

              {todayRecord && (
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Clock In:</span>
                    <span>{todayRecord.clockIn}</span>
                  </div>
                  {todayRecord.clockOut && (
                    <div className="flex justify-between text-sm">
                      <span>Clock Out:</span>
                      <span>{todayRecord.clockOut}</span>
                    </div>
                  )}
                  {todayRecord.breakStart && (
                    <div className="flex justify-between text-sm">
                      <span>Break:</span>
                      <span>{todayRecord.breakStart} - {todayRecord.breakEnd || 'In progress'}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateWeeklyHours()}h</div>
              <p className="text-xs text-muted-foreground">
                Hours worked this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateMonthlyHours()}h</div>
              <p className="text-xs text-muted-foreground">
                Hours worked this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.2h</div>
              <p className="text-xs text-muted-foreground">
                Average hours per day
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>
            Your recent attendance records and time tracking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Break</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{record.clockIn || '-'}</TableCell>
                    <TableCell>{record.clockOut || '-'}</TableCell>
                    <TableCell>
                      {record.breakStart && record.breakEnd 
                        ? `${record.breakStart} - ${record.breakEnd}`
                        : record.breakStart 
                        ? `${record.breakStart} - In progress`
                        : '-'
                      }
                    </TableCell>
                    <TableCell>{record.totalHours}h</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{record.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(record.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};