import { gql } from '@apollo/client';

export const GET_SALONS = gql`
  query GetSalons {
    salons {
      id
      name
      location
    }
  }
`;

export const GET_APPOINTMENTS = gql`
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

export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($customer_name: String!, $salon_id: Int!, $service_name: String!, $appointment_time: String!) {
    createAppointment(customer_name: $customer_name, salon_id: $salon_id, service_name: $service_name, appointment_time: $appointment_time) {
      id
      customer_name
      salon {
        name
      }
      service_name
      appointment_time
    }
  }
`;