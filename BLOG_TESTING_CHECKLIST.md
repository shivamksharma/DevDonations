# Blog System Testing Checklist

## 🔧 Firebase Setup

- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`
- [ ] Deploy Storage rules: `firebase deploy --only storage:rules`
- [ ] Verify Firebase Storage is enabled in Firebase Console
- [ ] Verify Firestore database is initialized

## 👨‍💼 Admin Panel Testing

### Navigation
- [ ] Admin sidebar shows "Blogs" menu item with FileText icon
- [ ] Clicking "Blogs" navigates to `/admin/blogs`

### Dashboard
- [ ] Stats cards display correctly (Total, Published, Drafts)
- [ ] Stats update in real-time when blogs are added/deleted
- [ ] "Create Blog Post" button is visible

### Blog Editor Dialog - Create
- [ ] Click "Create Blog Post" opens dialog
- [ ] Title field validates (min 5 characters)
- [ ] Summary field validates (20-200 characters)
- [ ] Content field validates (min 50 characters)
- [ ] Image URL field accepts valid URLs
- [ ] Upload button opens file picker
- [ ] Image upload works (max 5MB)
- [ ] Uploaded image displays in preview
- [ ] Can remove uploaded image
- [ ] Author field is pre-filled with user email
- [ ] Status dropdown has Draft/Published/Archived options
- [ ] Form submission creates blog in Firestore
- [ ] Auto-generates slug from title
- [ ] Success toast appears on creation
- [ ] Dialog closes after successful creation

### Blog Editor Dialog - Edit
- [ ] Click edit icon on blog opens dialog with pre-filled data
- [ ] All fields show existing blog data
- [ ] Can modify all fields
- [ ] Image preview shows existing image
- [ ] Form submission updates blog in Firestore
- [ ] Success toast appears on update
- [ ] Dialog closes after successful update

### Blogs Table
- [ ] Table displays all blogs
- [ ] Shows featured image thumbnail
- [ ] Displays title and summary
- [ ] Shows author name
- [ ] Displays status badge with correct color
- [ ] Shows creation date in "MMM d, yyyy" format
- [ ] Real-time updates when blogs change
- [ ] Search works for title, summary, and author
- [ ] Status filter works (All, Draft, Published)
- [ ] Empty state shows when no blogs found

### Blog Actions
- [ ] View icon opens preview dialog
- [ ] Preview dialog shows all blog details
- [ ] Preview renders HTML content correctly
- [ ] Edit icon opens editor dialog
- [ ] Delete icon opens confirmation dialog
- [ ] Confirming delete removes blog from Firestore
- [ ] Success toast appears on deletion
- [ ] Canceling delete closes dialog without deleting

## 🏠 Homepage Testing

### Blog Section
- [ ] Blog section appears on homepage
- [ ] Shows "Latest Stories & Insights" heading
- [ ] Displays 3 most recent published blogs
- [ ] Only shows published blogs (not drafts)
- [ ] Doesn't render if no published blogs exist
- [ ] Blog cards show featured images
- [ ] Cards display title, summary, author, date
- [ ] Hover animation works (card rises)
- [ ] Image scales on hover
- [ ] "Read More" link animates on hover
- [ ] Clicking card navigates to `/blog/[slug]`
- [ ] "View All Posts" button appears if 3+ blogs
- [ ] "View All Posts" links to `/blog`
- [ ] Section animates on scroll

## 📝 Blog Detail Page

### Page Load
- [ ] Navigate to `/blog/[slug]` loads blog
- [ ] Shows 404 message for non-existent slug
- [ ] Shows 404 message for draft blogs (non-admin)
- [ ] Loading state displays while fetching

### Content Display
- [ ] Featured image displays correctly
- [ ] Title renders properly
- [ ] Author name shows
- [ ] Publication date shows in "MMMM d, yyyy" format
- [ ] Reading time estimate displays
- [ ] Summary displays in blockquote style
- [ ] Content renders HTML correctly
- [ ] Prose styling applies to content
- [ ] Images in content are responsive
- [ ] Links in content work
- [ ] Blockquotes styled correctly
- [ ] Code blocks styled correctly

### SEO
- [ ] Page title includes blog title
- [ ] Meta description uses blog summary
- [ ] OG tags present in HTML head
- [ ] Twitter Card tags present
- [ ] Featured image used for social preview

### Navigation
- [ ] "Back to Home" button at top
- [ ] "Back to Home" button at bottom
- [ ] Both navigation buttons work

## 📚 Blog List Page

### Page Load
- [ ] Navigate to `/blog` loads all published blogs
- [ ] Shows header "Our Blog"
- [ ] Shows search bar
- [ ] Loading state displays while fetching

### Blog Grid
- [ ] Displays blogs in responsive grid (2-3 columns)
- [ ] Shows all published blogs
- [ ] Blog cards match homepage design
- [ ] Cards animate on page load
- [ ] Hover effects work

### Search
- [ ] Search bar is functional
- [ ] Filters by title
- [ ] Filters by summary
- [ ] Filters by author
- [ ] Shows "No blogs found" when search has no results
- [ ] Updates results in real-time as typing

### Navigation
- [ ] "Back to Home" button displays
- [ ] "Back to Home" button works
- [ ] Clicking blog card navigates to detail page

## 🔒 Security Testing

### Firestore Rules
- [ ] Unauthenticated users can read published blogs
- [ ] Unauthenticated users cannot read drafts
- [ ] Unauthenticated users cannot create blogs
- [ ] Unauthenticated users cannot update blogs
- [ ] Unauthenticated users cannot delete blogs
- [ ] Authenticated non-admin cannot create blogs
- [ ] Authenticated non-admin cannot update blogs
- [ ] Authenticated non-admin cannot delete blogs
- [ ] Authenticated admin can create blogs
- [ ] Authenticated admin can update blogs
- [ ] Authenticated admin can delete blogs
- [ ] Authenticated admin can read drafts

### Storage Rules
- [ ] Anyone can read blog images
- [ ] Unauthenticated users cannot upload images
- [ ] Authenticated non-admin cannot upload images
- [ ] Authenticated admin can upload images
- [ ] Image size limit enforced (5MB)
- [ ] Only image files accepted

## 🎨 Responsive Design

### Mobile (< 768px)
- [ ] Admin table is scrollable horizontally
- [ ] Blog cards stack in single column
- [ ] Blog detail page is readable
- [ ] Images scale correctly
- [ ] Navigation is accessible
- [ ] Dialogs fit on screen

### Tablet (768px - 1024px)
- [ ] Blog cards show 2 columns
- [ ] Admin table is readable
- [ ] All buttons are accessible
- [ ] Images display properly

### Desktop (> 1024px)
- [ ] Blog cards show 3 columns
- [ ] Admin table shows all columns
- [ ] Maximum content width maintained
- [ ] Layout is balanced

## 🌓 Dark Mode

- [ ] Blog section looks good in dark mode
- [ ] Blog cards are readable in dark mode
- [ ] Blog detail page is readable in dark mode
- [ ] Admin panel is readable in dark mode
- [ ] Images display correctly in both modes
- [ ] Code blocks are readable in dark mode

## ⚡ Performance

- [ ] Homepage loads quickly
- [ ] Blog list page loads quickly
- [ ] Blog detail page loads quickly
- [ ] Admin dashboard loads quickly
- [ ] Images load with Next.js optimization
- [ ] No console errors
- [ ] Real-time updates don't lag
- [ ] Search is responsive

## 🐛 Error Handling

- [ ] Invalid slug shows 404 page
- [ ] Network errors show appropriate messages
- [ ] Failed image upload shows error toast
- [ ] Form validation errors display correctly
- [ ] Missing required fields prevent submission
- [ ] Invalid URLs rejected for images

## 📊 Data Integrity

- [ ] Slug is unique for each blog
- [ ] Slug is URL-safe (no spaces, special chars)
- [ ] Timestamps are stored correctly
- [ ] Author ID matches logged-in user
- [ ] Status can only be draft/published/archived
- [ ] Featured image URLs are valid

## 🎯 User Experience

- [ ] Loading states prevent confusion
- [ ] Success messages confirm actions
- [ ] Error messages are helpful
- [ ] Animations are smooth
- [ ] Hover states provide feedback
- [ ] Forms are intuitive
- [ ] Navigation is clear
- [ ] Content is readable

---

## Testing Commands

### Start Development Server
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Deploy Firebase Rules
```bash
firebase deploy --only firestore:rules,storage:rules
```

### Check for TypeScript Errors
```bash
npx tsc --noEmit
```

### Check for Lint Errors
```bash
npm run lint
```

---

## Quick Test Workflow

1. **Deploy Rules**
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```

3. **Login as Admin**
   - Navigate to `/admin/login`
   - Login with admin credentials

4. **Create Test Blog**
   - Go to `/admin/blogs`
   - Click "Create Blog Post"
   - Fill in all fields
   - Upload an image
   - Set status to "Published"
   - Submit

5. **Verify Homepage**
   - Go to `/`
   - Scroll to "Latest Stories & Insights"
   - Verify blog appears
   - Click blog card

6. **Verify Detail Page**
   - Check all content displays
   - Verify SEO meta tags
   - Test navigation

7. **Verify List Page**
   - Go to `/blog`
   - Verify blog appears
   - Test search
   - Click blog card

8. **Test Edit**
   - Go to `/admin/blogs`
   - Edit the blog
   - Verify changes save
   - Check homepage updates

9. **Test Delete**
   - Delete the blog
   - Verify removed from list
   - Verify removed from homepage

---

**Status**: Ready for testing ✅

Report any issues found during testing.
