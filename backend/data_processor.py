import pandas as pd
import json

def get_processed_data():
    # Load data
    df = pd.read_csv('weather_data.csv')
    
    # Simple cleaning (ensure types)
    df['date'] = pd.to_datetime(df['date'])
    df['temperature'] = pd.to_numeric(df['temperature'])
    df['humidity'] = pd.to_numeric(df['humidity'])
    df['rainfall'] = pd.to_numeric(df['rainfall'])
    
    # Sort by date just in case
    df = df.sort_values('date')
    
    # Format date for JSON (string)
    df['date_str'] = df['date'].dt.strftime('%b %d')
    
    # Daily trends (original data for daily visualization)
    # Convert Timestamp to string for JSON serialization
    df_daily = df.copy()
    df_daily['date'] = df_daily['date'].dt.strftime('%Y-%m-%d')
    daily_data = df_daily.to_dict(orient='records')
    
    # Weekly averages (example aggregation)
    df['week'] = df['date'].dt.isocalendar().week
    weekly_avg = df.groupby('week')[['temperature', 'humidity', 'rainfall']].mean().reset_index()
    weekly_avg['week_label'] = 'Week ' + weekly_avg['week'].astype(str)
    
    return {
        'daily': daily_data,
        'weekly': weekly_avg.to_dict(orient='records'),
        'summary': {
            'avg_temp': round(df['temperature'].mean(), 1),
            'max_temp': round(df['temperature'].max(), 1),
            'min_temp': round(df['temperature'].min(), 1),
            'avg_humidity': round(df['humidity'].mean(), 1),
            'total_rainfall': round(df['rainfall'].sum(), 1)
        }
    }

if __name__ == "__main__":
    data = get_processed_data()
    print(json.dumps(data, indent=2))
