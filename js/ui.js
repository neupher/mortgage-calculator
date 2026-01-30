/**
 * Mortgage Calculator - UI Interaction Handlers Module
 */

let showMonthly = false;
let diffType = 'balance';

/**
 * Update slider background to show progress
 */
function updateSliderBackground(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const value = parseFloat(slider.value);
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #00d09c 0%, #00d09c ${percentage}%, #21262d ${percentage}%, #21262d 100%)`;
}

/**
 * Initialize date dropdowns for both mortgage configs
 */
function initializeDateDropdowns() {
    const { MONTHS } = window.MortgageCalculator;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    ['A', 'B'].forEach(suffix => {
        const monthSelect = document.getElementById('startMonth' + suffix);
        const yearSelect = document.getElementById('startYear' + suffix);

        MONTHS.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            if (index === currentMonth) option.selected = true;
            monthSelect.appendChild(option);
        });

        for (let year = currentYear; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            if (year === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }
    });
}

/**
 * Setup tab switching functionality
 */
function setupTabSwitching() {
    const tabA = document.getElementById('tabA');
    const tabB = document.getElementById('tabB');
    const configA = document.getElementById('configA');
    const configB = document.getElementById('configB');
    const inputPanel = document.getElementById('inputPanel');

    tabA.addEventListener('click', () => {
        tabA.classList.add('active');
        tabB.classList.remove('active');
        configA.classList.add('active');
        configB.classList.remove('active');
        inputPanel.classList.remove('tab-b-active');
    });

    tabB.addEventListener('click', () => {
        tabB.classList.add('active');
        tabA.classList.remove('active');
        configB.classList.add('active');
        configA.classList.remove('active');
        inputPanel.classList.add('tab-b-active');
    });
}

/**
 * Setup input event listeners for both mortgage configurations
 */
function setupInputListeners(calculateAllCallback) {
    ['A', 'B'].forEach(suffix => {
        const homePrice = document.getElementById('homePrice' + suffix);
        const homePriceSlider = document.getElementById('homePriceSlider' + suffix);
        const downPayment = document.getElementById('downPayment' + suffix);
        const downPaymentPercent = document.getElementById('downPaymentPercent' + suffix);
        const downPaymentSlider = document.getElementById('downPaymentSlider' + suffix);
        const loanTerm = document.getElementById('loanTerm' + suffix);
        const loanTermSlider = document.getElementById('loanTermSlider' + suffix);
        const interestRate = document.getElementById('interestRate' + suffix);
        const interestRateSlider = document.getElementById('interestRateSlider' + suffix);
        const startMonth = document.getElementById('startMonth' + suffix);
        const startYear = document.getElementById('startYear' + suffix);

        function updateDownPaymentFromPercent() {
            const price = parseFloat(homePrice.value) || 0;
            const percent = parseFloat(downPaymentPercent.value) || 0;
            downPayment.value = Math.round(price * percent / 100);
            downPaymentSlider.value = percent;
            updateSliderBackground(downPaymentSlider);
        }

        homePrice.addEventListener('input', () => {
            homePriceSlider.value = homePrice.value;
            updateSliderBackground(homePriceSlider);
            updateDownPaymentFromPercent();
            calculateAllCallback();
        });

        homePriceSlider.addEventListener('input', () => {
            homePrice.value = homePriceSlider.value;
            updateSliderBackground(homePriceSlider);
            updateDownPaymentFromPercent();
            calculateAllCallback();
        });

        downPayment.addEventListener('input', () => {
            const price = parseFloat(homePrice.value) || 1;
            const down = parseFloat(downPayment.value) || 0;
            const percent = (down / price) * 100;
            downPaymentPercent.value = percent.toFixed(1);
            downPaymentSlider.value = percent;
            updateSliderBackground(downPaymentSlider);
            calculateAllCallback();
        });

        downPaymentPercent.addEventListener('input', () => {
            updateDownPaymentFromPercent();
            calculateAllCallback();
        });

        downPaymentSlider.addEventListener('input', () => {
            downPaymentPercent.value = downPaymentSlider.value;
            updateSliderBackground(downPaymentSlider);
            updateDownPaymentFromPercent();
            calculateAllCallback();
        });

        loanTerm.addEventListener('input', () => {
            loanTermSlider.value = loanTerm.value;
            updateSliderBackground(loanTermSlider);
            calculateAllCallback();
        });

        loanTermSlider.addEventListener('input', () => {
            loanTerm.value = loanTermSlider.value;
            updateSliderBackground(loanTermSlider);
            calculateAllCallback();
        });

        interestRate.addEventListener('input', () => {
            interestRateSlider.value = interestRate.value;
            updateSliderBackground(interestRateSlider);
            calculateAllCallback();
        });

        interestRateSlider.addEventListener('input', () => {
            interestRate.value = interestRateSlider.value;
            updateSliderBackground(interestRateSlider);
            calculateAllCallback();
        });

        startMonth.addEventListener('change', calculateAllCallback);
        startYear.addEventListener('change', calculateAllCallback);

        // Initialize slider backgrounds
        updateSliderBackground(homePriceSlider);
        updateSliderBackground(downPaymentSlider);
        updateSliderBackground(loanTermSlider);
        updateSliderBackground(interestRateSlider);
    });
}

