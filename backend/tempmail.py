import random
import string
import hashlib
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace with your actual RapidAPI key and host
RAPIDAPI_KEY = "c25297cda3msh7e05d4cd25fccc5p154f03jsn42691cbc4a3a"
RAPIDAPI_HOST = "privatix-temp-mail-v1.p.rapidapi.com"

BASE_URL = f"https://{RAPIDAPI_HOST}"

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
def get_emails():
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
    app.run(debug=True)
