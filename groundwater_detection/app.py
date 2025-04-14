
# import os
# import numpy as np
# import tensorflow as tf
# import cv2
# import matplotlib.pyplot as plt
# from io import BytesIO
# import base64
# from flask import Flask, request, jsonify, abort
# from werkzeug.utils import secure_filename
# from flask_cors import CORS  # Allow cross-origin requests

# # Set matplotlib to use a headless backend (useful if no display is available)
# import matplotlib
# matplotlib.use('Agg')

# # Flask app setup
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# app.secret_key = 'your_secret_key'
# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# # Load the trained model
# MODEL_PATH = "groundwater_detection_model.h5"
# model = tf.keras.models.load_model(MODEL_PATH)

# # Image dimensions (must match your training settings)
# IMG_HEIGHT, IMG_WIDTH = 224, 224

# # Define class labels (make sure these match your model's output)
# CLASS_LABELS = ["Average", "groundwater_present", "no_groundwater"]

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def preprocess_image(image_path):
#     image = cv2.imread(image_path)
#     if image is None:
#         raise ValueError("Could not read the image. Ensure the file is a valid image.")
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     image = cv2.resize(image, (IMG_WIDTH, IMG_HEIGHT))
#     image = image.astype('float32') / 255.0  # Normalize pixel values
#     return np.expand_dims(image, axis=0)

# def generate_graph(prediction, class_labels):
#     fig, ax = plt.subplots(figsize=(6, 4))
#     probabilities = prediction[0]
#     # Create a bar graph using the class labels and prediction probabilities.
#     ax.bar(class_labels, probabilities, color=['yellow', 'green', 'red'])
#     ax.set_ylim([0, 1])
#     ax.set_ylabel("Probability")
#     ax.set_title("Prediction Confidence per Class")
    
#     buf = BytesIO()
#     plt.savefig(buf, format='png')
#     plt.close(fig)
#     buf.seek(0)
#     graph_data = base64.b64encode(buf.getvalue()).decode('utf8')
#     return graph_data

# @app.route('/api/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part in the request.'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected for uploading.'}), 400
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)
        
#         try:
#             image = preprocess_image(filepath)
#         except Exception as e:
#             return jsonify({'error': f'Error processing image: {str(e)}'}), 400
        
#         # Get prediction from the model
#         prediction = model.predict(image)
#         probabilities = prediction[0].tolist()  # Extract probabilities as a list
#         class_index = int(np.argmax(prediction, axis=1)[0])
#         confidence = float(np.max(prediction))
#         result = CLASS_LABELS[class_index]
#         graph_data = generate_graph(prediction, CLASS_LABELS)
        
#         # Optionally remove the saved file after processing
#         os.remove(filepath)
        
#         return jsonify({
#             'result': result,
#             'confidence': round(confidence, 2),
#             'graph_data': graph_data,
#             'probabilities': probabilities  # Return raw probabilities
#         })
#     else:
#         return jsonify({'error': 'File type not allowed.'}), 400

# if __name__ == '__main__':
#     app.run(debug=True)


# import os
# import numpy as np
# import tensorflow as tf
# import cv2
# import matplotlib.pyplot as plt
# from io import BytesIO
# import base64
# import requests  # New import for fetching remote file
# from flask import Flask, request, jsonify, Response  # Added Response
# from werkzeug.utils import secure_filename
# from flask_cors import CORS  # Allow cross-origin requests
# from werkzeug.security import check_password_hash, generate_password_hash
# from pymongo import MongoClient
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart

# # Set matplotlib to use a headless backend (useful if no display is available)
# import matplotlib
# matplotlib.use('Agg')

# # Flask app setup
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# app.secret_key = 'your_secret_key'
# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# # --- Email Configuration ---
# EMAIL_HOST = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
# EMAIL_PORT = int(os.environ.get("EMAIL_PORT", 587))
# EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "somepallivenkatesh38@gmail.com")
# EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "kglt teqt sedp yqmc")
# EMAIL_USE_TLS = True

# # --- MongoDB Setup ---
# client = MongoClient("mongodb+srv://21bq1a05o2:Venky630335@cluster0.7xwmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
# db = client["ground_water"]
# users_collection = db["users"]
# contact_collection = db["contact_messages"]

# # --- Load the Trained Model ---
# MODEL_PATH = "groundwater_detection_model.h5"
# model = tf.keras.models.load_model(MODEL_PATH)

# # Image dimensions (must match your training settings)
# IMG_HEIGHT, IMG_WIDTH = 224, 224
# CLASS_LABELS = ["groundwater_present", "no_groundwater"]

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# def preprocess_image(image_path):
#     image = cv2.imread(image_path)
#     if image is None:
#         raise ValueError("Could not read the image. Ensure the file is a valid image.")
#     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#     image = cv2.resize(image, (IMG_WIDTH, IMG_HEIGHT))
#     image = image.astype('float32') / 255.0  # Normalize pixel values
#     return np.expand_dims(image, axis=0)

