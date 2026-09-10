# AssistLink Client

AssistLink is a full-stack web application that connects patients with the assistive devices they need. It manages the entire journey — from submitting a device request, through care center review and engineering, all the way to delivery.

## Description

The client is a **React (Vite)** application that provides the user interface for four roles: **Patient**, **Care Center**, **Engineer**, and **Admin**.

Users can:
- Sign up and log in
- Submit, review, and track device requests
- Search the AccessGUDID database for medical devices
- Manage users, care centers, and engineers (admin only)

## User Requirements

The web app is designed for four types of users:

### Patient
- Register and log in
- Submit a device request
- View request status and progress
- Add measurements after approval
- Update profile and delivery address

### Care Center Staff
- View requests from patients
- Approve or reject requests
- Assign engineers to approved requests
- Search AccessGUDID to select a device reference
- View patient details and measurements

### Engineer
- View assigned cases
- Update case status (In Progress → Ready for Delivery)

### Admin
- Manage all users (patients, care centers, engineers)
- Add, edit, and delete users
- Add and manage care centers
- Add and manage engineers
- View all requests in the system

## Technologies

- **React** — UI library
- **Vite** — build tool and dev server
- **React Router DOM** — client-side routing
- **Axios** — HTTP client for API requests (via fetch / axios)
- **Bootstrap** — used only for the side navigation
- **Custom CSS** — for the rest of the UI design
- **localStorage** — to persist the logged-in user

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:yasmeinabaza/assistlink-client.git
   cd assistlink-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure the backend server is running on `http://localhost:5000`

4. Start the dev server:
   ```bash
   npm run dev
   ```

The client runs on **http://localhost:5173**

## Project Structure

```
src/
├── components/        # Reusable components (Navbar, SideNav, Layout)
├── data/              # Sample data
├── pages/
│   ├── patient/       # Patient pages
│   ├── careCenter/    # Care Center pages
│   ├── engineer/      # Engineer pages
│   └── admin/         # Admin pages
├── services/
│   └── api.js         # All API calls to the backend
├── App.jsx            # Routing
├── main.jsx           # Entry point
└── index.css
```

## Third-Party API

The client uses the **AccessGUDID** API to search for medical devices:

```
https://accessgudid.nlm.nih.gov/api/v3/devices/implantable/list.json
```

## Authentication

After login, the user object is stored in `localStorage` and used across the app for role-based rendering and API calls (via the `x-role` header).

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@assistlink.com` | `password123` |
| Care Center | `amara.osei@assistlink.com` | `password123` |
| Engineer | `james.okafor@assistlink.com` | `password123` |
| Patient | `sarah.johnson@email.com` | `password123` |

## Author

Yasmein Abaza — HTU Special Topics in Computer Science 1 — 2025-2026