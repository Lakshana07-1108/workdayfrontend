import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { UniversalBackButton } from '../components/UniversalBackButton';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  FileText, 
  Clock, 
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '../components/ui/utils';

interface LeaveRequest {
  id: string;
  type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'bereavement';
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: Date;
  approvedBy?: string;
}

export const LeaveRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      type: 'vacation',
      startDate: new Date('2025-02-15'),
      endDate: new Date('2025-02-18'),
      days: 4,
      reason: 'Family vacation to Hawaii',
      status: 'approved',
      submittedDate: new Date('2025-01-20'),
      approvedBy: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'sick',
      startDate: new Date('2025-01-25'),
      endDate: new Date('2025-01-25'),
      days: 1,
      reason: 'Doctor appointment',
      status: 'pending',
      submittedDate: new Date('2025-01-24')
    },
    {
      id: '3',
      type: 'personal',
      startDate: new Date('2025-01-10'),
      endDate: new Date('2025-01-10'),
      days: 1,
      reason: 'Personal matters',
      status: 'rejected',
      submittedDate: new Date('2025-01-08')
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    reason: ''
  });

  const leaveBalances = {
    vacation: 15,
    sick: 8,
    personal: 3,
    maternity: 0,
    bereavement: 3
  };

  const leaveTypes = [
    { value: 'vacation', label: 'Vacation' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'bereavement', label: 'Bereavement Leave' }
  ];

  const calculateDays = () => {
    if (!newRequest.startDate || !newRequest.endDate) return 0;
    const diffTime = Math.abs(newRequest.endDate.getTime() - newRequest.startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmitRequest = () => {
    if (!newRequest.type || !newRequest.startDate || !newRequest.endDate || !newRequest.reason) {
      return;
    }

    const request: LeaveRequest = {
      id: (requests.length + 1).toString(),
      type: newRequest.type as LeaveRequest['type'],
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      days: calculateDays(),
      reason: newRequest.reason,
      status: 'pending',
      submittedDate: new Date()
    };

    setRequests([request, ...requests]);
    setNewRequest({ type: '', startDate: undefined, endDate: undefined, reason: '' });
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: LeaveRequest['status']) => {
    const variants = {
      pending: { variant: 'secondary' as const, icon: AlertCircle },
      approved: { variant: 'default' as const, icon: CheckCircle },
      rejected: { variant: 'destructive' as const, icon: XCircle }
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant}>
        <Icon className="mr-1 h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeColor = (type: LeaveRequest['type']) => {
    const colors = {
      vacation: 'bg-blue-100 text-blue-800',
      sick: 'bg-red-100 text-red-800',
      personal: 'bg-green-100 text-green-800',
      maternity: 'bg-purple-100 text-purple-800',
      bereavement: 'bg-gray-100 text-gray-800'
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      <UniversalBackButton />
      
      <div>
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <p className="text-muted-foreground">
          Manage your leave requests and view your available balances.
        </p>
      </div>

      {/* Leave Balances */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(leaveBalances).map(([type, balance]) => (
          <Card key={type}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance}</div>
              <p className="text-xs text-muted-foreground">days available</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Request Form and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>
                    View and manage your leave requests
                  </CardDescription>
                </div>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      New Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Submit Leave Request</DialogTitle>
                      <DialogDescription>
                        Fill out the details for your leave request.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Leave Type</Label>
                        <Select value={newRequest.type} onValueChange={(value) => setNewRequest({...newRequest, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                          <SelectContent>
                            {leaveTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !newRequest.startDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newRequest.startDate ? newRequest.startDate.toLocaleDateString() : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={newRequest.startDate}
                                onSelect={(date) => setNewRequest({...newRequest, startDate: date})}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !newRequest.endDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {newRequest.endDate ? newRequest.endDate.toLocaleDateString() : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={newRequest.endDate}
                                onSelect={(date) => setNewRequest({...newRequest, endDate: date})}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      {newRequest.startDate && newRequest.endDate && (
                        <div className="text-sm text-muted-foreground">
                          Total days: {calculateDays()}
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                          id="reason"
                          placeholder="Provide a reason for your leave request..."
                          value={newRequest.reason}
                          onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmitRequest}>
                        Submit Request
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getTypeColor(request.type))}>
                            {request.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {request.startDate.toLocaleDateString()} - {request.endDate.toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {request.reason}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {request.submittedDate.toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pending Requests:</span>
                <Badge variant="secondary">
                  {requests.filter(r => r.status === 'pending').length}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Approved This Year:</span>
                <Badge variant="default">
                  {requests.filter(r => r.status === 'approved').length}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Days Used:</span>
                <span>
                  {requests
                    .filter(r => r.status === 'approved')
                    .reduce((sum, r) => sum + r.days, 0)} days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Available:</span>
                <span>
                  {Object.values(leaveBalances).reduce((sum, balance) => sum + balance, 0)} days
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Quick Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Submit requests at least 2 weeks in advance</li>
                <li>• Sick leave can be submitted retroactively</li>
                <li>• Check with your manager for blackout dates</li>
                <li>• Leave balances reset annually</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};