// Navigate back to the home page
function backHome() {
  window.location.href = 'index.html';
}

// Calculate weekly expenses and income within the 7-days
function calcWeeklyExpenses(expenses, startWeek) {
  // Calculate end of week (7 days after startWeek)
  const endWeek = new Date(startWeek);
  endWeek.setDate(startWeek.getDate() + 7);

  const categoryTotals = {};
  let totalExpenses = 0;
  let totalIncome = 0;

  for (const expense of expenses) {
    const expenseDate = new Date(expense.date);

    // Include only expenses that fall within the week [startWeek, endWeek)
    if (expenseDate >= startWeek && expenseDate < endWeek) {
      const amount = parseFloat(expense.amount);

      if (expense.category === 'Income') {
        totalIncome += amount;
      } else {
        totalExpenses += amount;
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + amount;
      }
    }
  }

  return { totalExpenses, totalIncome, categoryTotals };
}

// Fetch expenses and update the weekly summary table
async function loadWeeklySummary(startWeek) {
  const tableBody = document.querySelector('#weekly-table tbody');
  const totalCell = document.getElementById('week-total');
  const remainingBalanceEl = document.getElementById('remaining-balance');

  try {
    const res = await fetch('/api/expenses');
    if (!res.ok) throw new Error('Failed to fetch expenses');

    const expenses = await res.json();

    // Calculate totals for the selected week
    const { totalExpenses, totalIncome, categoryTotals } = calcWeeklyExpenses(expenses, startWeek);

    // Clear existing rows
    tableBody.innerHTML = '';

    // Add rows for each expense category
    for (const [category, amount] of Object.entries(categoryTotals)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${category}</td>
        <td style="color: red;">$${amount.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    }

    // Add income row
    const incomeRow = document.createElement('tr');
    incomeRow.innerHTML = `
      <td><strong>Income</strong></td>
      <td><strong style="color: green;">$${totalIncome.toFixed(2)}</strong></td>
    `;
    incomeRow.classList.add('income-row');
    tableBody.appendChild(incomeRow);

    // Add total expenses row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td><strong>Total Expenses</strong></td>
      <td><strong style="color: red;">$${totalExpenses.toFixed(2)}</strong></td>
    `;
    totalRow.classList.add('total-row');
    tableBody.appendChild(totalRow);

    // Calculate remaining balance
    const remaining = totalIncome - totalExpenses;
    const displayRemaining = remaining < 0 ? 0 : remaining;
    remainingBalanceEl.textContent = `$${displayRemaining.toFixed(2)}`;

  } catch (err) {
    console.error('Error loading weekly expenses:', err);
    tableBody.innerHTML = `<tr><td colspan="2">Unable to load data.</td></tr>`;
    totalCell.textContent = '';
    remainingBalanceEl.textContent = '';
  }
}

// Initialize the week selector and load data for the current week on page load
document.addEventListener('DOMContentLoaded', () => {
  const weekInput = document.getElementById('week-select');

  // Default week set to the most recent Sunday
  const now = new Date();
  const defaultSunday = new Date(now);
  defaultSunday.setDate(now.getDate() - now.getDay()); // Sunday of current week
  defaultSunday.setHours(0, 0, 0, 0);
  weekInput.valueAsDate = defaultSunday;

  // Load weekly summary for the default week
  loadWeeklySummary(defaultSunday);

  // Update weekly summary when user selects a different week
  weekInput.addEventListener('change', () => {
    const selectedDate = new Date(weekInput.value);
    if (isNaN(selectedDate)) return;

    // Compute Sunday of the selected week
    const sunday = new Date(selectedDate);
    sunday.setDate(selectedDate.getDate() - selectedDate.getDay());
    sunday.setHours(0, 0, 0, 0);

    loadWeeklySummary(sunday);
  });
});
