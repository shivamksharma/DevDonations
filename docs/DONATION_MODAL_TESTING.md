# Donation Modal Testing Guide

## 🧪 Manual Testing Checklist

### Pre-Testing Setup
1. Ensure Firebase is configured and running
2. Start development server: `npm run dev`
3. Test in both light and dark mode
4. Test on different screen sizes (mobile, tablet, desktop)

---

## Step 1: User Information

### Test Cases

✅ **TC1.1: Valid Input**
- Enter valid name (e.g., "John Doe")
- Enter valid WhatsApp number (e.g., "+1234567890")
- Click "Next"
- **Expected**: Proceed to Step 2

✅ **TC1.2: Invalid Name**
- Enter single character name (e.g., "J")
- Click "Next"
- **Expected**: Error message "Name must be at least 2 characters"

✅ **TC1.3: Invalid WhatsApp Number**
- Enter invalid number (e.g., "123")
- Click "Next"
- **Expected**: Error message "WhatsApp number must be at least 10 digits"

✅ **TC1.4: Empty Fields**
- Leave fields empty
- Click "Next"
- **Expected**: Validation errors appear

✅ **TC1.5: Visual Styling**
- **Check**: Orange icons next to labels
- **Check**: Input fields have orange border on focus
- **Check**: Smooth animations when entering step
- **Check**: Dark mode has proper contrast

---

## Step 2: Donation Method

### Test Cases - Home Pickup

✅ **TC2.1: Select Home Pickup**
- Select "Home Pickup" radio button
- **Expected**: 
  - Address field appears with smooth animation
  - Date picker appears
  - Time slot selector appears
  - Orange accent on selected radio option

✅ **TC2.2: Fill Pickup Details**
- Enter address (minimum 10 characters)
- Select a future date from date picker
- Choose a time slot
- Add optional message
- Click "Next"
- **Expected**: Proceed to Step 3

✅ **TC2.3: Date Picker Validation**
- Try to select today's date
- **Expected**: Today is disabled
- Try to select date > 30 days from now
- **Expected**: Date is disabled

✅ **TC2.4: Short Address**
- Enter address < 10 characters
- Click "Next"
- **Expected**: Error message appears

✅ **TC2.5: Missing Required Fields**
- Select "Home Pickup"
- Leave address/date/time empty
- Click "Next"
- **Expected**: Validation errors appear

### Test Cases - Drop-off at Center

✅ **TC2.6: Select Drop-off**
- Select "Drop-off at Center" radio button
- **Expected**:
  - Address, date, time fields disappear with smooth animation
  - Drop-off locations display with orange accents
  - Location cards show address, hours, phone

✅ **TC2.7: Switch Between Options**
- Select "Home Pickup"
- Fill in address
- Switch to "Drop-off"
- **Expected**: Fields smoothly animate out
- Switch back to "Home Pickup"
- **Expected**: Previous data is preserved

✅ **TC2.8: Proceed with Drop-off**
- Select "Drop-off at Center"
- Click "Next"
- **Expected**: Proceed to Step 3 (no address/date/time required)

---

## Step 3: Items Selection

### Test Cases

✅ **TC3.1: Open Category**
- Click on a category (e.g., "men")
- **Expected**: Accordion expands smoothly
- **Check**: Items display in grid layout
- **Check**: Orange accents on UI elements

✅ **TC3.2: Add Items**
- Click + button on an item
- **Expected**: 
  - Quantity increases
  - Item card gets orange highlight
  - Summary section appears at bottom
  - Category shows item count badge

✅ **TC3.3: Remove Items**
- Click - button
- **Expected**: Quantity decreases
- **Expected**: When 0, orange highlight removed

✅ **TC3.4: Manual Quantity Entry**
- Click in quantity input field
- Type a number (e.g., 5)
- **Expected**: Accepts valid number
- Type invalid input (e.g., -1)
- **Expected**: Prevents invalid input

