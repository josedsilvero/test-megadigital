import repository from './repository';

export default {
  Query: {
    salons: async () => {
      return await repository.listSalons();
    },

    services: async () => {
      return await repository.listServices();
    },

    appointments: async () => {
      return await repository.listAppointments();
    },
  },

  Mutation: {
    // Create a new appointment
    createAppointment: async (_: any, { salon_id, customer_name, service_name, appointment_time }: { salon_id: number; customer_name: string; service_name: string; appointment_time: string }) => {
      // Ensure appointment_time is a valid string or timestamp
      return await repository.createAppointment({
        salon_id,
        customer_name,
        service_name,
        appointment_time
      });
    },

    // Update an existing appointment
    updateAppointment: async (_: any, { id, salon_id, customer_name, service_name, appointment_time }: { id: number; salon_id: number; customer_name: string; service_name: string; appointment_time: string }) => {
      return await repository.updateAppointment({
        id,
        salon_id,
        customer_name,
        service_name,
        appointment_time
      });
    },

    // Delete an appointment by id
    deleteAppointment: async (_: any, { id }: { id: number }) => {
      return await repository.deleteAppointment(id);
    },
  }
};
