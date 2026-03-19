"""
Tests for backend API endpoints: /health and /calculate.
"""
import pytest
from fastapi.testclient import TestClient


def test_health_check(client: TestClient) -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


class TestCalculateAdd:
    def test_addition(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 3, "num2": 2, "operation": "+"})
        assert response.status_code == 200
        assert response.json()["result"] == 5.0

    def test_addition_floats(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 1.5, "num2": 2.5, "operation": "+"})
        assert response.status_code == 200
        assert response.json()["result"] == 4.0

    def test_addition_negative(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": -3, "num2": 2, "operation": "+"})
        assert response.status_code == 200
        assert response.json()["result"] == -1.0


class TestCalculateSubtract:
    def test_subtraction(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 10, "num2": 4, "operation": "-"})
        assert response.status_code == 200
        assert response.json()["result"] == 6.0

    def test_subtraction_negative_result(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 2, "num2": 5, "operation": "-"})
        assert response.status_code == 200
        assert response.json()["result"] == -3.0


class TestCalculateMultiply:
    def test_multiplication(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 4, "num2": 3, "operation": "*"})
        assert response.status_code == 200
        assert response.json()["result"] == 12.0

    def test_multiplication_by_zero(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 99, "num2": 0, "operation": "*"})
        assert response.status_code == 200
        assert response.json()["result"] == 0.0


class TestCalculateDivide:
    def test_division(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 10, "num2": 2, "operation": "/"})
        assert response.status_code == 200
        assert response.json()["result"] == 5.0

    def test_division_by_zero(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 10, "num2": 0, "operation": "/"})
        assert response.status_code == 400
        assert "zero" in response.json()["detail"].lower()

    def test_division_float_result(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 7, "num2": 2, "operation": "/"})
        assert response.status_code == 200
        assert response.json()["result"] == 3.5


class TestCalculateInvalidInput:
    def test_invalid_operation(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 1, "num2": 1, "operation": "%"})
        assert response.status_code == 422

    def test_missing_field(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 1, "operation": "+"})
        assert response.status_code == 422

    def test_response_contains_operands(self, client: TestClient) -> None:
        response = client.post("/calculate", json={"num1": 6, "num2": 3, "operation": "+"})
        data = response.json()
        assert data["num1"] == 6.0
        assert data["num2"] == 3.0
        assert data["operation"] == "+"