# def generate_graph(prediction, class_labels):
#     fig, ax = plt.subplots(figsize=(6, 4))
#     probabilities = prediction[0]
#     ax.bar(class_labels, probabilities, color=['green', 'red'])
#     ax.set_ylim([0, 1])
#     ax.set_ylabel("Probability")
#     ax.set_title("Prediction Confidence per Class")
    
#     buf = BytesIO()
#     plt.savefig(buf, format='png')
#     plt.close(fig)
#     buf.seek(0)
#     graph_data = base64.b64encode(buf.getvalue()).decode('utf8')
#     return graph_data

# # --- Download Endpoint ---
# @app.route('/download', methods=['GET'])
# def download_file():
#     # Direct download URL for Google Drive
#     file_url = "https://drive.google.com/uc?export=download&id=1_dRddhIPIOvJ_Y9fy9jQfXESBHwWwDIw"
#     try:
#         r = requests.get(file_url, stream=True)
#         r.raise_for_status()
#     except requests.RequestException as e:
#         return jsonify({'error': 'Error fetching file: ' + str(e)}), 500

#     # Create a response that streams the content back to the client
#     headers = {
#         "Content-Disposition": 'attachment; filename="Document.pdf"',
#         "Content-Type": r.headers.get("Content-Type", "application/octet-stream")
#     }
#     return Response(r.iter_content(chunk_size=8192), headers=headers)

# # --- Register Endpoint ---
# @app.route('/register', methods=['POST'])
# def register():
#     data = request.get_json() or {}
#     username = data.get("username")
#     email = data.get("email")
#     password = data.get("password")

#     if not username or not email or not password:
#         return jsonify({"error": "Username, email, and password are required."}), 400

#     if users_collection.find_one({"username": username}):
#         return jsonify({"error": "Username already taken."}), 400
#     if users_collection.find_one({"email": email}):
#         return jsonify({"error": "Email already registered."}), 400

#     password_hash = generate_password_hash(password)
#     user_doc = {"username": username, "email": email, "password_hash": password_hash}
#     users_collection.insert_one(user_doc)
#     return jsonify({"message": "Account created! Please login."}), 201

# # --- Login Endpoint ---
# @app.route("/api/login", methods=["POST"])
# def login():
#     data = request.get_json() or {}
#     username = data.get("username")
#     password = data.get("password")
    
#     if not username or not password:
#         return jsonify({"error": "Username and password are required"}), 400

#     user = users_collection.find_one({"username": username})
#     if not user or not check_password_hash(user["password_hash"], password):
#         return jsonify({"error": "Invalid username or password"}), 401

#     return jsonify({"username": user["username"]})

# # --- Prediction Endpoint ---
# @app.route('/api/predict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part in the request.'}), 400
    
#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No file selected for uploading.'}), 400
    
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#         file.save(filepath)
        
#         try:
#             image = preprocess_image(filepath)
#         except Exception as e:
#             return jsonify({'error': f'Error processing image: {str(e)}'}), 400
        
#         prediction = model.predict(image)
#         probabilities = prediction[0].tolist()
#         class_index = int(np.argmax(prediction, axis=1)[0])
#         confidence = float(np.max(prediction))
#         result = CLASS_LABELS[class_index]
#         graph_data = generate_graph(prediction, CLASS_LABELS)
        
#         os.remove(filepath)
        
#         return jsonify({
#             'result': result,
#             'confidence': round(confidence, 2),
#             'graph_data': graph_data,
#             'probabilities': probabilities
#         })
#     else:
#         return jsonify({'error': 'File type not allowed.'}), 400

# # --- Contact Endpoint ---
# @app.route('/api/contact', methods=['POST'])
# def contact():
#     data = request.get_json() or {}
#     name = data.get("name")
#     email = data.get("email")
#     subject = data.get("subject")
#     message = data.get("message")

#     if not name or not email or not message:
#         return jsonify({"error": "Name, email, and message are required."}), 400

#     contact_doc = {"name": name, "email": email, "subject": subject, "message": message}
#     contact_collection.insert_one(contact_doc)

#     msg = MIMEMultipart()
#     msg["From"] = EMAIL_HOST_USER
#     msg["To"] = email
#     msg["Subject"] = f"Thank you for contacting us: {subject or 'No Subject'}"
    
#     body = f"Hi {name},\n\nThank you for reaching out to us. We have received your message:\n\n{message}\n\nWe will get back to you shortly.\n\nRegards,\nGroundwater Team"
#     msg.attach(MIMEText(body, "plain"))

#     try:
#         server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
#         if EMAIL_USE_TLS:
#             server.starttls()
#         server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
#         server.sendmail(EMAIL_HOST_USER, email, msg.as_string())
#         server.quit()
#     except Exception as e:
#         return jsonify({"error": f"Message saved but email failed to send: {str(e)}"}), 500

#     return jsonify({"message": "Your message has been sent successfully!"}), 200

# if __name__ == '__main__':
#     app.run(debug=True)


