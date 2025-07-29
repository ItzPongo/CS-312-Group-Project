// Back to the main index page
function goBack() {
  window.location.href = 'index.html';
}

// Calculate total expenses, income, and category totals for a given month and year
function calcMonthlyExpenses(expenses, year, month) {
  const startMonth = new Date(year, month, 1);
  const endMonth = new Date(year, month + 1, 1);

  const categoryTotals = {};
  let total = 0;
  let income = 0;

  for (const expense of expenses) {
    const expenseDate = new Date(expense.date);

    // Only include expenses within the target month
    if (expenseDate >= startMonth && expenseDate < endMonth) {
      const amount = parseFloat(expense.amount);

      // Separate income from expenses
      if (expense.category.toLowerCase() === 'income') {
        income += amount;
      } else {
        total += amount;
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + amount;
      }
    }
  }

  return { total, income, categoryTotals };
}

// Get expenses from the server and update the monthly summary table
async function loadMonthlySummary(targetYear, targetMonth) {
  const totalCell = document.getElementById('month-total-bottom');
  const incomeRow = document.getElementById('income-row');
  const incomeCell = document.getElementById('income-value');
  const balanceCell = document.getElementById('remaining-balance');
  const tableBody = document.querySelector('#monthly-table tbody');

  try {
    const res = await fetch('/api/expenses');
    if (!res.ok) throw new Error('Failed to fetch expenses');

    const expenses = await res.json();
    const { total, income, categoryTotals } = calcMonthlyExpenses(expenses, targetYear, targetMonth);

    // Empty table if needed
    tableBody.innerHTML = '';

    // Add a row for each category with its total amount
    for (const [category, amount] of Object.entries(categoryTotals)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${category}</td>
        <td style="color: red;">$${amount.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    }

    // Show or hide income row depending on if income exists
    if (income > 0) {
      incomeRow.style.display = '';
      incomeCell.textContent = `$${income.toFixed(2)}`;
      incomeCell.style.color = 'green';
    } else {
      incomeRow.style.display = 'none';
    }

    // Display total expenses
    totalCell.textContent = `$${total.toFixed(2)}`;
    totalCell.style.color = 'red';

    // Calculate remaining balance
    const remaining = Math.max(income - total, 0);
    balanceCell.textContent = `$${remaining.toFixed(2)}`;
    balanceCell.style.fontWeight = 'bold';

  } catch (err) {
    console.error('Error loading monthly expenses:', err);
    totalCell.textContent = 'Error';
  }
}

// Initialize the page with the current month and listen for changes on the month picker
document.addEventListener('DOMContentLoaded', () => {
  const monthPicker = document.getElementById('month-select');
  const now = new Date();
  const currentMonth = now.toISOString().slice(0, 7);
  monthPicker.value = currentMonth;

  const [year, month] = currentMonth.split('-').map(Number);
  loadMonthlySummary(year, month - 1);

  monthPicker.addEventListener('change', () => {
    const [year, month] = monthPicker.value.split('-').map(Number);
    loadMonthlySummary(year, month - 1);
  });
});