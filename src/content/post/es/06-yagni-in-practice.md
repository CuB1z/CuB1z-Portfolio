---
title: "YAGNI en la práctica"
description: "Deja de sobrepensar para un futuro que todavía no existe. Aprende el lado práctico de YAGNI (You Ain't Gonna Need It) y cómo evitar el coste del código que nadie necesita hoy."
pubDate: 2026-03-23
tags: ["Arquitectura", "Ingeniería", "Backend", "Testing"]
image: "/images/posts/cover-yagni-in-practice.png"
locale: "es"
slug: "yagni-en-la-practica"
altSlug: "yagni-in-practice"
---

Los ingenieros tendemos a imaginar escenarios antes de que existan. Ves un perfil de `User` y enseguida aparece la pregunta: *"¿Y si dentro de unos meses necesitamos autenticación biométrica, identidades multi-tenant y un sistema de reputación sobre blockchain?"* Ese impulso de dejarlo todo "listo para el futuro" es justo el terreno donde nace **YAGNI (You Ain't Gonna Need It)**. La idea es simple: los equipos que avanzan rápido suelen pensar mejor en lo que realmente hace falta, no en lo que quizá algún día haga falta.

## 💸 El alto costo del "por las dudas"

YAGNI no es solo una sigla simpática; es una defensa contra el código más caro de todos: **el que no hacía falta escribir.** Cuando construyes pensando en un futuro que todavía no llegó, no estás siendo prudente. Estás pagando tres impuestos silenciosos:

- **Impuesto de mantenimiento:** cada línea especulativa hay que probarla, refactorizarla y documentarla. En la práctica, te estás comprometiendo a mantener una funcionalidad que hoy no da ningún valor.
- **Impuesto cognitivo:** quien venga después de ti, incluido tu yo del futuro, tendrá que abrirse paso entre capas de interfaces y arquitecturas "flexibles" pensadas para un "algún día" que nunca termina de llegar. Eso complica entender el código.
- **Impuesto de oportunidad:** cada hora invertida en una abstracción "flexible" es una hora que no estás usando para construir algo que tus usuarios sí necesitan ahora.

---

## 🛠️ Cómo llevar YAGNI a la práctica

¿Cómo se pelea contra el impulso de sobre-ingenierizar? Cambia el foco de la **teoría** a la **práctica** con estas tres ideas:

## 1. La regla de tres para abstraer

Las abstracciones se ganan. No hace falta crear interfaces genéricas o clases base abstractas la primera vez que resuelves un problema.

- **Primera vez:** resuélvelo ahí mismo, de la forma más simple posible.
- **Segunda vez:** si hace falta, copia y pega. Suele ser mejor tener dos soluciones concretas parecidas que una abstracción prematura y mal pensada.
- **Tercera vez:** cuando el patrón ya sea claro y real, entonces sí merece la pena extraer la lógica compartida.

## 2. Diseña para borrar, no para extender

El código más fácil de cambiar es el que también es fácil de borrar. En lugar de construir un módulo enorme y "extensible", escribe funciones pequeñas y desacopladas.

> **La lógica**
> 
> Es mucho más fácil borrar una función simple de 50 líneas y reescribirla cuando cambian los requisitos que desenredar un framework "flexible" de 500 líneas que ya no encaja con la realidad del producto.

## 3. La pregunta del "coste de retraso"

Durante una revisión de código o una sesión de planificación, si alguien propone meter un "hook" para compatibilidad futura, haz esta pregunta:

> *"Si no lo agregamos hoy, ¿será significativamente más difícil agregarlo en seis meses cuando realmente lo necesitemos?"*

Si la respuesta es "más o menos lo mismo", **no lo construyas.** Espera a que el requisito exista de verdad.

---

## ⚖️ Cuándo ignorar YAGNI (las excepciones)

YAGNI no es una excusa para hacer ingeniería floja. Aun así, hay dos áreas donde sí conviene ir un poco más lejos:

1. **Seguridad y privacidad:** aquí no vale el "ya veremos". La encriptación, la validación de entradas y la autenticación tienen que estar desde el principio.
2. **Integridad de datos:** cambiar más adelante un esquema de base de datos o una ruta de migración suele ser mucho más costoso que cambiar una función. Ahí sí conviene dedicarle tiempo extra a modelar bien las relaciones desde el inicio.
