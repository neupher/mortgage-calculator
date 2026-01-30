/**
 * Mortgage Calculator - Chart Rendering Module
 */

let chart = null;

/**
 * Update the balance comparison chart
 */
function updateChart(configA, configB) {
    const { formatCurrency } = window.MortgageCalculator;

    const chartDataA = [];
    const chartDataB = [];
    const labels = [];

    let balanceA = configA.principal;
    let balanceB = configB.principal;

    const maxYears = Math.max(configA.years, configB.years);

    for (let year = 0; year <= maxYears; year++) {
        labels.push(configA.startYear + year);

        if (year === 0) {
            chartDataA.push(configA.principal);
            chartDataB.push(configB.principal);
        } else {
            // Calculate year-end balance for A
            if (year <= configA.years && balanceA > 0.01) {
                for (let month = 1; month <= 12 && balanceA > 0.01; month++) {
                    const interestPayment = balanceA * configA.monthlyRate;
                    let principalPayment = configA.monthlyPayment - interestPayment;
                    if (principalPayment > balanceA) principalPayment = balanceA;
                    balanceA -= principalPayment;
                    if (balanceA < 0) balanceA = 0;
                }
            }
            chartDataA.push(balanceA);

            // Calculate year-end balance for B
            if (year <= configB.years && balanceB > 0.01) {
                for (let month = 1; month <= 12 && balanceB > 0.01; month++) {
                    const interestPayment = balanceB * configB.monthlyRate;
                    let principalPayment = configB.monthlyPayment - interestPayment;
                    if (principalPayment > balanceB) principalPayment = balanceB;
                    balanceB -= principalPayment;
                    if (balanceB < 0) balanceB = 0;
                }
            }
            chartDataB.push(balanceB);
        }
    }

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('paymentChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Mortgage A Balance',
                    data: chartDataA,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 6
                },
                {
                    label: 'Mortgage B Balance',
                    data: chartDataB,
                    borderColor: '#e91e63',
                    backgroundColor: 'rgba(233, 30, 99, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.raw);
                        }
                    }
                },
                legend: {
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Remaining Balance'
                    },
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Export for use in other modules
window.MortgageChart = {
    updateChart
};
