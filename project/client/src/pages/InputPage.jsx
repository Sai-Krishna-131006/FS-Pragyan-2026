import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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



/* ─── shared classes ─── */
const LABEL_CLASS =
    "block text-[13px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5";
const INPUT_CLASS =
    "w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-blue-500/20 hover:border-white/[0.12]";

/* ─── section wrapper (defined OUTSIDE to avoid remount on every render) ─── */
function SectionCard({ step, icon, title, subtitle, children }) {
    return (
        <section className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-7 shadow-lg shadow-black/25 transition-all duration-300 hover:border-white/[0.1] hover:shadow-xl hover:shadow-black/30">
            {/* subtle top-left glow */}
            <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {/* heading row */}
            <div className="flex items-start gap-4 mb-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-xl">
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400/60">
                            Step {step}
                        </span>
                    </div>
                    <h3 className="text-[17px] font-bold text-white leading-tight mt-0.5">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>

            {/* divider */}
            <div className="h-px bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent mb-6" />

            {children}
        </section>
    );
}

function PatientInput() {
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

        const notesParts = [];
        if (formData.conditions.length > 0 && !formData.conditions.includes("None")) {
            notesParts.push("Pre-existing conditions: " + formData.conditions.join(", "));
        }
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
                notes: notesParts.length ? notesParts.join(". ") : undefined,
            });
            navigate("/result", { state: { result: response.data } });
        } catch {
            alert("Failed to submit triage data. Please try again.");
        }
    };

    const labelClass = LABEL_CLASS;
    const inputClass = INPUT_CLASS;

    return (
        <div className="min-h-screen bg-[#0a0e1a] px-4 py-12 antialiased overflow-x-hidden">
            {/* radial bg glow */}
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />

            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-3xl mx-auto space-y-6"
            >
                {/* ═══ Header ═══ */}
                <div className="text-center space-y-3 mb-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-4 py-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                        </span>
                        <span className="text-sm font-semibold text-blue-400 tracking-wide">
                            AI‑Powered Triage
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-[2.75rem] font-extrabold text-white tracking-tight leading-none">
                        Patient Assessment
                    </h1>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                        Complete the form below. Our AI model will analyze the data and
                        return a triage risk classification in seconds.
                    </p>
                </div>

                {/* ═══ 1 · Basic Information ═══ */}
                <SectionCard
                    step={1}
                    icon="👤"
                    title="Basic Information"
                    subtitle="Patient demographics"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Age */}
                        <div>
                            <label htmlFor="age" className={labelClass}>
                                Age <span className="text-red-400/80">*</span>
                            </label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                min={0}
                                max={120}
                                required
                                placeholder="e.g. 45"
                                value={formData.age}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className={labelClass}>
                                Gender <span className="text-red-400/80">*</span>
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                                className={`${inputClass} appearance-none cursor-pointer`}
                            >
                                <option value="" disabled>
                                    Select gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </SectionCard>

                {/* ═══ 2 · Symptoms ═══ */}
                <SectionCard
                    step={2}
                    icon="🩺"
                    title="Symptoms"
                    subtitle="Select all that apply"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left — vertical scrollable checkboxes */}
                        <div className="flex flex-col">
                            <span className={labelClass}>Common Symptoms</span>
                            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                                {SYMPTOM_OPTIONS.map((s) => {
                                    const active = formData.symptoms.includes(s);
                                    return (
                                        <label
                                            key={s}
                                            className={`group/chip relative flex items-center gap-2.5 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200 text-[14px] font-medium select-none shrink-0
                                                ${active
                                                    ? "border-blue-500/40 bg-blue-500/[0.12] text-blue-300 shadow-sm shadow-blue-500/10"
                                                    : "border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-slate-300"
                                                }`}
                                        >
                                            <span
                                                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-200
                                                    ${active
                                                        ? "border-blue-500 bg-blue-500 text-white"
                                                        : "border-white/20 bg-white/[0.04]"
                                                    }`}
                                            >
                                                {active && (
                                                    <svg
                                                        className="h-3 w-3"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={active}
                                                onChange={() => handleCheckbox("symptoms", s)}
                                                className="sr-only"
                                            />
                                            {s}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — additional symptoms textarea */}
                        <div className="flex flex-col">
                            <label htmlFor="additionalSymptoms" className={labelClass}>
                                Additional Symptoms
                            </label>
                            <textarea
                                id="additionalSymptoms"
                                name="additionalSymptoms"
                                rows={8}
                                placeholder="Describe any other symptoms the patient is experiencing…"
                                value={formData.additionalSymptoms}
                                onChange={handleChange}
                                className={`${inputClass} resize-none flex-1`}
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* ═══ 3 · Vitals ═══ */}
                <SectionCard
                    step={3}
                    icon="❤️"
                    title="Vitals"
                    subtitle="Current patient vital signs"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* BP */}
                        <div>
                            <label htmlFor="bloodPressure" className={labelClass}>
                                Blood Pressure <span className="text-red-400/80">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="bloodPressure"
                                    name="bloodPressure"
                                    type="text"
                                    required
                                    placeholder="120/80"
                                    value={formData.bloodPressure}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-medium">
                                    mmHg
                                </span>
                            </div>
                        </div>

                        {/* Heart Rate */}
                        <div>
                            <label htmlFor="heartRate" className={labelClass}>
                                Heart Rate <span className="text-red-400/80">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="heartRate"
                                    name="heartRate"
                                    type="number"
                                    required
                                    placeholder="72"
                                    value={formData.heartRate}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-medium">
                                    bpm
                                </span>
                            </div>
                        </div>

                        {/* Temperature */}
                        <div>
                            <label htmlFor="temperature" className={labelClass}>
                                Temperature <span className="text-red-400/80">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="temperature"
                                    name="temperature"
                                    type="number"
                                    required
                                    placeholder="98.6"
                                    step="0.1"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 font-medium">
                                    °F
                                </span>
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ═══ 4 · Pre-Existing Conditions ═══ */}
                <SectionCard
                    step={4}
                    icon="📋"
                    title="Pre‑Existing Conditions"
                    subtitle="Known medical history"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Left — vertical scrollable checkboxes */}
                        <div className="flex flex-col">
                            <span className={labelClass}>Known Conditions</span>
                            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                                {CONDITION_OPTIONS.map((c) => {
                                    const active = formData.conditions.includes(c);
                                    return (
                                        <label
                                            key={c}
                                            className={`group/chip relative flex items-center gap-2.5 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200 text-[14px] font-medium select-none shrink-0
                                                ${active
                                                    ? "border-blue-500/40 bg-blue-500/[0.12] text-blue-300 shadow-sm shadow-blue-500/10"
                                                    : "border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-slate-300"
                                                }`}
                                        >
                                            <span
                                                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-200
                                                    ${active
                                                        ? "border-blue-500 bg-blue-500 text-white"
                                                        : "border-white/20 bg-white/[0.04]"
                                                    }`}
                                            >
                                                {active && (
                                                    <svg
                                                        className="h-3 w-3"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                )}
                                            </span>
                                            <input
                                                type="checkbox"
                                                checked={active}
                                                onChange={() => handleCheckbox("conditions", c)}
                                                className="sr-only"
                                            />
                                            {c}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — other condition input */}
                        <div className="flex flex-col">
                            <label htmlFor="otherCondition" className={labelClass}>
                                Other Conditions
                            </label>
                            <textarea
                                id="otherCondition"
                                name="otherCondition"
                                rows={6}
                                placeholder="Specify any other conditions not listed…"
                                value={formData.otherCondition}
                                onChange={handleChange}
                                className={`${inputClass} resize-none flex-1`}
                            />
                        </div>
                    </div>
                </SectionCard>

                {/* ═══ Submit ═══ */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 py-4 text-white font-bold text-lg shadow-xl shadow-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98] cursor-pointer"
                    >
                        {/* shimmer sweep */}
                        <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative flex items-center justify-center gap-2.5">
                            <svg
                                className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Classify Risk
                        </span>
                    </button>

                    <p className="text-center text-xs text-slate-600 mt-3">
                        Results are AI‑generated and should be verified by a medical
                        professional.
                    </p>
                </div>
            </form>
        </div>
    );
}

export default PatientInput;
