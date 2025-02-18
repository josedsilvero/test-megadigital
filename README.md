## Code Challenge - Nest, Prisma, Postgres, Apollo, React

Build a fullstack app for managing salon appointments. 
This challenge evaluates your proficiency in both frontend and backend development, focusing on GraphQL, PostgreSQL, React, and TypeScript.

 
### Backend 
 
GraphQL API: Implement a GraphQL API that supports the following operations: 
 - [ ] Query: Fetch all appointments with their associated salon and service details
 - [ ] Mutation: Add a new appointment
 - [ ] Mutation: Update an existing appointment's details
 - [ ] Mutation: Delete an appointment
 
PostgreSQL Database: Use PostgreSQL to store the appointment data.
The db should include these tables:
 - [ ] salons with fields: id, name, location.
 - [ ] services with fields: id, salon_id, name, price.
 - [ ] appointments with fields: id, salonId, customerName, serviceName, appointmentTime.
 
Environment: 
   Use any Node.js framework (e.g., Express, Nest) to set up your GraphQL server.
 
### Frontend
 
Develop a simple **React** frontend that interacts with the GraphQL API.


Requirements:
 - [ ] Use **Apollo Client** to interact with the GraphQL API.
 - [ ]  Style the app minimally using plain CSS or a library like TailwindCSS, Material-UI or bootstrap.
 
Features:
 - [ ] View Appointments: Display a list of all appointments fetched from the backend.
 - [ ] Add Appointment: Provide a form to create a new appointment with these fields:
   - Customer Name
   - Salon
   - Service
   - Appointment Time
 
### Constraints 
 
 - [ ] Use clean code practices and adhere to design patterns.
 - [ ] Include a README file with:
   - [ ] Setup instructions.
   - [ ] Brief explanation of your approach.

---

## Running the project
- Run, in the root of the project:
  - `./run.sh`
- Follow the instructions on the script output
![Screenshot from 2025-02-18 00-57-01](https://github.com/user-attachments/assets/655b005e-3ca1-4f56-80d5-944a44e34939)

