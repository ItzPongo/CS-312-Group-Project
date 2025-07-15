# CS-312-Group-Project: Expense Tracker Website
A simple expense tracking application incorporating HTML, CSS, and JS along with running a server through Node.js & Express. Users can log expenses by the $ amount, date, category, and description, as well as
viewing and filtering logged expenses.

---

## Features
- Add expenses by filling out amount, date and category with an optional description
- Filter expenses by category
- Shows a scrollable list of all expenses entered
- Find out total spending for the current week

---

## Folder structure

```bash
CS-312-Group-Project/
├── public/
│   ├── index.html          # Main Homepage
│   ├── weeksum.html        # Weekly Summary Page
│   ├── css/
│   │   └── style.css       # Styling Sheet
│   └── js/
│       ├── script.js       # Logic for Homepage
│       └── weeksum.js      # Logic for Weekly Summary
├── server.js               # Express server setup
└── package.json            # Node dependencies
```

---

## How to start the website

### Clone the repository

```bash
git clone https://github.com/ItzPongo/CS-312-Group-Project.git
cd CS-312-Group-Project
```

### Install the dependencies

```bash
npm install
```

### Run the server

```bash
node server.js
```

### Open website in browser

[Expense Website](http://localhost:3000)
