# 🚌 Bus Transport System

A clean, simple, and functional bus tracking system. Built with HTML, CSS, and JavaScript.

## Features

- ✅ Search bus stops
- ✅ View available buses at each stop
- ✅ See complete bus routes
- ✅ Check seat availability
- ✅ Color-coded capacity indicators
- ✅ Mobile responsive
- ✅ GitHub Pages ready

## Quick Start

### Deploy to GitHub Pages

1. Create repository at github.com/new
2. Upload all 7 files
3. Enable GitHub Pages in Settings → Pages
4. Your site is live!

### Files Needed

- index.html
- stops.html
- busDetails.html
- projectStyle.css
- stopsStyle.css
- busDetailsStyle.css
- script.js

## How to Use

1. **Home Page** - Search and select a bus stop
2. **Stops Page** - View buses at your stop, click on a bus
3. **Bus Details** - See complete route with all stops

## Customization

### Add Stops
Edit `script.js`, find:
```javascript
let stops = [
    "Your Stop Here",
    // add more
];
```

### Add Buses
Edit `script.js`, find:
```javascript
const buses = [
    {
        id: 5,
        name: "New Bus",
        stops: ["Stop1", "Stop2"],
        filledSeats: 30,
        totalSeats: 50
    }
];
```

### Change Colors
- Background: Edit `background-color` in CSS files
- Primary blue: Find `#1976d2` and replace
- Lightblue headers: Find `lightblue` and replace

## Design

- Simple, clean interface
- Light colors (lightblue, #f4f4f4)
- Arial font
- Bootstrap integration
- Minimalist approach

## Capacity Colors

- 🟢 Green: Less than 70% full (Available)
- 🟡 Orange: 70-90% full (Filling Up)
- 🔴 Red: More than 90% full (Almost Full)

## Current Data

**9 Bus Stops:**
2K Stop, Chota Gate, Drigh Road, Korangi Crossing, Malir Cant, Malir Halt, Model Colony, Shah Faisal Town, Sharfabad

**4 Buses:**
- Bus 1-B (5 stops, 70% full)
- Bus 29 (4 stops, 84% full)
- Bus 5 (4 stops, 62% full)
- Bus 4 (3 stops, 90% full)

## Browser Support

Works on all modern browsers and mobile devices.

## License

Open source - MIT License

---

Made with ❤️ to make transport easy
