import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
    ArrowLeft,
    Activity,
    Zap,
    Thermometer,
    Heart,
    Stethoscope,
    FileText,
    AlertCircle,
} from "lucide-react";

const SYMPTOM_OPTIONS = [
    "Chest Pain",
    "Fever",
    "Headache",
    "Breathing Difficulty",
    "Vomiting",
    "Dizziness",
    "Fatigue",
    "Abdominal Pain",
    "Blurred Vision",
    "Seizure",
];

const CONDITION_OPTIONS = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Kidney Disease",
    "None",
];

/* ─── Shared label + input classes ─── */
const LABEL =
    "block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5";
const INPUT =
    "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20";

function InputPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        symptoms: [],
        additionalSymptoms: "",
        bloodPressure: "",
        heartRate: "",
        temperature: "",
        conditions: [],
        otherCondition: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (key, value) => {
        setFormData((prev) => {
            const list = prev[key];
            return {
                ...prev,
                [key]: list.includes(value)
                    ? list.filter((v) => v !== value)
                    : [...list, value],
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allSymptoms = [...formData.symptoms];
        if (formData.additionalSymptoms.trim()) {
            allSymptoms.push(formData.additionalSymptoms.trim());
        }

        const allConditions = formData.conditions.filter((c) => c !== "None");
        if (formData.otherCondition.trim()) {
            allConditions.push(formData.otherCondition.trim());
        }

        const notesParts = [];
        if (formData.otherCondition.trim()) {
            notesParts.push("Other: " + formData.otherCondition.trim());
        }

        try {
            const response = await api.post("/triage", {
                age: Number(formData.age),
                gender: formData.gender,
                symptoms: allSymptoms,
                blood_pressure: formData.bloodPressure,
                heart_rate: Number(formData.heartRate),
                temperature: Number(formData.temperature),
                conditions: allConditions,
                notes: notesParts.length ? notesParts.join(". ") : undefined,
            });
            navigate("/result", { state: { result: response.data } });
        } catch {
            alert("Failed to submit triage data. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] bg-medical-pattern antialiased transition-colors duration-300">
            {/* ── Top bar ── */}
            <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Dashboard
                    </button>
                </div>
            </header>

            {/* ── Form ── */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 px-3.5 py-1 mb-4">
                        <Activity className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-wide">
                            AI-Powered Triage
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                        Patient Assessment
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                        Complete the form below. Our AI will analyze the data and return a risk classification in seconds.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section 1: Basic Info */}
                    <Section icon={<Stethoscope className="h-4.5 w-4.5 text-purple-500 dark:text-purple-400" />} step={1} title="Basic Information" subtitle="Patient demographics">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="age" className={LABEL}>Age <span className="text-red-500">*</span></label>
                                <input id="age" name="age" type="number" min={0} max={120} required placeholder="e.g. 45" value={formData.age} onChange={handleChange} className={INPUT} />
                            </div>
                            <div>
                                <label htmlFor="gender" className={LABEL}>Gender <span className="text-red-500">*</span></label>
                                <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className={`${INPUT} appearance-none cursor-pointer`}>
                                    <option value="" disabled>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </Section>

                    {/* Section 2: Symptoms */}
                    <Section icon={<AlertCircle className="h-4.5 w-4.5 text-purple-500 dark:text-purple-400" />} step={2} title="Symptoms" subtitle="Select all that apply">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <span className={LABEL}>Common Symptoms</span>
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
                                    {SYMPTOM_OPTIONS.map((s) => {
                                        const active = formData.symptoms.includes(s);
                                        return (
                                            <label key={s} className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 cursor-pointer transition-all duration-200 text-sm font-medium select-none ${active ? "border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}>
                                                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${active ? "border-purple-500 bg-purple-500 text-white" : "border-slate-300 dark:border-slate-600"}`}>
                                                    {active && (
                                                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    )}
                                                </span>
                                                <input type="checkbox" checked={active} onChange={() => handleCheckbox("symptoms", s)} className="sr-only" />
                                                {s}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="additionalSymptoms" className={LABEL}>Additional Symptoms</label>
                                <textarea id="additionalSymptoms" name="additionalSymptoms" rows={8} placeholder="Describe any other symptoms..." value={formData.additionalSymptoms} onChange={handleChange} className={`${INPUT} resize-none flex-1`} />
                            </div>
                        </div>
                    </Section>

                    {/* Section 3: Vitals */}
                    <Section icon={<Heart className="h-4.5 w-4.5 text-purple-500 dark:text-purple-400" />} step={3} title="Vitals" subtitle="Current patient vital signs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="bloodPressure" className={LABEL}>Blood Pressure <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input id="bloodPressure" name="bloodPressure" type="text" required placeholder="120/80" value={formData.bloodPressure} onChange={handleChange} className={INPUT} />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">mmHg</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="heartRate" className={LABEL}>Heart Rate <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input id="heartRate" name="heartRate" type="number" required placeholder="72" value={formData.heartRate} onChange={handleChange} className={INPUT} />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">bpm</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="temperature" className={LABEL}>Temperature <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input id="temperature" name="temperature" type="number" required placeholder="98.6" step="0.1" value={formData.temperature} onChange={handleChange} className={INPUT} />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">°F</span>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Section 4: Pre-Existing Conditions */}
                    <Section icon={<FileText className="h-4.5 w-4.5 text-purple-500 dark:text-purple-400" />} step={4} title="Pre-Existing Conditions" subtitle="Known medical history">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <span className={LABEL}>Known Conditions</span>
                                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
                                    {CONDITION_OPTIONS.map((c) => {
                                        const active = formData.conditions.includes(c);
                                        return (
                                            <label key={c} className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 cursor-pointer transition-all duration-200 text-sm font-medium select-none ${active ? "border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}>
                                                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${active ? "border-purple-500 bg-purple-500 text-white" : "border-slate-300 dark:border-slate-600"}`}>
                                                    {active && (
                                                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                    )}
                                                </span>
                                                <input type="checkbox" checked={active} onChange={() => handleCheckbox("conditions", c)} className="sr-only" />
                                                {c}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="otherCondition" className={LABEL}>Other Conditions</label>
                                <textarea id="otherCondition" name="otherCondition" rows={6} placeholder="Specify any other conditions..." value={formData.otherCondition} onChange={handleChange} className={`${INPUT} resize-none flex-1`} />
                            </div>
                        </div>
                    </Section>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 py-4 text-white font-bold text-base shadow-sm transition-colors duration-200 cursor-pointer"
                    >
                        <Zap className="h-5 w-5" />
                        Calculate Risk
                    </button>

                    <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                        Results are AI-generated and should be verified by a medical professional.
                    </p>
                </form>
            </div>
        </div>
    );
}

/* ─── Reusable section card ─── */
function Section({ icon, step, title, subtitle, children }) {
    return (
        <section className="rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900/80 p-6 shadow-sm transition-colors duration-300">
            <div className="flex items-start gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30">
                    {icon}
                </div>
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-purple-500/60 dark:text-purple-400/60">
                        Step {step}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{title}</h3>
                    {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            <div className="h-px bg-slate-100 dark:bg-slate-800 mb-5" />
            {children}
        </section>
    );
}

export default InputPage;
