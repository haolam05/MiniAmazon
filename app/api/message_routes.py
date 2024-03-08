from flask import Blueprint, request
from ..socket import socketio


message_routes = Blueprint('messages', __name__)


invalid_choice = f"Invalid choice 👎\n\n"
please_choose = f"Choose one of the followings:\n\n"
topics_list = f"1️⃣ Product\n2️⃣ Bookmark\n3️⃣. Review\n4️⃣. Order\n5️⃣. Search\n6️⃣. Profile"
wrong_option = f"{invalid_choice}Please choose again:\n{topics_list}"
goodbye = f"Have a nice day!! Do not hesitate to reach out again if you need anything. Here is the available topics list:\n\n{topics_list}"
other_question = f"Do you have any other questions?\n1️⃣ Yes\n2️⃣ No"

product_question_1 = f"1️⃣ List a product for sale"
product_question_2 = f"2️⃣ View listed products"
product_answer_1 = f"1️⃣ To list a product for sale, click the plus (+) symbol at the upper left cornor of the home page.\n\nA modal will open and you will need to fill out all required fields to list a product for sale. Please note that you must have an image for your product.\n\nWe highly recommend high resolution image to support magnifying feature.\n\nAfter the product is listed, it will show up in the products list immediately.\n\nHope it helps!!\n\n{other_question}"
product_answer_2 = f"To view your listed products, click in the database symbol located at the upper left cornor of the home page, on the right side of the plus (+) symbol. From here, you can update/delete your products as you wish.\n\nHope it helps!!\n\n{other_question}"
product_questions = f"{please_choose}{product_question_1}\n{product_question_2}"

bookmark_question_1 = f"1️⃣ Bookmark a product"
bookmark_question_2 = f"2️⃣ View my bookmarks"
bookmark_questions = f"{please_choose}{bookmark_question_1}\n{bookmark_question_2}"
bookmark_answer_1 = f"To bookmark a product, simply click the \"Bookmark\" button on any product card. A modal will pop up after the button is clicked and you will be asked to fill out a short note for your bookmark. It will be very helpful in the future!!\n\nHope it helps!!\n\n{other_question}"
bookmark_answer_2 = f"To view your bookmarks, click the bookmark symbol located in the navigation bar, in between the cart and the robot symbols.\n\nHope it helps!!\n\n{other_question}"

review_question_1 = f"1️⃣ Write a product review"
review_question_2 = f"2️⃣ Review rules"
review_questions = f"{please_choose}{review_question_1}\n{review_question_2}"
review_answer_1 = f"To write a review for a product, you will need to be in the product details page.\n\nClick on any product images, it will take you to the product details page.\n\nIn the product details page, click the yellow pencil located at the bottom right of the modal.\n\nAfter that, a review form will pop up and you will need to fill out the form appropriately. You can also rate the product (1-5) by clicking the number of stars as desired.\n\nHope it helps!!\n\n{other_question}"
review_answer_2 = f"➡️ You can not write a review for your own product\n\n➡️ You can only write one review for a product\n\n➡️ The review rating must be between 1 and 5\n\nHope it helps!!\n\n{other_question}"

order_question_1 = f"1️⃣ Cart"
order_question_2 = f"2️⃣ Checkout"
order_questions = f"{please_choose}{order_question_1}\n{order_question_2}"
order_answer_1 = f"To add a product into your cart, click the \"Add to cart\" button on any product card that you see.\n\nNote that you can not add your own product to cart.\n\nAfter the button is clicked, the cart will automatically side in from the right side, showing the product you just added.\n\nYou can easily remove the item from cart by clicking the delete button\n\nYou can update the quantity of each items in your cart as desired. Please note that after each update, you will need to save the changes by clicking the paper-plane symbol.\n\nThe subtotal of the order will be updated accordingly after each operation.\n\nHope it helps!!\n\n{other_question}"
order_answer_2 = f"To checkout, you first need to open your cart by clicking the cart symbol in the navigation bar.\n\nInside the cart, click the \"Proceed to checkout\" button to checkout.\n\nYou will be asked to confirm the subtotal of your order! Once confirm, you will be taken to the past orders page, where you can view the order you just purchased!!\n\nHope it helps!!\n\n{other_question}"

