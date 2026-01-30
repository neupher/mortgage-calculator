# Project Context: Mortgage Calculator

## Overview
A comprehensive mortgage comparison web tool built as a single HTML file that can be run locally in any browser. The tool enables users to compare two different mortgage scenarios side-by-side and visualize the financial implications of each choice.

## Development Session Summary

### Initial Request
Create a mortgage calculator similar to calculator.net/mortgage-calculator.html but:
- Without optional fields (taxes, insurance, etc.)
- With interactive sliders for all values
- With an interactive annual schedule and graph

### Features Implemented

#### 1. Core Mortgage Calculator
- **Home Price** input with slider ($50K - $2M range)
- **Down Payment** with both dollar amount and percentage inputs, synced together
- **Loan Term** slider (1-40 years)
- **Interest Rate** slider (0.5% - 15%)
- **Start Date** selector (month/year)
- Real-time loan amount display

#### 2. A/B Mortgage Comparison
- Tabbed interface to configure two different mortgage scenarios
- Color-coded tabs (Purple for Mortgage A, Pink for Mortgage B)
- Side-by-side summary cards showing monthly payment and key metrics
- Values persist between tab switches and page refreshes (localStorage)

#### 3. Summary Metrics Display
- Monthly Payment (prominently displayed)
- Principal amount
- Total Interest
- Interest/Principal Ratio
- Total Amount Paid

#### 4. Amortization Schedule Table
- Toggle between **Annual** and **Monthly** views
- Columns for both mortgages:
  - Year/Date
  - Interest (A & B)
  - Principal (A & B)
  - Principal Cumulative (A & B)
  - Balance (A & B)
- **Difference column** with dropdown selector to compare:
  - Balance Diff
  - Interest Diff
  - Principal Diff
  - Principal Cumulative Diff
- **Cumulative Payment Difference** column (Pmt Diff Cum.)
- Color-coded cells (green = favorable, red = unfavorable)
- Light background highlighting on difference columns

#### 5. Balance Comparison Chart
- Line chart showing remaining balance over time for both mortgages
- Moved to left column for compact layout
- Uses Chart.js library

#### 6. Investment Growth Calculator
- Automatically calculates monthly payment savings between mortgages
- Shows which mortgage has lower payment
- Displays growth projections at 0%, 2%, 4%, 6%, 8%, 10%, 12%, 14%, 16% annual returns
- Smart handling when loans have different terms:
  - While both active: invests the payment difference
  - When shorter loan paid off: invests the full payment of remaining loan
- Compound interest applied monthly

### UI/UX Refinements Made
1. Removed min-max labels below sliders
2. Fixed percentage text field clipping
3. Made Mortgage B tab text white when active
4. Reduced left panel size by 40% (compact layout)
5. Reduced button heights by 50%
6. Reduced vertical padding by 40%
7. Moved chart to left column below inputs

### Technical Details
- **Single HTML file** - No build process required
- **External dependency**: Chart.js (loaded via CDN)
- **Data persistence**: localStorage for saving configurations
- **Responsive design**: Grid layout with mobile breakpoint at 900px
- **Modern CSS**: Gradients, shadows, transitions, sticky headers

### File Structure
```
mortgage_calculator/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions auto-deploy to Pages
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── app.js              # Main application entry point
│   ├── calculator.js       # Mortgage calculation functions
│   ├── chart.js            # Chart rendering logic
│   ├── investment.js       # Investment calculator logic
│   ├── storage.js          # LocalStorage persistence
│   └── ui.js               # UI interaction handlers
├── index.html              # Main HTML structure
├── Project_Context.md      # This file
└── README.md               # Usage instructions
```

## Key Calculations

### Monthly Payment Formula
```
M = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
M = Monthly payment
P = Principal (loan amount)
r = Monthly interest rate (annual rate / 12)
n = Total number of payments (years × 12)
```

### Amortization
Each month:
- Interest Payment = Remaining Balance × Monthly Rate
- Principal Payment = Monthly Payment - Interest Payment
- New Balance = Remaining Balance - Principal Payment

### Investment Growth (Monthly Contributions)
```
Each month:
1. Add monthly contribution
2. Apply monthly interest: balance × (1 + annual_rate/12)
```

## Active TO-DO List

### 1. Modularize Codebase Structure ✅ COMPLETED
Break the large `index.html` into a future-proofed setup with separate files:
- `index.html` - Main HTML structure
- `css/styles.css` - All styling
- `js/app.js` - Main application logic
- `js/calculator.js` - Mortgage calculation functions
- `js/chart.js` - Chart rendering logic
- `js/investment.js` - Investment calculator logic
- `js/storage.js` - LocalStorage persistence
- `js/ui.js` - UI interaction handlers

### 2. UI Improvements ✅ COMPLETED
- Remove dots/points from graph lines
- Remove outlines from graph legend items
- General UI polish for a sleeker appearance

### 3. Lump Sum Table Year Rows Fix ✅ COMPLETED
Ensure the bottom lump sum investment table shows the number of "year rows" based on whichever of Mortgage A or B has a longer term.

### 4. Apply New Color Scheme ✅ COMPLETED
Implement dark theme with green accents inspired by stock trading apps:
- **Background**: Dark (#0d1117 - GitHub dark style)
- **Primary Accent**: Green (#00d09c - Spotify-like green)
- **Secondary Accent**: Pink (#ff6b9d)
- **Panels**: Dark gray (#161b22, #21262d)
- **Text**: White/light gray (#e6edf3, #8b949e)
- **Positive values**: Green
- **Negative values**: Red (#ff6b6b)
- **Charts**: Green/Pink line styling on dark background

### 5. Update README with Deployed URL ✅ COMPLETED
Add the GitHub Pages deployment link to the README so users can easily access the live tool.

---

## Future Enhancement Ideas
- Export amortization schedule to CSV/Excel
- Print-friendly view
- Additional comparison metrics (break-even point, etc.)
- Extra payment scenarios
- Refinancing calculator
