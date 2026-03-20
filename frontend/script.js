// when page loading
document.addEventListener("DOMContentLoaded", function () {
    loadTransactions();

    // form submit
    document.getElementById("transaction-form").addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("clicked!");

        const newTransaction = {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            amount: parseFloat(document.getElementById("amount").value),
            type: document.getElementById("type").value,
            date: document.getElementById("date").value,
            description: document.getElementById("description").value
        };

        fetch("http://localhost:8000/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTransaction)
        })
        .then(response => response.json())
        .then(() => {
            loadTransactions();
        })
        .catch(error => console.error("Error:", error));
    });
});

// load data
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
}

// delete placeholder
function deleteTransaction(id) {
    console.log("delete id:", id);
}
