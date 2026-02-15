const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

async function saveExpense() {
  const id = document.getElementById("expenseId").value;
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  const method = id ? "PUT" : "POST";
  const url = id ? `${API}/expenses/${id}` : `${API}/expenses`;

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title, amount, category })
  });

  document.getElementById("expenseId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";

  loadExpenses();
}

async function loadExpenses() {
  const res = await fetch(`${API}/expenses`, {
    headers: { Authorization: token }
  });

  let expenses = await res.json();
  const filter = document.getElementById("filterCategory").value;

  if (filter) {
    expenses = expenses.filter(e => e.category === filter);
  }

  const expenseList = document.getElementById("expenseList");
  const totalAmount = document.getElementById("totalAmount");

  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach(e => {
    total += Number(e.amount);

    expenseList.innerHTML += `
      <tr>
        <td>${e.title}</td>
        <td>₹${e.amount}</td>
        <td>${e.category}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editExpense('${e._id}','${e.title}','${e.amount}','${e.category}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteExpense('${e._id}')">Delete</button>
        </td>
      </tr>
    `;
  });

  totalAmount.innerText = total;
}

function editExpense(id, title, amount, category) {
  document.getElementById("expenseId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("amount").value = amount;
  document.getElementById("category").value = category;
}

async function deleteExpense(id) {
  await fetch(`${API}/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  });
  loadExpenses();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadExpenses();
