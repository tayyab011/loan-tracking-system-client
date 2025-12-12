Loan Management System

This project is a full-stack MERN-based Loan Management System designed to handle everything from loan browsing to application processing in a structured and secure way. The goal of this system is to make loan-related tasks easier for users and provide managers/admins with clear tools to manage loans, applications, and user access. The interface is clean, responsive, and focused on delivering a smooth experience across all devices.

Live URL: https://loan-tracking-system.netlify.app

The platform is divided into three major roles—User, Manager, and Admin.
Users can explore different loan categories, check details, calculate interest, and submit loan applications through a fully validated form. Every application records the borrower’s information, selected loan details, income, purpose, and timestamp. A user can track their application status and payment status, which updates in real time.

Managers can create new loans with details like title, category, interest rate, maximum limit, EMI plans, required documents, images, and a visibility toggle for showing loans on the home page. Managers also review loan applications and approve or reject them based on eligibility. Application fee verification and handling is also included.

Admins have control over user accounts, including assigning roles and suspending users. When a user is suspended, login access is blocked for both email/password and Google login. This ensures proper security and prevents unauthorized access.

The system uses secure API handling with JWT, Axios interceptors, and protected routes. React Query keeps the UI updated without page reloads. All forms include proper validation, error handling, and instant feedback. The backend is built with Express and MongoDB, following a clean structure for controllers, routes, and middleware.

Key Features

Role-based authentication (User, Manager, Admin)

Loan creation and management with detailed fields

Loan application form with validation and live error handling

Application status tracking and payment status handling

Suspended users are fully restricted from logging in

Home page loan visibility toggle

Pagination, filtering, and search for large data sets

Secure backend protected with JWT and middleware

Real-time updates with React Query

Responsive UI using Tailwind CSS and DaisyUI

Firebase authentication with Google and email/password

Image upload support and timestamped loan creation

NPM Packages Used

React Router, React Hook Form, Axios, @tanstack/react-query, Firebase, SweetAlert2, React Icons, Tailwind CSS, DaisyUI, Express, MongoDB, JSONwebtoken, Cors, Dotenv, and a few additional utilities required for building the project.