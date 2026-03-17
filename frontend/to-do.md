# 📋 TO-DO — Frontend (React + Vite)

## Estado actual
El repositorio aún no tiene código de frontend implementado.

## Recomendaciones para avanzar

### 1. Inicializar el proyecto
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install axios
```

### 2. Estructura de archivos
```
frontend/
├── src/
│   ├── App.jsx          # Componente principal con la calculadora
│   ├── App.css          # Estilos
│   └── main.jsx         # Entry point
├── .env                 # Variables de entorno
├── package.json
└── Dockerfile
```

### 3. Variable de entorno
Crear `.env` en `frontend/`:
```
VITE_API_URL=http://localhost:8000
```

### 4. Lógica del componente
- Inputs para `operand_a` y `operand_b`
- Selector de operación (add/sub/mul/div)
- Botón para ejecutar
- Mostrar resultado obtenido desde el backend via `POST /calculate`
- Manejar errores (división por cero, campos vacíos)

### 5. Dockerfile
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5173
```

### 6. Estilos
Diseño limpio con CSS puro o Tailwind. Priorizar usabilidad.
