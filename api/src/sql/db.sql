
CREATE TABLE IF NOT EXISTS genders (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS videogames (
    id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name text NOT NULL,
    description text,
    releasedate date NOT NULL,
    rating float,
    platforms text,
    gender integer REFERENCES genders (id)
);

SELECT * FROM gender;
SELECT * FROM videogames;

INSERT INTO gender (name) VALUES ('Open World')

INSERT INTO videogames (name, description, releaseDate, rating, platforms, gender) VALUES ('GTA','Jueguito de matar','2021-02-01',5.0,'xbox, play',1)
INSERT INTO videogames (name, description, releaseDate, rating, platforms, gender) VALUES  ('GTAV','Jueguito de matar','2021-02-01',5.0,'xbox, play',1)