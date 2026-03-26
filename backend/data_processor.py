import os
import requests
import pandas as pd
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('OPENWEATHER_API_KEY')
BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"

def get_processed_data(city='Delhi'):
    if not API_KEY:
        raise ValueError("OpenWeather API Key not found in .env file")

    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        raise Exception(f"Failed to fetch data from OpenWeather: {str(e)}")

    # Process OWM forecast data
    # data['list'] contains 40 data points (every 3 hours for 5 days)
    records = []
    for item in data['list']:
        dt = datetime.fromtimestamp(item['dt'])
        records.append({
            'date': dt,
            'date_str': dt.strftime('%H:%M'), # For daily 3hr view
            'day_label': dt.strftime('%b %d'),
            'temperature': float(item['main']['temp']),
            'humidity': float(item['main']['humidity']),
            'rainfall': float(item.get('rain', {}).get('3h', 0) if isinstance(item.get('rain'), dict) else 0),
            'week': int(dt.isocalendar()[1])
        })

    df = pd.DataFrame(records)
    
    # 1. Daily trends (next 24 hours - approx 8 points)
    daily_data = []
    for _, row in df.head(8).iterrows():
        daily_data.append({
            'date_str': str(row['date_str']),
            'day_label': str(row['day_label']),
            'temperature': float(row['temperature']),
            'humidity': float(row['humidity']),
            'rainfall': float(row['rainfall']),
            'week': int(row['week'])
        })
    
    # 2. Weekly averages (grouped by day for the 5-day forecast)
    df['date_only'] = df['date'].dt.strftime('%Y-%m-%d')
    weekly_avg = df.groupby('date_only').agg({
        'temperature': 'mean',
        'humidity': 'mean',
        'rainfall': 'sum'
    }).reset_index()
    
    # week_label is the day name
    weekly_avg['week_label'] = pd.to_datetime(weekly_avg['date_only']).dt.strftime('%a')
    
    # 3. Summary
    summary = {
        'avg_temp': float(df['temperature'].mean().round(1)),
        'max_temp': float(df['temperature'].max().round(1)),
        'min_temp': float(df['temperature'].min().round(1)),
        'avg_humidity': float(df['humidity'].mean().round(1)),
        'total_rainfall': float(df['rainfall'].sum().round(1)),
        'city_name': f"{data['city']['name']}, {data['city']['country']}"
    }

    # Convert weekly_avg to native types for JSON serialization
    weekly_data = []
    for _, row in weekly_avg.iterrows():
        weekly_data.append({
            'date_only': str(row['date_only']),
            'temperature': float(row['temperature']),
            'humidity': float(row['humidity']),
            'rainfall': float(row['rainfall']),
            'week_label': str(row['week_label'])
        })

    return {
        'daily': daily_data,
        'weekly': weekly_data,
        'summary': summary
    }

def get_city_suggestions(query):
    if not API_KEY:
        return []
    
    geo_url = "http://api.openweathermap.org/geo/1.0/direct"
    params = {
        'q': query,
        'limit': 5,
        'appid': API_KEY
    }
    
    try:
        response = requests.get(geo_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        suggestions = []
        for item in data:
            label = f"{item['name']}, {item.get('state', '')} {item['country']}".replace("  ", " ").strip()
            suggestions.append({
                'name': item['name'],
                'label': label
            })
        return suggestions
    except Exception:
        return []
