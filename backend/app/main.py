from fastapi import FastAPI, HTTPException
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
def calculate(payload: CalculationRequest) -> CalculationResponse:
    """
    Perform a basic arithmetic calculation.

    Supports addition, subtraction, multiplication, and division.
    Returns the result along with the operands and operation used.

    Raises HTTPException 400 if division by zero is attempted.
    """
    num1: float = payload.num1
    num2: float = payload.num2
    operation: str = payload.operation
    result: float

    if operation == "+":
        result = num1 + num2
    elif operation == "-":
        result = num1 - num2
    elif operation == "*":
        result = num1 * num2
    elif operation == "/":
        if num2 == 0:
            raise HTTPException(status_code=400, detail="Division by zero is not allowed")
        result = num1 / num2
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported operation: {operation}")

    return CalculationResponse(result=result, operation=operation, num1=num1, num2=num2)
def calculate(payload: CalculationRequest):
    pass
