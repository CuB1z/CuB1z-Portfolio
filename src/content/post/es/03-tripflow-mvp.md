---
title: "TripFlow MVP Inicial"
description: "TripFlow MVP completado: autenticación, gestión de itinerarios y aplicación dockerizada con tests full-stack y pipelines de CI/CD."
pubDate: 2025-11-15
tags: ["TripFlow", "Travel", "React", "Spring Boot", "TFG", "Docker", "Playwright"]
image: "/images/posts/tripflow-showcase.png"
locale: "es"
slug: "tripflow-mvp-inicial"
altSlug: "tripflow-mvp"
---

El **MVP de TripFlow** ya es completamente funcional, combinando un backend robusto, un frontend interactivo, pruebas automatizadas, pipelines de CI/CD y despliegue dockerizado.

Este hito acerca la PWA de planificación de viajes a producción y facilita que otros puedan ejecutar, probar y explorar la aplicación.

---

<iframe src="https://www.youtube-nocookie.com/embed/lCwdGb0S3oY?si=0W76pAwm_3pGlQT2" title="TripFlow MVP Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## 🏗️ Resumen de la Arquitectura

TripFlow sigue una **arquitectura cliente-servidor** con un frontend en React y un backend en Spring Boot, conectados mediante APIs RESTful. Todo el stack está containerizado usando Docker para facilitar el despliegue y garantizar la consistencia entre entornos.

Aquí tienes una visión general de alto nivel de la arquitectura:

> **💈 Resumen del Modelo de Dominio**
>
> ![TripFlow MVP Domain Model](/images/posts/tripflow-mvp-domain-model.png)

---

> **💻 Resumen de la Arquitectura del Servidor**
>
> ![TripFlow MVP Backend Architecture](/images/posts/tripflow-mvp-architecture-backend.png)

---

> **🌐 Resumen de la Arquitectura del Cliente**
>
> ![TripFlow MVP Frontend Architecture](/images/posts/tripflow-mvp-architecture-frontend.png)

---

## 🌱 Modo Demo para Pruebas Rápidas

TripFlow incluye un **modo demo** que permite a los usuarios explorar la aplicación **sin registrarse**. Esto es perfecto para demos, talleres o nuevos usuarios que quieran probar las funcionalidades principales rápidamente sin la fricción de crear una cuenta.  

En modo demo, los usuarios pueden:
- 🗺️ Navegar y crear itinerarios  
- 🧭 Explorar la interfaz y la navegación  
- ✏️ Interactuar con funcionalidades principales como actividades, días y detalles del itinerario  

---

## 🧪 Testing: Ejemplos Full Stack

El Testing automatizado garantiza la fiabilidad y confianza en el despliegue:

- ✅ **Tests Unitarios** – backend services & frontend components  
- 🔗 **Tests de Integración** – servicios que se comunican con componentes reales  
- 🎭 **Tests E2E** – Playwright simula interacciones completas de usuario  

---

### 📖 Ejemplo de Integración Backend

