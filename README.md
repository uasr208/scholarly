# Scholarly

Institutional dashboard and live portal for managing academic broadcasts.

Scholarly is a role-based content platform for educational institutions. Teachers upload lecture materials and live broadcasts, Principals approve or reject submissions, and students access approved live content without authentication.

## Features

- **Teacher dashboard**
  - Upload broadcast content with metadata and file attachments.
  - Client-side form validation with Zod and React Hook Form.
  - Track content status: Approved, Pending, Rejected.
- **Principal dashboard**
  - Review pending broadcasts.
  - Approve or reject with feedback.
  - View high-level operational metrics.
- **Student public portal**
  - Access broadcasts using a teacher-specific ID.
  - Public-facing live page without login.
  - Mobile-friendly broadcast cards.

## Tech Stack

- Framework: **Next.js 14** (App Router)
- Styling: **Tailwind CSS**
- Validation: **Zod** + **React Hook Form**
- API Client: **Axios**
- Icons: **Emoji-based UI icons**

## Project Structure

```text
src/
├── app/              # Route-based pages for public, teacher, and principal flows
│   ├── auth/         # Login and landing pages
│   ├── live/         # Public student-facing live route
│   ├── principal/    # Principal dashboard and approvals
│   └── teacher/      # Teacher workspace and content tools
├── components/       # Reusable UI components
├── layouts/          # Dashboard layout wrapper
├── schema/           # Validation schemas
└── services/         # API and authentication helpers
```

## Installation

```bash
git clone https://github.com/uasr208/scholarly.git
cd scholarly
npm install
```

## Run

```bash
npm run dev
```

Open the app at `http://localhost:3000`.

## Notes

- Authentication is currently mocked in `src/services/auth.service.js`.
- The public live page uses sample broadcast data and should be wired to a real API.
- The current app structure separates UI components from business logic to support future scaling.
