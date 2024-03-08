from flask import Blueprint, request
from ..socket import socketio


message_routes = Blueprint('messages', __name__)


please_choose = f"Please choose one of the followings:"
welcome = f"Hi there👋\nThanks for reaching out. Please enter the corresponding number of the topics listed below:"
topics_list = f"1. Product\n2. Bookmark\n3. Review\n4. Order\n5. Search\n6. Profile\n"
wrong_option = f"Invalid choice 👎\nPlease choose again:\n{topics_list}"
product_questions = f"{please_choose}\n1. List a product for sale\n2. View listed products\n"

@message_routes.route('/', methods=['POST'])
def handle_new_user_message():
    """New user message"""
    data = request.json
    chatbot_id = 0
    message = {
        "id": data["id"] + 1,
        "sender_id": chatbot_id
    }

    if data["text"] == "1":
        message["text"] = product_questions
        state = 1
    elif data["text"] == "2":
        message["text"] = ""
    elif data["text"] == "3":
        message["text"] = ""
    elif data["text"] == "4":
        message["text"] = ""
    elif data["text"] == "5":
        message["text"] = ""
    elif data["text"] == "6":
        message["text"] = ""
    else:
        message["text"] = wrong_option

    socketio.emit("new_robot_message", [data, message])

    return {}, 200
