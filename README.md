# ClimateDS - Advanced Weather Analytics

ClimateDS is a premium, real-time weather analytics platform built with a Flask backend and a React/Vite frontend. It provides global city search, autocomplete suggestions, and detailed meteorological insights including temperature trends, humidity, and precipitation data.

## 🚀 Features
- **Global Search**: Search for any city worldwide with intelligent autocomplete suggestions.
- **Dynamic Visualizations**: interactive charts for temperature, humidity, and rainfall using Recharts.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Real-time Data**: Powered by the OpenWeather 5-day forecast API.
- **Premium Aesthetics**: Sophisticated glassmorphism UI with smooth animations and transitions.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Lucide-React, Recharts, Axios, Vanilla CSS.
- **Backend**: Python, Flask, Flask-CORS, Pandas, Requests.
- **Deployment**:
  - **Backend**: Render (Gunicorn)
  - **Frontend**: Vercel

## 📦 Project Structure
```
DS/
├── backend/            # Flask API & Data Processing
│   ├── app.py          # Main entry point
│   ├── data_processor.py # API handling & Pandas logic
│   └── requirements.txt # Python dependencies
└── frontend/           # React/Vite Application
    ├── src/            # Components & Logic
    ├── public/         # Static assets
    └── .env            # Backend URL configuration
```

## ⚙️ Local Setup

### Backend
1. Navigate to `backend/`
2. Create a `.env` file with your `OPENWEATHER_API_KEY`.
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```

### Frontend
1. Navigate to `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `.env` to point to `http://localhost:5000`.
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Backend (Render)
- **Runtime**: Python 3
- **Root Directory**: `backend`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `gunicorn app:app`
- **Environment Variables**: `OPENWEATHER_API_KEY`, `PYTHON_VERSION` (3.8.x or similar).

### Frontend (Vercel)
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: `VITE_API_BASE_URL` (Points to Render backend).

---
Created by GN-30/Weather-Dashboard
