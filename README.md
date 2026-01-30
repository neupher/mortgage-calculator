# 🏠 Mortgage Calculator

A comprehensive mortgage comparison tool that runs entirely in your browser. Compare two mortgage scenarios side-by-side, visualize amortization schedules, and calculate investment potential from payment savings.

## 🌐 Live Demo

**[Try it now →](https://yourusername.github.io/mortgage-calculator/)**

> Replace `yourusername` with your GitHub username after deployment.

## Quick Start

1. **Open the calculator**: Double-click `index.html` or drag it into your browser
2. **Or via command line**:
   ```bash
   # Windows
   start index.html

   # Mac
   open index.html

   # Linux
   xdg-open index.html
   ```

## Features

### 📊 Mortgage Comparison (A vs B)

Configure two different mortgage scenarios using the tabbed interface:

| Input | Description | Range |
|-------|-------------|-------|
| Home Price | Total price of the property | $50K - $2M |
| Down Payment | Amount paid upfront ($ or %) | 0% - 100% |
| Loan Term | Length of the mortgage | 1 - 40 years |
| Interest Rate | Annual interest rate | 0.5% - 15% |
| Start Date | When payments begin | Month/Year |

**Tips:**
- Use sliders for quick adjustments
- Type exact values in the number fields for precision
- Down payment $ and % are synced automatically
- Your settings are saved automatically (persists after refresh)

### 📈 Summary Cards

Each mortgage displays:
- **Monthly Payment** - Your regular payment amount
- **Principal** - The loan amount (price minus down payment)
- **Total Interest** - Interest paid over the life of the loan
- **Int/Prin Ratio** - How much interest vs principal (lower is better)
- **Total Paid** - Grand total of all payments

### 📅 Amortization Schedule

View year-by-year (or month-by-month) breakdown:

| Column | Description |
|--------|-------------|
| Interest | Interest portion of payments |
| Principal | Principal portion of payments |
| Prin. Cum. | Cumulative principal paid (equity built) |
| Balance | Remaining loan balance |

**Comparison Columns:**
- **Difference Dropdown** - Choose what to compare: Balance, Interest, Principal, or Cumulative Principal
- **Pmt Diff Cum.** - Running total of payment differences between A and B

**Color Coding:**
- 🟢 Green = Favorable (A is better)
- 🔴 Red = Unfavorable (B is better)

### 💰 Investment Growth Calculator

Answers the question: *"If I take the cheaper mortgage and invest the monthly savings, how much could I accumulate?"*

**How it works:**
1. Automatically calculates the monthly payment difference
2. Invests that difference each month
3. Shows growth at various return rates (0% - 16%)

**Smart loan term handling:**
- While both loans are active: invests the monthly difference
- When the shorter loan is paid off: invests the full payment of the remaining loan
- Compound interest applied monthly

## Common Use Cases

### 1. 30-Year vs 15-Year Comparison
Compare the trade-offs:
- 30-year: Lower monthly payment, more total interest
- 15-year: Higher monthly payment, less total interest, faster equity

### 2. Different Down Payment Amounts
See how down payment affects:
- Monthly payment
- Total interest paid
- Whether you need PMI (typically required under 20%)

### 3. Rate Shopping
Compare offers from different lenders with different rates to see the long-term impact.

### 4. Investment Opportunity Cost
Use the Investment Calculator to see if you're better off:
- Taking a longer loan with lower payments and investing the difference
- Taking a shorter loan to pay off debt faster

## Example Scenario

**Mortgage A**: $400K home, 20% down, 30-year at 6.5%
- Monthly Payment: ~$2,022
- Total Interest: ~$407,920

**Mortgage B**: $400K home, 20% down, 15-year at 6.0%
- Monthly Payment: ~$2,699
- Total Interest: ~$165,820

**Analysis:**
- B saves ~$242,100 in interest
- A has $677/month lower payment
- $677/month invested at 8% for 30 years = ~$1,000,000+

## Calculation Formulas

### Monthly Payment

The monthly payment is calculated using the standard amortization formula:

```
M = P × [r(1 + r)^n] / [(1 + r)^n - 1]
```

Where:
- **M** = Monthly payment
- **P** = Principal (loan amount = home price - down payment)
- **r** = Monthly interest rate (annual rate ÷ 12 ÷ 100)
- **n** = Total number of payments (loan term in years × 12)

**Example:** $320,000 loan at 6.5% for 30 years
```
r = 6.5 / 12 / 100 = 0.005417
n = 30 × 12 = 360
M = 320,000 × [0.005417 × (1.005417)^360] / [(1.005417)^360 - 1]
M = $2,022.09/month
```

### Monthly Interest Payment

Each month, interest is calculated on the remaining balance:

```
Interest = Balance × Monthly Rate
```

### Monthly Principal Payment

The principal portion is what remains after interest:

```
Principal = Monthly Payment - Interest
```

### Remaining Balance

After each payment, the balance is reduced by the principal paid:

```
New Balance = Previous Balance - Principal Payment
```

### Total Interest Paid

Sum of all interest payments over the loan term:

```
Total Interest = (Monthly Payment × Number of Payments) - Principal
```

### Interest-to-Principal Ratio

Shows how much interest you pay relative to the loan amount:

```
Ratio = (Total Interest / Principal) × 100%
```

### Investment Growth (Compound Interest)

For the investment calculator, monthly compounding is used:

```
Each month:
  1. Add monthly contribution: Balance += Contribution
  2. Apply interest: Balance × (1 + Annual Rate / 12)
```

**Lump Sum Growth:**
```
Future Value = Present Value × (1 + r)^n
```

Where:
- **r** = Monthly rate (annual rate ÷ 12)
- **n** = Number of months

## Technical Notes

- **No installation required** - Just open the HTML file
- **Works offline** - Only needs internet for the chart library (Chart.js)
- **Data stays local** - All calculations happen in your browser
- **Settings saved** - Uses localStorage to remember your inputs

## Browser Compatibility

Works in all modern browsers:
- Chrome / Edge
- Firefox
- Safari
- Opera

## Files

```
mortgage_calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy to GitHub Pages
├── css/
│   └── styles.css          # All styling (dark theme)
├── js/
│   ├── app.js              # Main application entry point
│   ├── calculator.js       # Mortgage calculation functions
│   ├── chart.js            # Chart rendering logic
│   ├── investment.js       # Investment calculator logic
│   ├── storage.js          # LocalStorage persistence
│   └── ui.js               # UI interaction handlers
├── index.html              # Main HTML structure
├── README.md               # This file
└── Project_Context.md      # Development history & TO-DOs
```

---

*Built for quick mortgage comparisons without ads, tracking, or unnecessary complexity.*
