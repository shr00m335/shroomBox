# ShroomBox

## Introduction

ShroomBox, the only email system you need.
Our current inbox already spores too many emails!

Email hasn’t evolved in over 20 years, we are bombarded by **spam**, **scams**. Managing accounts across platforms remains frustrating.

99% of services require email to sign up, even for one-time use, leaving inboxes cluttered.
Gmail, Outlook—put them aside, because ShroomBox is the “real fungi”.

At ShroomBox, we combine all your inbox into one unified space and manage temporary emails on demand.

ShroomBox uses AI to summarize emails, offer text-to-speech, enable search with AskAI, and smartly categorize messages.

A Chrome extension is also available for an immersive experience, auto-filling temporary email and sign-up details.

We have used React and Tailwind for the frontend, flask backend, OpenAI API, TempMail API, and Oauth2 api for our tech stack.

With ShroomBox, you can grow “much room” for all your emails.

**(This project is just a prototype, not designed for production deployment)**

## How to run

1. Clone this repository

```
git clone https://github.com/shr00m335/shroomBox.git
```

2. Go to the directory

```
cd shroomBox
```

3. Install required `node packages`

```
npm install
```

4. Install required Python packages

```
cd backend
pip3 install -r requirements.txt
```

5. Add your OpenAI Key in a `.env` file

```
VITE_OPENAI_API_KEY=<Your Open AI key>
```

6. Add your RapidAPI Key in `backed/.env`

```
RAPID_API_KEY=<Your RapidAPI key>
```

7. Add your google credentials json file to the `backend` directory

8. Run the frontend

```
npm run dev
```

9. Run the backend

```
cd backend
python3 backend.py
```
