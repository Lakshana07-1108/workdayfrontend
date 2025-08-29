import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Camera,
  Save,
  Edit,
  Shield
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    department: user?.department || '',
    position: 'Senior Customer Service Representative',
    location: 'New York, NY',
    startDate: '2023-01-15',
    bio: 'Experienced customer service professional with a passion for helping customers and improving processes.',
    skills: ['Customer Service', 'Problem Solving', 'Communication', 'Team Leadership'],
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    }
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server
      console.log('Uploading image:', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Profile Management</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="h-5 w-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold">{profileData.name}</h3>
              <p className="text-muted-foreground">{profileData.position}</p>
              <Badge variant="outline" className="mt-2">
                <Shield className="h-3 w-3 mr-1" />
                {user?.role}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.department}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select 
                  value={profileData.department} 
                  onValueChange={(value) => setProfileData({...profileData, department: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer Service">Customer Service</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={profileData.position}
                  onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Skill
                  </Button>
                )}
              </div>
            </div>

            <Separator />

            {/* Emergency Contact */}
            <div>
              <h4 className="font-medium mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="emergency-name">Contact Name</Label>
                  <Input
                    id="emergency-name"
                    value={profileData.emergencyContact.name}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      emergencyContact: {...profileData.emergencyContact, name: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergency-relationship">Relationship</Label>
                  <Input
                    id="emergency-relationship"
                    value={profileData.emergencyContact.relationship}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      emergencyContact: {...profileData.emergencyContact, relationship: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergency-phone">Phone Number</Label>
                  <Input
                    id="emergency-phone"
                    value={profileData.emergencyContact.phone}
                    onChange={(e) => setProfileData({
                      ...profileData, 
                      emergencyContact: {...profileData.emergencyContact, phone: e.target.value}
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Employment Information */}
            <div>
              <h4 className="font-medium mb-4">Employment Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Start Date:</span>
                    <span className="ml-2">{formatDate(profileData.startDate)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Employee ID:</span>
                    <span className="ml-2">EMP001</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};