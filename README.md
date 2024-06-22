# Amazon-HackOn

A sophisticated enhancement of Amazon Prime Video's X-ray feature that transforms your shopping experience. It leverages advanced Meta Learning and Deep Learning algorithms to seamlessly identify and recommend products from your favorite video content. By addressing the challenges of Amazon's vast and dynamic product catalog and the limitations of traditional recognition methods, It bridges the gap between engaging visual content and effortless product accessibility, offering you a more immersive and personalized shopping journey.

## Features

- **Advanced Item Recognition Accuracy**: Leverages the YOLO model to accurately identify items from multimedia content, using Amazon's vast product image database for enhanced model training and validation. Continuous learning methodologies ensure the system adapts quickly to new data, maintaining high accuracy without extensive retraining.

- **Enhanced User Engagement and Conversion**: Monitors user interaction rates to gauge engagement with the item recognition and purchasing feature. Tracks conversion rates to measure the percentage of identified items leading to actual purchases on Amazon, providing insights into user behavior and system effectiveness.

- **Optimized System Performance**: Measures system latency to ensure quick response times from item recognition to displaying purchase options. Monitors scalability performance to maintain optimal user experience under varying loads, leveraging AWS services like EC2 for computing power, S3 for storage, and SageMaker for dynamic model training.

- **Seamless Integration with Amazon Ecosystem**: Extends capabilities to integrate with other Amazon services, such as Alexa, Kindle, and Fire TV, allowing users to interact with the system across different devices and platforms. This integration enhances the ability to identify and purchase items from a broader range of multimedia content within the Amazon ecosystem.

- **Utilization of Meta Learning**: Employs meta learning approaches to handle the extensive and dynamic range of products on Amazon. This method is crucial given the constant influx of new products and the unequal training sets available for each product type. Meta learning enables efficient adaptation to new products and user interactions, ensuring scalability and relevance.

## Tech Stack

- **Backend Development (Flask)**: Utilizes Flask to build lightweight and scalable backend services, handling API requests, processing multimedia content, and interfacing with the YOLO model.
- **Frontend Development (Next.js)**: Employs Next.js to create a responsive, server-side rendered interface for smooth user interactions and enhanced performance.
- **Data Analytics (Scikit-Learn, Matplotlib)**: Uses Scikit-Learn for implementing and evaluating machine learning algorithms, and Matplotlib for visualizing data insights and metrics.
- **Object Detection (YOLO with Meta Learning)**: Leverages YOLO for real-time object detection, enhanced by meta learning to continuously improve accuracy and adapt to new items.
- **Cloud Infrastructure (AWS)**: Deploys AWS services for scalable computing, storage, and machine learning, ensuring efficient data management and high availability.

## Installation

* Make sure your device has an active internet connection.
* Open the terminal or shell supported by your OS on your PC.
* Navigate to the directory where you want to clone your project.
* Clone the repository to your local setup using the command: `git clone https://github.com/bhupesh98/Amazon-HackOn.git`

### Frontend

* Once cloned, navigate to the frontend directory of the project: `cd frontend`
* Install all dependencies by running the following command: `npm install`
* Ensure you have the required environment variables saved in the `.env.local` file in the root of the project. A file `.env.example` is provided for reference.
* After the dependencies are installed, start the development server with the command: `npm run dev`
* The application will be live on `http://localhost:3000`.

### Backend

* Once cloned, navigate to the backend directory of the project: `cd backend`
* Install Pipenv if you haven't already by running the following command: `pip install pipenv`
* Set up the virtual environment and install all dependencies using Pipenv: `pipenv install`
* Activate the virtual environment: `pipenv shell`
* After the setup is complete, start the Flask server with the command:`flask run`
* The backend will be live on `http://localhost:5000`.
