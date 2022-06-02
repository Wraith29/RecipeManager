import os
from flask import Flask
from flask_cors import CORS


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_mapping(
        DATABASE=os.path.join(app.instance_path, 'recipes.db')
    )

    if not os.path.exists(app.instance_path):
        os.mkdir(app.instance_path)

    CORS(app)

    from . import db
    db.init_app(app)

    from .routes import recipe, tag
    app.register_blueprint(recipe.recipe_bp)
    app.register_blueprint(tag.tag_bp)

    return app

