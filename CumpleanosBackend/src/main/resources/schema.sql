DROP TABLE IF EXISTS persona;

CREATE TABLE persona(
id int auto_increment,
dni varchar(10),
nombre varchar(50),
apellido varchar(50),
nacimiento date,
confirmado bit default false,
PRIMARY KEY (id)
);
