// when page loading
document.addEventListener("DOMContentLoaded", function () {
    loadTransactions();
});

// from the backend get the date
function loadTransactions() {
    fetch("http://localhost:8000/transactions")
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("transaction-list");
            list.innerHTML = "";

            data.forEach(transaction => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${transaction.title}</td>
                    <td>${transaction.category}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.type}</td>
                    <td>${transaction.date}</td>
                    <td>
                        <button onclick="deleteTransaction(${transaction.id})">Delete</button>
                    </td>
                `;

                list.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading transactions:", error));
fetch("http://127.0.0.1:8000/transactions")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
function deleteTransaction(id) {
    console.log("delete id:", id);
}
