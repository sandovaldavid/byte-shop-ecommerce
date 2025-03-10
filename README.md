# 🖥️ Byte Shop E-Commerce Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC)
![Sanity CMS](https://img.shields.io/badge/Sanity_CMS-3.23.4-f03e2f)
![License](https://img.shields.io/badge/license-MIT-green)

> ByteShop is a modern, full-featured e-commerce platform for tech products with a sleek UI, responsive design, and comprehensive user experience.

## 📱 Demo Screenshots

### 📱Mobile View

<div align="center">
  <img src="public/screenshots/mobile-home.png" alt="Mobile Home Screen" width="300"/>
</div>

### 💻 Desktop View

<div align="center">
  <img src="public/screenshots/desktop-home.png" alt="Desktop Home Screen" width="600"/>
</div>

## ✨ Features

- 🛍️ **Product Catalog** - Browse and search tech products by category
- 🔍 **Advanced Filtering** - Filter products by price, rating, brand and more
- 🛒 **Shopping Cart** - Add, remove and update items in your cart
- 💳 **Checkout Flow** - Secure and intuitive checkout process
- 👤 **User Profiles** - Personal account management
- ❤️ **Wishlist** - Save products for later purchase
- 🔐 **Authentication** - Secure login and registration system
- 📱 **Responsive Design** - Optimized for mobile, tablet and desktop
- 🌙 **Dark Mode** - Modern, eye-friendly dark interface
- 📦 **Order Tracking** - Track order status and history
- 🔔 **Notifications** - Real-time updates on orders and account activity
- 🔍 **Product Search** - Fast, relevant search functionality
- 📊 **User Dashboard** - Comprehensive account overview

## 🚀 Technologies Used

- **Frontend**:

    - ⚛️ [React](https://reactjs.org/) - UI Library
    - 📦 [Next.js](https://nextjs.org/) - React Framework
    - 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
    - 🎭 [Framer Motion](https://www.framer.com/motion/) - Animation Library
    - 📊 [React Icons](https://react-icons.github.io/react-icons/) - Icon Library

- **Backend & CMS**:

    - 📝 [Sanity](https://www.sanity.io/) - Headless CMS
    - 🔄 [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Backend API

- **DevOps & Tools**:
    - 📦 [npm](https://www.npmjs.com/) - Package Manager
    - 🧪 [ESLint](https://eslint.org/) - Code Linting
    - 🔧 [PostCSS](https://postcss.org/) - CSS Processing

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Sanity account (for CMS)

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/sandovaldavid/byte-shop-ecommerce.git
cd byte-shop-ecommerce
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment setup**

Create a .env file in the root directory based on .env.example:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

## 📁 Project Structure

```
byte-shop-ecommerce/
├── public/            # Static files
├── src/
│   ├── api/           # API endpoints
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   │   ├── layout/    # Layout components
│   │   ├── profile/   # User profile components
│   │   ├── products/  # Product-related components
│   │   └── ui/        # Reusable UI components
│   ├── lib/           # Helper functions and utilities
│   └── sanity/        # Sanity configuration and schemas
├── .sanity/           # Sanity runtime
└── .next/             # Next.js build output
```

## 🔧 Configuration

### Tailwind CSS

Tailwind is configured in tailwind.config.mjs. The theme includes custom colors, fonts, and responsive breakpoints.

### Sanity CMS

Content types and schemas are defined in sanity.config.js and the sanity directory.

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy --prod
```

### Other Hosting

```bash
npm run build
```

Deploy the .next folder to your hosting provider.

## 👥 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Project Link: [https://github.com/sandovaldavid/byte-shop-ecommerce](https://github.com/sandovaldavid/byte-shop-ecommerce)

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) - For hosting and deployment
- [Tailwind Labs](https://tailwindcss.com) - For the incredible CSS framework
- [Sanity.io](https://www.sanity.io) - For the powerful CMS capabilities
- All the open-source libraries that made this project possible

---

<div align="center">
  Made by David Sandoval
</div>
