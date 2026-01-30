/**
 * Mortgage Calculator - LocalStorage Persistence Module
 */

const STORAGE_KEY = 'mortgageCalculatorData';

/**
 * Save current form state to localStorage
 */
function saveToLocalStorage() {
    const data = {};
    ['A', 'B'].forEach(suffix => {
        data['homePrice' + suffix] = document.getElementById('homePrice' + suffix).value;
        data['downPayment' + suffix] = document.getElementById('downPayment' + suffix).value;
        data['downPaymentPercent' + suffix] = document.getElementById('downPaymentPercent' + suffix).value;
        data['loanTerm' + suffix] = document.getElementById('loanTerm' + suffix).value;
        data['interestRate' + suffix] = document.getElementById('interestRate' + suffix).value;
        data['startMonth' + suffix] = document.getElementById('startMonth' + suffix).value;
        data['startYear' + suffix] = document.getElementById('startYear' + suffix).value;
    });
    data['lumpSumAmount'] = document.getElementById('lumpSumAmount').value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Load saved form state from localStorage
 */
function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        ['A', 'B'].forEach(suffix => {
            if (data['homePrice' + suffix]) {
                document.getElementById('homePrice' + suffix).value = data['homePrice' + suffix];
                document.getElementById('homePriceSlider' + suffix).value = data['homePrice' + suffix];
            }
            if (data['downPayment' + suffix]) {
                document.getElementById('downPayment' + suffix).value = data['downPayment' + suffix];
            }
            if (data['downPaymentPercent' + suffix]) {
                document.getElementById('downPaymentPercent' + suffix).value = data['downPaymentPercent' + suffix];
                document.getElementById('downPaymentSlider' + suffix).value = data['downPaymentPercent' + suffix];
            }
            if (data['loanTerm' + suffix]) {
                document.getElementById('loanTerm' + suffix).value = data['loanTerm' + suffix];
                document.getElementById('loanTermSlider' + suffix).value = data['loanTerm' + suffix];
            }
            if (data['interestRate' + suffix]) {
                document.getElementById('interestRate' + suffix).value = data['interestRate' + suffix];
                document.getElementById('interestRateSlider' + suffix).value = data['interestRate' + suffix];
            }
            if (data['startMonth' + suffix]) {
                document.getElementById('startMonth' + suffix).value = data['startMonth' + suffix];
            }
            if (data['startYear' + suffix]) {
                document.getElementById('startYear' + suffix).value = data['startYear' + suffix];
            }
        });
        if (data['lumpSumAmount']) {
            document.getElementById('lumpSumAmount').value = data['lumpSumAmount'];
        }
    }
}

// Export for use in other modules
window.MortgageStorage = {
    saveToLocalStorage,
    loadFromLocalStorage
};
