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
- **Cumulative Payment Difference** column (Payment Diff)
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

## Development Session Log (January 2026)

### Completed TO-DO List

#### 1. Modularize Codebase Structure ✅ COMPLETED
Broke the original 1,678-line `index.html` into a clean, maintainable structure:
- `index.html` - Main HTML structure (slim, ~200 lines)
- `css/styles.css` - All styling with CSS custom properties
- `js/app.js` - Main application entry point
- `js/calculator.js` - Mortgage calculation functions
- `js/chart.js` - Chart rendering logic with Chart.js
- `js/investment.js` - Investment calculator logic
- `js/storage.js` - LocalStorage persistence
- `js/ui.js` - UI interaction handlers and slider logic

#### 2. UI Improvements ✅ COMPLETED
- Removed dots/points from graph lines (`pointRadius: 0`)
- Removed outlines from graph legend items
- Styled legend with dark background and padding
- General UI polish for a sleeker appearance

#### 3. Lump Sum Table Year Rows Fix ✅ COMPLETED
Verified implementation uses `Math.max(termA, termB)` to show year rows based on the longer mortgage term.

#### 4. Apply New Color Scheme ✅ COMPLETED
Implemented dark theme with green accents (trading app style):
- **Background**: Dark (#0d1117 - GitHub dark style)
- **Primary Accent**: Green (#00d09c - Spotify-like green)
- **Secondary Accent**: Blue (#4fc3f7 - for Mortgage B)
- **Panels**: Dark gray (#161b22, #21262d)
- **Text**: White/light gray (#e6edf3, #8b949e)
- **Positive values**: Green
- **Negative values**: Red (#ff6b6b)
- **Warning values**: Orange (#ffa726)

#### 5. Update README with Deployed URL ✅ COMPLETED
Added GitHub Pages deployment link: https://tapaniq.github.io/mortgage-calculator/

---

### Additional Enhancements Completed

#### 6. Mortgage B Color Scheme Change ✅
Changed Mortgage B from pink/red to blue (#4fc3f7) throughout the UI:
- Tab active state
- Summary card accent
- Chart line color
- Table header background
- All borders and highlights

#### 7. Table Header Styling Fix ✅
Fixed lump sum table header to match the amortization table:
- Removed gradient styling
- Applied solid green background (#21262d with accent colors)
- Consistent styling across all tables

#### 8. README Calculation Formulas ✅
Added comprehensive formulas section to README including:
- Monthly payment formula with example
- Interest calculation
- Principal calculation
- Balance reduction
- Total interest calculation
- Interest-to-principal ratio
- Investment compound growth formulas

#### 9. Mobile Responsive Design ✅
Added comprehensive responsive CSS for mobile devices:
- **900px breakpoint**: Two-column to single-column layout
- **600px breakpoint**: Smaller fonts, compact spacing
- **400px breakpoint**: Ultra-compact mobile view
- Touch device optimizations (`@media (hover: none) and (pointer: coarse)`)
- Larger touch targets (44px minimum)
- Horizontal scroll for wide tables
- Adjusted chart aspect ratios

#### 10. SVG House Icon ✅
Replaced emoji house logo with custom inline SVG:
- Matches theme green color (#00d09c)
- Crisp rendering at all sizes
- 40x40px dimensions
- Simple house silhouette design

#### 11. Sticky Header Z-Index Fix ✅
Fixed table header scroll overlap issue:
- Increased `z-index` from 1 to 10
- Changed rgba() backgrounds to solid colors for header cells:
  - Default: #21262d
  - Mortgage A columns: #1a3d35 (dark green tint)
  - Mortgage B columns: #1a3340 (dark blue tint)
  - Difference columns: #3d3020 (dark amber tint)

#### 12. GitHub Actions Deployment ✅
Created `.github/workflows/deploy.yml` for automatic deployment:
- Triggers on push to main branch
- Deploys to GitHub Pages
- Uses latest GitHub Actions (v4/v5)

---

## Active TO-DO List

*No active tasks - all items completed!*

---

## Future Enhancement Ideas
- Export amortization schedule to CSV/Excel
- Print-friendly view
- Additional comparison metrics (break-even point, etc.)
- Extra payment scenarios
- Refinancing calculator
