---
title: "CI/CD y Testing en TripFlow"
description: "TripFlow Fase 2: Configuración de backend y frontend, pruebas unitarias e integración, y pipelines de CI/CD para una PWA de planificación de viajes robusta."
pubDate: 2025-09-11
tags: ["TripFlow", "Travel", "React", "Spring Boot", "TFG"]
image: "/images/posts/tripflow-showcase.webp"
imageAlt: "Dos móviles mostrando la app TripFlow: un panel de inicio que da la bienvenida a Diego con estadísticas del viaje, y la pantalla de detalle de un itinerario por Japón con una foto de una ciudad japonesa y una pagoda."
locale: "es"
slug: "ci-cd-pruebas-tripflow"
altSlug: "ci-cd-testing-tripflow"
---

Después de un tiempo de trabajo, logré completar la **Fase 2 del proyecto**, configurando los proyectos individuales de backend y frontend e implementando **pipelines de CI para pruebas unitarias e integración**.

Esta fase se centró en sentar las bases técnicas de TripFlow, asegurando que tanto el cliente como el servidor estuvieran correctamente integrados y que la calidad del código pudiera ser verificada automáticamente desde el principio.

---

## ⚙️ Configuración del Proyecto

Comencé inicializando los proyectos y configuraciones básicas:

-   **Backend**: Proyecto **Spring Boot** en la carpeta `backend` con Spring Security.
-   **Frontend**: Proyecto **React** en la carpeta `frontend` con React Router.

Una vez que los proyectos estuvieron en marcha, añadí **pruebas automatizadas básicas**:

-   **Pruebas de backend**: verificando que la API REST devolviera datos de ejemplo correctamente desde el endpoint `/health`.
-   **Pruebas de frontend**: asegurando que la página de inicio mostrara un _componente de prueba_.

---

## 🔗 Pruebas de Integración en Backend

Para las pruebas de integración, creé una clase `BaseIntegrationTest` que proporciona una configuración compartida para todos los casos de prueba.  
Automáticamente levanta un **Testcontainer de PostgreSQL**, configura el contexto de Spring e inicializa **RestAssured** para las peticiones a la API.

Aquí te dejo una versión simplificada de la clase base:

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@ActiveProfiles("test")
@TestInstance(Lifecycle.PER_CLASS)
@DirtiesContext(classMode = ClassMode.AFTER_CLASS)
@TestPropertySource(properties = {
    "JWT_SECRET=VGhpcyBpcyBhIHZlcnkgc2VjdXJlIGRldmVsb3BtZW50IHN3dw==",
    "POSTGRES_PASSWORD=test",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.jpa.show-sql=false",
    "spring.datasource.hikari.maximum-pool-size=3"
})
public abstract class BaseIntegrationTest {

    @Container
    @ServiceConnection
    public static final PostgreSQLContainer<?> postgres =
      new PostgreSQLContainer<>("postgres:15-alpine")
        .withDatabaseName("tripflow_test")
        .withUsername("test")
        .withPassword("test")
        .withStartupTimeout(Duration.ofSeconds(60))
        .withConnectTimeoutSeconds(5)
        .withCommand("postgres -c fsync=off -c synchronous_commit=off");

    @LocalServerPort
    protected int port;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        RestAssured.baseURI = "http://localhost";
        RestAssured.basePath = "/api";
    }

    // [Helper Methods] =============================================

    protected String generateUniqueValue(String prefix) {
        return prefix + System.nanoTime();
    }
}
```

Todas las pruebas de integración heredan de esta clase base, por lo que obtienen automáticamente el contenedor de PostgreSQL, la configuración de JWT y la configuración de RestAssured.

Esta abstracción me permite simplificar el código y evitar repeticiones, haciendo que las pruebas de integración sean mucho más fáciles de mantener.

## 🧩 Pruebas Unitarias

Además de las pruebas de integración, se implementarán pruebas unitarias tanto para el backend como para el frontend para garantizar que los componentes individuales se comporten correctamente en aislamiento:

-   **Backend**: Los servicios y la lógica central se probarán utilizando **dependencias mockeadas** e instancias aisladas, etiquetadas como "unit". Esto permite verificar las reglas de negocio sin involucrar la base de datos.
-   **Frontend**: Los componentes de React se probarán utilizando **React Testing Library** combinada con **Vitest**, lo que permite validar el renderizado y las interacciones del usuario independientemente del backend.

Estas pruebas unitarias servirán como un chequeo temprano en el pipeline de CI, ayudando a detectar problemas rápidamente y apoyando las pruebas de integración y sistema.

---

## 🚀 Pipelines de CI/CD

Con los proyectos y pruebas en su lugar, implementé **dos pipelines de CI separados** para automatizar las verificaciones de calidad y mantener la estabilidad del código.

### ✅ Pipeline de Pruebas Unitarias

Se ejecuta en cada push o pull request para ramas de características y main/develop. Aquí te dejo una vista simplificada:

```yaml
jobs:
  backend-unit-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: java-version: '21'
      - run: mvn test -Dgroups=unit

  frontend-unit-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: node-version: '24'
      - run: npm run test -- --watch=false
```

Ejecuta todas las pruebas unitarias para backend y frontend, asegurando que servicios, componentes y lógica individuales se comporten correctamente en aislamiento antes de ejecutar las pruebas de integración.

Puedes ver el código completo [aquí](https://github.com/codeurjc-students/2025-TripFlow/blob/main/.github/workflows/ci-unit-tests.yaml).

### 🔗 Pipeline de Pruebas de Integración

Se ejecuta en pushes a _main_ / _develop_ y Pull Requests a _main_. Fragmento simplificado:

```yaml
jobs:
  backend-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: java-version: '21'
      - run: mvn test -Dgroups=integration
```

Ejecuta todas las pruebas de integración, incluyendo aquellas que extienden BaseIntegrationTest con un Testcontainer de PostgreSQL. También valida que los endpoints de la API y las interacciones con la base de datos funcionen correctamente.

Puedes ver el código completo [aquí](https://github.com/codeurjc-students/2025-TripFlow/blob/main/.github/workflows/ci-integration-tests.yaml).

---

## 🌱 Próximos Pasos

Durante la siguiente fase, estaré desarrollando el MVP de TripFlow, añadiendo funcionalidades principales y actualizando las pruebas correspondientes para asegurar que todo funcione sin problemas. Esto construirá sobre la base establecida en la Fase 2 y acercará la aplicación a una PWA de planificación de viajes completamente funcional, **¡sígueme para ver el progreso!**

![TripFlow Banner](/images/posts/tripflow-banner.webp)
