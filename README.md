# MERN Stack Project Management System

A complete project management system built with MongoDB, Express.js, React, and Node.js.

## Features

### Backend Features
- **User Authentication**: JWT-based authentication with role-based access
- **Project Management**: Create, read, update, delete projects
- **Task Management**: Full CRUD operations for tasks
- **Team Collaboration**: Assign users to projects and tasks
- **Status Tracking**: Track project and task status
- **Priority Management**: Set priorities for projects and tasks

### Frontend Features
- **Responsive Design**: Works on desktop and mobile devices
- **Dashboard**: Overview of all projects
- **Kanban Board**: Visual task management with drag-and-drop
- **Real-time Updates**: Dynamic status updates
- **User-friendly Interface**: Clean and intuitive design

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Context API**: State management

## Project Structure

```
mernfinal/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── tasks.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── project management system/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── ProjectForm.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── ProjectDetails.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx\n    ├── package.json\n    └── index.html\n```\n\n## Setup Instructions\n\n### Prerequisites\n- Node.js (v14 or higher)\n- MongoDB (local installation or MongoDB Atlas)\n- npm or yarn\n\n### Backend Setup\n\n1. **Navigate to backend directory**:\n   ```bash\n   cd backend\n   ```\n\n2. **Install dependencies**:\n   ```bash\n   npm install\n   ```\n\n3. **Environment Configuration**:\n   Update the `.env` file with your MongoDB connection string:\n   ```env\n   MONGODB_URI=mongodb://localhost:27017/project_management\n   JWT_SECRET=your_jwt_secret_key_here\n   PORT=5000\n   ```\n\n4. **Start MongoDB**:\n   - For local MongoDB: `mongod`\n   - For MongoDB Atlas: Use your connection string\n\n5. **Start the backend server**:\n   ```bash\n   npm run dev\n   ```\n   The server will run on `http://localhost:5000`\n\n### Frontend Setup\n\n1. **Navigate to frontend directory**:\n   ```bash\n   cd \"project management system\"\n   ```\n\n2. **Install dependencies**:\n   ```bash\n   npm install\n   ```\n\n3. **Start the development server**:\n   ```bash\n   npm run dev\n   ```\n   The frontend will run on `http://localhost:5173`\n\n## API Endpoints\n\n### Authentication\n- `POST /api/auth/register` - Register new user\n- `POST /api/auth/login` - Login user\n- `GET /api/auth/profile` - Get user profile\n\n### Projects\n- `GET /api/projects` - Get all projects\n- `POST /api/projects` - Create new project\n- `PUT /api/projects/:id` - Update project\n- `DELETE /api/projects/:id` - Delete project\n\n### Tasks\n- `GET /api/tasks` - Get all tasks\n- `GET /api/tasks?projectId=:id` - Get tasks by project\n- `POST /api/tasks` - Create new task\n- `PUT /api/tasks/:id` - Update task\n- `DELETE /api/tasks/:id` - Delete task\n\n## Usage\n\n1. **Register/Login**: Create an account or login with existing credentials\n2. **Create Projects**: Add new projects with details like name, description, dates, and priority\n3. **Manage Tasks**: Add tasks to projects, assign them, set priorities and due dates\n4. **Track Progress**: Use the Kanban board to move tasks through different stages\n5. **Team Collaboration**: Add team members to projects and assign tasks\n\n## User Roles\n\n- **Admin**: Full access to all features\n- **Manager**: Can create and manage projects, assign tasks\n- **Member**: Can view assigned projects and update task status\n\n## Database Schema\n\n### User Model\n```javascript\n{\n  name: String,\n  email: String (unique),\n  password: String (hashed),\n  role: String (admin/manager/member)\n}\n```\n\n### Project Model\n```javascript\n{\n  name: String,\n  description: String,\n  status: String (planning/active/completed/on-hold),\n  priority: String (low/medium/high),\n  startDate: Date,\n  endDate: Date,\n  owner: ObjectId (User),\n  members: [ObjectId (User)],\n  tasks: [ObjectId (Task)]\n}\n```\n\n### Task Model\n```javascript\n{\n  title: String,\n  description: String,\n  status: String (todo/in-progress/completed),\n  priority: String (low/medium/high),\n  assignedTo: ObjectId (User),\n  project: ObjectId (Project),\n  dueDate: Date,\n  createdBy: ObjectId (User)\n}\n```\n\n## Contributing\n\n1. Fork the repository\n2. Create a feature branch\n3. Make your changes\n4. Test thoroughly\n5. Submit a pull request\n\n## License\n\nThis project is licensed under the MIT License.\n\n## Support\n\nFor support, please open an issue in the GitHub repository.