import os
from flask_socketio import SocketIO, emit


if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://miniamazon.onrender.com",
        "https://miniamazon.onrender.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("new_user_message")
def handle_new_user_message(message):
    response_message = {
        "id": message["id"],
        "sender_id": 0,
        "text": "Robot Copy that! Responding...."
    }
    emit("new_robot_message", response_message, broadcast=True)