Aquí tienes un ejemplo de un **test de integración** para la creación de un itinerario usando [RestAssured](https://rest-assured.io/):

```java
@Test
@DisplayName("Test successful itinerary creation")
public void testCreateItinerarySuccess() {
    String authToken = AuthTestUtils.authenticateUserAndGetToken("user");
    ExtendedItineraryDTO itineraryDTO = createTestItinerary();

    RestAssured
    .given()
        .contentType(ContentType.JSON)
        .cookie("auth_token", authToken)
        .body(itineraryDTO)
    .when()
        .post("/v1/itineraries")
    .then()
        .statusCode(201)
        .body("place", equalTo(itineraryDTO.place()))
        .body("id", notNullValue())
        .body("days", hasSize(1))
        .body("days[0].activities", hasSize(1))
        .body("days[0].activities[0].activity", equalTo(
            itineraryDTO.days().get(0).activities().get(0).activity()
        ));
}
```

> **💡 Por qué esto importa**
> 
> Este test asegura que el backend maneja correctamente las solicitudes autenticadas, persiste el itinerario y devuelve la estructura de respuesta esperada.

---

### 📖 Ejemplo E2E Frontend

Para la validación full stack, aquí tienes un **test E2E de Playwright** que crea un nuevo itinerario a través de la UI:

```typescript
test("should successfully create a new itinerary with basic info", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/itineraries/new`);
    
    await page.getByLabel(/título del viaje/i).fill("Escapada a Barcelona");
    await page.getByLabel(/destino/i).fill("Barcelona, España");
    await page.getByLabel(/número de viajeros/i).fill("2");
    await page.getByLabel(/presupuesto/i).fill("1500");
    await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
    
    await page.getByRole("button", { name: /guardar todo/i }).click();
    
    await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
    await expect(page.getByText(/barcelona/i)).toBeVisible();
});
```

> **🔍 Punto clave**
> 
> Este test simula a un usuario real creando un itinerario, verificando que el formulario frontend, la interacción con la API y la actualización de la UI funcionen correctamente en conjunto.

---

## 🚀 Pipelines de CI/CD

Para garantizar la calidad del código, la estabilidad y un proceso de despliegue fluido, TripFlow utiliza **GitHub Actions** para implementar tanto **tests E2E** como **pipelines de CD reutilizables**.

---

### ✅ E2E Pipeline: `CI - E2E Tests`

Este pipeline ejecuta **tests end-to-end** usando **Playwright**, simulando interacciones reales de usuario con el stack completo (frontend + backend + base de datos). Se activa:

- En eventos de `push` a las ramas `main` y `develop`
- En pull requests dirigidos a `main`
- Manualmente vía `workflow_dispatch`

**Pasos clave del pipeline:**

1. **Checkout del código** – obtiene el código más reciente del repositorio.
2. **Setup Node.js** – prepara el entorno con la versión LTS de Node requerida por el frontend y los tests de Playwright.
3. **Configurar Docker Compose** – asegura que Docker esté listo para ejecutar servicios multi-contenedor.
4. **Iniciar servicios** – lanza los contenedores de **backend, frontend y PostgreSQL** usando `docker-compose.test.yaml`.
5. **Esperar a que los servicios estén saludables** – garantiza que todos los contenedores estén completamente activos antes de ejecutar los tests, usando un script shell personalizado.
6. **Instalar dependencias E2E** – instala los módulos de Node en la carpeta `e2e`.
7. **Instalar navegadores de Playwright** – descarga los navegadores necesarios para las pruebas automatizadas de UI.
8. **Ejecutar tests de Playwright** – ejecuta todos los tests end-to-end, verificando que la aplicación se comporte correctamente desde la perspectiva del usuario.

```yaml
name: CI - E2E Tests
on:
  push:
    branches: [main, develop]
    paths: ['backend/**','frontend/**','e2e/**','.github/workflows/ci-e2e-tests.yaml']
  pull_request:
    branches: [main]
    paths: ['backend/**','frontend/**','e2e/**','.github/workflows/ci-e2e-tests.yaml']
  workflow_dispatch:

