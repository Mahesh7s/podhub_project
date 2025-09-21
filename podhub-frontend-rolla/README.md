# PodHub Frontend

This is the frontend for PodHub, a podcast platform for users, creators, and admins. Built with React, Vite, Tailwind CSS, and Material UI.

## Demo

[Live Demo](https://podcasthub7.netlify.app)

## Features

### For Users
- Register and login
- Browse and search podcast episodes
- Play audio episodes
- Comment and reply on episodes
- Subscribe/unsubscribe to creators
- View loyalty points and tier status

### For Creators
- Register and login as a creator
- Upload new podcast episodes (audio)
- Manage (edit/delete) own episodes
- View analytics for their episodes and subscribers
- Generate and share discounted subscription links
- View and manage comments on their episodes

### For Admins
- Register and login as an admin
- Manage all users, creators, and episodes
- View platform-wide analytics
- Moderate comments and content
- Update loyalty points and tiers for users

## Requirements

- Node.js (v16+)
- Backend API running (see [../backend/README.md](../backend/README.md))

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mahesh7s/podhub_project.git
   cd podhub-frontend-rolla
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `podhub-frontend-rolla/` directory:

   ```
   VITE_API_URL=http://localhost:3000/api
   ```

   > Change the URL if your backend is deployed elsewhere.

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

- `src/pages/` - Main pages and dashboard routes
- `src/components/` - Reusable components (auth forms, layout, etc.)
- `src/services/` - API service modules
- `src/contexts/` - React context providers (auth, theme)
- `src/assets/` - Images and static assets

## Notes

- The app uses localStorage for authentication tokens.
- Make sure the backend CORS allows your frontend origin.
- For production, update the API URL and CORS settings accordingly.

## License

MIT