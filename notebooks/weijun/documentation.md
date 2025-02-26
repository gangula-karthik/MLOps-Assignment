# Car Price Prediction and Analysis

This Jupyter notebook (`car_price.ipynb`) is designed to analyze and predict car prices using various machine learning techniques and exploratory data analysis (EDA). The notebook is structured to guide the user through data loading, cleaning, visualization, and model building using tools like Pandas, Seaborn, Matplotlib, and PyCaret.

## Table of Contents
1. [Overview](#overview)
2. [Setup and Installation](#setup-and-installation)
3. [Data Loading and Preprocessing](#data-loading-and-preprocessing)
4. [Exploratory Data Analysis (EDA)](#exploratory-data-analysis-eda)
5. [Feature Engineering](#feature-engineering)
6. [Model Building and Evaluation](#model-building-and-evaluation)
7. [Model Explainability](#model-explainability)
8. [Saving the Model](#saving-the-model)
9. [Conclusion](#conclusion)

## Overview

The notebook focuses on predicting car prices using a dataset of used car prices. It includes:
- Data loading and initial inspection.
- Exploratory Data Analysis (EDA) to understand the dataset.
- Feature engineering to prepare the data for modeling.
- Model building using PyCaret for automated machine learning.
- Model evaluation and explainability using SHAP values.
- Saving the trained model for future use.

## Setup and Installation

Before running the notebook, ensure you have the following Python libraries installed:

```bash
pip install pandas numpy seaborn matplotlib mlflow scikit-learn pycaret
```

Additionally, ensure that MLflow is set up for tracking experiments:

```python
import mlflow
mlflow.set_tracking_uri(uri="http://localhost:5000")
mlflow.set_experiment("MLOPS")
```

## Data Loading and Preprocessing

The dataset is loaded from an Excel file located at `../../data/raw/02_Used_Car_Prices.xlsx`. The initial steps include:

- Loading the dataset using Pandas.
- Checking for missing values and duplicates.
- Inspecting the data types of each column.

```python
import pandas as pd

# Load the dataset
file_path = "../../data/raw/02_Used_Car_Prices.xlsx"
df = pd.read_excel(file_path)

# Display the first few rows
df.head()
```

## Exploratory Data Analysis (EDA)

The EDA section focuses on understanding the dataset through visualizations and statistical summaries:

- **Missing Values**: Check for null values in the dataset.
- **Descriptive Statistics**: Generate summary statistics for numerical columns.
- **Data Types**: Inspect the data types of each column.
- **Visualizations**: Create histograms, boxplots, and scatter plots to understand the distribution of car prices and other features.

```python
import seaborn as sns
import matplotlib.pyplot as plt

# Histogram of car prices
plt.figure(figsize=(15, 6))
sns.histplot(df['Price (INR Lakhs)'], bins=30, kde=True)
plt.show()
```

## Feature Engineering

Feature engineering involves creating new features and transforming existing ones to improve model performance:

- **Kilometer Binning**: Categorize the `Kilometers_Driven` feature into bins.
- **Brand Extraction**: Extract the car brand from the `Brand_Model` column.
- **Data Cleaning**: Handle missing values and convert data types as necessary.

```python
# Create a new column 'Kilometer_Bin' for categorized data
bins = [0, 10000, 50000, 250000, float('inf')]
labels = ['1-10k', '10k-50k', '50k-250k', '250k+']
df['Kilometer_Bin'] = pd.cut(df['Kilometers_Driven'], bins=bins, labels=labels, right=False)
```

## Model Building and Evaluation

The notebook uses PyCaret for automated machine learning. The steps include:

- **Setup**: Initialize the PyCaret environment and define the target variable.
- **Model Comparison**: Compare baseline models to select the best-performing one.
- **Model Training**: Train the selected model (e.g., CatBoost) and evaluate its performance.

### Explanation of `setup` Function Parameters

The `setup` function is used to initialize a machine learning pipeline in PyCaret. Below are the parameters used and their descriptions:

- **`transformation_method='quantile'`**: 
  - This specifies the method to be used for transforming numerical features. `quantile` transformation scales the data to a specific percentile range, helping to make the distribution more uniform. It’s used here as an alternative to other methods like Yeo-Johnson, which might have given errors.

- **`target='Price (INR Lakhs)'`**:
  - The target variable in the dataset, which in this case is the 'Price (INR Lakhs)' column, is what the model will be predicting.

- **`session_id=123`**:
  - This is a seed for reproducibility, ensuring that the results from the experiments can be recreated by others with the same session ID.

- **`log_experiment=True`**:
  - Enables logging of the experiment details, which can be useful for tracking the experiments and comparing different setups.

- **`experiment_name='MLOPS'`**:
  - This assigns a name to the experiment for easier identification in experiment logs or results.

- **`remove_outliers=True`**:
  - Outliers in the data are removed to prevent them from skewing the model’s predictions. This step improves model accuracy.

- **`normalize=True`**:
  - Normalization is applied to the numeric features to ensure that all features have the same scale, typically transforming values to a [0, 1] range.

- **`normalize_method='zscore'`**:
  - The Z-score normalization method standardizes the features by removing the mean and scaling to unit variance.

- **`numeric_features=numeric_features_list`**:
  - Specifies which features are numeric. The list `numeric_features_list` contains the names of all numeric columns in the dataset that will be treated as numeric.

- **`categorical_features=['Location', 'Fuel_Type', 'Transmission', 'Brand']`**:
  - These are the categorical features in the dataset that will be encoded into numerical values for the model.

- **`transformation=True`**:
  - This applies the transformation process to the data, typically used to handle skewed distributions and improve model performance.

- **`transform_target=True`**:
  - This applies a transformation to the target variable as well, in this case to 'Price (INR Lakhs)', helping stabilize variance in predictions.

- **`transform_target_method='quantile'`**:
  - The transformation method for the target variable is also set to 'quantile', similar to the transformation of features.

- **`ordinal_features={'Owner_Type': ['First', 'Second', 'Third', 'Fourth & Above']}`**:
  - Specifies the order of categories in the `Owner_Type` feature. The values are ordered, which is important for certain machine learning models that take into account the ordinal relationship.

- **`numeric_imputation='mean'`**:
  - Missing numeric values in the dataset are replaced with the mean of the respective feature.

- **`remove_multicollinearity=True`**:
  - This step removes highly correlated features to reduce multicollinearity, which can affect the stability and interpretability of machine learning models.

- **`multicollinearity_threshold=0.7`**:
  - This sets the threshold for correlation. If the correlation between two features is greater than 0.7, one of the features is removed to reduce multicollinearity.

- **`rare_to_value=0.1`**:
  - Rare categories in categorical features are replaced with a common value if they make up less than 10% of the data, improving the stability of models by handling sparse data.


```python
from pycaret.regression import *s

# Initialize PyCaret setup
exp1 = setup(df,
             transformation_method='quantile', #yeo-johnson gives error
             target='Price (INR Lakhs)',
             session_id=123,
             log_experiment=True,
             experiment_name='MLOPS',
             remove_outliers=True,
             normalize=True,
             normalize_method='zscore',
             numeric_features = numeric_features_list,
             categorical_features=['Location', 'Fuel_Type', 'Transmission', 'Brand'],
             transformation=True,
             transform_target=True,
             transform_target_method='quantile',
             ordinal_features = {'Owner_Type': ['First', 'Second', 'Third', 'Fourth & Above']},
             numeric_imputation='mean',
             remove_multicollinearity=True, # Remove multicollinearity
             multicollinearity_threshold=0.7, # Set threshold for multicollinearity
             rare_to_value = 0.1,
            )
```

Here’s the modified version with `python` added after the triple backticks for syntax highlighting:

### Accessing Transformed Data

The code shows how to access the transformed training data and target variables:

```python
X_train = get_config('X_train')
transformed_target = get_config('y_transformed')
original_target = get_config('y')

print("Original target:")
print(original_target.describe())
print("\nTransformed target:")
print(transformed_target.describe())
```

## Model Training and Selection

### 1. Model Comparison

The `compare_models` function is used to train and compare multiple models using cross-validation:

```python
best = compare_models(fold=10)
```

### 2. Model Creation

The `create_model` function is used to create a specific model, in this case, a CatBoost Regressor:

```python
cb = create_model('catboost')
```

### 3. Hyperparameter Tuning

The `tune_model` function is used to tune the hyperparameters of the CatBoost Regressor using Optuna:

```python
tuned_cb, tuner = tune_model(cb, return_tuner=True, optimize='RMSE', search_library='optuna', choose_better=True)
```

## Model Evaluation

### 1. Evaluate Model

The `evaluate_model` function provides various plots and metrics to analyze the model's performance:

```python
evaluate_model(best)
```

### 2. Plotting Model Performance

The code includes examples of plotting residuals, error, learning curves, and feature importance:

```python
plot_model(best, plot='residuals')
plot_model(best, plot='error')
plot_model(best, plot='learning', plot_kwargs={'train_sizes': np.linspace(0.1, 1.0, 10)})
plot_model(best, plot='feature', plot_kwargs={'top_n': 15})
```

### 3. Model Interpretation

The `interpret_model` function is used to understand the model's decision-making process:

```python
interpret_model(cb)
```

Partial Dependence Plots (PDP) are used to visualize the relationship between a feature and the predicted outcome:

```python
interpret_model(cb, plot='pdp', feature='Power')
```

## Model Deployment

### 1. Logging Model with MLflow

The code demonstrates how to log the model with MLflow, including input examples and signatures:

```python
input_example = X_transformed.iloc[:5]  # Use the first 5 rows of your input data as an example

mlflow.sklearn.log_model(
    cb,
    "model",
    input_example=input_example,
    signature=mlflow.models.infer_signature(X_transformed, cb.predict(X_transformed))
)
```

### 2. Saving the Model Pipeline

The `save_model` function is used to save the entire Pycaret pipeline for later use:

```python
save_model(best, 'best_car_pipeline')
```

### 3. Loading the Model Pipeline

The `load_model` function is used to load the saved pipeline:

```python
loaded_best_pipeline = load_model('best_car_pipeline')
```

## Prediction

### 1. Predict on New Data

The `predict_model` function is used to make predictions on new, unseen data:

```python
predictions = predict_model(best, data=new_data)
```
