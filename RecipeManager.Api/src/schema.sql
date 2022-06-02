DROP TABLE IF EXISTS 'Recipe';
DROP TABLE IF EXISTS 'Tag';
DROP TABLE IF EXISTS 'RecipeTagMap';

CREATE TABLE 'Recipe' (
    'Id' INTEGER NOT NULL,
    'Name' TEXT NOT NULL,
    'ShortDescription' TEXT NOT NULL,
    'LongDescription' TEXT NOT NULL,
    PRIMARY KEY ('Id' AUTOINCREMENT)
);

CREATE TABLE 'Tag' (
    'Id' INTEGER NOT NULL,
    'Name' TEXT NOT NULL,
    PRIMARY KEY ('Id' AUTOINCREMENT)
);

CREATE TABLE 'RecipeTagMap' (
    'RecipeId' INTEGER NOT NULL,
    'TagId' INTEGER NOT NULL,
    FOREIGN KEY ('RecipeId') REFERENCES 'Recipe' ('Id'),
    FOREIGN KEY ('TagId') REFERENCES 'Tag' ('Id')
);
