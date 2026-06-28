---
title: "TripFlow v0.2.0: IA y Microservicios"
description: "Nuevo lanzamiento introduciendo generación de itinerarios con IA, arquitectura de microservicios con Kafka, notificaciones en tiempo real y gestión avanzada de usuarios."
pubDate: 2026-02-08
tags: ["TripFlow", "Travel", "React", "Spring Boot", "Docker", "Microservicios", "Kafka", "IA"]
image: "/images/posts/tripflow-showcase.webp"
imageAlt: "Dos móviles mostrando la app TripFlow: un panel de inicio que da la bienvenida a Diego con estadísticas del viaje, y la pantalla de detalle de un itinerario por Japón con una foto de una ciudad japonesa y una pagoda."
locale: "es"
slug: "tripflow-v0.2.0-ia-microservicios"
altSlug: "tripflow-v0.2.0"
---

¡**TripFlow v0.2.0** ya está aquí! 🚀

Este lanzamiento marca un punto de inflexión en la evolución de la plataforma: hemos transformado nuestro MVP monolítico en una robusta **Arquitectura de Microservicios** orientada a eventos.

Las grandes novedades incluyen el esperado **Generador de Itinerarios con IA**, un sistema de **notificaciones en tiempo real** vía WebSockets y un rediseño integral de la experiencia de usuario.

---

<iframe src="https://www.youtube-nocookie.com/embed/jBo7KP6rQ08?si=z_OMYi5a4pa40IUq" title="TripFlow v0.2.0 Release" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 🏗️ Ingeniería: Arquitectura de Microservicios

Para escalar la generación de itinerarios y habilitar la interactividad en tiempo real, hemos refactorizado el backend desde los cimientos. La aplicación monolítica de Spring Boot se ha dividido en microservicios especializados orquestados mediante **Apache Kafka**.

**Los pilares del nuevo sistema:**

- **API Service**: El cerebro central. Gestiona usuarios, autenticación y expone la API REST.
- **AI Service**: Un worker dedicado que procesa las peticiones complejas de IA sin bloquear el flujo principal.
- **Notification Service**: El cartero del sistema. Gestiona el envío de emails y mensajes WebSocket.

### 📐 Diagrama de Arquitectura

![Arquitectura de Microservicios](/images/posts/tripflow-v0.2.0-system-architecture.webp)

> **🛠️ Upgrade Tecnológico**
>
> - **Apache Kafka**: Columna vertebral para eventos asíncronos (`AIRequest`, `Notification`, `Email`).
> - **Bases de Datos H2**: Bases de datos aisladas por servicio para garantizar desacoplamiento.
> - **Docker Compose**: Orquestación completa de servicios, bases de datos y brokers en desarrollo.

### 🔧 Bajo el capó: Desacoplamiento con Kafka

Al aislar el **AI Service**, garantizamos que las tareas pesadas (como consultar LLMs) no degraden el rendimiento de la API principal. La comunicación es totalmente asíncrona.

Así escucha el servicio las nuevas peticiones usando Spring Kafka:

```java
@Component
public class AIRequestListener {
    @KafkaListener(topics = "ai-request", groupId = "ai-service-group")
    public void consume(AIRequestMessage message) {
        log.info("🤖 Recibida petición de IA para usuario: {}", message.username());
        this.aiHandlerService.handleAIRequest(message);
    }
}
```

> **🔑 ¿Por qué es clave?**
>
> Incluso si el proveedor de IA responde lento, la API principal sigue volando para el resto de usuarios. Es la magia de la arquitectura orientada a eventos.

---

## 🤖 IA al volante: Generador de Itinerarios

La joya de la corona de esta versión. Ahora puedes obtener un plan de viaje completo simplemente definiendo tus preferencias.

- **Asistente Inteligente**: Configura destino, presupuesto, ritmo y estilo de viaje.
- **Procesamiento Asíncrono**: Solicita tu viaje y sigue navegando. Kafka gestiona la cola en segundo plano.
- **Rate Limiting Inteligente**: Control de cuotas para asegurar un uso justo de los recursos.

![Asistente de IA](/images/posts/tripflow-ai-preview-es.webp)

---

## 🔔 Real-time: Sistema de Notificaciones

Una aplicación que se siente viva y reactiva.

-   **WebSockets & STOMP**: Conexión persistente y segura para actualizaciones instantáneas.
-   **Feedback Inmediato**: En cuanto tu itinerario está listo, recibes un "toast" y tu panel se actualiza automáticamente. Sin recargar la página.
-   **Emails Transaccionales**: Notificaciones críticas y verificación de cuentas.

### 💻 Deep Dive: Push Notifications Flow

Cuando el itinerario se genera, el backend notifica específicamente al usuario propietario mediante **STOMP**:

**Backend (Notification Service):**

```java
public void handleNotification(NotificationMessage message) {
    // 1. Persistir notificación
    this.notificationService.save(message);

    // 2. Enviar al canal privado del usuario
    messagingTemplate.convertAndSendToUser(
        message.username(),
        "/queue/notifications", 
        message
    );
}
```

**Frontend (React Hook):**

Implementamos `useWebSocketNotifications` para abstraer la complejidad del socket:

```typescript
useWebSocketNotifications({
    types: ["ITINERARY_GENERATED"],
    onNotification: (notification) => {
        toast.success(`¡Tu viaje a ${notification.details.destination} está listo!`);
        refreshItineraries();
    }
});
```

> **💡 Tip de Desarrollo**
>
> Usar un hook personalizado para encapsular la lógica de WebSockets mantiene tus componentes limpios y desacoplados de la infraestructura de red.

---

## 🎨 UX: Un salto de calidad visual

Hemos pulido cada detalle para ofrecer una experiencia premium.

- **Integración con Unsplash**: Adiós a los placeholders. Ahora cada itinerario brilla con imágenes de alta resolución obtenidas dinámicamente.
- **Perfiles de Usuario**: Personalización completa de avatar y gestión de cuenta.
- **UI Optimizada para Móviles**: Nuestra aplicación ahora se siente viva y reactiva.

![Interfaz Móvil](/images/posts/tripflow-v0.2.0-mobile-preview.webp)

---

## 🚀 DevOps: Despliegue Moderno

Adoptamos **GitOps** para profesionalizar el ciclo de vida del software.

*   **VPS & Dokploy**: Migración a un VPS gestionado con Dokploy, ganando control total sobre la infraestructura y facilitando rollbacks.
*   **CI/CD Automatizado**: Pipelines de GitHub Actions que construyen y despliegan los microservicios automáticamente en cada release.

---

## 🌱 Próximos Pasos

El viaje no termina aquí. Nos dirigimos hacia la **v1.0.0** con una visión clara: convertir TripFlow en el compañero de viaje social definitivo. Imagina editar viajes con amigos en tiempo real, explorar mapas interactivos y acceder a tus planes incluso sin cobertura. El futuro de la planificación es colaborativo y *offline-first*, **¡sigue el progreso!**

- 🗺️ **Mapas Interactivos con visualización de rutas**
- 🤝 **Modo Colaborativo en tiempo real**
- 📶 **Funcionalidades Offline First (PWA)**
- 📄 **Exportación a PDF del plan de viaje**
- 🔍 **Descubrimiento de lugares cercanos**

![TripFlow Banner](/images/posts/tripflow-banner.webp)