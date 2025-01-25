import requests

def exchange_code_for_token(code):
    url = 'https://oauth2.googleapis.com/token'
    payload = {
        'code': code,
        'client_id': 'YOUR_CLIENT_ID',
        'client_secret': 'YOUR_CLIENT_SECRET',
        'redirect_uri': 'http://localhost:3000/dashboard.html',
        'grant_type': 'authorization_code'
    }
    
    response = requests.post(url, data=payload)
    return response.json()  # This will contain the access token and user info
