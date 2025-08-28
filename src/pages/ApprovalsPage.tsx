import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, User, Calendar, MessageSquare, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';

interface ApprovalRequest {
  id: string;
  type: 'leave' | 'shift-swap' | 'overtime' | 'schedule-change';
  employeeName: string;
  employeeId: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  details: any;
  reason?: string;
  approverNotes?: string;
}

const mockApprovals: ApprovalRequest[] = [
  {
    id: '1',
    type: 'leave',
    employeeName: 'John Smith',
    employeeId: 'EMP001',
    requestDate: '2024-01-15',
    status: 'pending',
    priority: 'medium',
    details: {
      startDate: '2024-01-22',
      endDate: '2024-01-24',
      leaveType: 'Vacation',
      days: 3
    },
    reason: 'Family vacation planned for several months'
  },
  {
    id: '2',
    type: 'shift-swap',
    employeeName: 'Alice Johnson',
    employeeId: 'EMP002',
    requestDate: '2024-01-14',
    status: 'pending',
    priority: 'high',
    details: {
      originalShift: '2024-01-20 09:00-17:00',
      swapWith: 'Bob Wilson',
      newShift: '2024-01-18 14:00-22:00'
    },
    reason: 'Medical appointment that cannot be rescheduled'
  },
  {
    id: '3',
    type: 'overtime',
    employeeName: 'Carol Davis',
    employeeId: 'EMP003',
    requestDate: '2024-01-13',
    status: 'approved',
    priority: 'medium',
    details: {
      date: '2024-01-17',
      hours: 4,
      justification: 'Project deadline requires additional work'
    },
    reason: 'Critical project delivery deadline',
    approverNotes: 'Approved due to project requirements'
  },
  {
    id: '4',
    type: 'schedule-change',
    employeeName: 'Dave Brown',
    employeeId: 'EMP004',
    requestDate: '2024-01-12',
    status: 'rejected',
    priority: 'low',
    details: {
      currentSchedule: 'Monday-Friday 9:00-17:00',
      requestedSchedule: 'Tuesday-Saturday 10:00-18:00',
      effectiveDate: '2024-02-01'
    },
    reason: 'Childcare schedule change',
    approverNotes: 'Cannot accommodate due to coverage requirements'
  },
  {
    id: '5',
    type: 'leave',
    employeeName: 'Eve Wilson',
    employeeId: 'EMP005',
    requestDate: '2024-01-11',
    status: 'pending',
    priority: 'high',
    details: {
      startDate: '2024-01-25',
      endDate: '2024-01-25',
      leaveType: 'Sick Leave',
      days: 1
    },
    reason: 'Medical procedure scheduled'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'leave':
      return Calendar;
    case 'shift-swap':
      return User;
    case 'overtime':
      return Clock;
    case 'schedule-change':
      return Calendar;
    default:
      return MessageSquare;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const ApprovalDetailDialog = ({ approval, onApprove, onReject }: { 
  approval: ApprovalRequest;
  onApprove: (id: string, notes: string) => void;
  onReject: (id: string, notes: string) => void;
}) => {
  const [notes, setNotes] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = () => {
    if (action === 'approve') {
      onApprove(approval.id, notes);
    } else if (action === 'reject') {
      onReject(approval.id, notes);
    }
    setNotes('');
    setAction(null);
  };

  const renderDetails = () => {
    switch (approval.type) {
      case 'leave':
        return (
          <div className="space-y-2">
            <div><strong>Leave Type:</strong> {approval.details.leaveType}</div>
            <div><strong>Start Date:</strong> {formatDate(approval.details.startDate)}</div>
            <div><strong>End Date:</strong> {formatDate(approval.details.endDate)}</div>
            <div><strong>Duration:</strong> {approval.details.days} day(s)</div>
          </div>
        );
      case 'shift-swap':
        return (
          <div className="space-y-2">
            <div><strong>Original Shift:</strong> {approval.details.originalShift}</div>
            <div><strong>Swap With:</strong> {approval.details.swapWith}</div>
            <div><strong>New Shift:</strong> {approval.details.newShift}</div>
          </div>
        );
      case 'overtime':
        return (
          <div className="space-y-2">
            <div><strong>Date:</strong> {formatDate(approval.details.date)}</div>
            <div><strong>Additional Hours:</strong> {approval.details.hours}</div>
            <div><strong>Justification:</strong> {approval.details.justification}</div>
          </div>
        );
      case 'schedule-change':
        return (
          <div className="space-y-2">
            <div><strong>Current Schedule:</strong> {approval.details.currentSchedule}</div>
            <div><strong>Requested Schedule:</strong> {approval.details.requestedSchedule}</div>
            <div><strong>Effective Date:</strong> {formatDate(approval.details.effectiveDate)}</div>
          </div>
        );
      default:
        return <div>No additional details available.</div>;
    }
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {approval.type.charAt(0).toUpperCase() + approval.type.slice(1).replace('-', ' ')} Request
        </DialogTitle>
        <DialogDescription>
          Review and approve or reject this request from {approval.employeeName}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Employee Info */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Employee Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <span className="ml-2">{approval.employeeName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Employee ID:</span>
              <span className="ml-2">{approval.employeeId}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Request Date:</span>
              <span className="ml-2">{formatDate(approval.requestDate)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Priority:</span>
              <Badge className={getPriorityColor(approval.priority)} size="sm">
                {approval.priority.charAt(0).toUpperCase() + approval.priority.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div>
          <h4 className="font-medium mb-3">Request Details</h4>
          {renderDetails()}
        </div>

        {/* Reason */}
        <div>
          <h4 className="font-medium mb-2">Reason</h4>
          <p className="text-sm text-muted-foreground">{approval.reason}</p>
        </div>

        {/* Approval Actions */}
        {approval.status === 'pending' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="notes">Approval Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes or comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="destructive" 
                onClick={() => setAction('reject')}
                disabled={action !== null}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                onClick={() => setAction('approve')}
                disabled={action !== null}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
            
            {action && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm mb-3">
                  Are you sure you want to {action} this request?
                </p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setAction(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>
                    Confirm {action.charAt(0).toUpperCase() + action.slice(1)}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Existing Decision */}
        {approval.status !== 'pending' && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Decision</h4>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(approval.status)}>
                {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
              </Badge>
            </div>
            {approval.approverNotes && (
              <p className="text-sm text-muted-foreground">{approval.approverNotes}</p>
            )}
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export const ApprovalsPage = () => {
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredApprovals = mockApprovals.filter(approval => {
    const statusMatch = filter === 'all' || approval.status === filter;
    const typeMatch = typeFilter === 'all' || approval.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const pendingCount = mockApprovals.filter(a => a.status === 'pending').length;
  const approvedCount = mockApprovals.filter(a => a.status === 'approved').length;
  const rejectedCount = mockApprovals.filter(a => a.status === 'rejected').length;
  const highPriorityCount = mockApprovals.filter(a => a.priority === 'high' && a.status === 'pending').length;

  const handleApprove = (id: string, notes: string) => {
    console.log('Approving request', id, 'with notes:', notes);
    // Handle approval logic
  };

  const handleReject = (id: string, notes: string) => {
    console.log('Rejecting request', id, 'with notes:', notes);
    // Handle rejection logic
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Approvals Dashboard</h1>
          <p className="text-muted-foreground">
            Review and manage employee requests requiring approval
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting decision
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>High Priority</CardTitle>
            <MessageSquare className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
            <p className="text-xs text-muted-foreground">
              Urgent requests
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="type-filter">Request Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="leave">Leave Requests</SelectItem>
                  <SelectItem value="shift-swap">Shift Swaps</SelectItem>
                  <SelectItem value="overtime">Overtime</SelectItem>
                  <SelectItem value="schedule-change">Schedule Changes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredApprovals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3>No requests found</h3>
              <p className="text-muted-foreground text-center">
                No requests match the current filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredApprovals.map((approval) => {
            const TypeIcon = getTypeIcon(approval.type);
            return (
              <Card key={approval.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>
                          {approval.type.charAt(0).toUpperCase() + approval.type.slice(1).replace('-', ' ')} Request
                        </CardTitle>
                        <CardDescription>
                          {approval.employeeName} • Submitted {formatDate(approval.requestDate)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(approval.priority)} size="sm">
                        {approval.priority.charAt(0).toUpperCase() + approval.priority.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(approval.status)}>
                        {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {approval.reason}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Employee ID: {approval.employeeId}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <ApprovalDetailDialog 
                          approval={approval}
                          onApprove={handleApprove}
                          onReject={handleReject}
                        />
                      </Dialog>
                      
                      {approval.status === 'pending' && (
                        <>
                          <Button variant="destructive" size="sm">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};