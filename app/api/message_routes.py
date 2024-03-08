from flask import Blueprint, request
from ..socket import socketio


message_routes = Blueprint('messages', __name__)


@message_routes.route('/', methods=['POST'])
def handle_new_user_message():
    """New user message"""
    data = request.json
    message = {
        "id": data["id"] + 1,
        "sender_id": 0,
        "text": "🤖🤖🤖"
    }
    socketio.emit("new_robot_message", [data, message])
    return {}, 200
