# Max-Ticket

# Front-End

Welcome to Max-Ticket, the ultimate solution for seamlessly organizing and managing your Tickets. Our web application redefines the way you network and streamline your ticketing management process.

## Getting Started

MongoDB: in cloud i config for all Ip's make changes.

The project has Users.txt its have all users with password for check all project

To get started with this project, clone the repository and install dependencies:

```bash
git clone [repository-url]
cd [project-directory]
npm install
```

Ensure you have a MongoDB instance running and configure your `.env` file with the appropriate environment variables.

## Usage

Start the server:

```bash
npm start
```

Start the Vite

```bash
npm run dev
```

## Technology Stack

- **React**: The project is built using React, providing a modern and efficient user interface.
- **Joi**: Utilizing Joi for data validation, ensuring the accuracy and integrity of your user information.
- **React Router**: Employing React Router for smooth and dynamic navigation within the application.
- **Fetch**: Integrating for seamless API requests and interactions with the server.
- **Material-UI**: Enhancing the user experience with the sleek and customizable Material-UI components.
- **TailWindCss**: Tailwind CSS is a utility-first framework for rapid UI development using highly composable, responsive utility classes.
- **Framer-Motion**: Framer Motion is a library for creating animations in React apps, offering easy-to-use tools for UI transitions.

## Key Features

## Landing Page

where you can read about the product and, of course, contact us if you have any questions or follow us on social media

### Create Tickets

Every user in the system can create a ticket that includes a title, description, priority level, and an option to upload a photo.

### Manager Panel

Receives tickets opened by users and can assign them to a technician to view their status and move them to the archive if necessary. Of course, the manager can also create a ticket if needed."
All tickets you can Drag&Drop

### Technician Panel:

Displays the tickets assigned by the admin. The technician can update the status of the tickets based on the progress of troubleshooting
All tickets you can Drag&Drop

### Admin Panel

Can view all users and their tickets. The admin has the ability to change user names or delete them. For tickets, the admin can only delete. Additionally, the admin has access to view all pages for the purpose of auditing and improving the system as needed.

## How It Works

1. **Register and Log In**

   - Sign up for a free account using your email and a secure password.
   - Log in to access the full range of features our application has to offer.
   - Upon initial registration, the user is granted basic permissions to create an account. If the user is a technician or an admin, they must contact the main administrator to obtain the appropriate permissions needed to access the required pages.

2. **Create Your Ticket**

   - Utilize our user-friendly card creation tool, built with React and Material-UI, to design professional business cards.
   - To create a ticket, enter details such as title, description, priority level, and a photo. Following this, you will be contacted for further troubleshooting.

3. **Manage Ticket**

   - The manager will receive your ticket and then assign it to a technician who will follow up with the client

4. **Manage Users/Cards**
   - The administrator, if necessary, can also view all tickets and manage them in the same way as they manage users—deleting, changing permissions, and modifying their details. Regarding tickets, the administrator has the ability to delete them only.

# Back-End

## Technology Stack

- **MongoDB**: For storing data.
- **Express.js**: Web server framework.
- **Mongoose**: MongoDB object modeling.
- **Bcryptjs**: Password hashing.
- **Joi**: Data validation.
- **JsonWebToken**: Secure authentication.
- **Config**: Configuration management.
- **Morgan**: Request logging.
- **Cors**: Cross-Origin Resource Sharing.
- **Chalk**: Console output styling.
- **Multer**: Adding image from front-end
- **Moment**: Date formatting

### Auth Endpoints

| No. | Method | URL     | Action  | Authorization | Return                   |
| --- | ------ | ------- | ------- | ------------- | ------------------------ |
| 1   | POST   | /signup | Sign up | All           | User object (on success) |
| 2   | POST   | /login  | Login   | All           | JWT (on success)         |

### User Endpoints

| No. | Method | URL                | Action            | Authorization | Return         |
| --- | ------ | ------------------ | ----------------- | ------------- | -------------- |
| 1   | GET    | /techs             | Get all techs     | Manager       | Array of techs |
| 2   | GET    | /users             | Get all users     | Admin         | Array of users |
| 3   | DELETE | /delete-user/:\_id | Delete user       | Admin         | Deleted user   |
| 4   | PUT    | /edit-user/:\_id   | Edit user details | Admin         | Updated user   |

### Ticket Endpoints

| No. | Method | URL                     | Action                     | Authorization   | Return           |
| --- | ------ | ----------------------- | -------------------------- | --------------- | ---------------- |
| 1   | POST   | /create-ticket          | Create ticket              | Registered User | Ticket object    |
| 2   | GET    | /tickets-open           | Get all open tickets       | Manager         | Array of tickets |
| 3   | GET    | /tickets                | Get all tickets            | Manager         | Array of tickets |
| 4   | GET    | /tickets/archived       | Get archived tickets       | Manager         | Array of tickets |
| 5   | GET    | /tickets/:\_id          | Get single ticket          | Manager         | Ticket object    |
| 6   | GET    | /tickets/tech/:techName | Get tickets for a tech     | Technician      | Array of tickets |
| 7   | POST   | /update-tech            | Update ticket's technician | Manager         | Updated ticket   |
| 8   | PATCH  | /archive-ticket         | Archive a ticket           | Manager         | Archived ticket  |
| 9   | POST   | /update-status          | Update ticket status       | Technician      | Updated ticket   |
| 10  | DELETE | /delete-ticket/:\_id    | Delete ticket              | Admin           | Deleted ticket   |
