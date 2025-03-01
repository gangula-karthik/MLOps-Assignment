# IT3385 - MLOps Assignment

This assignment was completed by Gangula Karthik, Choy Wei Jun and Gabriel Loh. It covers 3 end-to-end machine learning tasks with practical MLOps concepts used alongside the modelling process. To try out the website visit: https://ml-ops-assignment.vercel.app/

![Screenshot](/assets/Screenshot%202025-02-28%20at%203.11.22 PM.png)

## Important Links

- MLFlow remote tracking server: https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow/
- DVC Tracking (configured on CLI to host in s3 bucket): https://dagshub.com/gangula-karthik/MLOps-Assignment?filter=dvc 
- Frontend: https://ml-ops-assignment.vercel.app/
- Backend Documentation: https://mlops-assignment-734580083911.us-central1.run.app/docs


## Technologies and Libraries Used

The folder structure was setup using cookiecutter

```
cookiecutter https://github.com/mihail911/e2eml-cookiecutter
```

```
📦 Project Root  
├── 📂 assets/         # Stores static files like images, PDFs, and other resources  
├── 📂 backend/        # Contains all backend-related code, including APIs, models, and logic  
│   ├── backend_car_price.py  
│   ├── housepricingmodel_karthik_api.py  
│   ├── wheatseeds_gabriel_api.py  
│   ├── main.py        # Entry point for backend services  
│   ├── best_cb_model.pkl  # Serialized ML model for car price prediction  
│   ├── wheat_classifier_pipeline.pkl  # Serialized ML model for wheat classification  
│   ├── logs.log       # Log file for backend operations  
│   ├── requirements.txt  # Backend dependencies  
│   ├── __init__.py  
│   ├── *.pyc          # Compiled Python files  
│   └── ...  
│  
├── 📂 conf/           # Configuration files for the project (e.g., environment settings)  
│   ├── config.yaml    # Example: Configuration for ML models, paths, or API keys  
│   ├── logging.conf   # Example: Logging configuration  
│   └── ...  
│  
├── 📂 frontend/       # Stores frontend code (if applicable, e.g., React, HTML, CSS)  
│   ├── src/          # Source code for frontend  
|   |   ├── app/      # all the routes and frontend code
|   |   ├── components/      # all the components for the individual sections
│   ├── public/       # Static assets for frontend  
│   ├── package.json  # Frontend dependencies (if using Node.js)  
│  
├── 📂 notebooks/      # Jupyter notebooks for data exploration, visualization, and analysis  
│  
├── .gitignore        # Specifies files and folders to ignore in version control  
├── Dockerfile        # Defines how to containerize the project  
├── LICENSE           # License file for the project  
├── mlflow.db         # SQLite database for MLflow experiment tracking  
├── mlruns.db         # Stores metadata for MLflow runs  
├── poetry.lock       # Poetry lockfile for dependency management  
├── pyproject.toml    # Poetry project file defining dependencies and project settings  
└── README.md         # Main project documentation  
```

**Backend**
- Python
- Pycaret: An automated machine learning library used to streamline the model development process for all three machine learning tasks.
- FastAPI: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- Pydantic: A data validation and settings management library using Python type annotations, facilitating data parsing and validation for easier error handling and enforcement of type constraints.
- MLflow: Utilized for tracking experiments, including parameter logging, metrics, and model versioning, to enhance model management and reproducibility.
- DVC: Data Version Control was used to track and manage datasets and their versions, ensuring consistency across all stages of the project.
- HYDRA: Employed for managing and configuring the application's environment, making it easier to switch between different setups without changing the codebase.
- POETRY: Used for dependency management and packaging of project, ensuring that all necessary libraries are installed and maintained correctly.

**Frontend**
- Next.js: A React framework for building user interfaces, optimized for a smoother developer experience and high-performance applications.
- HeroUI, ShadCN, and tailwindcss

## Individual Contributions

Karthik: 
- worked on housing price prediction
- setup shared environment using poetry
- setup dvc + aws s3 on the data folder
- setup remote mlflow tracking server on dagshub
- integrated different backends together using fastapi router
- deployed frontend (on vercel) and backend (google cloud run)

Wei Jun: 
- worked on car sales prediction

Gabriel Loh: 
- worked on wheat type prediction
