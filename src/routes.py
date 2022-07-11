from flask import Blueprint, redirect, render_template, request, url_for
from werkzeug.wrappers.response import Response 

from src.data import create_recipe, get_all_recipes, get_all_rtms, get_all_tags, get_tags_for_recipe
from src.db import get_db
from src.models import RecipeTagMapContainer

routes = Blueprint("routes", __name__)

@routes.get("/")
def index() -> tuple[str, int]:
    con = get_db()
    recipes = get_all_recipes(con)
    tags = get_all_tags(con)
    recipe_tag_maps = [
        RecipeTagMapContainer(recipe, get_tags_for_recipe(con, recipe.recipe_id))
        for recipe in recipes
    ]

    return render_template("view/home.html", 
        recipe_tag_maps = recipe_tag_maps,
        tags = tags
    ), 200

@routes.get("/admin")
def admin() -> tuple[str, int]:
    con = get_db()
    recipes = get_all_recipes(con)
    tags = get_all_tags(con)
    rtms = get_all_rtms(con)
    rtms.sort(key = lambda rtm: rtm.recipe_id)
    return render_template("view/admin.html",
        recipes = recipes,
        tags = tags,
        rtms = rtms
    ), 200

@routes.post("/create/recipe")
def create_recipe_route() -> Response:
    recipe_data = request.form
    create_recipe(get_db(), recipe_data['name'], recipe_data['short-description'], recipe_data['long-description'])
    return redirect(url_for('routes.index'))

@routes.delete("/delete/recipe/<int:recipe_id>")
def delete_recipe_route(recipe_id: int) -> Response:
    return redirect(url_for('routes.index'))
