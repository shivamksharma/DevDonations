'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { addDonation } from '@/services/firebase/donations';
import { toast } from '@/shared/hooks/use-toast';

interface AddDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDonationDialog({ open, onOpenChange }: AddDonationDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    category: '',
    itemType: '',
    quantity: '',
    condition: '',
    description: '',
    pickupAddress: '',
    preferredPickupDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDonation({
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        donorPhone: formData.donorPhone,
        items: [{
          id: `item-${Date.now()}`,
          category: formData.category,
          type: formData.itemType,
          quantity: parseInt(formData.quantity) || 1,
          condition: formData.condition as 'excellent' | 'good' | 'fair',
          description: formData.description,
        }],
        totalItems: parseInt(formData.quantity) || 1,
        status: 'pending',
        location: formData.pickupAddress,
        notes: formData.preferredPickupDate ? `Preferred pickup: ${formData.preferredPickupDate}` : '',
      });

      toast.success('Donation added successfully', {
        description: 'The donation has been added to the system.',
      });

      // Reset form
      setFormData({
        donorName: '',
        donorEmail: '',
        donorPhone: '',
        category: '',
        itemType: '',
        quantity: '',
        condition: '',
        description: '',
        pickupAddress: '',
        preferredPickupDate: '',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error adding donation:', error);
      toast.error('Failed to add donation', {
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
          <DialogTitle>Add New Donation</DialogTitle>
          <DialogDescription>
            Enter the details of the donation to add it to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donorName">Donor Name *</Label>
              <Input
                id="donorName"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="donorEmail">Email *</Label>
              <Input
                id="donorEmail"
                type="email"
                value={formData.donorEmail}
                onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donorPhone">Phone Number *</Label>
              <Input
                id="donorPhone"
                type="tel"
                value={formData.donorPhone}
                onChange={(e) => setFormData({ ...formData, donorPhone: e.target.value })}
                placeholder="9876543210"
                pattern="[6-9]\d{9}"
                maxLength={10}
                title="Please enter a valid 10-digit Indian mobile number (starting with 6-9)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                  <SelectItem value="household">Household Items</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemType">Item Type *</Label>
              <Input
                id="itemType"
                value={formData.itemType}
                onChange={(e) => setFormData({ ...formData, itemType: e.target.value })}
                placeholder="e.g., Winter Jackets, Laptop"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition *</Label>
            <Select
              value={formData.condition}
              onValueChange={(value) => setFormData({ ...formData, condition: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
                <SelectItem value="poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about the donation..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address *</Label>
            <Textarea
              id="pickupAddress"
              value={formData.pickupAddress}
              onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
              placeholder="Enter full pickup address..."
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredPickupDate">Preferred Pickup Date</Label>
            <Input
              id="preferredPickupDate"
              type="date"
              value={formData.preferredPickupDate}
              onChange={(e) => setFormData({ ...formData, preferredPickupDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
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
              {loading ? 'Adding...' : 'Add Donation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
