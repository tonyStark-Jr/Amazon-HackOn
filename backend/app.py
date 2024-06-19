from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import base64
import numpy as np
import cv2
import torch

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
socketio = SocketIO(app, cors_allowed_origins="*")

model = torch.hub.load("ultralytics/yolov5", "yolov5s", pretrained=True)

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
    decoded_data = base64.b64decode(image_data)

    nparr = np.frombuffer(decoded_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (640, 480))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = torch.from_numpy(img).permute(2, 0, 1).float().div(255.0).unsqueeze(0)

    results = model(img)
    print(results)
    # Get all attributes of the results object
    attributes = dir(results)

    # Filter out special attributes (those starting with '__')
    attributes = [attr for attr in attributes if not attr.startswith('__')]

    # Print all attribute names
    for attr in attributes:
        print(attr)

    # Save the image to the server
    # try:
    #     filename = f"static/image_{int(time.time())}.png"
    #     with open(filename, "wb") as file:
    #         file.write(decoded_data)
    #     print("Image saved")

    # except Exception as err:
    #     print(err)


if __name__ == "__main__":
    socketio.run(app,debug=True)