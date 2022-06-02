from dataclasses import dataclass
from typing import Optional
import sqlite3 as sql


@dataclass
class Tag:
    name: str
    id: Optional[int] = None


def get_all_tags(db: sql.Connection) -> list[Tag]:
    query = "SELECT Name, Id FROM 'Tag'"
    return [Tag(*tag_data) for tag_data in db.execute(query).fetchall()]


def create_tag(db: sql.Connection, name: str) -> int:
    query = "INSERT INTO 'Tag' (Name) VALUES (?)"
    db.execute(query, [name])
    return int(db.execute("SELECT last_insert_rowid()").fetchone()[0])


def get_tag_by_name(db: sql.Connection, name: str) -> Optional[Tag]:
    query = "SELECT Name, Id FROM 'Tag' WHERE Name = ?"
    data = db.execute(query, [name]).fetchone()
    return Tag(*data) if data else None


def delete_tag_by_id(db: sql.Connection, tag_id: int) -> None:
    query = "DELETE FROM 'Tag' WHERE Id = ?"
    db.execute(query, [tag_id])
    db.commit()


def get_tags_by_recipe_id(db: sql.Connection, recipe_id: int) -> list[Tag]:
    query = """
        SELECT Name, Id
        FROM 'Tag' T
        JOIN 'RecipeTagMap' RTM
        ON T.Id = RTM.TagId
        WHERE RTM.RecipeId = ?
    """
    return [Tag(*tag_data) for tag_data in db.execute(query, [recipe_id]).fetchall()]
