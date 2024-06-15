from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello_world() -> str:
    return 'Hello, World!'

@app.route('/video/<path:subpath>')
def stream_video(subpath: str):
    return send_from_directory('videos', subpath)

if __name__ == '__main__':
    app.run(debug=True)
