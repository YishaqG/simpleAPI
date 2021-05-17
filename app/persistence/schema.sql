CREATE TABLE IF NOT EXISTS "empresas" (
	"id" SERIAL PRIMARY KEY,
	"nombre_legal" varchar(255) NOT NULL,
    "nombre_comercial" varchar(255),
    "rfc" varchar(15) NOT NULL,
    "telefono" varchar(15),
    "fecha_registro" DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS "roles" (
    "id" serial PRIMARY KEY,
    "rol" varchar(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS "usuarios" (
    "id" serial PRIMARY KEY,
    "nombre" varchar(50) NOT NULL,
    "apellido" varchar(50) NOT NULL,
    "correo" varchar(254),
    "password" VARCHAR(255) NOT NULL,
    "rol_id" INT NOT NULL REFERENCES roles("id"),
    "empresa_id" INT NOT NULL REFERENCES empresas("id"),
    "ultima_conexion" DATE
);