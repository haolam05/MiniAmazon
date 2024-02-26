import os
from flask_socketio import SocketIO


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://miniamazon.onrender.com",
        "https://miniamazon.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)
