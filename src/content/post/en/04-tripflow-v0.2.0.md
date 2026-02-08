---
title: "TripFlow v0.2.0: AI & Microservices"
description: "New release introducing AI itinerary generation, microservices architecture with Kafka, real-time notifications, and advanced user management."
pubDate: 2026-02-08
tags: ["TripFlow", "AI", "Microservices", "Kafka", "React", "Spring Boot", "Docker"]
image: "/images/posts/tripflow-showcase.png"
locale: "en"
slug: "tripflow-v0.2.0"
altSlug: "tripflow-v0.2.0-ia-microservicios"
---

**TripFlow v0.2.0** is here! 🚀

This release marks a turning point in the platform's evolution: we have transformed our monolithic MVP into a robust, event-driven **Microservices Architecture**.

Major new features include the highly anticipated **AI Itinerary Generator**, a **real-time notification** system via WebSockets, and a comprehensive redesign of the user experience.

---

<iframe src="https://www.youtube-nocookie.com/embed/jBo7KP6rQ08?si=z_OMYi5a4pa40IUq" title="TripFlow v0.2.0 Release" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 🏗️ Engineering: Microservices Architecture

To scale itinerary generation and enable real-time interactivity, we have refactored the backend from the ground up. The monolithic Spring Boot application has been split into specialized microservices orchestrated by **Apache Kafka**.

**The pillars of the new system:**

- **API Service**: The central brain. Manages users, authentication, and exposes the REST API.
- **AI Service**: A dedicated worker that processes complex AI requests without blocking the main flow.
- **Notification Service**: The system's postman. Manages email delivery and WebSocket messages.

### 📐 Architecture Diagram

![Microservices Architecture](/images/posts/tripflow-v0.2.0-system-architecture.png)

> **🛠️ Tech Upgrade**
>
> - **Apache Kafka**: Backbone for asynchronous events (`AIRequest`, `Notification`, `Email`).
> - **H2 Databases**: Isolated databases per service to ensure decoupling.
> - **Docker Compose**: Full orchestration of services, databases, and brokers in development.

### 🔧 Under the hood: Decoupling with Kafka

By isolating the **AI Service**, we ensure that heavy tasks (like consulting LLMs) do not degrade the performance of the main API. Communication is fully asynchronous.

Here is how the service listens for new requests using Spring Kafka:

```java
@Component
public class AIRequestListener {
    @KafkaListener(topics = "ai-request", groupId = "ai-service-group")
    public void consume(AIRequestMessage message) {
        log.info("🤖 Received AI request for user: {}", message.username());
        this.aiHandlerService.handleAIRequest(message);
    }
}
```

> **🔑 Why is it key?**
>
> Even if the AI provider responds slowly, the main API remains fast for the rest of the users. This is the magic of event-driven architecture.

---

## 🤖 AI at the Wheel: Itinerary Generator

The jewel in the crown of this version. Now you can get a complete travel plan simply by defining your preferences.

- **Smart Assistant**: Configure destination, budget, pace, and travel style.
- **Asynchronous Processing**: Request your trip and keep browsing. Kafka manages the queue in the background.
- **Intelligent Rate Limiting**: Quota control to ensure fair use of resources.

![AI Assistant](/images/posts/tripflow-ai-preview-en.png)

---

## 🔔 Real-time: Notification System

An application that feels alive and reactive.

- **WebSockets & STOMP**: Persistent and secure connection for instant updates.
- **Immediate Feedback**: As soon as your itinerary is ready, you receive a "toast" and your dashboard updates automatically. No page reload.
- **Transactional Emails**: Critical notifications and account verification.

### 💻 Deep Dive: Push Notifications Flow

When the itinerary is generated, the backend specifically notifies the owner user via **STOMP**:

**Backend (Notification Service):**

```java
public void handleNotification(NotificationMessage message) {
    // 1. Persist notification
    this.notificationService.save(message);

    // 2. Send to user's private channel
    messagingTemplate.convertAndSendToUser(
        message.username(),
        "/queue/notifications", 
        message
    );
}
```

**Frontend (React Hook):**

We implemented `useWebSocketNotifications` to abstract socket complexity:

```typescript
useWebSocketNotifications({
    types: ["ITINERARY_GENERATED"],
    onNotification: (notification) => {
        toast.success(`Your trip to ${notification.details.destination} is ready!`);
        refreshItineraries();
    }
});
```

> **💡 Development Tip**
>
> Using a custom hook to encapsulate WebSocket logic keeps your components clean and decoupled from network infrastructure.

---

## 🎨 UX: A leap in visual quality

We have polished every detail to offer a premium experience.

- **Unsplash Integration**: Goodbye placeholders. Now every itinerary shines with high-resolution images dynamically fetched.
- **User Profiles**: Full avatar customization and account management.
- **Mobile-First UI**: Our application now feels alive and reactive.

![Mobile Interface](/images/posts/tripflow-v0.2.0-mobile-preview.png)

---

## 🚀 DevOps: Modern Deployment

We adopted **GitOps** to professionalize the software lifecycle.

*   **VPS & Dokploy**: Migration to a managed VPS with Dokploy, gaining full control over infrastructure and facilitating rollbacks.
*   **Automated CI/CD**: GitHub Actions pipelines that build and deploy microservices automatically on every release.

---

## 🌱 What’s Next

The journey doesn't stop here. We are charging towards **v1.0.0** with a clear vision: to make TripFlow the ultimate social travel companion. Imagine editing trips with friends in real-time, exploring interactive maps, and accessing your plans even without signal. The future of travel planning is collaborative and offline-first — **follow along to see the progress!**

- 🗺️ **Interactive Maps with real route visualization**
- 🤝 **Collaborative Mode for real-time editing**
- 📶 **Offline First PWA capabilities**
- 📄 **PDF Export for travel plans**
- 🔍 **Nearby Places Discovery**

![TripFlow Banner](/images/posts/tripflow-banner.png)