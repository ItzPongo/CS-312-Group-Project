const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const form = document.getElementById("expense-form");
const deleteBtn = document.getElementById("delete-btn");

if (!id) {
  alert("No expense ID provided.");
} else {
  fetch(`/api/expenses/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load expense.");
      return res.json();
    })
    .then((expense) => {
      dateInput.value = expense.date.split("T")[0]; // Remove time portion
      categoryInput.value = expense.category;
      amountInput.value = expense.amount;
      descriptionInput.value = expense.description || "";
    })
    .catch((err) => {
      console.error(err);
      alert("Error loading expense.");
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`/api/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: dateInput.value,
      category: categoryInput.value,
      amount: parseFloat(amountInput.value),
      description: descriptionInput.value
    }),
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

deleteBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this expense?")) {
    fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete.");
        alert("Expense deleted.");
        window.location.href = "index.html";
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting expense.");
      });
  }
});