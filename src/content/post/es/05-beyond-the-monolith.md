---
title: "Más allá del monolito"
description: "¿Tu arquitectura escala tu aplicación o solo tu factura de la nube? Una guía para saber cuándo usar microservicios y cuándo mantener un monolito modular."
pubDate: 2026-03-16
tags: ["Microservicios", "Arquitectura", "Ingeniería", "Backend", "DevOps"]
image: "/images/posts/cover-beyond-the-monolith.png"
locale: "es"
slug: "mas-alla-del-monolito"
altSlug: "beyond-the-monolith"
---

La transición de un monolito a microservicios suele verse como un "ascenso" para una aplicación que crece. En la práctica es una decisión de arquitectura con consecuencias importantes. Pasar a microservicios no elimina la complejidad. Solo mueve la complejidad de **dentro del código** a **la red entre servicios**.

Este artículo explica cómo tomar esta decisión sin terminar en el problema del **monolito distribuido**.

---

## 🏗️ Punto de partida: el "Monolito Modular"

Antes de pensar en microservicios conviene tener claro algo: un monolito no significa necesariamente mal diseño. Un monolito bien organizado, llamado **Monolito Modular**, divide la aplicación en módulos internos separados que comparten una misma base de datos y un único proceso de despliegue.

## Cuándo mantener el monolito

- **Equipos pequeños (1–3 equipos):** si todo el equipo de ingeniería cabe en una sala, mantener decenas de pipelines de despliegue solo añade fricción.
- **Prototipado rápido:** cuando el modelo de dominio todavía no está claro. En un monolito cambiar un límite entre módulos es un simple movimiento de código. En microservicios puede convertirse en un proyecto entre varios equipos.
- **Requisitos de baja latencia:** una llamada a función en memoria tarda nanosegundos. Una llamada de red (REST o gRPC) tarda milisegundos. Si varios componentes necesitan comunicarse constantemente, es mejor mantenerlos juntos.

---

## 🚀 Cuándo elegir microservicios

Los microservicios suelen resolver problemas de organización del trabajo más que problemas técnicos. Tiene sentido plantearlos cuando aparecen algunos de estos problemas.

## 1. Escalabilidad independiente

Si el módulo de **procesamiento de imágenes** necesita 32GB de RAM pero el módulo de **perfil de usuario** solo necesita 512MB, un monolito obliga a escalar toda la aplicación al mismo nivel. Con microservicios cada parte se escala de forma independiente.

## 2. Autonomía de equipos (Ley de Conway)

Si el equipo A tiene listo un arreglo pero debe esperar a que el equipo B termine su trabajo porque comparten el mismo despliegue, el monolito se convierte en un cuello de botella. Los microservicios permiten que cada equipo despliegue su servicio cuando lo necesita.

## 3. Tolerancia a fallos

En un monolito, una fuga de memoria en el generador de informes puede tumbar el sistema de pagos. Los microservicios permiten aislar fallos: si el servicio de informes falla, el resto del sistema puede seguir funcionando.

---

## ⚠️ El coste oculto de los microservicios

Adoptar microservicios también implica asumir más complejidad operativa:

- **Trazabilidad distribuida:** cuando ocurre un error, hay que identificar cuál de los servicios implicados lo provocó. Herramientas como Jaeger o Zipkin pasan a ser necesarias.
- **Consistencia de datos:** ya no es posible usar un `JOIN` sencillo en SQL. Hay que trabajar con **consistencia eventual** y patrones como **Sagas**.
- **Descubrimiento de servicios:** los servicios deben poder encontrarse entre sí en entornos dinámicos de nube.

---

## ⚖️ Conclusión: la "regla de tres"

Una regla práctica consiste en esperar a tener **tres equipos independientes** o **tres perfiles claros de escalado** antes de dividir el monolito.

Si no es posible dibujar claramente en una pizarra dónde termina un servicio y empieza otro, todavía no es buen momento para usar microservicios. En ese caso lo más probable es terminar con un **monolito distribuido**: toda la complejidad de los microservicios y todo el acoplamiento de un monolito.