/**
 * Mortgage Calculator - Main Application Entry Point
 */

(function() {
    'use strict';

    /**
     * Main calculation function - orchestrates all calculations and updates
     */
    function calculateAll() {
        const configA = window.MortgageCalculator.calculateMortgageConfig('A');
        const configB = window.MortgageCalculator.calculateMortgageConfig('B');

        window.MortgageUI.generateSchedule(configA, configB, calculateAll);
        window.MortgageChart.updateChart(configA, configB);
        window.MortgageInvestment.generateInvestmentTable(configA, configB);

        const maxYears = Math.max(configA.years, configB.years);
        window.MortgageInvestment.generateLumpSumTable(maxYears);

        window.MortgageStorage.saveToLocalStorage();
    }

    /**
     * Initialize the application
     */
    function init() {
        // Initialize UI components
        window.MortgageUI.initializeDateDropdowns();
        window.MortgageUI.setupTabSwitching();
        window.MortgageUI.setupInputListeners(calculateAll);
        window.MortgageUI.setupToggleButtons(calculateAll);
        window.MortgageUI.setupDiffTypeSelector(calculateAll);
        window.MortgageUI.setupLumpSumListener(calculateAll);

        // Load saved data and update slider backgrounds
        window.MortgageStorage.loadFromLocalStorage();

        // Update slider backgrounds after loading
        ['A', 'B'].forEach(suffix => {
            window.MortgageUI.updateSliderBackground(document.getElementById('homePriceSlider' + suffix));
            window.MortgageUI.updateSliderBackground(document.getElementById('downPaymentSlider' + suffix));
            window.MortgageUI.updateSliderBackground(document.getElementById('loanTermSlider' + suffix));
            window.MortgageUI.updateSliderBackground(document.getElementById('interestRateSlider' + suffix));
        });

        // Initial calculation
        calculateAll();
    }

    // Start the application when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