/**
 * Setup toggle buttons for annual/monthly view
 */
function setupToggleButtons(calculateAllCallback) {
    const annualBtn = document.getElementById('annualBtn');
    const monthlyBtn = document.getElementById('monthlyBtn');

    annualBtn.addEventListener('click', () => {
        showMonthly = false;
        annualBtn.classList.add('active');
        monthlyBtn.classList.remove('active');
        calculateAllCallback();
    });

    monthlyBtn.addEventListener('click', () => {
        showMonthly = true;
        monthlyBtn.classList.add('active');
        annualBtn.classList.remove('active');
        calculateAllCallback();
    });
}

/**
 * Setup diff type selector
 */
function setupDiffTypeSelector(calculateAllCallback) {
    document.getElementById('diffTypeSelect').addEventListener('change', (e) => {
        diffType = e.target.value;
        calculateAllCallback();
    });
}

/**
 * Setup lump sum input listener
 */
function setupLumpSumListener(calculateAllCallback) {
    const lumpSumAmountInput = document.getElementById('lumpSumAmount');
    lumpSumAmountInput.addEventListener('input', () => {
        const maxYears = Math.max(
            parseInt(document.getElementById('loanTermA').value) || 30,
            parseInt(document.getElementById('loanTermB').value) || 30
        );
        window.MortgageInvestment.generateLumpSumTable(maxYears);
        window.MortgageStorage.saveToLocalStorage();
    });
}

/**
 * Generate the amortization schedule table
 */
