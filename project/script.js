const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const total = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateTotal() {
  let sum = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  total.textContent = sum;
}

function renderExpenses() {
  list.innerHTML = '';
  expenses.forEach((exp, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${exp.date} - ${exp.desc}: ₹${exp.amount}
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  updateTotal();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;

  if (desc && amount && date) {
    expenses.push({ desc, amount, date });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    updateTotal();
    form.reset();
  }
});

// Initial load
renderExpenses();
updateTotal();
