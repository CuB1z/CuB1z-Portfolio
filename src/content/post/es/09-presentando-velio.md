---
title: "Presentando Velio"
description: "Velio es un planificador de rutas en bici que genera circuitos con la distancia y el desnivel que quieras y te dice cómo es la ruta antes de salir."
pubDate: 2026-10-26
tags: ["Velio", "Ciclismo", "FastAPI", "React", "Valhalla", "OpenStreetMap"]
image: "/images/posts/velio-banner-es.webp"
imageAlt: "Logotipo de Velio en verde pistacho sobre una captura del planificador: un circuito de gravel de 29,6 km en Manzanares el Real con una nota de 8,2 sobre 10."
locale: "es"
slug: "presentando-velio"
altSlug: "introducing-velio"
---

**Velio** es un planificador de rutas en bici. Le dices cuántos kilómetros quieres hacer, cuánto quieres subir y con qué bici vas a salir, y te genera un circuito que empieza y termina en tu puerta. Si prefieres ir de un sitio a otro, también puedes trazar rutas punto a punto con varias paradas.

## 🎯 Por qué

Lo que más me interesaba era saber cómo va a ser una ruta antes de salir. Dos rutas con la misma distancia y el mismo desnivel pueden ser muy distintas según el firme y el tráfico, así que cada una llega con una nota sobre 10 que tiene en cuenta todo eso, el firme kilómetro a kilómetro y el perfil de elevación. Cuando una te convence, la guardas o la exportas en GPX a tu Garmin, Wahoo o Komoot.

---

## ⚙️ Cómo funciona por dentro

Por debajo hay una API en **Python y FastAPI** que trabaja sobre **Valhalla**, un motor de enrutado de código abierto que usa los datos de **OpenStreetMap**. La elevación sale del modelo **Copernicus DEM**, con una resolución de 30 metros, y la web está hecha con **React** y **MapLibre** para el mapa.

Valhalla sabe ir de A a B, pero no sabe hacer circuitos, así que esa parte la hace Velio. Coloca unos cuantos puntos de paso en un anillo alrededor de la salida, calcula la ruta que los une y va ajustando el tamaño del anillo hasta que la distancia y el desnivel cuadran con lo que has pedido. Después puntúa cada candidato y se queda con el mejor. Si alguno te obliga a ir y volver por la misma carretera, descarta esa zona y lo genera otra vez. Solo ese cambio subió la nota media de una muestra de 18 circuitos de 5,4 a 7,0.

Por el camino salieron problemas que no esperaba. El extracto de España que uso como base no incluye Canarias pero sí las líneas de ferri, y una ruta en Tenerife llegó a salir de 2.626 km. También tuve que añadir los polígonos de zonas militares, aeródromos y prisiones para que ningún circuito pase por ellas, porque muchos de sus caminos no tienen ninguna restricción en OpenStreetMap.

---

## 🚴 ¿Quieres probarlo?

Velio funciona desde el navegador, tanto en el ordenador como en el móvil, y está en español e inglés. Te creas una cuenta con tu email o con Google y en unos segundos tienes tu primer circuito con su nota. Es gratis, sin anuncios ni cookies de seguimiento, y el código está abierto en [GitHub](https://github.com/CuB1z/Velio) con licencia AGPL. Si sales en bici, pruébalo en [velio.cub1z.es](https://velio.cub1z.es) y cuéntame qué tal.
