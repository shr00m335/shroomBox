# ShroomBox

## Introduction

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
