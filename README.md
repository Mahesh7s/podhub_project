🎙️ PodHub

A podcast platform designed for users, creators, and admins, providing seamless audio streaming, community engagement, and powerful creator tools.

With the growing popularity of podcasts, PodHub offers audio uploads, subscriptions, loyalty rewards, and analytics, making it easier for creators to share content and for users to enjoy and interact with it.

🚀 Project Goal

To build an interactive and scalable podcasting platform that helps:

🎧 Users discover, listen, and engage with podcasts

🎙️ Creators publish and manage their episodes while growing their audience

🛠️ Admins oversee platform activity, analytics, and moderation

✨ Features
🔐 Authentication & Security

User, Creator, and Admin registration/login

JWT-based authentication for secure access

🎧 Podcast Episodes

Upload audio episodes (via Cloudinary)

Browse and search episodes

Manage episodes (edit/delete)

💬 Comments & Replies

Add comments to episodes

Reply to existing comments

View episode-specific discussions

🔔 Subscriptions

Subscribe/unsubscribe to creators

View personal subscriptions

Creators can view their subscribers

🎁 Loyalty System

Earn loyalty points through activity

Track loyalty status and tiers

Admins can update loyalty logic

📊 Analytics & Insights

Creator dashboard with episode/subscriber analytics

Admin dashboard with platform-wide analytics

💸 Discounted Subscription Links

Creators generate discount codes

Users can redeem special subscription offers

🛠️ Admin Controls

Manage users, creators, and episodes

Moderate comments and content

Oversee loyalty rewards and engagement

🎨 Responsive & Modern UI

React + Vite frontend with TailwindCSS & Material UI

Works seamlessly on desktop and mobile devices

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mahesh7s/podhub_project.git
   cd backend
   cd frontend //for frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `backend/` directory with the following:

 Add your own details in the .env file with same keys

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the server:**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

   

🛠️ Tech Stack

Frontend: React, Vite, TailwindCSS, Material UI

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT

File Storage: Cloudinary (for audio uploads)

Deployment: Netlify (Frontend) + any Node.js hosting (Backend)
