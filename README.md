# ShroomBox

**(This project is just a prototype and proof-of-concept. Do not use it in any production deployment)**

## Introduction

**_ShroomBox_** combines all your email accounts into one convenient platform, streamlining your inbox management.

Whether **personal** or **professional**, you can access **all your emails** in one place, reducing clutter and increasing efficiency.

ShroomBox is designed to simplify and secure your email experience, with AI tools that save time and keep your communications organized.

## Key Features:

1. **Unified Inbox**: Combine multiple email accounts into one view for easier management.

2. **Temporary Email for convenience**: Generate one-time-use email addresses for fast and worry-free sign-ups.

3. **Chrome extension**: auto-fill in temporary emails on sign up websites.

4. **AI Summarization**: Get quick email summaries to save time.

5. **Text-to-Speech**: Listen to emails with the accessibility feature for on-the-go use.

6. **Smart AI Categorization**: Automatically sorts your emails into categories, helping you prioritize what matters.

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
