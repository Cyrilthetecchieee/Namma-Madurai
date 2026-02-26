

# Namma Madurai – Smart Civic Intelligence Platform

## Overview
A hackathon-ready smart city web application with all pages scaffolded using mock data, a white + green + temple-gold color scheme, and a functional AI chatbot.

---

## Design System
- **Colors**: White background, green (#2E7D32) primary, temple-gold (#C5A03F) accent
- **Font**: Inter
- **Style**: Clean cards with soft shadows, generous whitespace, rounded buttons, minimal line icons (Lucide)
- **Responsive**: Mobile-first with collapsible panels

---

## Pages & Features

### 1. Landing Page
- Clean header with "Namma Madurai" logo, tagline "Building a Cleaner, Smarter Madurai", and navigation links
- Hero section with faded Madurai skyline illustration (CSS gradient/SVG), CTA button "Explore Smart Map"
- Footer with "Powered by Google Cloud for Smart Cities"

### 2. Smart Civic Map Page
- Split-screen layout: left accordion panel (30%) + right map area (70%)
- Left panel filters: Public Toilets (rating, open now, gender), Garbage Bins (fill status), Waste Hotspots (severity), Heatmap toggle
- Map area: Placeholder map with mock markers (ready for Google Maps API key later)
- Mock data for all facilities with distance, ratings, and status indicators

### 3. Report Issue Page
- Card-based form: photo upload area, auto-detect location button, waste type selector, severity picker
- Submission confirmation screen with generated ticket ID and estimated resolution time
- Clean, step-by-step flow

### 4. Clean Score Dashboard
- Top stat cards: Overall City Score (0-100), Today's Reports, Resolved Issues, Smart Bin Alerts
- Area-wise ranking table below
- Bar chart comparison and 7-day trend line using Recharts

### 5. Civic Leaderboard
- Elegant table/card layout showing top contributors with name, points, badge, and reports count
- Badge system: Green Warrior, Civic Guardian, Street Hero, Segregation Star
- Visual badge icons with gold accents

### 6. Admin Dashboard
- Professional corporate dashboard with restricted access indicator
- Reports table with status management (mock)
- Smart bin alerts panel, area heatmap placeholder, analytics charts
- Assign-to-worker and status change UI

### 7. AI Chat Assistant (Functional)
- Floating green circular button (bottom-right)
- Opens minimal chat window with streaming responses
- Powered by Lovable AI (Gemini) via edge function
- Capabilities: nearest toilet, waste segregation guidance, compost centers, e-waste info
- Requires enabling Lovable Cloud

### 8. Architecture Page
- Visual diagram showing IoT → Cloud → Dashboard flow
- User → Report → AI → Admin → Resolution loop
- Clean SVG/CSS-based diagram

---

## Special Features
- **Welcome Popup**: Clean modal on first visit with "Vanakkam!" message and "Let's Get Started" button
- **Mobile Responsive**: Collapsible side panel, floating report button, clean card stacking
- **Role indicators**: Citizen vs Admin UI differentiation (mock, no real auth for hackathon)

---

## Technical Notes
- All data is mock/hardcoded for demo purposes
- Google Maps placeholder ready for API key integration
- AI chatbot requires Lovable Cloud to be enabled
- No real authentication — mock login flow for demo

