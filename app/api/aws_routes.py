import os
import io
from flask import Blueprint, send_file
from .aws_helpers import get_binary_file


aws_routes = Blueprint('aws', __name__)


@aws_routes.route('/download/<obj_name>')
def get_file_from_s3(obj_name):
    BUCKET_NAME = os.environ.get("S3_BUCKET")
    blob = get_binary_file(BUCKET_NAME, obj_name)
    return send_file(io.BytesIO(blob), as_attachment=True, download_name=obj_name), 200
