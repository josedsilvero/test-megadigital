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
    createAppointment: async (_: any, { salon_id, customer_name, service_name, appointment_time }: { salon_id: number; customer_name: string; service_name: string; appointment_time: string }) => {

      const salon = await repository.findSalonById(salon_id);
      if (!salon) {
        throw new Error('Salon not found');
      }

      // Create the appointment and associate with the salon
      const newAppointment = await repository.createAppointment({
        salon_id,
        customer_name,
        service_name,
        appointment_time
      });

      newAppointment.salon = salon;

      return newAppointment;
    },

    updateAppointment: async (
      _: any,
      { id, salon_id, customer_name, service_name, appointment_time }: {
        id: number;
        salon_id?: number;
        customer_name?: string;
        service_name?: string;
        appointment_time?: string;
      }
    ) => {
      try {
        return await repository.updateAppointment({
          id,
          salon_id,
          customer_name,
          service_name,
          appointment_time,
        });
      } catch (error) {
        console.error('Error in resolver updating appointment:', error);
        throw new Error('Failed to update appointment');
      }
    },


    deleteAppointment: async (_: any, { id }: { id: number }) => {
      return await repository.deleteAppointment(id);
    },
  }
};
