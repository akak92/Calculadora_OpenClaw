"""
Conftest for backend tests.
Provides a reusable TestClient for the FastAPI app.
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)
