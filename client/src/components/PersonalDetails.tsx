import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCV } from '@/context/CVContext';
import PhotoUpload from './PhotoUpload';

export default function PersonalDetails() {
  const { cvData, updateCVData } = useCV();

  return (
    <Card data-testid="section-personal-details">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <PhotoUpload />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={cvData.fullName}
              onChange={(e) => updateCVData('fullName', e.target.value)}
              data-testid="input-fullname"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="Senior Software Engineer"
              value={cvData.jobTitle}
              onChange={(e) => updateCVData('jobTitle', e.target.value)}
              data-testid="input-jobtitle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={cvData.email}
              onChange={(e) => updateCVData('email', e.target.value)}
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={cvData.phone}
              onChange={(e) => updateCVData('phone', e.target.value)}
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="San Francisco, CA"
              value={cvData.location}
              onChange={(e) => updateCVData('location', e.target.value)}
              data-testid="input-location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              Website / LinkedIn
            </Label>
            <Input
              id="website"
              placeholder="linkedin.com/in/johndoe"
              value={cvData.website}
              onChange={(e) => updateCVData('website', e.target.value)}
              data-testid="input-website"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
