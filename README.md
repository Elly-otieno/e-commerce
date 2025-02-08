# Exclusive - Online Store

## Project Overview
**Exclusive** is a responsive under development online store built with React and TypeScript. It features product management, authentication, cart functionality, filtering, admin dashboard and a user-friendly interface.

## Features
### Landing Page
- **Navigation Bar**: Includes company name, menu items, an interactive cart icon with a counter and a user icon.
- **Promotional Banner**
- **Product Listing on Featured page**: Grid-based display with category based filtering.
- **Testimonials Section**: Displays customer reviews with a rating system.
- **Footer**: Contains company information, contact details, and social media links.

### Product Card Functionality
- **Interactive Product View**: Clicking navigates to the detailed product page.
- **Cart Integration**:
  - Add to cart functionality.
  - Visual feedback on the cart icon.
  - Remove from cart option.
  - Cart count update animation.

### Admin Authentication
- Secure login page with:
  - Email and password fields.
  - Form validation and error handling.
  - Persistent authentication state.
- For trials use:
  - Admin:
    - **Email**: *admin@example.com*
    - **Password**: *admin123*
  - Normal User:
    - **Email**: *user@example.com*
    - **Password**: *user123*

### Admin Dashboard
- **Summary Section**:
  - Indications of total products, orders and revenue.
  - Order status comparison charts.
  - Revenue by category status overview.
- **Product Management**:
  - CRUD operations (Create, Read, Update, Delete) for products.
  - Edit and delete functionalities - For now both the funtiionalities do not update on the database as there is no connection. It just shows on the console.
  - New product creation form with validation - not updated on database.

## Technologies Used
- **React (TypeScript)**
- **React Router** (for navigation)
- **Tailwind CSS** (for styling)
- **React Context API** (for global state management)
- **React Hook Form** (for form validation)
- **React Hot Toast** (for notifications)
- **Recharts** (for analytics and dashboard charts)
- **Faker API** (for mock product data)
- **Lucide React** (for icons)

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/Elly-otieno/e-commerce.git
   cd e-commerce
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the project in your browser:
   ```
   http://localhost:5173
   ```

## Project Structure
```
e-commerce/
│── src/
│   ├── assets/
│   ├── context/
│   ├── components/
│   │   ├── layout/
│   │   ├── general/
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── AddProducts.tsx
│   │   │   ├── DashboardIndex.tsx
│   │   │   ├── ManageOrders.tsx
│   │   │   ├── ManageProducts.tsx
│   │   ├── Cart.tsx
│   │   ├── Landing.tsx
│   │   ├── NotFound.tsx
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── SingleProduct.tsx
│   ├── router/
│   ├── utils/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│── public/
│── package.json
│── README.md
```

## API Integration
- Products fetched from a mock API.
- Loading and error states handled.
- Form validation implemented for product creation and edits/updates.

## Future Improvements

- Implement a live CRUD operations on product with real endpoint.
- Add create account.
- Integrate with a payment gateway.
- Improve styling and user experience.
- Add more features like sorting, and searching.
- Implementing smooth transitions and faster page loads.
- Add scroll animations to elements.

## Version Control


## Deployment
- Checkout live app on: https://e-commerce-eight-gamma-53.vercel.app/.

---

### Contributors
- **Elly Okoth** - [GitHub Profile](https://github.com/Elly-otieno)

Happy coding! 🚀
