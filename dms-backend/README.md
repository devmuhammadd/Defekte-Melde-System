# Volunteer Fire Brigade Administration Software - Backend

Welcome to the backend portion of the Volunteer Fire Brigade Administration Software! This section of the project focuses on providing APIs for managing tickets and user authentication.

## Project Overview

The backend handles the core functionalities of ticket management and user authentication. It ensures secure access and efficient handling of reported issues within the volunteer fire brigade.

## Running the Backend Server

To run the backend server locally, follow these steps:

1. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   ```

2. **Activate the Virtual Environment:**

   ```bash
   source venv/bin/activate
   ```

3. **Install Required Packages:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Database Migration:**
   Run database migrations to ensure the latest schema is in place.

   ```bash
   alembic upgrade head
   ```

5. **Start the Backend Server:**
   Launch the server using Uvicorn with auto-reload for development.
   ```bash
   uvicorn main:app --reload
   ```

## Available Endpoints

### Ticket Management

- `GET /api/tickets`: Retrieve all tickets.
- `GET /api/tickets/{ticket_id}`: Retrieve details of a specific ticket.
- `POST /api/tickets`: Create a new ticket.
- `PUT /api/tickets/{ticket_id}`: Update an existing ticket.
- `DELETE /api/tickets/{ticket_id}`: Delete a ticket.

### User Authentication

- `POST /login`: User login endpoint.
- `POST /register`: User sign up endpoint.

## Technical Stack

### Backend Framework

- **Framework:** Python FastAPI

### Database

- **Database:** PostgreSQL
- **ORM:** SQLAlchemy

### Running the Server

- **Server:** Uvicorn

### Dependencies

- All dependencies are listed in the `requirements.txt` file.

## Special Notes

- Ensure proper database configuration and connection before running the server.
- Adjust environment variables or configuration files as needed for different deployment environments.