✅ **TC3.5: Selection Summary**
- Add multiple items
- **Expected**: 
  - Summary shows all selected items
  - Total count is accurate
  - Items displayed with orange badges
  - Green checkmark icon in summary card

✅ **TC3.6: No Items Selected**
- Don't select any items
- Click "Next"
- **Expected**: Error message "Please select at least one item to donate"

✅ **TC3.7: Proceed with Items**
- Select at least one item
- Click "Next"
- **Expected**: Proceed to Step 4 (Review)

---

## Step 4: Review & Submit

### Test Cases

✅ **TC4.1: Review All Information**
- Check Personal Information section
  - **Expected**: Name and WhatsApp displayed correctly
  - **Expected**: Orange user icon visible
  
✅ **TC4.2: Review Donation Method**
- For Home Pickup:
  - **Expected**: Badge shows "Home Pickup"
  - **Expected**: Address, date, time displayed
  - **Expected**: Date formatted properly (e.g., "November 15, 2025")
  - **Expected**: Time slot readable (e.g., "Morning (9 AM - 12 PM)")
- For Drop-off:
  - **Expected**: Badge shows "Drop-off at Center"

✅ **TC4.3: Review Items**
- **Expected**: All selected items listed with quantities
- **Expected**: Total items count accurate
- **Expected**: Items displayed in cards with orange badges

✅ **TC4.4: Edit Functionality**
- Click "Edit" on Personal Information
- **Expected**: Navigate back to Step 1
- **Expected**: Previous data preserved
- Return to review step
- **Expected**: Changes reflected

✅ **TC4.5: Edit All Sections**
- Test edit button for each section
- **Expected**: Navigation works for all steps
- **Expected**: Data preserved throughout

---

## Final Submission

### Test Cases

✅ **TC5.1: Successful Submission**
- Click "Submit" button
- **Expected**:
  - Button shows loading state with spinner
  - Button text changes to "Submitting..."
  - Button is disabled during submission
  - Loading toast appears
  - Success toast appears after completion
  - Success toast shows: "Thank you for your donation!"
  - Modal closes automatically
  - Form resets

✅ **TC5.2: Firebase Integration**
- After successful submission, check Firebase Console
- **Expected**: 
  - New document in 'donations' collection
  - All fields correctly saved
  - Status is 'pending'
  - createdAt timestamp is present

✅ **TC5.3: Error Handling**
- Simulate Firebase error (disconnect internet)
- Click "Submit"
- **Expected**:
  - Error toast appears
  - Error message is clear
  - Modal stays open
  - Can retry submission

---

## Navigation & UX

### Test Cases

✅ **TC6.1: Progress Indicator**
- Navigate through all steps
- **Expected**:
  - Current step has orange ring
  - Completed steps show green checkmark
  - Future steps are gray
  - Step numbers/names visible on larger screens

✅ **TC6.2: Back Button**
- From any step, click "Back"
- **Expected**: 
  - Navigate to previous step
  - Data is preserved
  - Smooth animation

✅ **TC6.3: Cancel/Close**
- Click "Cancel" on Step 1
- **Expected**: Modal closes
- Click X button (if visible)
- **Expected**: Modal closes
- Click outside modal
- **Expected**: Modal closes
- Reopen modal
- **Expected**: Form is reset

✅ **TC6.4: Step Counter**
- Check bottom of modal
- **Expected**: Shows "Step X of 4"

---

## Responsive Design

### Mobile (< 640px)

✅ **TC7.1: Mobile Layout**
- Test on mobile viewport
- **Expected**:
  - Progress bar remains readable
  - Step descriptions hidden
  - Single column layout
  - Buttons stack vertically
  - Touch targets are adequate
  - Modal fits screen height

### Tablet (640px - 1024px)

✅ **TC7.2: Tablet Layout**
- Test on tablet viewport
- **Expected**:
  - 2-column grid for items
  - 2-column grid for pickup details
  - Better spacing than mobile

