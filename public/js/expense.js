const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Get references to form fields and buttons
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const form = document.getElementById("expense-form");
const deleteBtn = document.getElementById("delete-btn");

// If no ID provided, alert user
if (!id) {
  alert("No expense ID provided.");
} else {
  // Fetch existing expense data by ID and fill out form
  fetch(`/api/expenses/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load expense.");
      return res.json();
    })
    .then((expense) => {
      // Set form fields
      dateInput.value = expense.date.split("T")[0];
      categoryInput.value = expense.category;
      amountInput.value = expense.amount;
      descriptionInput.value = expense.description || "";
    })
    .catch((err) => {
      console.error(err);
      alert("Error loading expense.");
    });
}

// Handle form submission to update the expense
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Prepare updated expense data
  const updatedExpense = {
    date: dateInput.value,
    category: categoryInput.value,
    amount: parseFloat(amountInput.value),
    description: descriptionInput.value,
  };

  // Send PUT request to update expense on server
  fetch(`/api/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedExpense),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to update.");
      alert("Expense updated!");
    })
    .catch((err) => {
      console.error(err);
      alert("Error updating expense.");
    });
});

// Handle delete button click to remove the expense
deleteBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this expense?")) {
    fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete.");
        alert("Expense deleted.");
        // Redirect to homepage after successful deletion
        window.location.href = "index.html";
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting expense.");
      });
  }
});
