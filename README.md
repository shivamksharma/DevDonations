# DevDonations 🌟

[![Project Status](https://img.shields.io/badge/status-active-brightgreen)](https://devdonation.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.15-blue)](https://github.com/shivamksharma/DevDonations/releases)

DevDonations is a full-stack platform connecting donors with developers in need through clothing donations. Our mission is to bridge the gap between surplus resources and community needs using modern web technologies.

## 🚀 Live Demo

Experience the platform live: [https://devdonation.vercel.app/](https://devdonation.vercel.app/)

![DevDonations Preview](/assets/screenshot_1.png)

## ✨ Features

### Core Functionality
- **Donation Management** (Reference: `components/donate/user-details-section.tsx` startLine:31, endLine:142)
  - Multi-step donation form with validation
  - Flexible pickup/dropoff scheduling
  - Real-time donation tracking
- **Admin Dashboard** (Reference: `app/admin/page.tsx` startLine:1, endLine:56)
  - Role-based access control
  - Real-time analytics & statistics
  - Donation status management
- **Volunteer System**
  - Volunteer application processing
  - Task assignment & tracking

### Technical Highlights
- Responsive UI with smooth animations
- Secure Firebase authentication
- Zustand state management
- Recharts-powered analytics
- Form validation with Zod & React Hook Form

## 🛠 Tech Stack

**Frontend:**
- Next.js 13 App Router
- TypeScript
- Tailwind CSS + Shadcn UI
- Framer Motion animations

**Backend:**
- Firebase Authentication
- Firestore Database
- Vercel Serverless Functions

**Utilities:**
- Zustand (State management)
- Zod (Validation)
- Recharts (Data visualization)
- React Hook Form (Form handling)

## 📦 Project Structure

```
DevDonations/
├── app/                # Core application logic
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and helpers
├── .eslintrc.json      # ESLint configuration
├── next.config.js      # Next.js configuration
├── tailwind.config.ts  # TailwindCSS configuration
├── tsconfig.json       # TypeScript configuration
```

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shivamksharma/DevDonations.git
   cd DevDonations
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

## ⚙️ Configuration

Ensure to set up environment variables in a `.env.local` file for:
- Database connection
- API keys
- Authentication secrets

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 💬 Contact

For questions or feedback:
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **GitHub**: [shivamksharma](https://github.com/shivamksharma)

---

Built with ❤️ by [Shivam Sharma](https://github.com/shivamksharma).

