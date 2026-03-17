# 🧮 Web Calculator - Fullstack Project

Este proyecto es una calculadora web diseñada para ser robusta, escalable y fácil de desplegar. Está preparada para que **OpenClaw** pueda interpretar la arquitectura, los endpoints y la estructura del frontend de manera inmediata.

## 🚀 Arquitectura Tecnológica

El proyecto utiliza una arquitectura de microservicios desacoplados mediante contenedores:

* **Backend:** Python 3.11+ con **FastAPI**.
* **Frontend:** **React** (creado con Vite para mayor velocidad).
* **Orquestación:** **Docker** & **Docker Compose**.

---

## 📂 Estructura del Proyecto

    /
    ├── backend/
    │   ├── app/
    │   │   └── main.py          # Lógica de la API y endpoints
    │   ├── requirements.txt     # Dependencias de Python
    │   └── Dockerfile           # Imagen de backend
    ├── frontend/
    │   ├── src/                 # Componentes de React
    │   ├── package.json         # Dependencias de Node
    │   └── Dockerfile           # Imagen de frontend
    └── docker-compose.yml       # Orquestación de servicios

---

## ⚙️ Configuración y Ejecución Local

Para levantar el entorno completo, asegúrate de tener instalado Docker y ejecuta:

    docker-compose up --build

* **Frontend:** Acceso vía http://localhost:5173
* **Backend:** Acceso vía http://localhost:8000
* **Documentación API (Swagger):** http://localhost:8000/docs

---

## 🛠 Especificaciones Técnicas para OpenClaw

### 1. Backend (FastAPI)
El backend debe exponer un endpoint principal para las operaciones matemáticas básicas:
* **Endpoint:** `POST /calculate`
* **Payload esperado:**

    {
      "operation": "add | sub | mul | div",
      "operand_a": number,
      "operand_b": number
    }

### 2. Frontend (React)
* Debe manejar el estado de los inputs y mostrar el resultado obtenido desde el backend.
* Se recomienda el uso de `axios` o `fetch` para la comunicación con la API.
* **Variables de Entorno:** El frontend debe apuntar a `VITE_API_URL=http://localhost:8000`.

---

## 📝 Reglas de Desarrollo
1.  **Validación:** El backend debe validar que no haya divisiones por cero.
2.  **CORS:** Se debe configurar el middleware de CORS en FastAPI para permitir peticiones desde el origen del frontend.
3.  **Simplicidad:** El diseño debe ser limpio (puedes usar CSS puro o Tailwind).

---

## 🔥 Confirmación de Recepción OpenClaw

Por favor, marca la siguiente casilla si has procesado y comprendido la estructura, las dependencias y el flujo de trabajo de esta aplicación:

- [x] **He recibido y entendido las especificaciones de la Web Calculator.**
