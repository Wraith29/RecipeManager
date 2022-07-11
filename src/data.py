import sqlite3 as sql
from src.models import Recipe, RecipeTagMap, Tag

def get_all_recipes(db: sql.Connection) -> list[Recipe]:
    query = "SELECT [Name], [ShortDescription], [LongDescription], [Id] FROM 'Recipe'"
    return [Recipe(*rd) for rd in db.execute(query).fetchall()]

def create_recipe(db: sql.Connection, name: str, short_description: str, long_description: str) -> None:
    query = "INSERT INTO 'Recipe' ([Name], [ShortDescription], [LongDescription]) VALUES (?, ?, ?)"
    db.execute(query, [name, short_description, long_description])
    db.commit()

def get_tags_for_recipe(db: sql.Connection, recipe_id: int | None) -> list[Tag]:
    query = """
        SELECT [Name], [Id]
        FROM Tag T
        JOIN RecipeTagMap RTM
        ON RTM.TagId = T.Id
        WHERE RTM.RecipeId = ?
    """
    return [Tag(*td) for td in db.execute(query, [recipe_id]).fetchall()]

def get_all_tags(db: sql.Connection) -> list[Tag]:
    query = "SELECT [Name], [Id] FROM 'Tag'"
    return [Tag(*td) for td in db.execute(query).fetchall()]

def get_all_rtms(db: sql.Connection) -> list[RecipeTagMap]:
    query = "SELECT [RecipeId], [TagId] FROM 'RecipeTagMap'"
    return [RecipeTagMap(*rtm) for rtm in db.execute(query).fetchall()]
