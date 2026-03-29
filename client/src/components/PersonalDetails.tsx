import { User, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCV } from '@/context/CVContext';
import PhotoUpload from './PhotoUpload';

export default function PersonalDetails() {
  const { cvData, updateCVData } = useCV();

  return (
    <Card data-testid="section-personal-details">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-col items-center gap-3">
          <PhotoUpload />
          <p className="text-xs text-muted-foreground text-center">
            Click to upload or drag &amp; drop. JPG, PNG or WebP.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="e.g. Jane Smith"
              value={cvData.fullName}
              onChange={(e) => updateCVData('fullName', e.target.value)}
              data-testid="input-fullname"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="jobTitle">Job Title *</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Senior Software Engineer"
              value={cvData.jobTitle}
              onChange={(e) => updateCVData('jobTitle', e.target.value)}
              data-testid="input-jobtitle"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={cvData.email}
              onChange={(e) => updateCVData('email', e.target.value)}
              data-testid="input-email"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
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

          <div className="space-y-1.5">
            <Label htmlFor="location" className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="City, Country"
              value={cvData.location}
              onChange={(e) => updateCVData('location', e.target.value)}
              data-testid="input-location"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="website" className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              Website / Portfolio
            </Label>
            <Input
              id="website"
              placeholder="yourportfolio.com"
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
