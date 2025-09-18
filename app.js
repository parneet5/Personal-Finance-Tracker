// ==============================
// CONFIGURATION
// ==============================

// Backend URL on Render
const API_BASE_URL = "https://personal-finance-tracker-api-1-8dis.onrender.com";

// Helper function for making API requests
async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return response.json();
}

// ==============================
// SIGNUP FUNCTIONALITY
// ==============================

// Triggered when user clicks the Sign Up button
document.getElementById("btnSignup")?.addEventListener("click", async () => {
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  const msgElement = document.getElementById("signupMsg");

  if (!name || !email || !password) {
    msgElement.innerText = "⚠️ All fields are required!";
    msgElement.style.color = "red";
    return;
  }

  try {
    const result = await apiRequest("/signup", "POST", { name, email, password });

    if (result.success) {
      msgElement.innerText = "✅ Signup successful! Redirecting to login...";
      msgElement.style.color = "green";

      // Redirect to login page after 1.5 seconds
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      msgElement.innerText = result.message || "Signup failed. Try again.";
      msgElement.style.color = "red";
    }
  } catch (error) {
    console.error("Signup error:", error);
    msgElement.innerText = "❌ Error connecting to the server.";
    msgElement.style.color = "red";
  }
});

// ==============================
// LOGIN FUNCTIONALITY
// ==============================

// Triggered when user clicks the Login button
document.getElementById("btnLogin")?.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const msgElement = document.getElementById("loginMsg");

  if (!email || !password) {
    msgElement.innerText = "⚠️ Email and password are required!";
    msgElement.style.color = "red";
    return;
  }

  try {
    const result = await apiRequest("/login", "POST", { email, password });

    if (result.success && result.token) {
      // Store the JWT token in local storage
      localStorage.setItem("token", result.token);

      msgElement.innerText = "✅ Login successful! Redirecting to dashboard...";
      msgElement.style.color = "green";

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      msgElement.innerText = result.message || "Invalid login credentials.";
      msgElement.style.color = "red";
    }
  } catch (error) {
    console.error("Login error:", error);
    msgElement.innerText = "❌ Error connecting to the server.";
    msgElement.style.color = "red";
  }
});

// ==============================
// ADD TRANSACTION
// ==============================

// Triggered when user submits the transaction form
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

  if (!type || !category || isNaN(amount) || !date) {
    alert("Please fill out all required fields for the transaction.");
    return;
  }

  try {
    const result = await apiRequest("/transactions", "POST", {
      type,
      category,
      amount,
      date,
      note,
    }, token);

    if (result.success) {
      alert("✅ Transaction added successfully!");
      document.getElementById("transaction-form").reset();
      loadTransactions();
    } else {
      alert(result.message || "Failed to add transaction.");
    }
  } catch (error) {
    console.error("Add transaction error:", error);
    alert("❌ An error occurred while adding the transaction.");
  }
});

// ==============================
// LOAD TRANSACTIONS
// ==============================

async function loadTransactions() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to view transactions.");
    window.location.href = "login.html";
    return;
  }

  try {
    const result = await apiRequest("/transactions", "GET", null, token);

    const tableBody = document.getElementById("transactions-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (!result.transactions || result.transactions.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5" style="text-align:center;">No transactions found</td>`;
      tableBody.appendChild(row);
      return;
    }

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
    alert("❌ Failed to load transactions.");
  }
}

// ==============================
// LOGOUT
// ==============================

document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("You have been logged out.");
  window.location.href = "login.html";
});



