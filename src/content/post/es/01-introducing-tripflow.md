---
title: "Presentando TripFlow"
description: "TripFlow es una PWA inteligente e intuitiva para planificación de viajes que ayuda a los viajeros a crear itinerarios generados por IA, optimizar rutas y planificar viajes de manera eficiente."
pubDate: 2025-09-09
tags: ["TripFlow", "Viajes", "React", "Spring Boot", "TFG"]
image: "/images/posts/tripflow-showcase.webp"
imageAlt: "Dos móviles mostrando la app TripFlow: un panel de inicio que da la bienvenida a Diego con estadísticas del viaje, y la pantalla de detalle de un itinerario por Japón con una foto de una ciudad japonesa y una pagoda."
locale: "es"
slug: "presentando-tripflow"
altSlug: "introducing-tripflow"
---

¡Hola! Soy **Diego Sánchez Rincón**, estudiante de Ingeniería de Software en la Universidad Rey Juan Carlos.

Esta publicación es una introducción a mi **Trabajo de Fin de Grado (TFG)**, llamado [TripFlow](https://github.com/codeurjc-students/2025-TripFlow).

**TripFlow** es una innovadora **Aplicación Web Progresiva (PWA)** diseñada para la **gestión integral de itinerarios de viaje y la optimización inteligente de rutas**. Construida con tecnologías web modernas, permite a los viajeros crear, personalizar y optimizar sus viajes con la ayuda de **inteligencia artificial y algoritmos avanzados**.

![TripFlow Showcase Wireframe](/images/posts/tripflow-showcase.webp)

En esta etapa inicial, me centré en definir las **funcionalidades principales** de la aplicación, así como las intenciones y herramientas que debía incluir.  
Esto también implicó trabajar en el **diseño de las primeras pantallas y el flujo de navegación**, creando una visión clara de cómo los usuarios interactuarán con TripFlow desde el principio.

---

## 🎯 Objetivos Funcionales

La idea principal de **TripFlow** es permitir a los usuarios **planificar, organizar y optimizar sus itinerarios de viaje** de manera inteligente y personalizada.

Para lograrlo, la aplicación ofrecerá funciones como:

-   Crear, editar y eliminar itinerarios de viaje.
-   Estructurar viajes en múltiples días con actividades programadas.
-   Añadir actividades manualmente o generarlas automáticamente con IA.
-   Visualizar estadísticas del viaje, como la distancia total o el número de días planificados.
-   Usar un algoritmo de optimización para mejorar las rutas diarias.
-   Desbloquear logros en función del uso y los objetivos de viaje.
-   Exportar itinerarios en archivos PDF.
-   Acceder a la aplicación desde cualquier dispositivo gracias a una interfaz adaptable.
-   Garantizar acceso sin conexión al viajar sin internet.

## 🧪 Objetivos Técnicos

Desde un punto de vista técnico, **TripFlow** está diseñado como una **aplicación full-stack moderna**.  
Sigue una arquitectura **cliente–servidor**, integra servicios de **IA** y aprovecha algoritmos de **optimización** para mejorar la planificación de rutas.

Algunas de las tecnologías y herramientas clave son:

-   **Frontend**: React Router + Vite + TypeScript.
-   **Backend**: Spring Boot con API RESTful.
-   **Base de datos**: PostgreSQL con Repositorios JPA.
-   **Testing**: JUnit, TestingContainers, Vitest y Puppeteer.
-   **Integración de IA**: API de OpenRouter para generación de itinerarios.
-   **Optimización**: algoritmos TSP para mejorar la eficiencia de las rutas.
-   **Infraestructura**: Docker para contenerización y flujos de trabajo CI/CD.
-   **PWA**: Aplicación Web Progresiva con capacidades offline.
-   **Autenticación**: gestión de sesiones basada en JWT.
-   **Extras**: exportación a PDF con PDF.js y visualizaciones de datos interactivas.

---

## 🔍 Análisis Detallado

En esta primera fase, también trabajé en un análisis más profundo de la estructura de la aplicación.  
Si bien los objetivos y características principales se resumen aquí, la documentación completa ofrece un desglose mucho más detallado, que incluye:

-   **Características por prioridad**: divididas en **básicas (MVP)**, **intermedias** y **avanzadas**.
-   **Entidades y relaciones**: definiciones claras del modelo de dominio (Usuario, Itinerario, Actividades, Preferencias, etc.) y cómo se conectan.
-   **Permisos de usuario**: qué pueden (y no pueden) hacer los usuarios anónimos, registrados y administradores.
-   **Tecnologías complementarias**: integraciones como APIs de IA, exportación a PDF y gráficos.
-   **Algoritmos**: la lógica de optimización de rutas que impulsará la aplicación.
-   **Flujo de navegación**: diagramas de cómo los usuarios se moverán entre las páginas.
-   **Wireframes**: primeros prototipos de la página de inicio, panel de control, itinerarios y más.

Puedes consultar la **documentación completa con diagramas y prototipos** directamente en [GitHub](https://github.com/codeurjc-students/2025-TripFlow).

---

## 🌱 Próximos Pasos

¡Esto es solo la primera fase de TripFlow!  
Seguiré compartiendo avances del proyecto a medida que progrese, incluyendo nuevas funciones, ideas técnicas y mejoras de diseño.

Acompáñame para ver cómo TripFlow evoluciona desde un **concepto** hasta convertirse en una **PWA completamente funcional**.

![TripFlow Banner](/images/posts/tripflow-banner.webp)