search_question_1 = f"1️⃣ Search all products"
search_question_2 = f"2️⃣ Search products by name under a specific category"
search_questions = f"{please_choose}{search_question_1}\n{search_question_2}"
search_answer_1 = f"To search for all products in our system, ensure that the \"All Categories\" option in the navigation bar is selected.\n\nAfter that, start typing the product name in the searchbox located in the navigation bar.\n\nPlease note that the search is case-insensitive and it's searching by substring.\n\nHope it helps!!\n\n{other_question}"
search_answer_2 = f"To search a product under a specific category, you will need to select your desired category in the navigation bar.\n\nSelecting different categories will show only the products belonged to that category on the page.\n\nAfter that, start typing the product name in the searchbox located in the navigation bar.\n\nPlese note that the search is case-insensitive and it's searching by substring.\n\nHope it helps!!\n\n{other_question}"

profile_question_1 = f"1️⃣ Update profile"
profile_question_2 = f"2️⃣ Change password"
profile_questions = f"{please_choose}{profile_question_1}\n{profile_question_2}"
profile_answer_1 = f"To update your profile, click your avatar (or the default avatar if you don't have one) in the navigation bar.\n\nAfter that, your profile page will pop up. You can then select the \"Update\" button to update your profile.\n\nPlease note that you are not allowed to update your username or email, and you must enter your current password for security reason.\n\nHope it helps!!\n\n{other_question}"
profile_answer_2 = f"To change your password, click your avatar (or the default avatar if you don't have one) in the navigation bar.\n\nAfter that, your profile page will pop up. You can then select the \"Change password\" button to change your password.\n\n Please note that you must enter your current password for security reason. Besides that, you will have to login again with your new password.\n\nHope it helps!!\n\n{other_question}"

map = {
    "state": "",
    "X": wrong_option,
    "1": product_questions,
    "11": product_answer_1,
    "12": product_answer_2,
    "111": please_choose + topics_list,
    "112": goodbye,
    "2": bookmark_questions,
    "21": bookmark_answer_1,
    "22": bookmark_answer_2,
    "3": review_questions,
    "31": review_answer_1,
    "32": review_answer_2,
    "4": order_questions,
    "41": order_answer_1,
    "42": order_answer_2,
    "5": search_questions,
    "51": search_answer_1,
    "52": search_answer_2,
    "6": profile_questions,
    "61": profile_answer_1,
    "62": profile_answer_2
}
allowed_keys = ["1", "2", "3", "4", "5", "6"]


@message_routes.route('/', methods=['POST'])
def handle_new_user_message():
    """New user message"""
    data = request.json
    chatbot_id = 0
    message = {
        "id": data["id"] + 1,
        "sender_id": chatbot_id
    }
    key = data["text"]

    if map["state"] == "":
        if key in allowed_keys:
            map["state"] = key
            message["text"] = map[key]
        else:
            message["text"] = map["X"]
    elif map["state"] == "1":
        if key == "1":
            map["state"] = "11"
            message["text"] = map["11"]
        elif key == "2":
            map["state"] = "12"
            message["text"] = map["12"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    elif map["state"] in ["11", "12", "21", "22", "31", "32", "41", "42", "51", "52", "61", "62"]:
        if key == "1":
            map["state"] = ""
            message["text"] = map["111"]
        elif key == "2":
            map["state"] = ""
            message["text"] = map["112"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    elif map["state"] == "2":
        if key == "1":
            map["state"] = "21"
            message["text"] = map["21"]
        elif key == "2":
            map["state"] = "22"
            message["text"] = map["22"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    elif map["state"] == "3":
        if key == "1":
            map["state"] = "31"
            message["text"] = map["31"]
        elif key == "2":
            map["state"] = "32"
            message["text"] = map["32"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    elif map["state"] == "4":
        if key == "1":
            map["state"] = "41"
            message["text"] = map["41"]
        elif key == "2":
            map["state"] = "42"
            message["text"] = map["42"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    elif map["state"] == "5":
        if key == "1":
            map["state"] = "51"
            message["text"] = map["51"]
        elif key == "2":
            map["state"] = "52"
            message["text"] = map["52"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    elif map["state"] == "6":
        if key == "1":
            map["state"] = "61"
            message["text"] = map["61"]
        elif key == "2":
            map["state"] = "62"
            message["text"] = map["62"]
        else:
            message["text"] = invalid_choice + map[map["state"]]
    else:
        message["text"] = map["X"]


    socketio.emit("new_robot_message", [data, message])

    return {}, 200
