import os
from flask import Flask

def create_app() -> Flask:
    app = Flask(__name__)

    app.config.from_mapping(
        DATABASE = f'{app.instance_path}/recipes.db'
    )

    if not os.path.exists(app.instance_path):
        os.mkdir(app.instance_path)

    from . import db
    db.init_app(app)

    from . import routes
    app.register_blueprint(routes.routes)

    return app