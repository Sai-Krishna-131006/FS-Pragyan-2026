import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;

    if (!result) {
        return (
            <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-white">
                        No Result Available
                    </h2>
                    <p className="text-slate-400">
                        Please submit a patient assessment first.
                    </p>
                    <button
                        onClick={() => navigate("/input")}
                        className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
                    >
                        Go to Assessment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e1a] px-4 py-12 antialiased">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.12),transparent)]" />

            <div className="relative w-full max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-3 mb-8">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Triage Result
                    </h1>
                    <p className="text-slate-500 text-sm">
                        AI-generated risk classification
                    </p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-7 shadow-lg shadow-black/25 space-y-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Risk Level
                        </span>
                        <span className="text-lg font-bold text-white">
                            {result.risk_level}
                        </span>
                    </div>

                    <div className="h-px bg-white/[0.06]" />

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Department
                        </span>
                        <span className="text-lg font-bold text-white">
                            {result.department}
                        </span>
                    </div>

                    <div className="h-px bg-white/[0.06]" />

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Confidence
                        </span>
                        <span className="text-lg font-bold text-white">
                            {(result.confidence * 100).toFixed(1)}%
                        </span>
                    </div>

                    <div className="h-px bg-white/[0.06]" />

                    <div>
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                            Explanation
                        </span>
                        <ul className="space-y-1">
                            {result.explanation.map((item, i) => (
                                <li key={i} className="text-slate-300 text-sm">
                                    - {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={() => navigate("/input")}
                        className="flex-1 rounded-xl border border-white/[0.1] bg-white/[0.04] py-3 text-white font-semibold hover:bg-white/[0.08] transition-colors cursor-pointer"
                    >
                        New Assessment
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex-1 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-500 transition-colors cursor-pointer"
                    >
                        View Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
