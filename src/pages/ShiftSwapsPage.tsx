import React, { useState } from 'react';
import { Plus, Clock, User, Calendar, MessageSquare, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useForm } from 'react-hook-form@7.55.0';

interface ShiftSwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  myShift: {
    date: string;
    startTime: string;
    endTime: string;
    location: string;
  };
  desiredShift: {
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    employeeName?: string;
  };
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdDate: string;
  responseDate?: string;
  notes?: string;
  type: 'direct' | 'open';
}

const mockShiftSwaps: ShiftSwapRequest[] = [
  {
    id: '1',
    requesterId: 'user1',
    requesterName: 'John Doe',
    myShift: {
      date: '2024-01-20',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Main Office - Floor 3'
    },
    desiredShift: {
      date: '2024-01-18',
      startTime: '14:00',
      endTime: '22:00',
      location: 'Main Office - Floor 3',
      employeeName: 'Alice Johnson'
    },
    reason: 'Medical appointment scheduled for Saturday morning',
    status: 'pending',
    createdDate: '2024-01-15',
    type: 'direct'
  },
  {
    id: '2',
    requesterId: 'user2',
    requesterName: 'Sarah Wilson',
    myShift: {
      date: '2024-01-22',
      startTime: '08:00',
      endTime: '16:00',
      location: 'Main Office - Floor 3'
    },
    desiredShift: {
      date: '2024-01-25',
      startTime: '10:00',
      endTime: '18:00',
      location: 'Main Office - Floor 3'
    },
    reason: 'Family event on Monday evening',
    status: 'approved',
    createdDate: '2024-01-12',
    responseDate: '2024-01-14',
    type: 'open'
  },
  {
    id: '3',
    requesterId: 'user1',
    requesterName: 'John Doe',
    myShift: {
      date: '2024-01-10',
      startTime: '10:00',
      endTime: '18:00',
      location: 'Main Office - Floor 3'
    },
    desiredShift: {
      date: '2024-01-12',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Main Office - Floor 3',
      employeeName: 'Bob Smith'
    },
    reason: 'Wedding to attend',
    status: 'completed',
    createdDate: '2024-01-05',
    responseDate: '2024-01-07',
    type: 'direct'
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
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return AlertCircle;
    case 'approved':
      return CheckCircle;
    case 'rejected':
      return XCircle;
    case 'completed':
      return CheckCircle;
    default:
      return AlertCircle;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const NewShiftSwapDialog = () => {
  const form = useForm({
    defaultValues: {
      shiftDate: '',
      swapType: '',
      targetEmployee: '',
      targetDate: '',
      reason: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log('Shift swap request:', data);
    // Handle form submission
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Request Shift Swap</DialogTitle>
        <DialogDescription>
          Request to swap your shift with a colleague
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="shiftDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Shift to Swap</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your shift" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-01-20">Jan 20 - 09:00 to 17:00</SelectItem>
                      <SelectItem value="2024-01-22">Jan 22 - 08:00 to 16:00</SelectItem>
                      <SelectItem value="2024-01-24">Jan 24 - 10:00 to 18:00</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="swapType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Swap Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select swap type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="direct">Direct Swap (with specific person)</SelectItem>
                      <SelectItem value="open">Open Request (any available person)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetEmployee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Employee (for direct swap)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select colleague" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alice">Alice Johnson</SelectItem>
                      <SelectItem value="bob">Bob Smith</SelectItem>
                      <SelectItem value="carol">Carol Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Only required for direct swaps
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Swap</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please explain why you need this shift swap..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export const ShiftSwapsPage = () => {
  const myRequests = mockShiftSwaps.filter(swap => swap.requesterId === 'user1');
  const availableRequests = mockShiftSwaps.filter(swap => swap.requesterId !== 'user1' && swap.status === 'pending');
  
  const pendingCount = myRequests.filter(swap => swap.status === 'pending').length;
  const approvedCount = myRequests.filter(swap => swap.status === 'approved').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Shift Swaps</h1>
          <p className="text-muted-foreground">
            Request shift swaps with your colleagues
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Swap Request
            </Button>
          </DialogTrigger>
          <NewShiftSwapDialog />
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Approved Swaps</CardTitle>
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
            <CardTitle>Available</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Open requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="my-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="available">Available Swaps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-requests" className="space-y-4">
          {myRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3>No swap requests</h3>
                <p className="text-muted-foreground text-center">
                  You haven't made any shift swap requests yet.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Request
                    </Button>
                  </DialogTrigger>
                  <NewShiftSwapDialog />
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            myRequests.map((swap) => {
              const StatusIcon = getStatusIcon(swap.status);
              return (
                <Card key={swap.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <StatusIcon className="h-5 w-5" />
                          Shift Swap Request
                          <Badge className={getStatusColor(swap.status)}>
                            {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Created on {formatDate(swap.createdDate)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Current Shift */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-red-600">Your Shift (to swap)</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(swap.myShift.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{swap.myShift.startTime} - {swap.myShift.endTime}</span>
                          </div>
                          <div className="text-muted-foreground">{swap.myShift.location}</div>
                        </div>
                      </div>
                      
                      {/* Desired Shift */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-green-600">Desired Shift</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(swap.desiredShift.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{swap.desiredShift.startTime} - {swap.desiredShift.endTime}</span>
                          </div>
                          <div className="text-muted-foreground">{swap.desiredShift.location}</div>
                          {swap.desiredShift.employeeName && (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{swap.desiredShift.employeeName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Reason:</h4>
                      <p className="text-sm text-muted-foreground">{swap.reason}</p>
                    </div>
                    
                    {swap.status === 'pending' && (
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit Request
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel Request
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4">
          {availableRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <User className="h-12 w-12 text-muted-foreground mb-4" />
                <h3>No available requests</h3>
                <p className="text-muted-foreground text-center">
                  There are no open shift swap requests from your colleagues.
                </p>
              </CardContent>
            </Card>
          ) : (
            availableRequests.map((swap) => (
              <Card key={swap.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Request from {swap.requesterName}</CardTitle>
                      <CardDescription>
                        Posted on {formatDate(swap.createdDate)}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(swap.status)}>
                      Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* They offer */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-green-600">They Offer</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(swap.myShift.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{swap.myShift.startTime} - {swap.myShift.endTime}</span>
                        </div>
                        <div className="text-muted-foreground">{swap.myShift.location}</div>
                      </div>
                    </div>
                    
                    {/* They want */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-red-600">They Want</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(swap.desiredShift.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{swap.desiredShift.startTime} - {swap.desiredShift.endTime}</span>
                        </div>
                        <div className="text-muted-foreground">{swap.desiredShift.location}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Reason:</h4>
                    <p className="text-sm text-muted-foreground">{swap.reason}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm">
                      Accept Swap
                    </Button>
                    <Button variant="outline" size="sm">
                      Message {swap.requesterName}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};