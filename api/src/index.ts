import express, { Request, Response } from 'express';
import db from './db';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';
import { join } from 'path';
import { gql } from 'graphql-tag';
import resolvers from './resolvers'
import ENV from './env'

const typeDefs = gql(readFileSync(join(__dirname, 'schema.graphql'), 'utf8'));
const apollo = new ApolloServer({resolvers, typeDefs });

const app: express.Express = express();

const startServer = async () => {
  await apollo.start();
  
  app.use(cors()); // allow all origins
  app.use(bodyParser.json());
  app.use('/graphql', expressMiddleware(apollo));

  app.listen(ENV.API_PORT, () => {
    console.log(`🚀 Server is running on ${ENV.API_URL}`);
  });
};

startServer();
