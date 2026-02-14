import joblib
import numpy as np
import shap

# -------- Load Saved Objects --------
model = joblib.load("model/triage_model.pkl")
mlb_symptoms = joblib.load("model/symptom_encoder.pkl")
mlb_conditions = joblib.load("model/condition_encoder.pkl")
feature_names = joblib.load("model/feature_names.pkl")

explainer = shap.TreeExplainer(model)


# -------- Department Logic --------
def recommend_department(predicted_risk, symptoms, bp, hr):
    
    emergency_flags = [
        "Severe Bleeding",
        "Trauma",
        "Sudden Collapse",
        "Loss of Consciousness"
    ]
    
    if predicted_risk == "High":
        return "Emergency"
    
    if any(symptom in symptoms for symptom in emergency_flags):
        return "Emergency"
    
    if bp > 180 or hr > 130:
        return "Emergency"
    
    cardio_symptoms = [
        "Chest Pain",
        "Palpitations",
        "Shortness of Breath",
        "Swelling"
    ]
    
    if any(symptom in symptoms for symptom in cardio_symptoms):
        return "Cardiology"
    
    neuro_symptoms = [
        "Seizure",
        "Confusion",
        "Weakness",
        "Blurred Vision"
    ]
    
    if any(symptom in symptoms for symptom in neuro_symptoms):
        return "Neurology"
    
    respiratory_symptoms = [
        "Breathing Difficulty",
        "Wheezing",
        "Cough"
    ]
    
    if any(symptom in symptoms for symptom in respiratory_symptoms):
        return "Pulmonology"
    
    gastro_symptoms = [
        "Abdominal Pain",
        "Nausea",
        "Vomiting",
        "Diarrhea",
        "Blood in Stool"
    ]
    
    if any(symptom in symptoms for symptom in gastro_symptoms):
        return "Gastroenterology"
    
    return "General Medicine"


# -------- Prediction Function --------
def predict_patient_json(patient_data):
    
    age = patient_data["age"]
    gender = patient_data["gender"]
    bp = patient_data["blood_pressure"]
    hr = patient_data["heart_rate"]
    temp = patient_data["temperature"]
    symptoms_input = patient_data["symptoms"]
    conditions_input = patient_data["conditions"]
    
    symptoms_input = [
        s.strip() if s.strip() in mlb_symptoms.classes_
        else "Other_Symptom"
        for s in symptoms_input
    ]
    
    conditions_input = [
        c.strip() if c.strip() in mlb_conditions.classes_
        else "Other_Condition"
        for c in conditions_input
    ]
    
    gender_val = 0 if gender == "Male" else 1
    
    symptoms_encoded_input = mlb_symptoms.transform([symptoms_input])
    conditions_encoded_input = mlb_conditions.transform([conditions_input])
    
    numeric_part = np.array([[age, gender_val, bp, hr, temp]])
    final_input = np.hstack([numeric_part, symptoms_encoded_input, conditions_encoded_input])
    
    prediction = model.predict(final_input)[0]
    probabilities = model.predict_proba(final_input)[0]
    confidence = round(float(np.max(probabilities) * 100), 2)
    
    department = recommend_department(prediction, symptoms_input, bp, hr)
    
    shap_values = explainer.shap_values(final_input)
    class_index = list(model.classes_).index(prediction)
    
    if isinstance(shap_values, list):
        shap_class = shap_values[class_index][0]
    else:
        shap_class = shap_values[0][:, class_index]
    
    feature_importance = sorted(
        list(enumerate(shap_class)),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:5]
    
    explanation = []
    for idx, val in feature_importance:
        explanation.append({
            "feature": feature_names[idx],
            "impact": round(float(val), 4)
        })
    
    return {
        "risk_level": prediction,
        "confidence": confidence,
        "recommended_department": department,
        "explanation": explanation
    }
