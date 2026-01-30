/**
 * Mortgage Calculator - Core Calculation Functions
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format number as currency (no decimals)
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format number as currency with decimals
 */
function formatCurrencyPrecise(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Calculate mortgage details for a given configuration
 */
function calculateMortgageConfig(suffix) {
    const price = parseFloat(document.getElementById('homePrice' + suffix).value) || 0;
    const down = parseFloat(document.getElementById('downPayment' + suffix).value) || 0;
    const years = parseInt(document.getElementById('loanTerm' + suffix).value) || 30;
    const rate = parseFloat(document.getElementById('interestRate' + suffix).value) || 0;

    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    let monthlyPaymentAmount = 0;
    if (monthlyRate > 0) {
        monthlyPaymentAmount = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
        monthlyPaymentAmount = principal / numPayments;
    }

    const totalPayment = monthlyPaymentAmount * numPayments;
    const totalInterest = totalPayment - principal;
    const interestRatioValue = principal > 0 ? (totalInterest / principal) * 100 : 0;

    // Update display
    document.getElementById('loanAmountDisplay' + suffix).textContent = formatCurrency(principal);
    document.getElementById('monthlyPayment' + suffix).textContent = formatCurrency(monthlyPaymentAmount);
    document.getElementById('principalAmount' + suffix).textContent = formatCurrency(principal);
    document.getElementById('totalInterest' + suffix).textContent = formatCurrency(totalInterest);
    document.getElementById('interestRatio' + suffix).textContent = interestRatioValue.toFixed(1) + '%';
    document.getElementById('totalPayment' + suffix).textContent = formatCurrency(totalPayment);

    return {
        principal,
        monthlyRate,
        monthlyPayment: monthlyPaymentAmount,
        numPayments,
        years,
        startMonth: parseInt(document.getElementById('startMonth' + suffix).value),
        startYear: parseInt(document.getElementById('startYear' + suffix).value)
    };
}

/**
 * Generate amortization data for a mortgage configuration
 */
function generateAmortizationData(config, showMonthly) {
    const data = [];
    let balance = config.principal;
    let cumulativePrincipal = 0;

    if (showMonthly) {
        for (let month = 1; month <= config.numPayments && balance > 0.01; month++) {
            const interestPayment = balance * config.monthlyRate;
            let principalPayment = config.monthlyPayment - interestPayment;
            if (principalPayment > balance) principalPayment = balance;
            balance -= principalPayment;
            if (balance < 0) balance = 0;
            cumulativePrincipal += principalPayment;

            const paymentMonth = (config.startMonth + month - 1) % 12;
            const paymentYear = config.startYear + Math.floor((config.startMonth + month - 1) / 12);

            data.push({
                period: `${MONTHS[paymentMonth]} ${paymentYear}`,
                interest: interestPayment,
                principal: principalPayment,
                principalCumulative: cumulativePrincipal,
                balance: balance
            });
        }
    } else {
        for (let year = 1; year <= config.years && balance > 0.01; year++) {
            let yearInterest = 0;
            let yearPrincipal = 0;

            for (let month = 1; month <= 12 && balance > 0.01; month++) {
                const interestPayment = balance * config.monthlyRate;
                let principalPayment = config.monthlyPayment - interestPayment;
                if (principalPayment > balance) principalPayment = balance;
                yearInterest += interestPayment;
                yearPrincipal += principalPayment;
                balance -= principalPayment;
                if (balance < 0) balance = 0;
            }
            cumulativePrincipal += yearPrincipal;

            data.push({
                period: config.startYear + year - 1,
                interest: yearInterest,
                principal: yearPrincipal,
                principalCumulative: cumulativePrincipal,
                balance: balance
            });
        }
    }

    return data;
}

// Export for use in other modules
window.MortgageCalculator = {
    MONTHS,
    formatCurrency,
    formatCurrencyPrecise,
    calculateMortgageConfig,
    generateAmortizationData
};
