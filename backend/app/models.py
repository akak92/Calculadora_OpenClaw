from pydantic import BaseModel
from typing import Literal


class CalculationRequest(BaseModel):
    num1: float
    num2: float
    operation: Literal["+", "-", "*", "/"]


class CalculationResponse(BaseModel):
    result: float
    operation: str
    num1: float
    num2: float