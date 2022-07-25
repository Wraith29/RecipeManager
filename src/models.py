from dataclasses import dataclass
from typing import Optional


@dataclass
class Recipe:
    name: str
    short_description: str
    long_description: str
    recipe_id: Optional[int] = None

@dataclass
class Tag:
    name: str
    tag_id: Optional[int] = None

@dataclass
class RecipeTagMap:
    recipe_id: int
    tag_id: int

@dataclass
class RecipeTagMapContainer:
    recipe: Recipe
    tags: list[Tag]
