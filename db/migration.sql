CREATE TABLE salons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE services(
  id SERIAL PRIMARY KEY,
  salon_id int NOT NULL,
  name VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  FOREIGN KEY(salon_id)
        REFERENCES salons(id)
);

CREATE TABLE appointments(
  id SERIAL PRIMARY KEY,
  salon_id int NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  appointment_time TIMESTAMP NOT NULL,
  FOREIGN KEY(salon_id)
        REFERENCES salons(id)
);


