# 🎮 GOTY App - Game of the Year

Aplicación web desarrollada con **Angular 16**, **Firebase Firestore** y **Chart.js** para gestionar una votación interactiva de videojuegos candidatos a **Game of the Year**.

La aplicación permite visualizar una gráfica dinámica con los votos de cada videojuego, agregar nuevos juegos candidatos y votar en tiempo real por cada uno de ellos.

---

## 🚀 Tecnologías utilizadas

- **Angular 16**
- **TypeScript**
- **Firebase**
- **Cloud Firestore**
- **AngularFire**
- **Chart.js**
- **ng2-charts**
- **Bootstrap**
- **CSS personalizado**
- **Reactive Forms**

---

## 📌 Funcionalidades principales

### 🎮 Visualización de videojuegos

La aplicación muestra una lista de videojuegos candidatos al premio **Game of the Year** mediante cards visuales.

Cada card contiene:

- Imagen del videojuego
- Nombre del videojuego
- Descripción
- Cantidad actual de votos
- Botón para votar

---

### 📊 Gráfica de votos

Se implementó una gráfica de barras horizontales usando:

- `chart.js`
- `ng2-charts`

La gráfica muestra la cantidad de votos de cada videojuego en tiempo real.

Características de la gráfica:

- Barras horizontales
- Colores personalizados
- Animación al cargar
- Actualización automática al votar
- Integración con datos provenientes de Firestore

---

### 🗳️ Sistema de votación

Cada videojuego tiene un botón para votar.

Al presionar el botón:

1. Se identifica el documento del juego en Firestore.
2. Se incrementa el campo `votos` en 1.
3. Firestore actualiza la información.
4. La gráfica y las cards se refrescan automáticamente.

Esto se logró usando:

```ts
increment(1)