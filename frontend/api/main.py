from fastapi import FastAPI

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/docs", openapi_url="/openapi.json")

@app.get("/api")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}