/**
 * Mortgage Calculator - Investment Calculator Module
 */

const INVESTMENT_RATES = [0, 2, 4, 6, 8, 10, 12, 14, 16];

/**
 * Generate the investment growth table based on monthly payment savings
 */
function generateInvestmentTable(configA, configB) {
    const { formatCurrency } = window.MortgageCalculator;
    const tbody = document.getElementById('investmentBody');
    tbody.innerHTML = '';

    // Calculate monthly payment difference (use absolute value, invest the savings)
    const monthlyPaymentA = configA.monthlyPayment || 0;
    const monthlyPaymentB = configB.monthlyPayment || 0;
    const monthlySavings = Math.abs(monthlyPaymentA - monthlyPaymentB);

    // Update the display
    document.getElementById('investmentAmount').value = Math.round(monthlySavings);

    // Determine which mortgage has lower payment
    const cheaperMortgage = monthlyPaymentA < monthlyPaymentB ? 'A' : 'B';
    document.getElementById('savingsLabel').textContent =
        `(${cheaperMortgage} saves $${Math.round(monthlySavings)}/mo vs ${cheaperMortgage === 'A' ? 'B' : 'A'})`;

    const maxYears = Math.max(configA.years || 30, configB.years || 30);
    const monthlyRates = INVESTMENT_RATES.map(r => r / 100 / 12);

    // Track cumulative totals for each rate
    const totals = INVESTMENT_RATES.map(() => 0);

    for (let year = 1; year <= maxYears; year++) {
        const row = document.createElement('tr');
        let cells = `<td>${year}</td>`;

        INVESTMENT_RATES.forEach((rate, index) => {
            // For each month in this year, add monthly savings and apply monthly interest
            for (let month = 0; month < 12; month++) {
                // Determine if we're still making payments on each mortgage
                const monthNum = (year - 1) * 12 + month + 1;
                const stillPayingA = monthNum <= configA.numPayments;
                const stillPayingB = monthNum <= configB.numPayments;

                let thisMonthSavings = 0;
                if (stillPayingA && stillPayingB) {
                    // Both still paying - invest the difference
                    thisMonthSavings = monthlySavings;
                } else if (stillPayingA && !stillPayingB) {
                    // B is paid off, A still paying
                    thisMonthSavings = monthlyPaymentA < monthlyPaymentB ? 0 : monthlyPaymentA;
                } else if (!stillPayingA && stillPayingB) {
                    // A is paid off, B still paying
                    thisMonthSavings = monthlyPaymentB < monthlyPaymentA ? 0 : monthlyPaymentB;
                }

                // Add this month's contribution
                totals[index] += thisMonthSavings;
                // Apply monthly interest
                totals[index] *= (1 + monthlyRates[index]);
            }

            cells += `<td class="total-cell">${formatCurrency(totals[index])}</td>`;
        });

        row.innerHTML = cells;
        tbody.appendChild(row);
    }
}

/**
 * Generate the lump sum investment growth table
 */
function generateLumpSumTable(maxYears) {
    const { formatCurrency } = window.MortgageCalculator;
    const tbody = document.getElementById('lumpSumBody');
    tbody.innerHTML = '';

    const lumpSumAmountInput = document.getElementById('lumpSumAmount');
    const lumpSum = parseFloat(lumpSumAmountInput.value) || 0;
    const monthlyRates = INVESTMENT_RATES.map(r => r / 100 / 12);

    for (let year = 1; year <= maxYears; year++) {
        const row = document.createElement('tr');
        let cells = `<td>${year}</td>`;

        INVESTMENT_RATES.forEach((rate, index) => {
            const months = year * 12;
            const futureValue = lumpSum * Math.pow(1 + monthlyRates[index], months);
            cells += `<td class="total-cell">${formatCurrency(futureValue)}</td>`;
        });

        row.innerHTML = cells;
        tbody.appendChild(row);
    }
}

// Export for use in other modules
window.MortgageInvestment = {
    INVESTMENT_RATES,
    generateInvestmentTable,
    generateLumpSumTable
};
