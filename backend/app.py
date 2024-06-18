from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os
import time
import base64

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def hello_world() -> str:
    return "Hello, World!"


@socketio.on("connect")
def handle_connect():
    print("Client connected")
    emit("message", {"data": "Connected to the server"})


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


@socketio.on("send_data")
def handle_send_data(data):
    print(f"Received data from client")
    image_data = data["data"].split(",")[1]
    try:
        decoded_data = base64.b64decode(image_data)
        filename = f"static/image_{int(time.time())}.png"
        with open(filename, "wb") as file:
            file.write(decoded_data)
        print("Image saved")

    except Exception as err:
        print(err)


@app.route("/video/<path:subpath>")
def stream_video(subpath: str):
    return send_from_directory("static", subpath)


if __name__ == "__main__":
    app.run(debug=True)
