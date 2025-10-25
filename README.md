# 🎧 Podcast App

### Author
**Reneva Newman**

### Module
**DJS03 – React Landing Page**

---
## 📘 Project Overview

**Podcast App** is a responsive and dynamic React-based landing page that allows users to explore podcasts, view show details, and browse different genres. It demonstrates the use of **React hooks**, **API integration**, **component-based architecture**, and **modular design**.

The application fetches podcast data from a live API and displays it in a visually organized grid. Each podcast preview includes essential show information, and users can open a modal window to view more detailed content.

---

Key features include:

🔍 Search — Users can search podcast shows by typing any part of the title, with results updating in real-time as they type.

↕️ Sort — Users can sort the list of podcasts by last updated date (newest first) or by title (ascending A-Z or descending Z-A).

🎛️ Filter — Users can narrow down the podcast list by selecting a genre, combining with search and sort criteria for refined results.

📄 Pagination — The podcast list is displayed in manageable numbered pages, improving readability and performance. Pagination respects search, sort and filter settings and retains state when navigating between pages.

Built using modern React Hooks, component-based architecture, and modular design, the app fetches podcast data from a remote API and presents it in a visually organized grid. Each podcast preview displays key

## 🧩 Features

- **Dynamic API Fetching** – Retrieves live podcast data from [`https://podcast-api.netlify.app/`](https://podcast-api.netlify.app/) on initial load.
- **Loading and Error States** – Displays user feedback while fetching or handling errors.
- **Modal View** – Shows detailed podcast info (title, genres, seasons, and description).
- **Reusable Components** – Uses modular and reusable React components such as:
  - `PodcastGrid`
  - `PodcastCard`
  - `Modal`
- **Clean UI** – Uses simple, accessible styling for a modern podcast browsing experience.
- **JS Doc Documentation** – Each component and function is documented for clarity and maintenance.

---

## 🚀 User Stories

### Podcast Display
- As a **user**, I want to see a grid of podcast previews on the landing page so I can browse available shows easily.  
- As a **user**, I want each podcast preview to show an image, title, season count, genres, and last updated date.

### API and State Management
- As a **developer**, I want to fetch podcast data from an API when the app loads so that it displays real, dynamic content.  
- As a **user**, I want to see a loading message while data is being fetched.  
- As a **user**, I want to see an error or empty state if the API fails or returns no data.  
- As a **developer**, I want to use React’s `useEffect` and `useState` hooks to manage data fetching and rendering.

### Code Quality and Documentation
- As a **developer**, I want every major function and module to include **JSDoc comments**.  
- As a **developer**, I want to maintain consistent and readable code formatting across all files.

### Data Source
API Endpoint:  
`https://podcast-api.netlify.app/`

### State Management
- `useState()` – Handles podcasts, loading, error, and selected podcast states.  
- `useEffect()` – Fetches data once when the app mounts.

---

## 🧠 Technical Overview

### Core Technologies
- **React.js** (Functional Components & Hooks)
- **JavaScript (ES6+)**
- **HTML5 / CSS3**
- **Vite** (Development Server & Build Tool)

## ⚙️ How to Run the App
1️⃣ Install dependencies
npm install

2️⃣ Run the development server
npm run dev

3️⃣ Open in browser

Visit the local server URL displayed in the terminal (e.g., http://localhost:5173).

## 🧪 Testing

To test core functionality:

Load the app → Check if podcasts appear after the loading state.

Simulate API failure → Change success = true to false in App.jsx to verify error handling.

Click a podcast → Confirm the modal opens and displays detailed info.

Click “X” in the modal → Ensure it closes properly.

## 🎯 Project Goals

Demonstrate React component architecture

Practice API fetching with useEffect

Show understanding of state management

Deliver a clean, well-documented UI matching user stories

## 🧑‍💻 Future Enhancements

Add search and filter functionality.

Implement pagination or infinite scroll.

Use React Router for dedicated podcast detail pages.

Enhance styling with Tailwind CSS or Material UI.

## 🪪 License

This project is for educational purposes as part of the DJS03 – React Landing Page module.
