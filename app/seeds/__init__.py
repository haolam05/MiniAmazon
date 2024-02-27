from flask.cli import AppGroup
from .customers import seed_customers, undo_customers
from app.models.db import environment


seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    if environment == 'production':
        unseed_all_tables()
    seed_all_tables()


@seed_commands.command('undo')
def undo():
    unseed_all_tables()


@seed_commands.command("reset")
def seed_reset():
    unseed_all_tables()
    seed_all_tables()


def seed_all_tables():
    seed_customers()


def unseed_all_tables():
    undo_customers()
