CREATE TABLE salons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE services(
  id SERIAL PRIMARY KEY,
  salon_id int8 NOT NULL,
  name VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  CONSTRAINT FOREIGN KEY(salon_id)
        REFERENCES salons(id)
);

CREATE TABLE appointments(
  id SERIAL PRIMARY KEY,
  salonId int8 NOT NULL,
  customerName VARCHAR(255) NOT NULL,
  serviceName VARCHAR(255) NOT NULL,
  appointmentTime TIMESTAMP NOT NULL
);


