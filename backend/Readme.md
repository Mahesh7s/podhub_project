# PodHub Backend

This is the backend API for PodHub, a podcast platform supporting users, creators, and admins. It is built with Node.js, Express, MongoDB, and integrates with Cloudinary for audio uploads.

## Features

- User, Creator, and Admin authentication (JWT)
- Podcast episode upload (audio files via Cloudinary)
- Comments and replies on episodes
- Subscriptions (users can subscribe to creators)
- Loyalty points system
- Analytics for creators and admins
- Discounted subscription links (for creators)
- Admin user and episode management

## Requirements

- Node.js (v16+)
- MongoDB database
- Cloudinary account (for audio uploads)
- Express

## Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Mahesh7s/podhub_project.git
   cd backend
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

## API Endpoints

- `POST   /api/auth/register` - Register user/creator/admin
- `POST   /api/auth/login` - Login
- `GET    /api/episodes` - List all episodes
- `POST   /api/episodes/upload` - Upload episode (creator)
- `DELETE /api/episodes/:id` - Delete episode (creator/admin)
- `GET    /api/episodes/feed` - Get episodes not created by me
- `POST   /api/comments` - Add comment
- `POST   /api/comments/reply/:commentId` - Reply to comment
- `GET    /api/comments/:episodeId` - Get comments for episode
- `POST   /api/subscriptions` - Subscribe to creator
- `POST   /api/subscriptions/unsubscribe` - Unsubscribe from creator
- `GET    /api/subscriptions` - Get my subscriptions
- `GET    /api/subscriptions/creator-subscribers` - Get my subscribers (creator)
- `GET    /api/analytics/creator` - Get creator analytics
- `GET    /api/analytics/admin/all` - Get all analytics (admin)
- `GET    /api/loyalty` - Get my loyalty info
- `POST   /api/loyalty/update` - Update loyalty points (admin/logic)
- `POST   /api/subscription-links/generate` - Generate discount link (creator)
- `GET    /api/subscription-links/redeem/:code` - Redeem discount link

## Notes

- All protected routes require a JWT token in the `Authorization` header.
- Audio uploads use Cloudinary; ensure your credentials are correct.
- CORS is configured for the deployed frontend.

## License

MIT