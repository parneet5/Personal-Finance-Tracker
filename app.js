const API_BASE = "http://localhost:8080/api";

function getToken() {
  return localStorage.getItem("token");
}

function authHeader() {
  const token = getToken();
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

if (window.location.pathname.endsWith("dashboard.html") && !getToken()) {
  window.location.href = "login.html";
}

const btnSignup = document.getElementById("btnSignup");
if (btnSignup) {
  btnSignup.addEventListener("click", async () => {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful! Please log in now.");
      window.location.href = "login.html"; 
    } else {
      document.getElementById("signupMsg").textContent = data.error || "Signup failed.";
    }
  });
}

const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
  btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html"; 
    } else {
      document.getElementById("loginMsg").textContent = data.error || "Login failed.";
    }
  });
}

if (window.location.pathname.endsWith("dashboard.html")) {
  const token = getToken();
  const btnLogout = document.getElementById("btnLogout");
  const txTableBody = document.querySelector("#txTable tbody");
  const msgBox = document.getElementById("addTxMsg");

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });

  async function loadTransactions() {
    const res = await fetch(`${API_BASE}/transactions`, {
      headers: { ...authHeader() }
    });

    const data = await res.json();
    txTableBody.innerHTML = "";

    if (data.items && data.items.length > 0) {
      data.items.forEach(tx => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${tx.occurred_on}</td>
          <td>${tx.type}</td>
          <td>${tx.category}</td>
          <td class="right">${tx.amount.toFixed(2)}</td>
          <td>${tx.note || ""}</td>
          <td><button onclick="deleteTx(${tx.id})">Delete</button></td>
        `;
        txTableBody.appendChild(row);
      });
    } else {
      txTableBody.innerHTML = `<tr><td colspan="6">No transactions yet.</td></tr>`;
    }
  }

  document.getElementById("btnAddTx").addEventListener("click", async () => {
    const type = document.getElementById("txType").value;
    const category = document.getElementById("txCategory").value;
    const amount = parseFloat(document.getElementById("txAmount").value);
    const occurredOn = document.getElementById("txDate").value;
    const note = document.getElementById("txNote").value;

    if (!category || isNaN(amount) || !occurredOn) {
      msgBox.textContent = "Please fill all required fields.";
      msgBox.className = "msg error";
      return;
    }

    const res = await fetch(`${API_BASE}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ type, category, amount, occurredOn, note })
    });

    if (res.ok) {
      msgBox.textContent = "Transaction added successfully!";
      msgBox.className = "msg success";
      loadTransactions(); 
    } else {
      const data = await res.json();
      msgBox.textContent = data.error || "Failed to add transaction.";
      msgBox.className = "msg error";
    }
  });

  window.deleteTx = async function(id) {
    const res = await fetch(`${API_BASE}/transactions/${id}`, {
      method: "DELETE",
      headers: { ...authHeader() }
    });

    if (res.ok) {
      alert("Transaction deleted!");
      loadTransactions();
    } else {
      alert("Failed to delete transaction.");
    }
  };

  loadTransactions();
}
