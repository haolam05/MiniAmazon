from flask.cli import AppGroup
from .customers import seed_customers, undo_customers
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .bookmarks import seed_bookmarks, undo_bookmarks
from .orders import seed_orders, undo_orders
from .order_items import seed_order_items, undo_order_items
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
    seed_products()
    seed_reviews()
    seed_bookmarks()
    seed_orders()
    seed_order_items()


def unseed_all_tables():
    undo_customers()
    undo_order_items()
    undo_orders()
    undo_bookmarks()
    undo_reviews()
    undo_products()
