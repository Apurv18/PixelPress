# Image Compressor

A web application that allows users to compress images with adjustable quality settings.

## Features

- Upload JPEG and PNG images
- Adjust compression quality (10-100%)
- Download compressed images
- Modern UI with Tailwind CSS
- Automatic file cleanup

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000

## Usage

1. Open your browser and go to http://localhost:3000
2. Click "Select Image" to choose a JPEG or PNG file
3. Adjust the compression quality using the slider
4. Click "Compress Image" to process the image
5. The compressed image will automatically download

## Technologies Used

- Frontend:
  - React
  - Axios
  - Tailwind CSS

- Backend:
  - Node.js
  - Express
  - Multer
  - Sharp
  - CORS