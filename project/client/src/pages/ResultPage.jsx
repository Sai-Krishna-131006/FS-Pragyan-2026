import { useLocation, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Activity,
    Shield,
    Building2,
    TrendingUp,
    FileText,
    ChevronRight,
} from "lucide-react";

const riskConfig = {
    High: {
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-500/10",
        border: "border-red-200 dark:border-red-500/20",
        badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
        label: "High Risk",
    },
    Medium: {
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-500/10",
        border: "border-amber-200 dark:border-amber-500/20",
        badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
        label: "Medium Risk",
    },
    Low: {
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
        border: "border-emerald-200 dark:border-emerald-500/20",
        badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
        label: "Low Risk",
    },
};

function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;

    const risk = riskConfig[result?.risk_level] || riskConfig.Low;

    if (!result) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] bg-medical-pattern flex items-center justify-center px-4 transition-colors duration-300">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        No Result Available
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        Please submit a patient assessment first.
                    </p>
                    <button
                        onClick={() => navigate("/input")}
                        className="mt-4 rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 px-6 py-3 text-white font-semibold transition-colors cursor-pointer"
                    >
                        Go to Assessment
                    </button>
                </div>
            </div>
        );
    }

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

            {/* ── Report ── */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 px-3.5 py-1 mb-4">
                        <Activity className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-wide">
                            Diagnostics Report
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Triage Result
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        AI-generated risk classification
                    </p>
                </div>

                {/* Risk hero card */}
                <div className={`rounded-2xl border ${risk.border} ${risk.bg} p-8 mb-6 text-center transition-colors duration-300`}>
                    <Shield className={`h-12 w-12 mx-auto mb-3 ${risk.color}`} />
                    <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold ${risk.badge}`}>
                        {risk.label}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                        Risk level: <span className={`font-bold ${risk.color}`}>{result.risk_level}</span>
                    </p>
                </div>

                {/* Details card */}
                <div className="rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900/80 shadow-sm overflow-hidden transition-colors duration-300">
                    {/* Department */}
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30">
                                <Building2 className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Department</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">{result.department}</p>
                            </div>
                        </div>
                    </div>

                    {/* Confidence */}
                    <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30">
                                <TrendingUp className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Confidence</p>
                                <p className="text-base font-bold text-slate-900 dark:text-white">{(result.confidence * 100).toFixed(1)}%</p>
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div className="w-32 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div className="h-full rounded-full bg-purple-500 transition-all duration-500" style={{ width: `${(result.confidence * 100).toFixed(0)}%` }} />
                        </div>
                    </div>

                    {/* Explanation */}
                    <div className="px-6 py-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30">
                                <FileText className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                            </div>
                            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Explanation &amp; Next Steps</p>
                        </div>
                        <ul className="space-y-2">
                            {result.explanation.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                    <ChevronRight className="h-4 w-4 mt-0.5 text-purple-400 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => navigate("/input")}
                        className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm text-slate-900 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                        New Assessment
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 py-3 text-sm text-white font-semibold transition-colors cursor-pointer"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
