'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { addVolunteer } from '@/services/firebase/volunteers';
import { toast } from '@/shared/hooks/use-toast';

interface InviteVolunteerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteVolunteerDialog({ open, onOpenChange }: InviteVolunteerDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    interests: '',
    address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addVolunteer({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        availability: formData.availability.split(',').map(a => a.trim()).filter(Boolean),
        location: formData.address,
        experienceLevel: 'beginner',
        completedTasks: 0,
        rating: 0,
        bio: formData.interests,
        status: 'pending',
      });

      toast.success('Volunteer invitation sent successfully', {
        description: 'The volunteer has been added to the system.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        interests: '',
        address: '',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error inviting volunteer:', error);
      toast.error('Failed to send invitation', {
        description: 'Please try again or contact support if the issue persists.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite Volunteer</DialogTitle>
          <DialogDescription>
            Add a new volunteer to the system. They will receive an email notification.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
                pattern="[6-9]\d{9}"
                maxLength={10}
                title="Please enter a valid 10-digit Indian mobile number (starting with 6-9)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability *</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="mornings">Mornings</SelectItem>
                  <SelectItem value="afternoons">Afternoons</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="e.g., Organization, Communication, Driving (comma separated)"
            />
            <p className="text-xs text-muted-foreground">Separate multiple skills with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Areas of Interest</Label>
            <Input
              id="interests"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              placeholder="e.g., Food Distribution, Community Events (comma separated)"
            />
            <p className="text-xs text-muted-foreground">Separate multiple interests with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter full address..."
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending Invitation...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
