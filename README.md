# SvelteKit Task Manager (Learning Project)

This project is a simple task management app built while learning SvelteKit and how to connect it with a real backend.  
The focus is on understanding routing, API endpoints, JWT auth, and basic CRUD with MongoDB.

It includes user registration, login, creating tasks, and a basic time-tracking feature.

## What the project does

- Register and login users (email + password)
- Passwords are hashed with bcrypt
- JWT-based authentication (no cookies)
- Token stored in localStorage
- Create, read, update, and delete tasks
- Each task supports:
  - Start / Stop time tracking
  - Stores time logs in MongoDB
  - Shows total time spent
- All API routes are protected using the JWT token

The UI is intentionally simple — the focus is backend logic + learning SvelteKit.

## Tech Stack

- SvelteKit (JavaScript)
- MongoDB (Atlas)
- JWT for authentication
- bcryptjs for hashing passwords

## Folder Overview