import os
import numpy as np
import tensorflow as tf
import cv2
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import requests  # New import for fetching remote file
from flask import Flask, request, jsonify, Response  # Added Response
from werkzeug.utils import secure_filename
from flask_cors import CORS  # Allow cross-origin requests
from werkzeug.security import check_password_hash, generate_password_hash
from pymongo import MongoClient
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Set matplotlib to use a headless backend (useful if no display is available)
import matplotlib
matplotlib.use('Agg')

# Flask app setup
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Use environment variable for secret key in production
app.secret_key = os.environ.get('SECRET_KEY', 'your_secret_key')
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# --- Email Configuration ---
EMAIL_HOST = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.environ.get("EMAIL_PORT", 587))
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", "somepallivenkatesh38@gmail.com")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", "kglt teqt sedp yqmc")
EMAIL_USE_TLS = True

# --- MongoDB Setup ---
client = MongoClient("mongodb+srv://21bq1a05o2:Venky630335@cluster0.7xwmt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["ground_water"]
users_collection = db["users"]
contact_collection = db["contact_messages"]

# --- Load the Trained Model ---
MODEL_PATH = "groundwater_detection_model.h5"
# model = tf.keras.models.load_model(MODEL_PATH)
model = tf.keras.models.load_model(MODEL_PATH, compile=False)


# Image dimensions (must match your training settings)
IMG_HEIGHT, IMG_WIDTH = 224, 224
CLASS_LABELS = ["groundwater_present", "no_groundwater"]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Could not read the image. Ensure the file is a valid image.")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (IMG_WIDTH, IMG_HEIGHT))
    image = image.astype('float32') / 255.0  # Normalize pixel values
    return np.expand_dims(image, axis=0)

def generate_graph(prediction, class_labels):
    fig, ax = plt.subplots(figsize=(6, 4))
    probabilities = prediction[0]
    ax.bar(class_labels, probabilities, color=['green', 'red'])
    ax.set_ylim([0, 1])
    ax.set_ylabel("Probability")
    ax.set_title("Prediction Confidence per Class")
    
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    graph_data = base64.b64encode(buf.getvalue()).decode('utf8')
    return graph_data

# --- Download Endpoint ---
@app.route('/download', methods=['GET'])
def download_file():
    # Direct download URL for Google Drive
    file_url = "https://drive.google.com/uc?export=download&id=1_dRddhIPIOvJ_Y9fy9jQfXESBHwWwDIw"
    try:
        r = requests.get(file_url, stream=True)
        r.raise_for_status()
    except requests.RequestException as e:
        return jsonify({'error': 'Error fetching file: ' + str(e)}), 500

    # Create a response that streams the content back to the client
    headers = {
        "Content-Disposition": 'attachment; filename="Document.pdf"',
        "Content-Type": r.headers.get("Content-Type", "application/octet-stream")
    }
    return Response(r.iter_content(chunk_size=8192), headers=headers)

# --- Register Endpoint ---
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are required."}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already taken."}), 400
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered."}), 400

    password_hash = generate_password_hash(password)
    user_doc = {"username": username, "email": email, "password_hash": password_hash}
    users_collection.insert_one(user_doc)
    return jsonify({"message": "Account created! Please login."}), 201

# --- Login Endpoint ---
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = users_collection.find_one({"username": username})
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"username": user["username"]})

# --- Prediction Endpoint ---
@app.route('/api/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading.'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            image = preprocess_image(filepath)
        except Exception as e:
            return jsonify({'error': f'Error processing image: {str(e)}'}), 400
        
        prediction = model.predict(image)
        probabilities = prediction[0].tolist()
        class_index = int(np.argmax(prediction, axis=1)[0])
        confidence = float(np.max(prediction))
        result = CLASS_LABELS[class_index]
        graph_data = generate_graph(prediction, CLASS_LABELS)
        
        os.remove(filepath)
        
        return jsonify({
            'result': result,
            'confidence': round(confidence, 2),
            'graph_data': graph_data,
            'probabilities': probabilities
        })
    else:
        return jsonify({'error': 'File type not allowed.'}), 400

# --- Contact Endpoint ---
@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are required."}), 400

    contact_doc = {"name": name, "email": email, "subject": subject, "message": message}
    contact_collection.insert_one(contact_doc)

    msg = MIMEMultipart()
    msg["From"] = EMAIL_HOST_USER
    msg["To"] = email
    msg["Subject"] = f"Thank you for contacting us: {subject or 'No Subject'}"
    
    body = f"Hi {name},\n\nThank you for reaching out to us. We have received your message:\n\n{message}\n\nWe will get back to you shortly.\n\nRegards,\nGroundwater Team"
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        if EMAIL_USE_TLS:
            server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        server.sendmail(EMAIL_HOST_USER, email, msg.as_string())
        server.quit()
    except Exception as e:
        return jsonify({"error": f"Message saved but email failed to send: {str(e)}"}), 500

    return jsonify({"message": "Your message has been sent successfully!"}), 200

if __name__ == '__main__':
    # Use the PORT provided by Render; default to 5000 for local development.
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
