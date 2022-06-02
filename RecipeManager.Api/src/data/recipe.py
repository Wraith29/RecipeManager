from dataclasses import dataclass
import sqlite3 as sql
from typing import Optional


@dataclass
class Recipe:
    name: str
    shortDescription: str
    longDescription: str
    id: Optional[int] = None


def get_all_recipes(db: sql.Connection) -> list[Recipe]:
    query = "SELECT Name, ShortDescription, LongDescription, Id FROM 'Recipe'"
    return [Recipe(*recipe_data) for recipe_data in db.execute(query)]


def get_recipe_by_id(db: sql.Connection, recipe_id: int) -> Recipe:
    query = "SELECT Name, ShortDescription, LongDescription, Id FROM 'Recipe' WHERE Id = ?"
    return Recipe(*db.execute(query, [recipe_id]).fetchone())


def create_recipe(db: sql.Connection, name: str, short_description: str, long_description: str) -> int:
    query = "INSERT INTO 'Recipe' (Name, ShortDescription, LongDescription) VALUES (?, ?, ?)"
    db.execute(query, [name, short_description, long_description])
    db.commit()
    return int(db.execute("SELECT last_insert_rowid()").fetchone()[0])


def get_recipes_by_tag_id(db: sql.Connection, tag_id: int) -> list[Recipe]:
    query = """
        SELECT Name, ShortDescription, LongDescription, Id 
        FROM 'Recipe' R 
        JOIN 'RecipeTagMap' RTM 
        ON (R.Id = RTM.RecipeId) 
        WHERE RTM.TagId = ?
        """
    return [Recipe(*recipe_data) for recipe_data in db.execute(query, [tag_id]).fetchall()]


def put_tag_on_recipe(db: sql.Connection, recipe_id: int, tag_id: int) -> None:
    query = "INSERT INTO 'RecipeTagMap' (RecipeId, TagId) VALUES (?, ?)"
    db.execute(query, [recipe_id, tag_id])
    db.commit()


def delete_recipe_by_id(db: sql.Connection, recipe_id: int) -> None:
    query = "DELETE FROM 'Recipe' WHERE Id = ?"
    db.execute(query, [recipe_id])
    db.commit()


def remove_tag_from_recipe(db: sql.Connection, recipe_id: int, tag_id: int) -> None:
    query = """
        DELETE FROM 'RecipeTagMap'
        WHERE RecipeId = ? AND TagId = ?
    """
    db.execute(query, [recipe_id, tag_id])
    db.commit()
