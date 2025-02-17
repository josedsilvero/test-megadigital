import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// Load and expand environment variables from .env file
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const ENV = process.env 
if (!ENV 
    || !ENV.API_PORT 
    || !ENV.API_URL 
    || !ENV.DB_URL
    || !ENV.UI_URL
    || !ENV.UI_PORT) {
  throw new Error("Unable to load environment variables");
}

export default {
  API_PORT: parseInt(ENV.API_PORT) as number,
  API_URL: ENV.API_URL as string,
  DB_URL: ENV.DB_URL as string,
  UI_PORT: parseInt(ENV.UI_PORT) as number,
  UI_URL: ENV.UI_URL as string,
}


