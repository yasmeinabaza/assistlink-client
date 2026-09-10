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
- Logout

### Care Center Staff
- View requests from patients
- Approve or reject requests
- Assign engineers to approved requests
- Search AccessGUDID to select a device reference
- View patient details and measurements
- Logout

### Engineer
- View assigned cases
- Update case status (Approved → In Progress → Delivered)
- Logout

### Admin
- Manage all users (patients, care centers, engineers)
- Add and delete users
- Toggle user status (active/inactive)
- Add and delete care centers
- Add and delete engineers
- View all requests in the system
- Logout

## Technologies

- **React** — UI library
- **Vite** — build tool and dev server
- **React Router DOM** — client-side routing
- **Axios** — HTTP client for API requests
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

3. Copy `.env.sample` to `.env` and adjust if needed:
   ```
   VITE_SERVER_URL=http://localhost:5000
   ```

4. Make sure the backend server is running on `http://localhost:5000`

5. Start the dev server:
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
