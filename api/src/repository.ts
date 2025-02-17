import db from './db';

export default {

  createSalon: async (name: string, location: string) => {
    try {
      const query = `
        INSERT INTO salons (name, location) 
        VALUES ($1, $2) RETURNING *;
      `;
      const values = [name, location];

      const result = await db.query(query, values);
      return result.rows[0];

    } catch (error) {
      console.error('Error creating salon:', error);
      throw new Error('Failed to create salon');
    }
  },

  createAppointment: async ({ salon_id, customer_name, service_name, appointment_time }: { salon_id: number, customer_name: string, service_name: string, appointment_time: string }) => {
    try {
      const query = `
        INSERT INTO appointments (salon_id, customer_name, service_name, appointment_time)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const result = await db.query(query, [salon_id, customer_name, service_name, appointment_time]);

      return result.rows[0];
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Failed to create appointment');
    }
  },

  updateAppointment: async ({ id, salon_id, customer_name, service_name, appointment_time }: { id: number, salon_id: number, customer_name: string, service_name: string, appointment_time: string }) => {
    try {
      const query = `
        UPDATE appointments
        SET salon_id = $1, customer_name = $2, service_name = $3, appointment_time = $4
        WHERE id = $5
        RETURNING *;
      `;

      const result = await db.query(query, [salon_id, customer_name, service_name, appointment_time, id]);

      return result.rows[0];
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Failed to update appointment');
    }
  },

  deleteAppointment: async (id: number) => {
    try {
      const query = `
        DELETE FROM appointments
        WHERE id = $1
        RETURNING *;
      `;

      const result = await db.query(query, [id]);

      if (result.rowCount === 0) {
        throw new Error(`Appointment with id ${id} does not exist`);
      }

      return result.rows[0];
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('Failed to delete appointment');
    }
  },


  listSalons: async () => {
    try {
      const query = 'SELECT * FROM salons ORDER BY id ASC;';
      const result = await db.query(query);
      return result.rows;

    } catch (error) {
      console.error('Error retrieving salons:', error);
      throw new Error('Failed to retrieve salons');
    }
  },

  listServices: async () => {
    try {
      const query = `
        SELECT services.*, salons.name AS salon_name, salons.location AS salon_location
        FROM services
        JOIN salons ON services.salon_id = salons.id
        ORDER BY services.id ASC;
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving services:', error);
      throw new Error('Failed to retrieve services');
    }
  },

  listAppointments: async () => {
    try {
      const query = `
        SELECT appointments.*, salons.name AS salon_name, salons.location AS salon_location
        FROM appointments
        JOIN salons ON appointments.salon_id = salons.id
        ORDER BY appointments.appointment_time ASC;
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error retrieving appointments:', error);
      throw new Error('Failed to retrieve appointments');
    }
  }


};

