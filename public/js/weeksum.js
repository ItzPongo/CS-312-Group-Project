// go back to index.html - home
function backHome() {
	window.location.href = 'index.html';
}

// calculate the total weekly expenses and category breakdown
function calcWeeklyExpenses(expenses) {
	// get the current date and time
	const now = new Date();

	// Represents the start of the week (most recent Sunday at 12:00 AM)
	const startWeek = new Date(now);
	startWeek.setDate(now.getDate() - now.getDay());
	startWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

	// Represents the end of the week (upcoming Sunday)
	const endWeek = new Date(startWeek);
	endWeek.setDate(startWeek.getDate() + 7);

	// Object to track total spent per category
	const categoryTotals = {};
	
	// Variable to keep track of total spending this week
	let total = 0;

	// Loop through all expenses
	for (const expense of expenses) {
		// Convert expense date to Date object
		const expenseDate = new Date(expense.date);

		// Check if expense falls within this week
		if (expenseDate >= startWeek && expenseDate < endWeek) {
			const amount = parseFloat(expense.amount);
			total += amount;

			// Add to category total
			if (!categoryTotals[expense.category]) {
				categoryTotals[expense.category] = 0;
			}
			categoryTotals[expense.category] += amount;
		}
	}

	// Return both the total and the breakdown by category
	return { total, categoryTotals };
}

// On page load
document.addEventListener('DOMContentLoaded', async () => {
	// Get reference to elements
	const totalEl = document.getElementById('week-total');
	const tableBody = document.querySelector('#weekly-table tbody');

	try {
		// Fetch all expenses from the backend API
		const res = await fetch('/api/expenses');
		if (!res.ok) throw new Error('Failed to fetch expenses from server');

		// Convert response to JSON
		const expenses = await res.json();

		// Calculate total and category breakdown for the current week
		const { total, categoryTotals } = calcWeeklyExpenses(expenses);

		// Display the total spent this week
		totalEl.textContent = `You spent $${total.toFixed(2)} this week`;

		// Clear previous table rows
		tableBody.innerHTML = '';

		// Populate table with category-wise totals
		for (const [category, amount] of Object.entries(categoryTotals)) {
			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${category}</td>
				<td>$${amount.toFixed(2)}</td>
			`;
			tableBody.appendChild(row);
		}
	} catch (err) {
		// Handle fetch or processing errors
		console.error('Error loading weekly expenses:', err);
		totalEl.textContent = 'Unable to load weekly data.';
	}
});
