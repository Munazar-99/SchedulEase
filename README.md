# SchedulEase

**SchedulEase** is a flexible and customizable web application for scheduling and managing appointments. Designed to be white-labeled, it allows businesses to tailor the application to their own branding and needs. Built with modern technologies, SchedulEase provides an intuitive user experience for both clients and administrators.

## Features

### User Features

- **Schedule Appointments**: Users can easily schedule appointments with a user-friendly calendar interface.
- **Appointment Reminders**: Automatic notifications and reminders for upcoming appointments.
- **Customizable Forms**: Dynamic form fields for appointment requests, powered by Zod for validation.

### Admin Features

- **Manage Appointments**: Administrators can view, edit, and manage all appointments from a central dashboard.
- **Appointment Statuses**: Track and update the status of appointments (e.g., pending, confirmed, cancelled).
- **Admin Dashboard**: A comprehensive interface for managing and viewing all appointments.

### Integration

- **Appwrite**: Backend as a Service for managing appointments and user data.
- **Shadcn**: UI components for a consistent and modern interface.
- **Tailwind CSS**: For responsive and customizable styling.
- **Typescript & Zod**: For type safety and form validation.

## Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- A valid Appwrite instance

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/schedulEase.git
   cd schedulEase && cd src
   ```
1. **Configure Environment Variables**
   ```bash
   PROJECT_ID=your_appwrite_project_id
   API_KEY=your_appwrite_api_key
   DATABASE_ID=your_appwrite_database_id
   USER_COLLECTION_ID=your_appwrite_user_collection_id
   CLIENT_COLLECTION_ID=your_appwrite_client_collection_id
   APPOINTMENTS_COLLECTION_ID=your_appwrite_appointments_collection_id
   BUCKET_ID=your_appwrite_bucket_id
   ENDPOINT=your_appwrite_endpoint
   ```

## Usage

### Getting Started

1. **Access the Application**

   - Open your web browser and navigate to the application URL, typically `http://localhost:3000` if running locally.

2. **Scheduling an Appointment**

   - Go to the scheduling page where you can fill out the appointment form. This form includes fields for selecting a date and time, as well as providing a reason for the appointment.
   - Submit the form to schedule your appointment. You will receive a confirmation once the appointment is successfully booked.

3. **Admin Dashboard**
   - Administrators can log in to access the admin dashboard.
   - In the dashboard, you will find options to view, edit, and manage all scheduled appointments.
   - You can update the status of appointments, view appointment details, and handle cancellations or rescheduling.

### Examples

- **Scheduling Form**

  - The scheduling form allows users to choose a date and time, specify the reason for the appointment, and submit their request. The form is validated using Zod to ensure all necessary information is provided.

- **Admin View**
  - The admin dashboard displays a list of all appointments, with options to filter by date or status. Admins can click on individual appointments to view detailed information or take actions such as confirming or cancelling appointments.

## Planned Features

- **Admin Page**

  - A dedicated page for administrators to efficiently view and manage all appointments. This will include filtering options, detailed appointment views, and management tools.

- **Automatic SMS Messaging**

  - Integration with an SMS service to send automatic reminders and confirmations for appointments. This will ensure users receive timely notifications about their scheduled appointments.

- **Google Calendar Integration**
  - Automatic synchronization of appointments with Google Calendar. This feature will allow users to seamlessly integrate their appointments into their personal calendar.

## Contributing

We welcome contributions to SchedulEase! If you’d like to contribute, please follow these guidelines:

1. **Fork the Repository**

   - Create a personal fork of the repository on GitHub.

2. **Create a Branch**

   - Create a new branch for your changes with a descriptive name.

3. **Make Your Changes**

   - Implement your changes and ensure they are thoroughly tested.

4. **Submit a Pull Request**
   - Open a pull request with a clear description of the changes you have made. Follow the provided guidelines for submitting contributions.