function generateSchedule(configA, configB, calculateAllCallback) {
    const { MONTHS, formatCurrency, formatCurrencyPrecise, generateAmortizationData } = window.MortgageCalculator;

    const tbody = document.getElementById('scheduleBody');
    const thead = document.querySelector('#scheduleTable thead tr');
    tbody.innerHTML = '';

    const dataA = generateAmortizationData(configA, showMonthly);
    const dataB = generateAmortizationData(configB, showMonthly);

    const periodLabel = showMonthly ? 'Date' : 'Year';
    const diffSelect = document.getElementById('diffTypeSelect');
    const currentDiffType = diffSelect.value;

    thead.innerHTML = `
        <th>${periodLabel}</th>
        <th class="col-a">A Interest</th>
        <th class="col-a">A Principal</th>
        <th class="col-a">A Prin. Cum.</th>
        <th class="col-a">A Balance</th>
        <th class="col-b">B Interest</th>
        <th class="col-b">B Principal</th>
        <th class="col-b">B Prin. Cum.</th>
        <th class="col-b">B Balance</th>
        <th class="col-diff">
            <select class="diff-select" id="diffTypeSelect">
                <option value="balance" ${currentDiffType === 'balance' ? 'selected' : ''}>Balance Diff</option>
                <option value="interest" ${currentDiffType === 'interest' ? 'selected' : ''}>Interest Diff</option>
                <option value="principal" ${currentDiffType === 'principal' ? 'selected' : ''}>Principal Diff</option>
                <option value="principalCumulative" ${currentDiffType === 'principalCumulative' ? 'selected' : ''}>Prin. Cum. Diff</option>
            </select>
        </th>
        <th class="col-diff">Pmt Diff Cum.</th>
    `;

    // Re-attach event listener after rebuilding header
    document.getElementById('diffTypeSelect').addEventListener('change', (e) => {
        diffType = e.target.value;
        calculateAllCallback();
    });

    const maxLength = Math.max(dataA.length, dataB.length);
    let cumulativePaymentDiff = 0;

    for (let i = 0; i < maxLength; i++) {
        const rowA = dataA[i] || { interest: 0, principal: 0, principalCumulative: 0, balance: 0 };
        const rowB = dataB[i] || { interest: 0, principal: 0, principalCumulative: 0, balance: 0 };
        const period = dataA[i]?.period || dataB[i]?.period || '';

        // Calculate period payment difference
        let periodPaymentA = 0;
        let periodPaymentB = 0;

        if (showMonthly) {
            periodPaymentA = dataA[i] ? configA.monthlyPayment : 0;
            periodPaymentB = dataB[i] ? configB.monthlyPayment : 0;
            if (dataA[i] && rowA.balance <= 0.01 && i > 0 && dataA[i-1]?.balance > 0.01) {
                periodPaymentA = rowA.interest + rowA.principal;
            } else if (!dataA[i] || (i > 0 && dataA[i-1]?.balance <= 0.01)) {
                periodPaymentA = 0;
            }
            if (dataB[i] && rowB.balance <= 0.01 && i > 0 && dataB[i-1]?.balance > 0.01) {
                periodPaymentB = rowB.interest + rowB.principal;
            } else if (!dataB[i] || (i > 0 && dataB[i-1]?.balance <= 0.01)) {
                periodPaymentB = 0;
            }
        } else {
            periodPaymentA = dataA[i] ? (rowA.interest + rowA.principal) : 0;
            periodPaymentB = dataB[i] ? (rowB.interest + rowB.principal) : 0;
        }

        cumulativePaymentDiff += (periodPaymentA - periodPaymentB);

        let diffValue;
        switch(diffType) {
            case 'interest':
                diffValue = rowA.interest - rowB.interest;
                break;
            case 'principal':
                diffValue = rowA.principal - rowB.principal;
                break;
            case 'principalCumulative':
                diffValue = rowA.principalCumulative - rowB.principalCumulative;
                break;
            default:
                diffValue = rowA.balance - rowB.balance;
        }
        const diffClass = diffValue > 0 ? 'negative' : diffValue < 0 ? 'positive' : '';
        const cumPmtDiffClass = cumulativePaymentDiff > 0 ? 'negative' : cumulativePaymentDiff < 0 ? 'positive' : '';

        const formatFn = showMonthly ? formatCurrencyPrecise : formatCurrency;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${period}</td>
            <td class="interest-cell">${dataA[i] ? formatFn(rowA.interest) : '-'}</td>
            <td class="principal-cell">${dataA[i] ? formatFn(rowA.principal) : '-'}</td>
            <td class="principal-cell">${dataA[i] ? formatCurrency(rowA.principalCumulative) : '-'}</td>
            <td class="balance-cell">${dataA[i] ? formatCurrency(rowA.balance) : '-'}</td>
            <td class="interest-cell">${dataB[i] ? formatFn(rowB.interest) : '-'}</td>
            <td class="principal-cell">${dataB[i] ? formatFn(rowB.principal) : '-'}</td>
            <td class="principal-cell">${dataB[i] ? formatCurrency(rowB.principalCumulative) : '-'}</td>
            <td class="balance-cell">${dataB[i] ? formatCurrency(rowB.balance) : '-'}</td>
            <td class="diff-cell ${diffClass}">${formatCurrency(diffValue)}</td>
            <td class="diff-cell ${cumPmtDiffClass}">${formatCurrency(cumulativePaymentDiff)}</td>
        `;
        tbody.appendChild(row);
    }
}

/**
 * Get current showMonthly state
 */
function getShowMonthly() {
    return showMonthly;
}

/**
 * Get current diffType state
 */
function getDiffType() {
    return diffType;
}

// Export for use in other modules
window.MortgageUI = {
    updateSliderBackground,
    initializeDateDropdowns,
    setupTabSwitching,
    setupInputListeners,
    setupToggleButtons,
    setupDiffTypeSelector,
    setupLumpSumListener,
    generateSchedule,
    getShowMonthly,
    getDiffType
};
