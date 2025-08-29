import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  BarChart3, 
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Award
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative z-10">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl mb-6 font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Modern Workforce Management
              </h1>
            </div>
            <div className="animate-fade-in-up delay-200">
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Streamline your HR operations with our comprehensive workforce management platform. 
                From employee scheduling to payroll, we've got you covered.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Link to="/products/workforce-management">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl mb-4 font-bold">
              Everything You Need to Manage Your Workforce
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to efficiently manage employees, 
              track time, and streamline HR processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 animate-fade-in-up delay-100">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>
                  Comprehensive employee profiles, onboarding, and organizational charts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 animate-fade-in-up delay-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Shift Scheduling</CardTitle>
                <CardDescription>
                  Advanced scheduling tools with shift swapping and conflict detection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 animate-fade-in-up delay-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>
                  Accurate clock-in/out system with real-time attendance monitoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 animate-fade-in-up delay-400">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Leave Management</CardTitle>
                <CardDescription>
                  Streamlined leave requests, approvals, and balance tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 animate-fade-in-up delay-500">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Payroll Integration</CardTitle>
                <CardDescription>
                  Automated payroll processing with detailed payslip generation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-card to-card/50 animate-fade-in-up delay-600">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Role-based Access</CardTitle>
                <CardDescription>
                  Secure access controls with customizable permissions for different roles
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl mb-6 font-bold">
                Why Choose WorkForce Pro?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Increase Productivity</h3>
                    <p className="text-muted-foreground">
                      Automate manual processes and reduce administrative overhead
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Ensure Compliance</h3>
                    <p className="text-muted-foreground">
                      Stay compliant with labor laws and regulations automatically
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Real-time Insights</h3>
                    <p className="text-muted-foreground">
                      Make data-driven decisions with comprehensive analytics
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Mobile Access</h3>
                    <p className="text-muted-foreground">
                      Access everything from anywhere with our responsive design
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 animate-fade-in-right border border-primary/10 backdrop-blur-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl mb-4 font-semibold">Ready to get started?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of companies already using WorkForce Pro
                </p>
                <Button size="lg" asChild className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Link to="/login">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up delay-100">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="text-center animate-fade-in-up delay-200">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Companies</p>
            </div>
            <div className="text-center animate-fade-in-up delay-300">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center animate-fade-in-up delay-400">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};