import os
import base64
import json
import google.auth
from flask import Flask, redirect, url_for, session, request, jsonify
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from flask_cors import CORS

# Flask Setup
app = Flask(__name__)
app.secret_key = "your_secret_key"  # Change this!
CORS(app)

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

@app.route("/login")
def login():
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
      }
    user_emails.append(credentials)
    with open("user_emails.json", "w") as fp:
        json.dump(user_emails, fp)

    return redirect("http://localhost:5173/manager")

@app.route("/emails")
def get_emails():
    """Fetch and display recent emails with content."""
    if "credentials" not in session:
        return redirect(url_for("login"))

    creds = Credentials(**session["credentials"])
    service = build("gmail", "v1", credentials=creds)

    results = service.users().messages().list(userId="me", maxResults=5).execute()
    messages = results.get("messages", [])

    emails = []
    for msg in messages:
        msg_data = service.users().messages().get(userId="me", id=msg["id"]).execute()
        payload = msg_data["payload"]
        headers = payload["headers"]

        subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
        sender = next((h["value"] for h in headers if h["name"] == "From"), "Unknown Sender")

        # Extract Email Body
        body = "No Content"
        if "parts" in payload:  # For multipart emails
            for part in payload["parts"]:
                if part["mimeType"] == "text/plain":  # Extract plain text content
                    body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
                    break
        elif "body" in payload:  # For simple emails
            body = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")

        emails.append({"from": sender, "subject": subject, "content": body})

    return jsonify(emails)

def get_profile(index):
    """Fetch user profile (name, email, and profile picture) using Google People API."""
    if "credentials" not in session:
        return redirect(url_for("login"))

    creds = Credentials(**user_emails[index])

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

    return {"name": name, "email": email, "photo": photo}

@app.route("/all_profiles")
def get_all_user_profiles():
    profiles = [get_profile(x) for x in range(len(user_emails))]
    return jsonify(profiles)

@app.route("/logout")
def logout():
    """Clear session and log out."""
    session.clear()
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True, port=8080, host="localhost", ssl_context="adhoc")
