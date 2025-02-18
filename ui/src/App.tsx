import React from 'react';
import { useQuery, gql } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Badge from 'react-bootstrap/Badge';
import AppointmentsList from './components/AppointmentsList';
import './App.css'; // Import the custom CSS file for styling

interface Salon {
  id: number;
  name: string;
  location: string;
}

interface SalonsData {
  salons: Salon[];
}

// GraphQL query
const HELLO_QUERY = gql`
  query {
    salons {
      id
      name
      location
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery<SalonsData>(HELLO_QUERY);

  // Determine the content of the badge
  let badgeContent: string;
  if (loading) {
    badgeContent = 'Loading...';
  } else if (error) {
    badgeContent = `Error: ${error.message}`;
  } else {
    badgeContent = data?.salons.length
      ? data.salons[0].name
      : 'No data';
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="bg-primary text-white p-4">
        <h1>My Salon App</h1>
      </header>

      {/* Main content area */}
      <div className="container-fluid flex-grow-1 p-4">
        <h2 className="card-title text-black p-2">Appointments List</h2>
        <AppointmentsList />
        {/* <CreateAppointmentForm></CreateAppointmentForm>*/}
      </div>
    </div>
  );
};

export default App;