jobs:
  e2e-testing:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: node-version: lts/*
      - uses: docker/setup-compose-action@v1
        with: version: latest
      - name: Start services
        working-directory: ./docker
        run: docker compose -f docker-compose.test.yaml up -d
      - name: Wait for services
        working-directory: ./scripts
        run: |
          chmod +x run-wait-for-services.sh
          ./run-wait-for-services.sh
      - name: Install E2E dependencies
        working-directory: ./e2e
        run: npm ci
      - name: Install Playwright Browsers
        working-directory: ./e2e
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        working-directory: ./e2e
        run: npx playwright test
```

> **💡 Por qué es importante**
>
> Este pipeline garantiza que cualquier cambio en el backend o frontend no rompa la experiencia del usuario. Actúa como una verificación final antes de fusionar características o desplegar a producción.

---

### 📦 Pipeline CD Reusable: `CD - Build and Publish OCI Artifacts`

Este pipeline de despliegue continuo (CD) automatiza la construcción y publicación de imágenes Docker para todos los servicios de TripFlow, haciéndolas reutilizables en diferentes entornos (dev, test, prod).

**Características clave:**

1. Entradas del workflow:
    - `tag`: etiqueta de versión para las imágenes Docker
    - `compose_file`: archivo docker-compose para publicar como artefacto OCI
    - `services`: lista de servicios a construir (frontend, backend, etc.)

2. Estrategia de matriz:
    - Permite construir múltiples servicios en paralelo.

3. Pasos explicados:
    - **Checkout del código** – obtiene la última instantánea del repositorio.
    - **Login en Docker** – autentica en Docker Hub usando secretos.
    - **Construir y publicar imágenes** – construye el Dockerfile de cada servicio y lo publica en Docker Hub con la etiqueta especificada.
    - **Publicar docker-compose** – el primer servicio publica el archivo docker-compose.yml como un artefacto OCI, haciéndolo reutilizable por otros workflows.

```yaml
name: CD - Build and Publish OCI Artifacts
on:
  workflow_call:
    inputs:
      tag: { required: true, type: string }
      compose_file: { required: true, type: string }
      services: { required: true, type: string }

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: ${{ fromJSON(inputs.services) }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Build & push ${{ matrix.service }}
        uses: docker/build-push-action@v6
        with:
          context: ./${{ matrix.service }}
          file: ./${{ matrix.service }}/Dockerfile
          push: true
          tags: docker.io/${{ secrets.DOCKERHUB_USERNAME }}/tripflow-${{ matrix.service }}:${{ inputs.tag }}
```

---

## 🐳 Dockerización: Full Stack en Un Solo Compose

TripFlow puede ser lanzado completamente usando [Docker Compose](https://docs.docker.com/compose/), que orquesta todos los servicios (frontend, backend, base de datos) en contenedores aislados, asegurando consistencia entre entornos.

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: tripflow-postgres-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: tripflow
      POSTGRES_USER: tripflow_user
      POSTGRES_PASSWORD: secure_password
    ports: ["5432:5432"]
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tripflow_user -d tripflow"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks: [tripflow-network]

  backend:
    image: cub1z/tripflow-backend:0.1
    container_name: tripflow-backend
    restart: unless-stopped
    environment:
      SPRING_PROFILES_ACTIVE: prod
      POSTGRES_URL: jdbc:postgresql://postgres:5432/tripflow
      POSTGRES_USER: tripflow_user
      POSTGRES_PASSWORD: secure_password
      JWT_SECRET: VGhpcyBpcyBhIHZlcnkgc2VjdXJlIGRldmVsb3BtZW50IHNlY3JldCEyMw==
    ports: ["8080:8080"]
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
    networks: [tripflow-network]

  frontend:
    image: cub1z/tripflow-frontend:0.1
    container_name: tripflow-frontend
    restart: unless-stopped
    environment:
      PUBLIC_API_BASE_URL: http://localhost:8080
    ports: ["4173:4173"]
    depends_on:
      backend:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget --no-verbose --tries=1 --spider http://localhost:4173/ || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  pgdata:
    driver: local

networks:
  tripflow-network:
    driver: bridge
```

**✅ Por qué esta configuración aporta valor**

1. Reproducibilidad de todo el stack
    Todos los desarrolladores, testers y entornos de CI pueden ejecutar los mismos contenedores sin preocuparse por diferencias en máquinas locales o problemas específicos del sistema operativo.

2. Inicio robusto mediante healthchecks
    - PostgreSQL: asegura que la base de datos esté lista antes de que el backend inicie (pg_isready)
    - Backend: espera hasta que `/api/health` responda
    - Frontend: espera hasta que la aplicación sea completamente accesible
    Esto garantiza que los servicios solo inicien cuando las dependencias estén listas, previniendo condiciones de carrera y fallos en el arranque.

3. Datos persistentes de PostgreSQL
    - El volumen `pgdata` mantiene los datos de la base de datos a través de reinicios de contenedores.
    Los desarrolladores pueden detener/iniciar contenedores sin perder datos de prueba o desarrollo.

4. Entornos configurables
    - Las variables de entorno como `SPRING_PROFILES_ACTIVE`, `POSTGRES_URL` y `JWT_SECRET` facilitan el cambio entre configuraciones de desarrollo, prueba y producción.
    - No se requieren cambios en el código para adaptarse a diferentes entornos.

5. Red interna dedicada
    - `tripflow-network` aísla los servicios de la red del host.
    - Los servicios se comunican internamente usando nombres de host de contenedores (por ejemplo, `postgres`), mejorando la seguridad y evitando conflictos de puertos.

6. Facilidad de escalado
    - Se pueden agregar servicios adicionales (como caché, colas o análisis) sin interrumpir la pila existente.
    - Los contenedores pueden escalarse individualmente en entornos de producción o prueba.

7. Listo para integración CI/CD
    - El mismo archivo Docker Compose puede usarse en pipelines de GitHub Actions para pruebas **E2E**.
    - Hace que las pruebas automatizadas sean consistentes con el entorno de desarrollo.

> **💡 Consejo para los lectores**
> 
> Usa `docker-compose.override.yml` para definir ajustes específicos del entorno, como diferentes credenciales de base de datos o URLs de backend, sin tocar el archivo Compose principal.
>
> Esto mantiene tu configuración limpia y mantenible.

---

## 📄 Documentación de la API

Todos los endpoints de TripFlow están completamente documentados usando **OpenAPI**, proporcionando una documentación HTML interactiva para desarrolladores:

[OpenAPI HTML Docs](https://raw.githack.com/codeurjc-students/2025-TripFlow/main/docs/api/api-docs.html)

> Perfecto para explorar la API e integrarla con otras herramientas.

---

### 📖 Cómo se documentan los endpoints de la API en Java

TripFlow utiliza anotaciones de **Springdoc OpenAPI** para generar documentación directamente desde los controladores Java.  
Por ejemplo, el endpoint `createItinerary` está anotado de la siguiente manera:

```java
@PostMapping({"", "/"})
@Operation(
    summary = "Create Itinerary",
    description = "Creates a new itinerary for the authenticated user.",
    security = @SecurityRequirement(name = "auth_token")
)
@ApiResponses({
    @ApiResponse(responseCode = "201", description = "Itinerary created successfully"),
    @ApiResponse(responseCode = "400", description = "Invalid itinerary data provided"),
    @ApiResponse(responseCode = "401", description = "Unauthorized access")
})
public ResponseEntity<ExtendedItineraryDTO> createItinerary(@RequestBody ExtendedItineraryDTO itineraryDTO) {
    try {
        ExtendedItineraryDTO createdItinerary = this.itineraryService.createItinerary(itineraryDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
            .buildAndExpand(createdItinerary.id()).toUri();

        return ResponseEntity.created(location).body(createdItinerary);
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}
```

**Puntos clave**

1. `@Operation` – proporciona un resumen, descripción detallada y requisitos de seguridad.
2. `@ApiResponses` – define todas las posibles respuestas HTTP para el endpoint con descripciones.
3. **Generación automática de HTML** – Springdoc lee estas anotaciones y produce la documentación OpenAPI, manteniéndola siempre sincronizada con el código.
4. **Amigable para desarrolladores** – cualquiera puede ver esquemas de solicitud/respuesta, requisitos de autenticación y respuestas de ejemplo sin leer el código.

> **💡 Consejo**
> 
> Documentar directamente en el controlador asegura que la documentación de la API evolucione naturalmente con tu código, reduciendo la documentación desactualizada y mejorando la mantenibilidad.

---

## 🌱 Próximos Pasos

Durante la próxima fase, TripFlow se está preparando para la versión 0.2.0 con mejoras ambiciosas que harán que la aplicación sea más inteligente, rápida e interactiva. Se mejorarán las funciones principales, se actualizarán las pruebas y se sentarán las bases para una PWA de planificación de viajes completamente funcional y potenciada por IA — **¡sigue el progreso!**

- 🤖 **Generación de itinerarios impulsada por IA**
- 🖼️ **Avatares de usuario y fotos de perfil**
- 🔔 **Sistema de notificaciones y alertas**
- 👥 **Panel de administración para gestión de usuarios y sistema**
- 🏗️ **Transición a una arquitectura de microservicios con Kafka**
- 🎓 **Integración con la API de Unsplash**

![TripFlow Banner](/images/posts/tripflow-banner.png)