// references to HTML documents
const form = document.getElementById( 'expenses-form' );
const list = document.getElementById( 'expenses-list' );
const filter = document.getElementById( 'filter-category' );

// empty array to store all expense records
let expenses = [];

// event listener for form submissions
form.addEventListener( 'submit', function (e) {
  // prevent any default for submission
  e.preventDefault();

  // input values from the form
  const amount = document.getElementById( 'amount' ).value;
  const date = document.getElementById( 'date' ).value;
  const category = document.getElementById( 'category' ).value;
  const description = document.getElementById( 'description' ).value;

  // new expense object
  const expense = { amount, date, category, description };
  // adds new expenses to array
  expenses.push( expense );

  // clear form inputs
  form.reset();
  // render the exepense(s) list with any new expenses
  renderExpenses();
} );

// event listenter for category filter changes
filter.addEventListener( 'change', renderExpenses );

// render the expense(s) list based on the selected category
function renderExpenses() {
  const selectedCategory = filter.value;
  list.innerHTML = "";

  // if "All" gets selected, display all expenses
  // if "All" isn't selected, filter by the selected category
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter( exp => exp.category === selectedCategory );

  // create listItem for any filtered expense
  // append listItem to the list
  filteredExpenses.forEach( exp => {
    const listItem = document.createElement( 'li' );
    // format for each expense entry
    listItem.textContent = `${exp.date} - $${exp.amount} [${exp.category}] ${exp.description}`;
    // add listItem to the expense(s) list
    list.appendChild( listItem );
  } );
}
