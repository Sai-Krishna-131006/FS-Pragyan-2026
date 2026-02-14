import { useNavigate } from "react-router-dom";
import {
    Plus,
    AlertTriangle,
    CheckCircle,
    Clock,
    Activity,
    ArrowLeft,
} from "lucide-react";

/* ── Mock data ── */
const PROFILE = {
    name: "Dr. Priya Sharma",
    age: 34,
    gender: "Female",
    role: "Emergency Physician",
    initials: "PS",
};

const PAST_HISTORY = [
    { date: "2026-02-12", diagnosis: "Acute Myocardial Infarction", symptoms: "Chest Pain, Shortness of Breath", risk: "High", status: "Admitted" },
    { date: "2026-02-10", diagnosis: "Viral Fever", symptoms: "Fever, Headache", risk: "Low", status: "Discharged" },
    { date: "2026-02-07", diagnosis: "Gastroenteritis", symptoms: "Abdominal Pain, Vomiting", risk: "Medium", status: "Under Observation" },
    { date: "2026-01-30", diagnosis: "Iron Deficiency Anemia", symptoms: "Dizziness, Fatigue", risk: "Low", status: "Discharged" },
    { date: "2026-01-22", diagnosis: "Epileptic Seizure", symptoms: "Seizure, Blurred Vision", risk: "High", status: "Admitted" },
    { date: "2026-01-15", diagnosis: "Acute Bronchitis", symptoms: "Fever, Cough", risk: "Medium", status: "Under Observation" },
];

const riskColor = (level) => {
    switch (level) {
        case "High":
            return "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400";
        case "Medium":
            return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400";
        case "Low":
            return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400";
        default:
            return "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300";
    }
};



function DashboardPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] bg-medical-pattern antialiased transition-colors duration-300">
            {/* ── Top bar ── */}
            <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-purple-500" />
                        <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                            Smart Triage Dashboard
                        </span>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Logout
                    </button>
                </div>
            </header>

            {/* ── Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    {/* ── Left 30%: Profile Column ── */}
                    <div className="space-y-5">
                        {/* Profile card */}
                        <div className="rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900/80 p-6 shadow-sm transition-colors duration-300">
                            <div className="flex flex-col items-center text-center">
                                {/* Avatar */}
                                <div className="h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-500/15 border-2 border-purple-200 dark:border-purple-500/30 flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {PROFILE.initials}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {PROFILE.name}
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {PROFILE.role}
                                </p>
                                <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-4" />
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Age</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{PROFILE.age}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Gender</span>
                                        <span className="font-medium text-slate-900 dark:text-white">{PROFILE.gender}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add Triage CTA */}
                        <button
                            onClick={() => navigate("/input")}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            Add Triage for New Checkup
                        </button>

                        {/* Quick stats */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-sm transition-colors duration-300">
                            <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                                Summary
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Total Assessments", value: PAST_HISTORY.length, color: "text-purple-600 dark:text-purple-400" },
                                    { label: "High Risk Cases", value: PAST_HISTORY.filter((h) => h.risk === "High").length, color: "text-red-600 dark:text-red-400" },
                                    { label: "Active Cases", value: PAST_HISTORY.filter((h) => h.status !== "Discharged").length, color: "text-amber-600 dark:text-amber-400" },
                                ].map((s) => (
                                    <div key={s.label} className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">{s.label}</span>
                                        <span className={`font-bold ${s.color}`}>{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right 70%: Medical Logs ── */}
                    <div className="space-y-4">
                        {/* Section header */}
                        <div>
                            <h2 className="text-base font-bold text-slate-900 dark:text-white">
                                Patient Past History
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Recent triage assessments and outcomes
                            </p>
                        </div>

                        {/* Card grid */}
                        <div className="grid grid-cols-1 gap-4">
                            {PAST_HISTORY.map((row, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-purple-200 dark:border-purple-900/30 bg-white dark:bg-[#111827] shadow-sm hover:border-purple-400 dark:hover:border-purple-700 transition-colors duration-200 p-5"
                                >
                                    {/* 4-corner layout */}
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Top-Left: Diagnosis */}
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                                            {row.diagnosis}
                                        </h3>
                                        {/* Top-Right: Risk Level pill */}
                                        <span className={`inline-flex items-center shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${riskColor(row.risk)}`}>
                                            {row.risk}
                                        </span>
                                    </div>

                                    <div className="flex items-end justify-between gap-4 mt-3">
                                        {/* Bottom-Left: Symptoms */}
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {row.symptoms}
                                        </p>
                                        {/* Bottom-Right: Date */}
                                        <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0">
                                            {row.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
