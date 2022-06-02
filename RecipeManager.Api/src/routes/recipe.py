from flask import Blueprint, Response, jsonify, make_response, request

from src.db import get_db
from src.data.recipe import (
    get_all_recipes,
    get_recipe_by_id,
    create_recipe,
    put_tag_on_recipe,
    delete_recipe_by_id,
    remove_tag_from_recipe,
    get_recipes_by_tag_id
)

recipe_bp = Blueprint('recipe', __name__, url_prefix='/recipe')


@recipe_bp.get('all')
def get_all_recipes_route() -> tuple[Response, int]:
    recipes = get_all_recipes(get_db())
    return jsonify(recipes), 200


@recipe_bp.get('by-id')
def get_single_recipe_route() -> tuple[Response, int]:
    args = request.args
    if 'recipe-id' not in args:
        return make_response("Missing 'recipe-id' from form"), 400

    try:
        recipe = get_recipe_by_id(get_db(), int(args['recipe-id']))
        return jsonify(recipe), 200
    except ValueError:
        return make_response("Invalid type for 'recipe-id'"), 400


@recipe_bp.post('create')
def post_recipe_route() -> tuple[Response, int]:
    args = request.json
    print(request.method)
    if not args:
        return make_response("args not found"), 400
    if not all([item in args for item in ['name', 'short-description', 'long-description']]):
        return make_response("Missing 'name', 'short-description', or 'long-description'"), 400
    recipe_id = create_recipe(get_db(), args['name'], args['short-description'], args['long-description'])
    return jsonify({"id": recipe_id}), 200


@recipe_bp.post('add-tag')
def add_tag_to_recipe_route() -> tuple[Response, int]:
    args = request.args
    if not all([item in args for item in ['recipe-id', 'tag-id']]):
        return make_response("Missing 'record-id' or 'tag-id'"), 400

    try:
        put_tag_on_recipe(get_db(), int(args['recipe-id']), int(args['tag-id']))
        return make_response(), 200
    except ValueError:
        return make_response("Invalid 'recipe-id' or 'tag-id'"), 400


@recipe_bp.delete('delete')
def delete_recipe_route() -> tuple[Response, int]:
    args = request.args
    if 'recipe_id' not in args:
        return make_response("Missing 'recipe-id' from args"), 400
    try:
        delete_recipe_by_id(get_db(), int(args['recipe_id']))
        return make_response(), 200
    except ValueError:
        return make_response("Invalid type for 'recipe-id'"), 400


@recipe_bp.delete('remove-tag')
def remove_tag_from_recipe_route() -> tuple[Response, int]:
    args = request.args
    if not all(item in args for item in ['recipe-id', 'tag-id']):
        return make_response("Missing 'recipe-id' or 'tag-id' from form"), 400
    try:
        remove_tag_from_recipe(get_db(), int(args['recipe-id']), int(args['tag-id']))
        return make_response(), 200
    except ValueError:
        return make_response("Invalid type for 'recipe-id' or 'tag-id'"), 400


@recipe_bp.get('by-tag')
def get_recipes_by_tag_route() -> tuple[Response, int]:
    args = request.args
    if 'tag-id' not in args:
        return make_response("Missing 'tag-id' from form"), 400
    try:
        recipes = get_recipes_by_tag_id(get_db(), int(args['tag-id']))
        return jsonify(recipes), 200
    except ValueError:
        return make_response("Invalid type for 'tag-id'"), 400
