# conftest.py
import pytest
import subprocess
import time
import os

@pytest.fixture(scope='session', autouse=True)
def daphne_server():
    # Start Daphne server
    daphne_process = subprocess.Popen(
        ['daphne', '-b', '127.0.0.1', '-p', '8001', 'backend.asgi:application'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    time.sleep(2)  # Give the server a moment to start

    yield

    # Terminate the Daphne server
    daphne_process.terminate()
    daphne_process.wait()
