import repository from './repository'; 

export default {
  Query: {
    salons: async () => {
      return await repository.listSalons();
    }
  }
};


