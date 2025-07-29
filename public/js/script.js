// Get references to the form and category filter dropdown
const form = document.getElementById('expenses-form');
const filter = document.getElementById('filter-category');

let expenses = [];

// Load all expenses from backend API and render the table
async function loadExpenses() {
  try {
    const res = await fetch('/api/expenses');
    expenses = await res.json();
    renderExpenses();
  } catch (err) {
    console.error('Failed to load expenses:', err);
  }
}

// Handle form submission to add a new expense or income
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  // Get input values from the form
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  const expense = { amount, date, category, description };

  // Send POST request to add new expense
  await fetch('/api/expenses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  });

  // Reload the updated expenses and reset the form
  await loadExpenses();
  form.reset();
});

// Re-render the table whenever the filter selection changes
filter.addEventListener('change', renderExpenses);

// Render expenses table filtered by selected category
function renderExpenses() {
  const selectedCategory = filter.value;
  const tbody = document.querySelector('#expenses-table tbody');
  tbody.innerHTML = ""; // Clear existing rows

  // Filter expenses based on selected category or show all
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  // Create table rows for each filtered expense
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

// Navigation helpers for switching pages
function goToWeeklyExpensePage() {
  window.location.href = 'weeksum.html';
}

function goToMonthlyExpensePage() {
  window.location.href = 'monthly.html';
}

// Make navigation functions accessible globally
window.goToWeeklyExpensePage = goToWeeklyExpensePage;
window.goToMonthlyExpensePage = goToMonthlyExpensePage;

// Load expenses on page load
loadExpenses();
