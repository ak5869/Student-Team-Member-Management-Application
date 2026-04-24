# Team FourX – Student Team Members Management Application

## Project Description

A full-stack web application for managing student team members. Built with **React.js** (frontend) and **Node.js + Express + MongoDB** (backend). The app allows users to add new team members with profile photos, view all members in a card layout, and access detailed individual profiles.

## Technologies Used

| Layer     | Technology               |
| --------- | ------------------------ |
| Frontend  | React.js (Vite)          |
| Backend   | Node.js + Express.js     |
| Database  | MongoDB                  |
| Styling   | CSS + Tailwind CSS       |
| HTTP      | Axios                    |
| Uploads   | Multer                   |

## Project Structure

```
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── MemberCard.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AddMember.jsx
│   │   │   ├── ViewMembers.jsx
│   │   │   └── MemberDetails.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Node.js Backend
│   ├── models/
│   │   └── Member.js
│   ├── routes/
│   │   └── memberRoutes.js
│   ├── uploads/             # Stored profile images
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation & Setup

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (running locally or via MongoDB Atlas)
- **MongoDB Compass** (optional – for GUI data management)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/team-fourx.git
cd team-fourx
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/teamDB
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/api/members`       | Retrieve all team members      |
| GET    | `/api/members/:id`   | Retrieve a single member by ID |
| POST   | `/api/members`       | Add a new team member          |

### Testing in Browser

- **GET all members:** Open `http://localhost:5000/api/members`
- **GET single member:** Open `http://localhost:5000/api/members/<member_id>`

## Features

1. **Home Page** – Welcome page with team name, navigation links, and member count
2. **Add Member** – Form with name, role, email, and image upload with validation
3. **View Members** – Card layout displaying all team members with photos
4. **Member Details** – Detailed profile page for each member

## How to Run the App

1. Start MongoDB: `mongod`
2. Start backend: `cd server && npm run dev`
3. Start frontend: `cd client && npm run dev`
4. Open browser: `http://localhost:5173`

## Team

**Team FourX**
