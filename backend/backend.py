import os
import base64
import json
import re
import google.auth
from flask import Flask, redirect, url_for, session, request, jsonify
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from flask_cors import CORS
from dotenv import load_dotenv
import hashlib
import requests
import random
import string

# Flask Setup
app = Flask(__name__)

load_dotenv()

APP_SECRET = os.getenv("APP_SECRET", "secret_key")
app.secret_key = APP_SECRET  # Change this!
CORS(app)
RAPIDAPI_KEY = os.getenv('RAPID_API_KEY')

RAPIDAPI_HOST = "privatix-temp-mail-v1.p.rapidapi.com"
BASE_URL = f"https://{RAPIDAPI_HOST}"

email_category = "personal"
user_emails = []
with open("user_emails.json", "r") as fp:
    user_emails = json.load(fp)

# Google OAuth 2.0 Config
SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid"
]
CLIENT_SECRETS_FILE = "credentials.json"  # Ensure this file exists

# Setup OAuth Flow with redirect URI set to port 8080
flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=SCOPES,
    redirect_uri="https://localhost:8080/callback"
)

@app.route("/")
def home():
    """Home page - Shows login link."""
    return '<a href="/login">Login with Google</a>'

@app.route("/login/")
def login():
    global email_category
    email_category = request.args.get("category")
    if (email_category is None):
        email_category = "personal"
        return {}, 400
    """Redirect user to Google for authentication."""
    auth_url, _ = flow.authorization_url(prompt="consent")
    return redirect(auth_url)

@app.route("/callback")
def callback():
    """Handle Google's OAuth callback."""
    flow.fetch_token(authorization_response=request.url)

    # Save credentials in session
    creds = flow.credentials
    credentials = {
          "token": creds.token,
          "refresh_token": creds.refresh_token,
          "token_uri": creds.token_uri,
          "client_id": creds.client_id,
          "client_secret": creds.client_secret,
          "scopes": creds.scopes,
          "category": email_category
      }
    user_emails.append(credentials)
    with open("user_emails.json", "w") as fp:
        json.dump(user_emails, fp)

    return redirect("http://localhost:5173/manager")

def clean_text(text):
    """Remove links, images, and extra spaces from email text."""
    text = re.sub(r'http[s]?://\S+', '', text)  # Remove links (URLs)
    text = re.sub(r'\S+@\S+', '', text)  # Remove email addresses
    text = re.sub(r'<.*?>', '', text)  # Remove any leftover HTML tags
    text = re.sub(r'(\n+\r*)|(\n*\r+)', '\n', text).strip()  # Remove extra newlines
    text = re.sub(r'\n+', '\n', text).strip()  # Remove extra newlines
    text = re.sub('\[.*?\]', '', text).strip()  # Remove images
    return text

def get_emails(index):
    """Fetch and display recent emails with content."""
    if "credentials" not in session:
        return redirect(url_for("login"))

    creds = user_emails[index].copy()
    del(creds["category"])
    creds = Credentials(**creds)
    service = build("gmail", "v1", credentials=creds)

    # Initialize People API
    people_service = build("people", "v1", credentials=creds)

    # Fetch user profile (name, email, photo)
    profile = people_service.people().get(
        resourceName="people/me",
        personFields="photos"
    ).execute()

    photo = profile.get("photos", [{}])[0].get("url", "No Photo")

    results = service.users().messages().list(userId="me", maxResults=20).execute()
    messages = results.get("messages", [])

    emails = []
    for msg in messages:
        msg_data = service.users().messages().get(userId="me", id=msg["id"]).execute()
        payload = msg_data["payload"]
        headers = payload["headers"]

        subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
        sender = next((h["value"] for h in headers if h["name"] == "From"), "Unknown Sender")
        date = next((h["value"] for h in headers if h["name"] == "Date"))
        is_unread = "UNREAD" in msg_data.get("labelIds", [])

        # Extract Email Body
        body = "No Content"
        plain_text = None
        if "parts" in payload:  # For multipart emails
            for part in payload["parts"]:
                if part["mimeType"] == "text/html":  # Extract plain text content
                    body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
                    break
                elif part["mimeType"] == "text/plain":
                    plain_text = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
        elif "body" in payload:  # For simple emails
            body = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")
            plain_text = body


        emails.append({"from": sender, "subject": subject, "content": body, "plain_content": clean_text(plain_text), "date": date, "unread": is_unread, "avatar": photo})

    return emails

@app.route("/emails")
def get_all_emails():
    nested_list = [get_emails(i) for i in range(len(user_emails))]
    flattened = [item for sublist in nested_list for item in sublist]

    return jsonify(flattened)

def get_profile(index):
    """Fetch user profile (name, email, and profile picture) using Google People API."""
    if "credentials" not in session:
        return redirect(url_for("login"))

    creds = user_emails[index].copy()
    del(creds["category"])
    creds = Credentials(**creds)

    # Refresh token if expired
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())

    # Initialize People API
    people_service = build("people", "v1", credentials=creds)

    # Fetch user profile (name, email, photo)
    profile = people_service.people().get(
        resourceName="people/me",
        personFields="names,emailAddresses,photos"
    ).execute()

    # Extract user details
    name = profile.get("names", [{}])[0].get("displayName", "Unknown")
    email = profile.get("emailAddresses", [{}])[0].get("value", "No Email")
    photo = profile.get("photos", [{}])[0].get("url", "No Photo")
    category = user_emails[index]["category"]

    return {"name": name, "email": email, "photo": photo, "category": category}

@app.route("/all_profiles")
def get_all_user_profiles():
    profiles = [get_profile(x) for x in range(len(user_emails))]
    return jsonify(profiles)

@app.route("/logout")
def logout():
    """Clear session and log out."""
    session.clear()
    return redirect(url_for("home"))

@app.route("/create-email", methods=["GET"])
def create_email():
    """
    1. Get a list of valid domains from the Temp Mail API.
    2. Create a random local-part for the email address.
    3. Combine them into a new disposable email.
    4. Return the disposable email address to the client.
    """
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }

    
    # 1. Get domains list
    domains_endpoint = f"{BASE_URL}/request/domains"
    domains_response = requests.get(domains_endpoint, headers=headers)
    if domains_response.status_code != 200:
        return jsonify({"error": "Could not fetch domains"}), domains_response.status_code
    
    domains = domains_response.json()
    if not domains:
        return jsonify({"error": "No domains returned from API"}), 400

    # 2. Generate random local-part (e.g., tempABC123)
    random_local_part = "temp" + ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))

    # 3. Pick one domain randomly (or choose the first one, up to you)
    chosen_domain = random.choice(domains)
    disposable_email = f"{random_local_part}{chosen_domain}"

    # Return the newly created disposable email
    return jsonify({"email": disposable_email})

@app.route("/get-emails", methods=["GET"])
def get_temp_emails():
    """
    Given an email address (via query parameter 'email'),
    1. Compute its MD5 hash.
    2. Call the 'Get emails' endpoint from Temp Mail API.
    3. Return any messages found for that disposable email.
    """
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Please provide an 'email' query parameter"}), 400

    # 1. Compute MD5 of the email address
    email_md5 = hashlib.md5(email.encode("utf-8")).hexdigest()

    # 2. Call Temp Mail API to fetch emails for this MD5
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    get_emails_endpoint = f"{BASE_URL}/request/mail/id/{email_md5}/"
    response = requests.get(get_emails_endpoint, headers=headers)

    if response.status_code != 200:
        return jsonify({"error": "Could not fetch emails"}), response.status_code

    # 3. Return the emails in JSON format
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True, port=8080, host="localhost", ssl_context="adhoc")