### Desktop (> 1024px)

✅ **TC7.3: Desktop Layout**
- Test on desktop viewport
- **Expected**:
  - Full step descriptions visible
  - Optimal spacing and sizing
  - Max width constraint for readability

---

## Dark Mode

### Test Cases

✅ **TC8.1: Theme Toggle**
- Switch to dark mode
- **Expected**:
  - All text readable with proper contrast
  - Orange accents visible but not overwhelming
  - Background colors appropriate (orange-950 tones)
  - Border colors subtle but visible
  - No jarring color switches

✅ **TC8.2: Input States in Dark Mode**
- Focus on input fields
- **Expected**: Orange borders visible
- Hover over buttons
- **Expected**: Proper hover states

✅ **TC8.3: Cards in Dark Mode**
- Check all card components
- **Expected**:
  - Summary cards readable
  - Drop-off location cards have proper contrast
  - Item selection cards visible

---

## Accessibility

### Test Cases

✅ **TC9.1: Keyboard Navigation**
- Navigate using Tab key
- **Expected**: 
  - All interactive elements accessible
  - Focus indicators visible
  - Logical tab order

✅ **TC9.2: Screen Reader**
- Use screen reader (e.g., NVDA, JAWS)
- **Expected**:
  - Labels properly announced
  - Error messages read aloud
  - Button states announced
  - Step information conveyed

✅ **TC9.3: Form Labels**
- Check all form fields
- **Expected**:
  - All fields have visible labels
  - Required indicators (* asterisk)
  - Helper text where appropriate

---

## Performance

### Test Cases

✅ **TC10.1: Animation Performance**
- Navigate between steps rapidly
- **Expected**: Smooth 60fps animations
- No jank or stuttering

✅ **TC10.2: Large Dataset**
- Add many items (quantity 99 each)
- **Expected**: 
  - Selection summary handles large numbers
  - No performance degradation
  - Submission works correctly

✅ **TC10.3: Modal Open/Close**
- Open and close modal multiple times
- **Expected**: 
  - No memory leaks
  - Consistent behavior
  - Proper cleanup

---

## Edge Cases

### Test Cases

✅ **TC11.1: Special Characters**
- Enter special characters in name (e.g., "O'Brien", "José García")
- **Expected**: Accepts valid international names

✅ **TC11.2: Long Address**
- Enter very long address (200+ characters)
- **Expected**: 
  - Field expands appropriately
  - Text wraps in review step

✅ **TC11.3: Browser Refresh**
- Fill form halfway
- Refresh browser
- **Expected**: Form resets (acceptable behavior)

✅ **TC11.4: Multiple Submissions**
- Submit form
- Reopen modal
- **Expected**: 
  - Form is completely reset
  - No previous data lingering

---

## Browser Compatibility

Test in the following browsers:

✅ **Chrome** (Latest)
✅ **Firefox** (Latest)
✅ **Safari** (Latest)
✅ **Edge** (Latest)
✅ **Mobile Safari** (iOS)
✅ **Chrome Mobile** (Android)

For each browser, verify:
- All animations work
- Date picker functions correctly
- Toasts appear properly
- Orange colors render correctly
- No console errors

---

## Bug Report Template

If you encounter issues, report using this template:

```
**Bug Description**: 
[Clear description of the issue]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**: 
[What should happen]

**Actual Behavior**: 
[What actually happens]

**Environment**:
- Browser: 
- OS: 
- Screen Size: 
- Theme: Light/Dark

**Screenshots**: 
[If applicable]

**Console Errors**: 
[Any errors from browser console]
```

---

## Success Criteria

All test cases should pass with:
- ✅ No console errors
- ✅ Smooth animations
- ✅ Proper validation
- ✅ Successful Firebase submission
- ✅ Correct conditional logic
- ✅ Beautiful orange theme
- ✅ Perfect dark mode
- ✅ Responsive on all sizes

---

**Happy Testing! 🎉**
