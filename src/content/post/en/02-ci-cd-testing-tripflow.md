---
title: "CI/CD & Testing TripFlow"
description: "TripFlow Phase 2: Backend & frontend setup, unit and integration tests, and CI/CD pipelines for a robust travel planning PWA."
pubDate: 2025-09-11
tags: ["TripFlow", "Travel", "React", "Spring Boot", "TFG"]
image: "/images/posts/tripflow-showcase.png"
locale: "en"
slug: "ci-cd-testing-tripflow"
---

After some work, I managed to complete Phase 2 of the project, setting up backend and frontend individual projects and implementing CI pipelines for unit and integration tests.

This phase focused on laying the technical foundations of TripFlow, ensuring that both the client and server were correctly integrated and that code quality could be automatically verified from the very beginning.

---

## ⚙️ Project Setup

I started by initializing the projects and basic configurations:

-   **Backend**: Spring Boot project in the `backend` folder with Spring Security.
-   **Frontend**: React project in the `frontend` folder with React Router.

Once the projects were running, I added **basic automated tests**:

-   **Backend tests**: verifying that the REST API returns example data correctly from `/health` endpoint.
-   **Frontend tests**: ensuring the home page displays a _test component_.

---

## 🔗 Backend Integration Tests

For integration testing, I created a `BaseIntegrationTest` class that provides a shared configuration for all test cases.  
It automatically sets up a **PostgreSQL Testcontainer**, configures the Spring context, and initializes **RestAssured** for API requests.

Here’s a simplified version of the base class:

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

All integration tests extend this base class, so they automatically get the PostgreSQL container, the JWT configuration, and the RestAssured setup.

This abstraction lets me simplify the code and avoid repetition, making the integration tests much easier to maintain.

## 🧩 Unit Tests

In addition to integration testing, unit tests will be implemented for both backend and frontend to ensure individual components behave correctly in isolation:

-   **Backend**: Services and core logic will be tested using **mocked dependencies** and isolated instances, tagged as "unit". This allows verifying business rules without involving the database.
-   **Frontend**: React components will be tested using **React Testing Library** combined with **Vitest**, enabling validation of rendering and user interactions independently of the backend.

These unit tests will serve as an early check in the CI pipeline, helping catch issues quickly and supporting the integration and system tests.

---

## 🚀 CI/CD Pipelines

With the projects and tests in place, I implemented **two separate CI pipelines** to automate quality checks and maintain code stability.

### ✅ Unit Tests Pipeline

Runs on every push or pull request for _feature_ branches and _main_ / _develop_. Here's a simplified view:

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

Executes all unit tests for backend and frontend, ensuring that individual services, components, and logic behave correctly in isolation before running integration tests.

You can see the full code [here](https://github.com/codeurjc-students/2025-TripFlow/blob/main/.github/workflows/ci-unit-tests.yaml).

### 🔗 Integration Tests Pipeline

Runs on pushes to _main_ / _develop_ and Pull Requests to _main_. Simplified snippet:

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

Executes all integration tests, including those extending BaseIntegrationTest with a PostgreSQL Testcontainer. It also validates that API endpoints and database interactions work correctly.

You can see the full code [here](https://github.com/codeurjc-students/2025-TripFlow/blob/main/.github/workflows/ci-integration-tests.yaml).

---

## 🌱 What’s Next

During the next phase, I’ll be developing the TripFlow MVP, adding core features and updating the corresponding tests to ensure everything works smoothly. This will build on the foundation established in Phase 2 and bring the app closer to a fully functional travel planning PWA — **follow along to see the progress!**

![TripFlow Banner](/images/posts/tripflow-banner.png)
