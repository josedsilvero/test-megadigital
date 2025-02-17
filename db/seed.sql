INSERT INTO salons (name, location) VALUES 
('Luxury Cuts', 'New York, NY'),
('Elite Beauty Salon', 'Los Angeles, CA'),
('Glow Up Hair Studio', 'Chicago, IL'),
('Style & Grace Spa', 'Miami, FL'),
('The Hair Loft', 'San Francisco, CA'),
('Urban Chic Salon', 'Seattle, WA'),
('Pure Elegance Spa', 'Boston, MA'),
('Glamour Hub', 'Houston, TX');


INSERT INTO services (salon_id, name, price)VALUES
(1, 'Haircut', 50.0),
(1, 'Nails', 10.0),
(1, 'Hair coloring', 125.0),
(2, 'Haircut', 40.0),
(2, 'Nails', 15.5);

INSERT INTO appointments (salon_id, customer_name, service_name, appointment_time)VALUES
(1, 'Bill Graham', 'Haircut', CURRENT_TIMESTAMP),
(1, 'Janet Jones', 'Hair coloring', CURRENT_TIMESTAMP + INTERVAL '1 hour'),
(2, 'Barbara Green', 'Nails', CURRENT_TIMESTAMP + INTERVAL '2 hour');