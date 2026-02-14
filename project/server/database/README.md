# MongoDB Database Setup Guide

## Database Structure

**Database Name:** `smart_triage`

**Collections:**
- `patients` - Patient demographic and medical information
- `predictions` - Triage predictions and AI assessments
- `users` - Healthcare workers and system users

---

## Setup Instructions

### 1. Prerequisites

Ensure you have:
- MongoDB Atlas account (or local MongoDB instance)
- Connection string in `.env` file
- Python dependencies installed

### 2. Environment Configuration

Update your `.env` file with the MongoDB connection URI:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.ckpbika.mongodb.net/?appName=Cluster0
```

Replace `<username>` and `<password>` with your actual credentials.

### 3. Initialize Database

Run the initialization script to create indexes:

```bash
# Activate virtual environment
cd c:\pragyan\project\server
venv\Scripts\activate

# Create indexes only
python -m database.init_db

# Create indexes AND sample data
python -m database.init_db --sample
```

This will:
- ✅ Create all necessary indexes for optimal query performance
- ✅ Optionally insert sample data for testing

### 4. Verify Setup

Check that the collections were created:

```bash
# Using MongoDB Shell
mongosh "your_connection_string"
use smart_triage
show collections
db.patients.getIndexes()
```

Or use MongoDB Compass/Atlas UI to browse collections.

---

## MongoDB Cloud Setup (Atlas)

If you prefer to set up manually in MongoDB Atlas:

1. **Log in to MongoDB Atlas**: https://cloud.mongodb.com

2. **Navigate to your Cluster** (Cluster0)

3. **Click "Browse Collections"**

4. **Create Database**:
   - Database name: `smart_triage`
   - Collection name: `patients`

5. **Create Additional Collections**:
   - `predictions`
   - `users`

6. **Create Indexes** (use MongoDB Shell in Atlas):

```javascript
use smart_triage

// PATIENTS INDEXES
db.patients.createIndex({ "created_at": -1 })
db.patients.createIndex({ "age": 1 })
db.patients.createIndex({ "gender": 1 })

// PREDICTIONS INDEXES
db.predictions.createIndex({ "patient_id": 1 })
db.predictions.createIndex({ "created_at": -1 })
db.predictions.createIndex({ "risk_level": 1 })
db.predictions.createIndex({ "recommended_department": 1 })
db.predictions.createIndex({ "confidence_score": -1 })
db.predictions.createIndex({ "patient_id": 1, "created_at": -1 })

// USERS INDEXES
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
db.users.createIndex({ "is_active": 1 })
```

---

## Collection Schemas

### Patients Collection

```json
{
  "_id": ObjectId,
  "age": int (0-150),
  "gender": string ("male", "female", "other"),
  "blood_pressure": string ("systolic/diastolic"),
  "heart_rate": int (30-250),
  "temperature": float (30.0-45.0),
  "symptoms": array of strings,
  "conditions": array of strings,
  "notes": string or null,
  "created_at": datetime,
  "updated_at": datetime
}
```

### Predictions Collection

```json
{
  "_id": ObjectId,
  "patient_id": ObjectId (reference to patients),
  "risk_level": string ("Low", "Medium", "High", "Critical"),
  "recommended_department": string,
  "confidence_score": float (0.0-100.0),
  "explanation": [
    {
      "feature": string,
      "impact": float
    }
  ],
  "model_version": string,
  "input_data": object,
  "created_at": datetime,
  "reviewed_by": ObjectId or null,
  "review_notes": string or null
}
```

### Users Collection

```json
{
  "_id": ObjectId,
  "email": string (unique),
  "full_name": string,
  "role": string ("admin", "doctor", "nurse", "triage_staff"),
  "department": string or null,
  "is_active": boolean,
  "created_at": datetime,
  "last_login": datetime or null
}
```

---

## API Endpoints

Once the database is set up, the following endpoints are available:

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/{patient_id}` - Get specific patient

### Predictions
- `GET /api/predictions` - Get all predictions
- `GET /api/predictions/{prediction_id}` - Get specific prediction
- `GET /api/predictions/patient/{patient_id}` - Get patient's predictions
- `GET /api/predictions/risk/{risk_level}` - Filter by risk level

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{user_id}` - Get specific user
- `GET /api/users/email/{email}` - Get user by email

---

## Troubleshooting

### Connection Issues

If you see connection errors:
1. Check your `.env` file has the correct `MONGO_URI`
2. Verify your IP is whitelisted in MongoDB Atlas (Network Access)
3. Ensure your database user has read/write permissions

### Import Errors

If you see module import errors:
```bash
pip install motor pymongo pydantic python-dotenv
```

### Index Creation Fails

If indexes fail to create:
- Ensure you have write access to the database
- Check if collections already exist with conflicting indexes
- Try dropping existing indexes first

---

## Development Notes

- **Automatic Data Storage**: Every triage prediction automatically stores patient and prediction data
- **Timestamps**: All records include creation timestamps
- **Model Versioning**: Predictions track which AI model version was used
- **Explainability**: Each prediction includes feature importance data

The database layer is fully integrated with the triage service and will automatically persist data on each prediction request.
