from fastapi import FastAPI
from app.models import CalculationRequest, CalculationResponse

app = FastAPI(title="Calculadora OpenClaw")


@app.get("/health")
def health_check():
    pass


@app.post("/calculate", response_model=CalculationResponse)
def calculate(payload: CalculationRequest):
    pass
