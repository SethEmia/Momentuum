# Momentuum 🚀

## Overview

**Momentuum** is a full-stack task management application designed to help users organize, prioritize, and track their daily tasks efficiently.

This project is currently under active development and serves as a hands-on exploration of building modern web applications using React and .NET.

---

## Features

### ✅ Current

* Create new tasks
* View task list
* Priority tagging (Low, Medium, High)
* Basic frontend-backend integration

### 🚧 In Progress

* Edit and delete tasks
* Improved API error handling
* UI/UX enhancements

### 📌 Planned

* User authentication (JWT)
* Task filtering and sorting
* Due dates and reminders
* User-specific task management

---

## Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* CSS

### Backend

* .NET Web API
* RESTful architecture

### Database

* PostgreSQL

---

## Architecture

Momentuum follows a standard client-server architecture:

* The **React frontend** handles UI and user interaction
* The **.NET Web API** manages business logic and data processing
* The **database** stores task data persistently

Data flows through RESTful endpoints between the frontend and backend.

---

## Project Structure

```
momentuum/
├── momentuum.client/   # React frontend
├── Momentuum.Server/   # .NET Web API backend
```
---
## Getting Started

### Prerequisites

* Node.js
* .NET SDK
* PostgreSQL


---

### 1. Clone the repository

```
git clone https://github.com/your-username/momentuum.git
cd momentuum
```

---
### 2. Run the Application

Ensure configuration is set up first (see Configuration section).
```
cd Momentuum.Server
dotnet run
```
This will start:

The .NET backend API
The React frontend (via proxy)

Once running, open the application in your browser at:
https://localhost:xxxx (port will be shown in terminal)


---

## Roadmap

* [x] Task creation
* [x] Task listing
* [ ] Task editing
* [ ] Task deletion
* [x] Authentication (JWT)
* [ ] Habit CRUD
* [ ] Project CRUD
* [ ] Deployment

---

## Learning Objectives

This project focuses on:

* Building a full-stack application using React and .NET
* Designing RESTful APIs
* Managing client-server communication
* Structuring scalable frontend and backend codebases

---

## Status

🚧 Work in Progress — actively being developed as part of my full-stack development learning journey.

---

## Author

Seth Emia

* GitHub: https://github.com/SethEmia

---
