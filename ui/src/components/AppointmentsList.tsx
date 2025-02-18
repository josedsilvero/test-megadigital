import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, Card } from 'react-bootstrap';

interface Appointment {
    id: number;
    customer_name: string;
    service_name: string;
    appointment_time: string;
    salon: {
        name: string;
    };
}

interface AppointmentsData {
    appointments: Appointment[];
}

const GET_APPOINTMENTS = gql`
  query {
    appointments {
      id
      customer_name
      service_name
      appointment_time
      salon {
        name
      }
    }
  }
`;

function AppointmentsList() {
    const { loading, error, data } = useQuery<AppointmentsData>(GET_APPOINTMENTS);

    if (loading) return <div className="text-center mt-5">Loading appointments...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error.message}</div>;

    return (
        <Card className="shadow-lg" style={{ width: '100%' }}>
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Service</th>
                            <th>Appointment Time</th>
                            <th>Salon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.customer_name}</td>
                                <td>{appointment.service_name}</td>
                                <td>{new Date(+appointment.appointment_time).toLocaleString()}</td>
                                <td>{appointment.salon.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default AppointmentsList;
