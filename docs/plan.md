# Plan for the project Ticket Master 9000

Frontend: Next.js
Backend: Express.js
Database: better-sqlite3

## Entity

Ticket:
- id: guid
- createdAt: text
- usedAt: text
- deletedAt: text

## Frontend design

Simple design. One page.

2 button to toggle role (admin, user)

4 buttons:
- Create ticket
- Use ticket
- Delete ticket (soft-delete)
- List tickets

Role decide what you can do (user create and use only)

## Backend endpoints

Endpoints required:
- Create ticket (post /tickets)
- Use ticket (get /tickets, patch /ticket/:id/use)
- Delete ticket (patch /ticket/:id/delete)
- List all tickets (get /tickets)

Endpoints for roles? Roles handled in frontend UI only.