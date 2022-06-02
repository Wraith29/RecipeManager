from flask import Blueprint, Response, jsonify, request, make_response

from src.db import get_db
from src.data.tag import get_all_tags, create_tag, get_tag_by_name, delete_tag_by_id, get_tags_by_recipe_id

tag_bp = Blueprint('tag', __name__, url_prefix='/tag')


@tag_bp.get("all")
def get_all_tags_route() -> tuple[Response, int]:
    tags = get_all_tags(get_db())
    return jsonify(tags), 200


@tag_bp.post("create")
def create_tag_route() -> tuple[Response, int]:
    args = request.args
    if 'name' not in args:
        return make_response("Missing 'name' from args"), 400

    if get_tag_by_name(get_db(), args['name']) is not None:
        return make_response("Tag already exists"), 400

    tag_id = create_tag(get_db(), args['name'])
    return jsonify({"id": tag_id}), 200


@tag_bp.delete("delete")
def delete_tag_route() -> tuple[Response, int]:
    args = request.args
    if 'tag-id' not in args:
        return make_response("Missing 'tag-id' from form"), 400
    try:
        delete_tag_by_id(get_db(), int(args['tag-id']))
        return make_response(f"Tag {args['tag-id']} deleted."), 200
    except ValueError:
        return make_response("Invalid 'tag-id'"), 400


@tag_bp.get("recipes")
def get_recipes_by_tag_id_route() -> tuple[Response, int]:
    args = request.args
    if 'recipe-id' not in args:
        return make_response("Missing 'recipe-id' from form"), 400
    try:
        tags = get_tags_by_recipe_id(get_db(), int(args['recipe-id']))
        return jsonify(tags), 200
    except ValueError:
        return make_response("Invalid type for 'recipe-id'"), 400
