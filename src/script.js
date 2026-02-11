// Month names
const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// In-memory data storage with prefilled sample data
const data = {
    income: [3000, 3200, 2800, 3500, 3100, 3300, 3600, 3400, 2900, 3200, 3400, 3700],
    expense: [1500, 1800, 1200, 1600, 1400, 1550, 1800, 1700, 1300, 1600, 1500, 1900]
};

let chartInstance = null;

// Initialize the app
window.onload = function () {
    initializeMonthInputs();
    setupTabNavigation();
    setupDownloadChart();
};

// Create input fields for all 12 months
function initializeMonthInputs() {
    const container = document.getElementById('monthInputs');

    months.forEach((month, index) => {
        const monthCard = document.createElement('div');
        monthCard.className = 'month-card';
        monthCard.innerHTML = `
            <h3>${month}</h3>
            <div class="form-group">
                <label for="income-${index}">Income</label>
                <input type="number" id="income-${index}" class="income" placeholder="0.00" min="0" step="100" value="${data.income[index]}" />
            </div>
            <div class="form-group">
                <label for="expense-${index}">Expense</label>
                <input type="number" id="expense-${index}" class="expense" placeholder="0.00" min="0" step="100" value="${data.expense[index]}" />
            </div>
        `;
        container.appendChild(monthCard);
    });

    // Add event listeners to all inputs
    document.querySelectorAll('.income').forEach((input, index) => {
        input.addEventListener('change', (e) => {
            data.income[index] = parseFloat(e.target.value) || 0;
        });
    });

    document.querySelectorAll('.expense').forEach((input, index) => {
        input.addEventListener('change', (e) => {
            data.expense[index] = parseFloat(e.target.value) || 0;
        });
    });
}

// Tab navigation logic
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            // If chart tab was clicked, render the chart
            if (tabName === 'chart') {
                renderChart();
            }
        });
    });
}

// Render bar chart with current data
function renderChart() {
    const ctx = document.getElementById('incomeExpenseChart').getContext('2d');

    // Destroy existing chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: data.income,
                    backgroundColor: '#48bb78',
                    borderColor: '#38a169',
                    borderWidth: 1,
                    borderRadius: 6,
                    hoverBackgroundColor: '#38a169'
                },
                {
                    label: 'Expenses',
                    data: data.expense,
                    backgroundColor: '#f56565',
                    borderColor: '#e53e3e',
                    borderWidth: 1,
                    borderRadius: 6,
                    hoverBackgroundColor: '#e53e3e'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 15,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Setup download chart button
function setupDownloadChart() {
    const downloadButton = document.getElementById('downloadChart');
    downloadButton.addEventListener('click', downloadChart);
}

// Download chart as PNG
function downloadChart() {
    const canvas = document.getElementById('incomeExpenseChart');
    
    if (!canvas || !chartInstance) {
        alert('Please render the chart first by visiting the Chart tab');
        return;
    }

    // Convert canvas to image data URL
    const image = canvas.toDataURL('image/png');

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = image;
    link.download = `income-expense-chart-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}