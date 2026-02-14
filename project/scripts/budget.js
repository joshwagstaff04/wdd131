

// Global variables for storing data
var incomeList = [];
var expenseList = [];
let goalAmount = 0;

// Load saved data when page loads
function loadData() {
  var savedIncome = localStorage.getItem('income_data');
  if (savedIncome) {
    incomeList = JSON.parse(savedIncome);
  }
  
  var savedExpenses = localStorage.getItem('expense_data');
  if (savedExpenses) {
    expenseList = JSON.parse(savedExpenses);
  }
  
  let savedGoal = localStorage.getItem('savings_goal');
  if (savedGoal) {
    goalAmount = parseFloat(savedGoal);
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('income_data', JSON.stringify(incomeList));
  localStorage.setItem('expense_data', JSON.stringify(expenseList));
  localStorage.setItem('savings_goal', goalAmount.toString());
}

// Add income entry
function addIncome(e) {
  e.preventDefault();
  
  var amount = parseFloat(document.getElementById('incomeAmount').value);
  var category = document.getElementById('incomeCategory').value;
  let date = document.getElementById('incomeDate').value;
  var description = document.getElementById('incomeDescription').value;

  if (!amount || amount <= 0 || !category || !date) {
    alert('Please fill in all required fields');
    return;
  }

  var newIncome = {
    id: Date.now(),
    amount: amount,
    category: category,
    date: date,
    description: description
  };

  incomeList.push(newIncome);
  saveData();
  // Function to reset the form
  document.getElementById('incomeForm').reset();
  
  // Reset date to today
  var today = new Date().toISOString().split('T')[0];
  document.getElementById('incomeDate').value = today;
  
  updateDisplay();
}

// Add expense entry
function addExpense(e) {
  e.preventDefault();
  
  let amount = parseFloat(document.getElementById('expenseAmount').value);
  let category = document.getElementById('expenseCategory').value;
  var date = document.getElementById('expenseDate').value;
  let description = document.getElementById('expenseDescription').value;

  if (!amount || amount <= 0 || !category || !date) {
    alert('Please fill in all required fields');
    return;
  }

  let newExpense = {
    id: Date.now(),
    amount: amount,
    category: category,
    date: date,
    description: description
  };

  expenseList.push(newExpense);
  saveData();
  document.getElementById('expenseForm').reset();
  
  // Reset date to today
  let today = new Date().toISOString().split('T')[0];
  document.getElementById('expenseDate').value = today;
  
  updateDisplay();
}

// Set savings goal
function setGoal(e) {
  e.preventDefault();
  var goalInput = document.getElementById('savingsGoal');
  let goal = parseFloat(goalInput.value);
  
  if (!goal || goal <= 0) {
    alert('Please enter a valid savings goal');
    return;
  }
  
  goalAmount = goal;
  saveData();
  document.getElementById('goalForm').reset();
  updateDisplay();
}

// Clear all income
function clearAllIncome() {
  if (incomeList.length === 0) {
    alert('No income to clear');
    return;
  }
  if (confirm('Are you sure you want to delete all income entries?')) {
    incomeList = [];
    saveData();
    updateDisplay();
  }
}

// Clear all expenses
function clearAllExpenses() {
  if (expenseList.length === 0) {
    alert('No expense to clear');
    return;
  }
  if (confirm('Are you sure you want to delete all expense entries?')) {
    expenseList = [];
    saveData();
    updateDisplay();
  }
}

// Clear savings goal
function clearGoal() {
  if (goalAmount === 0) {
    alert('No goal to clear');
    return;
  }
  if (confirm('Are you sure you want to clear your savings goal?')) {
    goalAmount = 0;
    saveData();
    updateDisplay();
  }
}

// Calculate totals
function calculateTotals() {
  let totalIncome = 0;
  let totalExpenses = 0;
  
  // Loop through all income entries and add them up
  for (var i = 0; i < incomeList.length; i++) {
    totalIncome = totalIncome + incomeList[i].amount;
  }
  
  // Loop through all expense entries and add them up
  for (let i = 0; i < expenseList.length; i++) {
    totalExpenses = totalExpenses + expenseList[i].amount;
  }
  
  // Calculate balance
  var balance = totalIncome - totalExpenses;
  
  return { 
    income: totalIncome, 
    expenses: totalExpenses, 
    balance: balance 
  };
}

// Update all the display
function updateDisplay() {
  var totals = calculateTotals();
  
  
  // Update summary numbers
  document.getElementById('totalIncome').textContent = `$${totals.income.toFixed(2)}`;
  document.getElementById('totalExpenses').textContent = `$${totals.expenses.toFixed(2)}`;
  document.getElementById('remainingBalance').textContent = `$${totals.balance.toFixed(2)}`;
  
  // Color the balance based on positive or negative
  let balanceElement = document.getElementById('remainingBalance');
  if (totals.balance < 0) {
    balanceElement.style.color = '#d32f2f';
  } else if (totals.balance > 0) {
    balanceElement.style.color = '#388e3c';
  } else {
    balanceElement.style.color = '#333';
  }
  
  // Update goal progress
  var goalDiv = document.getElementById('goalDisplay');
  if (goalAmount > 0) {
    goalDiv.classList.remove('hidden');
    document.getElementById('goalAmount').textContent = goalAmount.toFixed(2);
    
    // Calculate how much is saved
    var saved = 0;
    if (totals.balance > 0) {
      saved = totals.balance;
    }
    
    var percentage = (saved / goalAmount) * 100;
    if (percentage > 100) {
      percentage = 100;
    }
    
    document.getElementById('progressFill').style.width = `${percentage}%`;
    document.getElementById('goalStatus').textContent = `Progress: $${saved.toFixed(2)} / $${goalAmount.toFixed(2)} (${Math.round(percentage)}%)`;
  } else {
    goalDiv.classList.add('hidden');
  }
  
  // Update the lists
  displayIncomeList();
  displayExpenseList();
}

// Display income list
function displayIncomeList() {
  let container = document.getElementById('incomeList');
  
  // Check if there are any income entries
  if (incomeList.length === 0) {
    container.innerHTML = '<p class="empty-message">No income entries yet.</p>';
    return;
  }
  
  // Build the HTML for all income entries
  var html = '';
  for (var i = 0; i < incomeList.length; i++) {
    let entry = incomeList[i];
    var date = new Date(entry.date);
    let formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    let descriptionHtml = entry.description ? `<span class="entry-description">${entry.description}</span>` : '';
    html += `<div class="entry-item income" data-id="${entry.id}">
  <div class="entry-content">
    <div class="entry-header">
      <strong>${entry.category}</strong>
      <span class="entry-amount">$${entry.amount.toFixed(2)}</span>
    </div>
    <div class="entry-meta">
      <span class="entry-date">${formattedDate}</span>
      ${descriptionHtml}
    </div>
  </div>
  <button class="delete-btn income-delete">&times;</button>
</div>`;
  }
  
  container.innerHTML = html;
}

// Display expense list
function displayExpenseList() {
  var container = document.getElementById('expenseList');
  
  // Check if there are any expense entries
  if (expenseList.length === 0) {
    container.innerHTML = '<p class="empty-message">No expense entries yet.</p>';
    return;
  }
  
  // Build the HTML for all expense entries
  let html = '';
  for (let i = 0; i < expenseList.length; i++) {
    var entry = expenseList[i];
    let date = new Date(entry.date);
    var formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    
    let descriptionHtml = entry.description ? `<span class="entry-description">${entry.description}</span>` : '';
    html += `<div class="entry-item expense" data-id="${entry.id}">
  <div class="entry-content">
    <div class="entry-header">
      <strong>${entry.category}</strong>
      <span class="entry-amount">$${entry.amount.toFixed(2)}</span>
    </div>
    <div class="entry-meta">
      <span class="entry-date">${formattedDate}</span>
      ${descriptionHtml}
    </div>
  </div>
  <button class="delete-btn expense-delete">&times;</button>
</div>`;
  }
  
  container.innerHTML = html;
}

// Delete income entry
function deleteIncome(id) {
  
  // Loop through and find the item to delete
  for (var i = 0; i < incomeList.length; i++) {
    if (incomeList[i].id === id) {
      incomeList.splice(i, 1);
      break;
    }
  }
  saveData();
  updateDisplay();
}

// Delete expense entry
function deleteExpense(id) {
  // Loop through and find the item to delete
  for (let i = 0; i < expenseList.length; i++) {
    if (expenseList[i].id === id) {
      expenseList.splice(i, 1);
      break;
    }
  }
  saveData();
  updateDisplay();
}

// Setup everything when page loads
function init() {
  loadData();
  
  // Set today's date in the form fields
  let today = new Date().toISOString().split('T')[0];
  document.getElementById('incomeDate').value = today;
  document.getElementById('expenseDate').value = today;
  
  // Setup form event listeners
  document.getElementById('incomeForm').addEventListener('submit', addIncome);
  document.getElementById('expenseForm').addEventListener('submit', addExpense);
  document.getElementById('goalForm').addEventListener('submit', setGoal);
  document.getElementById('clearIncomeBtn').addEventListener('click', clearAllIncome);
  document.getElementById('clearExpenseBtn').addEventListener('click', clearAllExpenses);
  document.getElementById('clearGoal').addEventListener('click', clearGoal);
  
  // Setup event delegation for delete buttons
  document.getElementById('incomeList').addEventListener('click', function(e) {
    if (e.target.classList.contains('income-delete')) {
      let id = parseInt(e.target.closest('[data-id]').dataset.id);
      deleteIncome(id);
    }
  });
  
  document.getElementById('expenseList').addEventListener('click', function(e) {
    if (e.target.classList.contains('expense-delete')) {
      let id = parseInt(e.target.closest('[data-id]').dataset.id);
      deleteExpense(id);
    }
  });
  
  updateDisplay();
}

// Start when page its ready
init();
