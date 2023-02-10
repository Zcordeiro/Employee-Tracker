INSERT INTO department (department_name)VALUES 
("Sales"),
("Engineering"),
("Marketing"),
("Production"),
("Administration");

INSERT INTO roles (title, salary, department_id)VALUES
("Local Sales", "65000", 1),
("National Sales", "68000", 1),
("International Sales", "73000", 1),
("Sales Manager", "80000", 1),
("Sales Ambassador", "40000", 1),
("Lead Engineer", "100000", 2),
("Engineer", "85000", 2),
("Junior Engineer", "70000", 2),
("Marketing Director", "60000", 3),
("Social Media Director", "60000", 3),
("Production Manager", "55000", 4),
("Production Assistant Manager", "50000", 4),
("Production Team Member", "45000", 4),
("Administrative Assistant", "50000", 5),
("Chief Financial Officer", "75000", 5),
("Chief Operating Officer", "100000", 5),
("Human Resources", "50000", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES
("John", "Smith", 16, NULL),
("Jane", "Doe", 15, 1),
("Tony", "Balogne", 4, 1),
("Kevin", "Waters", 6, 1),
("Candelas", "Novák", 9, 1),
("Ariane", "Strand", 11, 1),
("Kyle", "Kost", 14, 1);