import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { CREATE_APPOINTMENT, GET_SALONS } from '../graphql/queries';

interface CreateAppointmentFormProps {
    onClose: () => void;
    addNewAppointment: (newAppointment: any) => void;
}

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({ onClose, addNewAppointment }) => {
    const [customerName, setCustomerName] = useState('');
    const [salonId, setSalonId] = useState<number | string>(''); // 
    const [serviceName, setServiceName] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [showBanner, setShowBanner] = useState(false);

    // Fetch salons from the backend
    const { data: salonsData, loading: salonsLoading, error: salonsError } = useQuery(GET_SALONS);

    const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const salonIdNumber = Number(salonId);
        if (!salonIdNumber || !salonsData?.salons.some((salon: any) => salon.id === salonIdNumber)) {
            console.error('Invalid salon ID');
            return;
        }

        try {
            const response = await createAppointment({
                variables: {
                    customer_name: customerName,
                    salon_id: salonIdNumber,
                    service_name: serviceName,
                    appointment_time: appointmentTime,
                },
            });

            console.log('Appointment created:', response);

            setShowBanner(true);

            // Reset form fields after submission
            setCustomerName('');
            setServiceName('');
            setAppointmentTime('');
            setSalonId('');

            addNewAppointment(response.data.createAppointment);

            onClose();
        } catch (err) {
            console.error('Error creating appointment:', err);
        }
    };

    if (salonsLoading) return <div>Loading salons...</div>;
    if (salonsError) return <div>Error fetching salons: {salonsError.message}</div>;

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    {/* Success Banner */}
                    {showBanner && (
                        <Alert variant="success" onClose={() => setShowBanner(false)} dismissible>
                            <strong>Success!</strong> Your appointment has been created.
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-black text-left">Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Enter customer name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-black text-left">Salon</Form.Label>
                            <Form.Control
                                as="select"
                                value={salonId}
                                onChange={(e) => setSalonId(e.target.value)}
                                required
                            >
                                <option value="">Select a salon</option>
                                {salonsData?.salons.map((salon: any) => (
                                    <option key={salon.id} value={salon.id}>
                                        {salon.name} ({salon.location})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-black text-left">Service</Form.Label>
                            <Form.Control
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                placeholder="Enter service name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-black text-left">Appointment Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Appointment'}
                        </Button>

                        {/* Error Message */}
                        {error && <p className="text-danger mt-3">{error.message}</p>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateAppointmentForm;

