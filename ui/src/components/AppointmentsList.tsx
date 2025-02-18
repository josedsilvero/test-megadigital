import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Table, Button } from 'react-bootstrap';
import Modal from './Modal';
import CreateAppointmentForm from './CreateAppointmentForm'; // Import CreateAppointment component
import { GET_APPOINTMENTS, CREATE_APPOINTMENT } from '../graphql/queries';

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

const AppointmentsList = () => {
    const { loading, error, data, refetch } = useQuery<AppointmentsData>(GET_APPOINTMENTS);
    const [createAppointment] = useMutation(CREATE_APPOINTMENT);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addNewAppointment = (newAppointment: Appointment) => {
        refetch();
    };

    if (loading) return <div className="text-center mt-5">Loading appointments...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error: {error.message}</div>;

    return (
        <>
            {/* Modal for creating a new appointment */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Appointment">
                <CreateAppointmentForm
                    onClose={() => setIsModalOpen(false)}
                    addNewAppointment={addNewAppointment}
                />
            </Modal>

            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <h3>Appointments</h3>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        Create Appointment
                    </Button>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Table striped bordered hover responsive variant="light">
                        <thead className="table-dark">
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
                </div>
            </div>
        </>
    );
};

export default AppointmentsList;
