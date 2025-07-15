// go back to index.html - home
function backHome() {
	window.location.href = 'index.html';
}

// calculate the total weekly expenses
function calcWeeklyTotal(expenses) {
	// get the current date and time
	const now = new Date();
	
	// Represents the start of the week
	const startWeek = new Date(now);
	
	// Set the start of the week to the most recent Sunday
	startWeek.setDate(now.getDate() - now.getDay());
	// Set time to 00:00:00.000 -> 12 AM
	startWeek.setHours(0, 0, 0, 0);
	
	// Represents the end of the week
	const endWeek = new Date(startWeek);
	// add 7 days to the start of the week
	endWeek.setDate(startWeek.getDate() + 7);
	
	// Total variable to keep track of expenses
	let total = 0;
	
	// Loop through the expenses in expense array
	for( const expense of expenses ) {
		// convert the expense date into object
		const expenseDate = new Date(expense.date);
		
		// Check if the expense date falls within this week
		if( expenseDate >= startWeek && expenseDate < endWeek ) {
			// Add expense to the Total
			total += parseFloat(expense.amount);
		}
	}
	
	// return Total
	return total;
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  const rawData = localStorage.getItem('expenses');
  if (!rawData) {
    document.getElementById('week-total').textContent = "No data available.";
    return;
  }

  const expenses = JSON.parse(rawData);
  const total = calcWeeklyTotal(expenses);
  document.getElementById('week-total').textContent = `$${total.toFixed(2)} this week`;
});