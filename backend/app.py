from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from moviepy.editor import VideoFileClip
import os
import threading
import time

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

capture_running = False  
capture_thread = None    
video_path = ''          

@app.route('/')
def hello_world() -> str:
    return 'Hello, World!'

@app.route('/video/<path:subpath>')
def stream_video(subpath: str):
    global video_path, capture_thread, capture_running

    video_path = os.path.join('static', subpath)
    
    if not capture_thread or not capture_thread.is_alive():
        capture_running = True
        capture_thread = threading.Thread(target=capture_screenshots)
        capture_thread.start()
    
    return send_from_directory('static', subpath)

@app.route('/toggle_capture')
def toggle_capture():
    global capture_running
    if capture_running:
        capture_running = False
        return 'Screenshot capture paused.'
    else:
        capture_running = True
        # if not capture_thread or not capture_thread.is_alive():
        #     capture_thread = threading.Thread(target=capture_screenshots)
        #     capture_thread.start()
        return 'Screenshot capture resumed.'

def capture_screenshots():
    global capture_running, video_path
    output_folder = os.path.join('static', 'screenshots')
    os.makedirs(output_folder, exist_ok=True)

    clip = VideoFileClip(video_path)
    duration = int(clip.duration)
    t = 0
    while t < duration and capture_running:
        frame_path = os.path.join(output_folder, f'screenshot_{t}.png')
        clip.save_frame(frame_path, t)
        print(f'Saved screenshot at {t} sec')
        t += 1
        time.sleep(1) 

    print('Screenshots capture completed or paused.')

if __name__ == '__main__':
    app.run(debug=True)
