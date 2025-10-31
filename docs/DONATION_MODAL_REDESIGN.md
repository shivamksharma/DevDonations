# Donation Modal Redesign - Documentation

## Overview

The Donation Modal has been completely redesigned with a modern, professional multi-step interface featuring smooth transitions, conditional logic, and a warm orange accent theme optimized for both light and dark modes.

## ✨ Key Features

### 🎯 Multi-Step Form Flow
- **Step 1: User Information** - Name and WhatsApp number
- **Step 2: Donation Method** - Pickup or drop-off selection with conditional fields
- **Step 3: Items Selection** - Interactive clothing item selector
- **Step 4: Review & Submit** - Complete summary with edit capabilities

### 🎨 Design Enhancements
- **Warm Orange Accents** - Professional orange theme throughout (#f97316)
- **Smooth Animations** - Framer Motion transitions between steps
- **Progress Indicator** - Visual step tracker with completion states
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark Mode Support** - Seamless light/dark theme compatibility

### 🔒 Conditional Logic
- Address, date, and time fields **only appear** when "Home Pickup" is selected
- Fields are **hidden** when "Drop-off at Center" is selected
- Smart validation ensures required fields are filled based on selection

### ✅ Validation & UX
- **Real-time validation** using react-hook-form + zod
- **Step-by-step validation** - Users can't proceed without completing required fields
- **Inline error messages** with clear feedback
- **Edit functionality** in review step to modify any previous step

### 🔥 Firebase Integration
- Real-time Firestore submission
- Loading states during submission
- Success/error toast notifications using Sonner

## 📁 File Structure

```
frontend/components/donate/
├── donation-modal.tsx                    # Main modal with step navigation
├── clothing-form-section.tsx             # Items selection wrapper
├── drop-off-locations.tsx               # Drop-off center info
├── steps/
│   ├── step-one-user-info.tsx          # Personal details step
│   ├── step-two-donation-method.tsx    # Method selection with conditional fields
│   ├── step-three-items.tsx            # Clothing items selection
│   └── step-four-review.tsx            # Review and submit step
└── clothing-selector/
    ├── category-accordion.tsx          # Expandable categories
    ├── clothing-grid.tsx               # Item grid layout
    ├── quantity-selector.tsx           # Quantity input controls
    └── selection-summary.tsx           # Selected items summary
```

## 🔧 Technical Implementation

### Schema with Conditional Validation

```typescript
// shared/utils/schemas/donation-form-schema.ts
export const donationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  whatsappNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid WhatsApp number")
    .min(10, "WhatsApp number must be at least 10 digits"),
  pickupType: z.enum(["pickup", "dropoff"]),
  address: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  items: z.array(z.object({
    type: z.string(),
    quantity: z.number().min(1),
  })).min(1),
}).refine(
  (data) => {
    // Validate pickup fields only when pickup is selected
    if (data.pickupType === "pickup") {
      return (
        data.address && data.address.length >= 10 &&
        data.preferredDate && data.preferredDate.length > 0 &&
        data.preferredTime && data.preferredTime.length > 0
      );
    }
    return true;
  },
  {
    message: "Address, date, and time are required for home pickup",
    path: ["pickupType"],
  }
);
```

### Step Validation

```typescript
const validateStep = async (step: number): Promise<boolean> => {
  let fieldsToValidate: (keyof DonationFormData)[] = [];
  
  switch (step) {
    case 0:
      fieldsToValidate = ["name", "whatsappNumber"];
      break;
    case 1:
      fieldsToValidate = ["pickupType"];
      const pickupType = form.getValues("pickupType");
      if (pickupType === "pickup") {
        fieldsToValidate.push("address", "preferredDate", "preferredTime");
      }
      break;
    case 2:
      fieldsToValidate = ["items"];
      break;
  }

  const result = await form.trigger(fieldsToValidate);
  return result;
};
```

### Conditional Field Rendering

```typescript
// Automatically shows/hides fields based on pickupType
<AnimatePresence mode="wait">
  {pickupType === "pickup" && (
    <motion.div
      key="pickup-details"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Address, Date, Time fields */}
    </motion.div>
  )}

  {pickupType === "dropoff" && (
    <motion.div
      key="dropoff-details"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
    >
      <DropOffLocations />
    </motion.div>
  )}
</AnimatePresence>
```

## 🎨 Orange Accent Theme

### Color Palette
- **Primary Orange**: `bg-orange-500`, `text-orange-500`
- **Hover States**: `hover:bg-orange-600`, `hover:border-orange-300`
- **Light Mode BG**: `bg-orange-50/50`, `border-orange-200`
- **Dark Mode BG**: `dark:bg-orange-950/20`, `dark:border-orange-800`

### Key Styled Components

1. **Progress Indicator**
   - Active step: Orange ring with orange background
   - Completed step: Green checkmark
   - Upcoming step: Muted gray

2. **Radio Buttons**
   - Selected: Orange border with orange background tint
   - Hover: Orange border on hover

3. **Input Fields**
   - Focus: Orange border (`focus:border-orange-500`)
   - Icons: Orange color for visual consistency

4. **Buttons**
   - Primary actions: Orange background
   - Submit: Green for final confirmation

5. **Summary Cards**
   - Orange accented borders and backgrounds
   - Orange icons for visual consistency

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
- Base: Single column layout
- sm (640px): 2-column grids for items
- md (768px): Enhanced layout with better spacing
- lg (1024px): Full desktop experience
```

## 🚀 Usage

The modal is already integrated into your application through the `DonateModalProvider`:

```tsx
// app/layout.tsx
import { DonateModalProvider } from "@/shared/components/donate-modal-provider";

<DonateModalProvider />
```

### Trigger the Modal

```tsx
import { useDonateModal } from "@/shared/lib/store/donate-modal-store";

function MyComponent() {
  const { openModal } = useDonateModal();
  
  return (
    <Button onClick={openModal}>
      Donate Now
    </Button>
  );
}
```

## 🔔 Toast Notifications

The modal uses **Sonner** for elegant toast notifications:

```typescript
// Loading state
const loadingToast = toast.loading("Submitting your donation...");

// Success
toast.success("Thank you for your donation!", {
  description: "We'll contact you shortly.",
  duration: 5000,
});

// Error
toast.error("Something went wrong", {
  description: "Please try again later.",
});
```

## ✅ Features Checklist

- ✅ Multi-step form with 4 steps
- ✅ Smooth Framer Motion animations
- ✅ Progress bar with visual feedback
- ✅ Conditional field rendering (pickup vs drop-off)
- ✅ Conditional validation with Zod
- ✅ Date picker with 30-day limit
- ✅ Time slot selection
- ✅ Clothing item selection with quantities
- ✅ Review step with edit capabilities
- ✅ Firebase Firestore integration
- ✅ Loading states
- ✅ Success/error toast notifications
- ✅ Warm orange accent theme
- ✅ Perfect light/dark mode support
- ✅ Mobile responsive
- ✅ Accessibility features
- ✅ No duplicate close buttons
- ✅ Clean, minimal design
- ✅ Professional visual hierarchy

## 🎯 Best Practices Implemented

1. **Form State Management**: React Hook Form for efficient form handling
2. **Type Safety**: Full TypeScript implementation
3. **Validation**: Zod schema with conditional logic
4. **Animation**: Smooth transitions without performance impact
5. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
6. **Error Handling**: Graceful error states with user feedback
7. **Loading States**: Clear feedback during async operations
8. **Code Organization**: Modular components for maintainability
9. **Consistent Styling**: Unified orange theme across all components
10. **Dark Mode**: Proper color contrast and visibility in both themes

## 🐛 Troubleshooting

### Date Picker Not Opening
- Ensure Calendar component is properly imported from shadcn/ui
- Check Popover z-index in dialog contexts

### Conditional Fields Not Showing
- Verify `pickupType` value is being watched correctly
- Check AnimatePresence mode is set to "wait"

### Toast Not Appearing
- Ensure Sonner's Toaster component is in your root layout
- Import toast from 'sonner', not from use-toast hook

### Form Not Submitting
- Check all required fields are filled
- Verify Firebase configuration is correct
- Check browser console for validation errors

## 🚧 Future Enhancements

Potential improvements for future iterations:

- [ ] Add image upload for donated items
- [ ] Implement draft saving (local storage)
- [ ] Add email notifications
- [ ] Include donation history for returning users
- [ ] Add Google Maps integration for pickup locations
- [ ] Implement multi-language support
- [ ] Add donation tracking after submission
- [ ] Include estimated pickup time calculations

## 📝 Notes

- The modal automatically resets when closed
- All animations are optimized for performance
- Form state persists during step navigation
- Validation occurs both on blur and on next/submit actions
- The orange theme (#f97316) matches warm, welcoming donation contexts

---

**Last Updated**: October 31, 2025
**Version**: 2.0.0
**Status**: Production Ready ✅
