import cv2
import numpy as np
import mediapipe as mp
import os
import time

prototxt_path = r'C:\Users\satya\Desktop\Projects\Walmart Camera\deploy.prototxt'
model_path = r'C:\Users\satya\Desktop\Projects\Walmart Camera\res10_300x300_ssd_iter_140000.caffemodel'

if not os.path.isfile(prototxt_path) or not os.path.isfile(model_path):
    print("Model files not found. Please download 'deploy.prototxt' and 'res10_300x300_ssd_iter_140000_fp16.caffemodel'.")
    exit()

print("Loading models...")

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

mp_drawing = mp.solutions.drawing_utils

net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video stream.")
    exit()

print("Video stream opened. Starting detection...")

start_time = time.time()
max_people_left = 0
max_people_right = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture image.")
        continue 
    
    h, w = frame.shape[:2]
    
    left_region = (0, w // 3)
    middle_region = (w // 3, 2 * w // 3)
    right_region = (2 * w // 3, w)

    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()
    
    num_people_left = 0
    num_people_right = 0

    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:  
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (x1, y1, x2, y2) = box.astype('int')
            
 
            person_region = frame[y1:y2, x1:x2]
            person_rgb = cv2.cvtColor(person_region, cv2.COLOR_BGR2RGB)
            results = pose.process(person_rgb)
            
            if results.pose_landmarks:
                mp_drawing.draw_landmarks(
                    person_region, 
                    results.pose_landmarks, 
                    mp_pose.POSE_CONNECTIONS
                )
                
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            
            if x1 >= left_region[0] and x2 <= left_region[1]:
                num_people_left += 1
            elif x1 >= right_region[0] and x2 <= right_region[1]:
                num_people_right += 1

    if num_people_left > max_people_left:
        max_people_left = num_people_left
    if num_people_right > max_people_right:
        max_people_right = num_people_right

    cv2.line(frame, (left_region[1], 0), (left_region[1], h), (255, 0, 0), 2) 
    cv2.line(frame, (right_region[0], 0), (right_region[0], h), (255, 0, 0), 2) 

    cv2.putText(frame, f"Current people (L): {num_people_left}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Current people (R): {num_people_right}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Max people (L) in 1 min: {max_people_left}", (10, 110), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Max people (R) in 1 min: {max_people_right}", (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Multi-Pose Detection', frame)
    

    if cv2.waitKey(10) & 0xFF == ord('q'):
        break

    if time.time() - start_time >= 60:
        print(f"Max people detected in the last 1 minute (Left): {max_people_left}")
        print(f"Max people detected in the last 1 minute (Right): {max_people_right}")

        start_time = time.time()
        max_people_left = 0
        max_people_right = 0

cap.release()
cv2.destroyAllWindows()

print("Video stream closed.")
