# CS 312 Group 1 Project: Expense Tracker Website
A simple expense tracking application incorporating HTML, CSS, and JS along with running a server through Node.js & Express. Users can log expenses by the $ amount, date, category, and description, as well as
viewing and filtering logged expenses.

---

## Features
- Add expenses by filling out amount, date and category with an optional description
- Add income by filling out amount, date and category with optional description
- Filter expenses/income by category
- Shows a scrollable list of all expenses entered
- Find out total spending for the current week
- Search through weeks
- Find out total spending for current month
- Search through months
- Edit and Delete expenses/income
- Find out remaining balance of income and total expenses for month and week

---

## Folder structure

```bash
Project_Group_1_Expense_Tracking_Website/
├── public/
│   ├── index.html          # Main Homepage
│   ├── expense.html        # Page for Individual Expense
│   ├── weeksum.html        # Weekly Summary Page
│   ├── monthly.html        # Monthly Summary Page
│   ├── css/
│   │   └── style.css       # Styling Sheet
│   └── js/
│       ├── script.js       # Logic for Homepage
│       ├── expense.js      # Logic for Expense Page
│       ├── monthly.js      # Logic for Monthly Summary
│       └── weeksum.js      # Logic for Weekly Summary
├── init.sql                # SQL Database File
├── server.js               # Express server setup
└── package.json            # Node dependencies
```

---

## How to start the website
### Make sure you have pgAdmin installed
### Clone the repository

```bash
git clone https://github.com/ItzPongo/Project_Group_1_Expense_Tracking_Website.git
cd Project_Group_1_Expense_Tracking_Website
```

### Install the dependencies

```bash
npm install
```

### Run postgres (Should be similar to this command)

```bash
"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d postgres
```

### In postgres, Create the Database

```bash
postgres=# CREATE DATABASE expensesdb;
```

### Connect to New Database

```bash
postgres=# \c expensesdb
```

### Populate Database

```bash
expensesdb=# \i init.sql
```

### Quit postgres

```bash
expensesdb=# \q
```

### Run the server

```bash
node server.js
```

### Open website in browser

[Expense Website](http://localhost:4000)
