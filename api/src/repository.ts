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

  listSalons: async () => {
    try {
      const query = 'SELECT * FROM salons ORDER BY id ASC;';
      const result = await db.query(query);
      return result.rows; 

    } catch (error) {
      console.error('Error retrieving salons:', error);
      throw new Error('Failed to retrieve salons');
    }
  }
};

