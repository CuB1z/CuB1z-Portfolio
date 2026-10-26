---
title: "Introducing Velio"
description: "Velio is a cycling route planner that builds loops to the distance and climbing you want and tells you what the route is like before you ride."
pubDate: 2026-10-26
tags: ["Velio", "Cycling", "FastAPI", "React", "Valhalla", "OpenStreetMap"]
image: "/images/posts/velio-banner-en.webp"
imageAlt: "The Velio logo in pistachio green above a screenshot of the planner: a 29.6 km gravel loop in Manzanares el Real scored 8.2 out of 10."
locale: "en"
slug: "introducing-velio"
altSlug: "presentando-velio"
---

**Velio** is a cycling route planner. You tell it how far you want to ride, how much you want to climb and which bike you're taking, and it builds a loop that starts and ends at your door. If you'd rather go from one place to another, you can also plan point-to-point routes with several stops.

## 🎯 Why

What I cared about most was knowing what a route is like before you leave. Two routes with the same distance and climbing can be very different depending on the surface and the traffic, so each one comes with a score out of 10 that takes all of that into account, plus the surface kilometre by kilometre and the elevation profile. When one looks right, you save it or export it as GPX to your Garmin, Wahoo or Komoot.

---

## ⚙️ How It Works Under the Hood

Underneath there's a **Python and FastAPI** API working on top of **Valhalla**, an open source routing engine that runs on **OpenStreetMap** data. Elevation comes from the **Copernicus DEM** at a 30 metre resolution, and the web app is built with **React** and **MapLibre** for the map.

Valhalla knows how to get from A to B, but it doesn't build loops, so that part is Velio's. It places a few waypoints on a ring around the start, routes through them and keeps resizing the ring until the distance and the climbing match what you asked for. Then it scores each candidate and keeps the best one. If a loop makes you ride out and back along the same road, it bans that area and builds the loop again. That change alone raised the mean score of a sample of 18 loops from 5.4 to 7.0.

Along the way I ran into problems I didn't expect. The Spain extract I build on leaves out the Canary Islands but keeps the ferry lines, and a route in Tenerife once came out at 2,626 km. I also had to add the polygons of military zones, aerodromes and prisons so no loop goes through them, because many of their tracks carry no restriction at all in OpenStreetMap.

---

## 🚴 Want to Try It?

Velio runs in the browser on both desktop and mobile, in English and Spanish. You sign up with your email or a Google account, and a few seconds later you have your first loop with its score. It's free, with no ads or tracking cookies, and the code is open on [GitHub](https://github.com/CuB1z/Velio) under the AGPL licence. If you ride, try it at [velio.cub1z.es](https://velio.cub1z.es) and tell me what you think.
