# Attorney Price Management System

## Overview

This project is a web application for managing attorneys and their related price maps per county/court/violation/points. The application is built using Next.js for the frontend, MobX for state management, and Mongoose for database interactions with MongoDB.

## Features

- Manage attorneys and their details.
- Associate attorneys with different prices based on county, court, violation and points.
- Perform CRUD operations on attorneys and prices.
- Data persistence using MongoDB.

## Getting Started

### Prerequisites

- Node.js (version 20.x or later)
- MongoDB (local, remote instance or dockerized)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/samtarbury/attorney-crud.git
    cd attorney-crud
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb://your-mongo-db-uri
    ```

4. **Run the application:**
    ```bash
    npm run dev
    ```

   The application will be available at `http://localhost:3000`.

5. ## Instructions

### Completing the API

1. **Define Mongoose Schemas:**
    - Ensure all required schemas (`Attorney`, `AttorneyPrice`, `TrafficCourt`, `TrafficCounty`, and `Violation`) are defined in the `models` directory and feel free to add or modify attributes

2. **Set up API routes:**
    - Complete the CRUD operations for each entity in the `pages/api` directory. Ensure that each API route handles requests to create, read, update, and delete records.
    - Use `dbConnect.js` to establish a connection to MongoDB.

### Writing React Components with Next.js

1. **Create Components:**
    - In the `pages` directory, create pages and components to display, create, and edit attorneys and their price maps.
    - Use Next.js features like dynamic routing and API routes to interact with the backend.

2. **Use MobX for State Management:**
    - Define MobX stores in the `stores` directory to manage the application state.
    - Use the `attorneyStore` to manage attorney data and `attorneyPriceStore` to manage attorney price data.
    - Fetch data from the API and update the stores accordingly.

### Understanding Price Maps

A price map can be either a combination of all the criteria (county, court, violation, and points) or partial criteria (one or more of them). For example, an attorney can have a price per points for a specific county and a specific price per points for a particular court. **The price is always calculated per points**.

### Additional Steps
- Write tests: Ensure your code is covered by integration tests (optional)
- Add styling: Use @mui/material for components styling (mandatory)
