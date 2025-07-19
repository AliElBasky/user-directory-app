# Brightskies User Management System

A modern Angular application for managing users, built with Angular Material and following best practices for component architecture and state management.

## Features

- User listing with real-time search/filtering
- Add new users through a modal dialog
- Form validation with reactive forms
- Responsive design
- Loading states and error handling
- Modern UI with Material Design
- Container/Presentational pattern implementation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Angular CLI (v16 or higher)

## How to Run the Project

1. Clone the repository:
```bash
git clone <repository-url>
cd Brightskies
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── user-list-container/   # Container component managing state and data flow
│   │   ├── add-user-form/         # Presentational component for user form
│   │   └── user-list/            # Presentational component for displaying users
│   ├── models/
│   │   └── user.model.ts         # User interface and type definitions
│   ├── services/
│   │   └── user.service.ts       # API communication service with signal state
│   └── app.routes.ts             # Application routing
```

## Architecture Overview

The application follows the Container/Presentational pattern:

### Container Component (UserListContainer)
- Manages application state and data flow
- Handles API communication through UserService
- Controls the dialog for adding users
- Manages loading states and error handling
- Coordinates between child components

### Presentational Components
1. **UserList Component**
   - Displays user data in a Material table
   - Handles local filtering and sorting
   - Pure presentation with @Input/@Output

2. **AddUserForm Component**
   - Handles form display and validation
   - Works both as a standalone form and in dialog mode
   - Manages form state and user input

## Development Time Breakdown

Total time spent: ~4 hours

- Initial setup and configuration: 30 minutes
- Component development: 1.5 hours
  - Container component setup
  - Presentational components implementation
  - Component communication setup
- Styling and UI improvements: 1 hour
- Testing and bug fixes: 30 minutes
- Code refactoring and optimization: 30 minutes

## Technical Highlights

1. **Component Architecture**
   - Container/Presentational pattern for better separation of concerns
   - Smart container component (UserListContainer) managing state
   - Dumb presentational components for reusability
   - Smart state management using signals

2. **Form Implementation**
   - Reactive forms for better form control
   - Comprehensive validation
   - Real-time error feedback
   - Modal dialog integration

3. **UI/UX Features**
   - Loading states for better user feedback
   - Responsive design for all screen sizes
   - Smooth animations and transitions
   - Material Design components
   - Real-time search filtering

4. **Code Quality**
   - TypeScript for type safety
   - Clean code practices
   - Consistent styling
   - Proper error handling
   - Signal-based state management

## Potential Improvements

1. **Features**
   - Add pagination for the user list
   - Implement user editing and deletion
   - Add sorting functionality
   - Add user details view
   - Implement data caching
   - Add bulk user operations

2. **Technical**
   - Add comprehensive unit tests
   - Implement E2E tests
   - Add state management (NgRx/NGXS) for larger scale
   - Implement proper error boundary
   - Add proper logging service
   - Improve container component test coverage

3. **UI/UX**
   - Add dark mode support
   - Implement more advanced filtering
   - Add keyboard navigation
   - Improve mobile experience
   - Add more animations and transitions
   - Enhance table responsiveness

## Notes

- The application uses the JSONPlaceholder API for demonstration purposes
- All components are standalone for better tree-shaking
- Material components are lazy-loaded for better initial load time
- The application follows Angular's latest best practices
- Responsive design works on all screen sizes
- Container pattern ensures clean separation of concerns
- Signal-based state management for better performance

## Contributing

Feel free to submit issues and enhancement requests!
