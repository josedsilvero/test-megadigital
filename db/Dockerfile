FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=code_challenge_db

EXPOSE 5432

# Copy a script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/
