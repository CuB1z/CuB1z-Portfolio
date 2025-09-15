---
title: "Introducing TripFlow"
description: "TripFlow is a smart and intuitive travel planning PWA that helps travellers create AI-generated itineraries, optimize routes, and plan trips efficiently."
pubDate: 2025-09-09
tags: ["TripFlow", "Travel", "React", "Spring Boot", "TFG"]
image: "/images/posts/tripflow-showcase.png"
locale: "en"
slug: "introducing-tripflow"
---

Hi! I’m **Diego Sánchez Rincón**, a Software Engineering Student from Rey Juan Carlos University.

This post is an introduction to my Final Degree Project (TFG), called [TripFlow](https://github.com/codeurjc-students/2025-TripFlow).

**TripFlow** is an innovative **Progressive Web App (PWA)** designed for comprehensive **travel itinerary management and intelligent route optimization**. Built with modern web technologies, it empowers travellers to create, customize, and optimize their journeys with the help of **artificial intelligence and advanced algorithms**.

![TripFlow Showcase Wireframe](/images/posts/tripflow-showcase.png)

At this early stage, I focused on defining the **core functionalities** of the app, as well as the main intentions and tools it should include. This also involved working on the **design of the first screens and the navigation flow**, creating a clear picture of how users will interact with TripFlow from the very beginning.

---

## 🎯 Functional Objectives

The core idea of **TripFlow** is to let users **plan, organize, and optimize their travel itineraries** in a smart and personalized way.

To achieve this, the app will provide features such as:

-   Creating, editing, and deleting travel itineraries.
-   Structuring trips into multiple days with scheduled activities.
-   Adding activities manually or generating them automatically with AI.
-   Viewing trip statistics, like total distance or number of days planned.
-   Using an optimization algorithm to improve daily routes.
-   Unlocking achievements based on usage and travel goals.
-   Exporting itineraries as PDF files.
-   Accessing the app from any device thanks to a responsive interface.
-   Ensuring offline access when traveling without internet.

## 🧪 Technical Objectives

From a technical perspective, **TripFlow** is designed as a **modern full-stack application**. It follows a client–server architecture, integrates AI services, and leverages optimization algorithms to enhance route planning.

Some of the key technologies and tools include:

-   **Frontend**: React Router + Vite + TypeScript.
-   **Backend**: Spring Boot with a RESTful API.
-   **Database**: PostgreSQL with JPA Repositories.
-   **Testing**: JUnit, TestingContainers, Vitest, and Puppeteer.
-   **AI Integration**: OpenRouter API for itinerary generation.
-   **Optimization**: TSP algorithms to improve route efficiency.
-   **Infrastructure**: Docker for containerization and CI/CD workflows.
-   **PWA**: Progressive Web App with offline capabilities.
-   **Authentication**: JWT-based session management.
-   **Extras**: PDF export with PDF.js and interactive data visualizations.

---

## 🔍 Detailed Analysis

In this first phase, I also worked on a deeper analysis of the application structure. While the main goals and features are summarized here, the full documentation provides a much more detailed breakdown, including:

-   **Features by priority**: divided into **basic (MVP)**, **intermediate**, and **advanced** functionality.
-   **Entities and relationships**: clear definitions of the domain model (User, Itinerary, Activities, Preferences, etc.) and how they connect.
-   **User permissions**: what anonymous, registered, and admin users can (and cannot) do.
-   **Complementary technologies**: integrations such as AI APIs, PDF export, and charts.
-   **Algorithms**: the route optimization logic that will power the app.
-   **Navigation flow**: diagrams of how users will move between pages.
-   **Wireframes**: first prototypes of the landing page, dashboard, itineraries, and more.

You can check the full documentation with diagrams and prototypes directly on [GitHub](https://github.com/codeurjc-students/2025-TripFlow).

---

## 🌱 What’s Next

This is just the first phase of TripFlow! I’ll continue sharing updates on the project as I progress, including new features, technical insights, and design improvements. Follow along to see how TripFlow evolves from concept to a fully functional PWA.

![TripFlow Banner](/images/posts/tripflow-banner.png)
