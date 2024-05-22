-- do these datatypes make sense?
CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(30) NOT NULL,
	"color" VARCHAR(20) NOT NULL,
	"age" INT,
	"readyToTransfer" BOOLEAN,
	"notes" VARCHAR(250)
);

-- look closely at the order of things!
INSERT INTO "koalas" 
	("name", "color", "age", "readyToTransfer", "notes") 
VALUES 
	('Scotty', 'Red', 4, TRUE, 'Born in Guatemala'), 
	('Jean', 'Green', 5, TRUE, 'Allergic to lots of lava'), 
	('Ororo', 'Yellow', 7, FALSE, 'Loves listening to Paula (Abdul)'), 
	('Logan', 'Purple', 15, FALSE, 'Loves the sauna'), 
	('Charlie', 'Orange', 9, TRUE, 'Favorite band is Nirvana'), 
	('Betsy', 'Blue', 4, TRUE, 'Has a pet iguana')
;

SELECT * FROM "koalas";
