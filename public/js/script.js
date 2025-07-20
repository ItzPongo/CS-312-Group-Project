// server.js
const form = document.getElementById('expenses-form');
const list = document.getElementById('expenses-list');
const filter = document.getElementById('filter-category');

let expenses = [];

// Load expenses from PostgreSQL via API
async function loadExpenses() {
  // try and catch for error handling so it doesn't silently break
  try {
    const res = await fetch('/api/expenses');
    expenses = await res.json();
    renderExpenses();
  } catch (err) {
    console.error('Failed to load expenses:', err);
  }
}

// Handle form submission to add a new expense
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  const expense = { amount, date, category, description };

  await fetch('/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });

  await loadExpenses();
  form.reset();
});

// Filter event listener
filter.addEventListener('change', renderExpenses);

// Render the expense list by category
function renderExpenses() {
  const selectedCategory = filter.value;
  const tbody = document.querySelector('#expenses-table tbody');
  tbody.innerHTML = ""; // Clear previous rows

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  filteredExpenses.forEach(exp => {
    const dateObj = new Date(exp.date);
    const formattedDate = dateObj.toLocaleDateString('en-US');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>${exp.category}</td>
      <td><a href="expense.html?id=${exp.id}">$${parseFloat(exp.amount).toFixed(2)}</a></td>
    `;
    tbody.appendChild(row);
});

}


// Page navigation
function goToWeeklyExpensePage() {
  window.location.href = 'weeksum.html';
}

function goToMonthlyExpensePage() {
  window.location.href = 'monthly.html';
}

// Expose page navigation to HTML
window.goToWeeklyExpensePage = goToWeeklyExpensePage;
window.goToMonthlyExpensePage = goToMonthlyExpensePage;

// Initial load
loadExpenses();
