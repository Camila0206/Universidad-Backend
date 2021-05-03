-- Drop table

-- DROP TABLE public.personas;

CREATE TABLE public.personas (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	CONSTRAINT personas_pk PRIMARY KEY (id)
);