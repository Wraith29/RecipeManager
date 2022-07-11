import sqlite3 as sql
import click
from typing import Union, Any, Optional
from flask import Flask, current_app, g
from flask.cli import with_appcontext

def get_db() -> Union[sql.Connection, Any]:
    if "db" not in g:
        g.db = sql.connect(
            current_app.config["DATABASE"], 
            detect_types=sql.PARSE_DECLTYPES
        )
        g.db.row_factory = sql.Row

    return g.db

def close_db(_: Optional[Optional[BaseException]]) -> None:
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db() -> None:
    db = get_db()
    with current_app.open_resource("schema.sql", mode="r") as f:
        db.executescript(f.read())

@click.command("init-db")
@with_appcontext  # type: ignore
def init_db_command() -> None:
    init_db()
    click.echo("Initialised Database")

def init_app(app: Flask) -> None:
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)