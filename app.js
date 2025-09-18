const API_BASE_URL = "https://personal-finance-tracker-api-1-8dis.onrender.com";

async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const data = await response.json();
  return data;
}

document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  try {
    const result = await apiRequest("/signup", "POST", {
      name,
      email,
      password,
    });

    if (result.success) {
      alert("Signup successful! Please log in.");
      window.location.href = "login.html";
    } else {
      alert(result.message || "Signup failed. Try again.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred during signup. Please try again.");
  }
});

document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    const result = await apiRequest("/login", "POST", { email, password });

    if (result.success && result.token) {
     
      localStorage.setItem("token", result.token);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert(result.message || "Invalid email or password.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});

document.getElementById("transaction-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to add a transaction.");
    window.location.href = "login.html";
    return;
  }

  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  const note = document.getElementById("note").value.trim();

  try {
    const result = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // attach token
      },
      body: JSON.stringify({ type, category, amount, date, note }),
    }).then(res => res.json());

    if (result.success) {
      alert("Transaction added successfully!");
      document.getElementById("transaction-form").reset();
      loadTransactions();
    } else {
      alert(result.message || "Failed to add transaction.");
    }
  } catch (error) {
    console.error("Add transaction error:", error);
    alert("An error occurred while adding the transaction.");
  }
});

async function loadTransactions() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to view transactions.");
    window.location.href = "login.html";
    return;
  }

  try {
    const result = await fetch(`${API_BASE_URL}/transactions`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(res => res.json());

    const tableBody = document.getElementById("transactions-table-body");
    tableBody.innerHTML = "";

    result.transactions.forEach(tx => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tx.date}</td>
        <td>${tx.type}</td>
        <td>${tx.category}</td>
        <td>${tx.amount}</td>
        <td>${tx.note || ""}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Load transactions error:", error);
    alert("Failed to load transactions.");
  }
}

document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Logged out successfully.");
  window.location.href = "login.html";
});

