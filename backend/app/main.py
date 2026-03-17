from fastapi import FastAPI
from app.models import CalculationRequest, CalculationResponse

app = FastAPI(title="Calculadora OpenClaw")


@app.get("/health", response_model=dict)
def health_check() -> dict:
    """
    Health check endpoint.

    Returns the current status of the API.
    Useful to verify that the service is up and running.
    """
    return {"status": "ok"}


@app.post("/calculate", response_model=CalculationResponse)
def calculate(payload: CalculationRequest):
    pass