# 📋 TO-DO — Backend (FastAPI)

## Estado actual
El repositorio aún no tiene código de backend implementado.

## Recomendaciones para avanzar

### 1. Estructura de archivos
Crear la siguiente estructura dentro de `backend/`:
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # App FastAPI + endpoints
│   └── models.py        # Pydantic models para request/response
├── requirements.txt
└── Dockerfile
```

### 2. Implementar el endpoint principal
`POST /calculate` que reciba:
```json
{
  "operation": "add | sub | mul | div",
  "operand_a": number,
  "operand_b": number
}
```
Y retorne el resultado. Validar división por cero.

### 3. Configurar CORS
Agregar middleware CORS en FastAPI para aceptar peticiones desde `http://localhost:5173`.

### 4. Requirements
```
fastapi
uvicorn[standard]
pydantic
```

### 5. Dockerfile
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app/ ./app/
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 6. Pruebas locales
Levantar con: `uvicorn app.main:app --reload`
Swagger disponible en: `http://localhost:8000/docs`
