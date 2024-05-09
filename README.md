# Stuneckt Backend Assignment

This repository contains the backend solution for the Stuneckt Backend Assignment.

## Assignment Overview

The assignment is to develop a RESTful API for a social media platform. The API allows users to create posts, view all posts, view posts by a specific user, and paginate through the posts. Additionally, users can view their own posts.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ikunal-04/stuneckt.git
   ```

2. Install dependencies:

   ```bash
   cd stuneckt
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=<your_mongodb_uri>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

1. **Create a post**
   - **URL:** `/api/posts/create`
   - **Method:** `POST`
   - **Request Body:**
     ```json
     {
       "description": "Your post description"
     }
     ```
   - **Authorization:** Required

2. **Get all posts**
   - **URL:** `/api/posts/allposts`
   - **Method:** `GET`
   - **Query Parameters:**
     - `page` (optional): Page number for pagination (default is 1)
     - `limit` (optional): Number of posts per page (default is 10)

3. **Get posts by a specific user**
   - **URL:** `/api/posts/userposts`
   - **Method:** `GET`
   - **Authorization:** Required
   - **Query Parameters:**
     - `page` (optional): Page number for pagination (default is 1)
     - `limit` (optional): Number of posts per page (default is 10)

4. **Get User Details**
   - **URL:** `/api/user/profile`
   - **Method:** `GET`
   - **Authorization:** Required

5. **Create a post**
   - **URL:** `/api/user/update`
   - **Method:** `PUT`
   - **Request Body:**
     ```json
     {
       "name": "Your name",
       "email": "Your email"
     }
     ```
   - **Authorization:** Required

## Deployment

This application is deployed on vercel i.e. both the frontend and the backend api's.