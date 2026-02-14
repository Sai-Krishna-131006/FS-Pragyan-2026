import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden antialiased">
            {/* ─── Background decorations ─── */}
            {/* Radial glow */}
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.10),transparent)]" />

            {/* Large medical plus symbol — top right */}
            <div className="pointer-events-none absolute -top-20 -right-20 opacity-[0.03]">
                <svg width="500" height="500" viewBox="0 0 100 100" fill="currentColor" className="text-blue-400">
                    <rect x="35" y="10" width="30" height="80" rx="4" />
                    <rect x="10" y="35" width="80" height="30" rx="4" />
                </svg>
            </div>

            {/* Smaller medical plus — bottom left */}
            <div className="pointer-events-none absolute -bottom-10 -left-10 opacity-[0.025]">
                <svg width="320" height="320" viewBox="0 0 100 100" fill="currentColor" className="text-blue-300">
                    <rect x="35" y="10" width="30" height="80" rx="4" />
                    <rect x="10" y="35" width="80" height="30" rx="4" />
                </svg>
            </div>

            {/* Dot grid pattern */}
            <div
                className="pointer-events-none fixed inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.8) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* ─── Main content ─── */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
                <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">

                    {/* ═══ LEFT HALF — Organisation Card ═══ */}
                    <div className="space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-4 py-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            <span className="text-sm font-semibold text-blue-400 tracking-wide">
                                Hackathon 2026
                            </span>
                        </div>

                        {/* Title */}
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
                                    Smart Patient
                                </span>
                                <br />
                                Triage System
                            </h1>
                        </div>

                        {/* Description card */}
                        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6 shadow-lg shadow-black/25 backdrop-blur">
                            <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                            <p className="text-slate-300 text-[15px] leading-relaxed mb-4">
                                Our AI-driven triage platform integrates structured patient inputs with machine learning models to deliver explainable risk classification and department recommendations. Designed for scalability and real-world deployment, the system enhances emergency workflow optimization, reduces overcrowding, and supports data-driven clinical prioritization.
                            </p>

                            <div className="h-px bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent mb-4" />

                            {/* Feature pills */}
                            <div className="flex flex-wrap gap-2">
                                {["AI Risk Classification", "Real‑Time Analysis", "Risk Scoring", "Smart Department Recommendation", "Reduced Patient Wait Time", "Scalable Architecture", "Instant Results"].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-400"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Org info */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">FS Pragyan 2026</p>
                                <p className="text-xs text-slate-500">Healthcare Innovation Track</p>
                            </div>
                        </div>
                    </div>

                    {/* ═══ RIGHT HALF — Navigation Cards ═══ */}
                    <div className="flex flex-col gap-5">
                        {/* Card: Start Triage */}
                        <button
                            onClick={() => navigate("/input")}
                            className="group relative w-full cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-8 text-left shadow-lg shadow-black/25 transition-all duration-300 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 hover:bg-white/[0.05]"
                        >
                            {/* top glow */}
                            <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex items-start gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20 transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-indigo-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                                    <svg className="h-7 w-7 text-blue-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">Start Triage</h3>
                                        <svg className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                                        Enter patient symptoms, vitals, and medical history for an instant
                                        AI‑driven risk classification.
                                    </p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <span>Begin assessment</span>
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* Card: Dashboard */}
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="group relative w-full cursor-pointer rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-8 text-left shadow-lg shadow-black/25 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 hover:bg-white/[0.05]"
                        >
                            {/* top glow */}
                            <div className="pointer-events-none absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="flex items-start gap-5">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 transition-all duration-300 group-hover:from-emerald-500/30 group-hover:to-teal-500/20 group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                                    <svg className="h-7 w-7 text-emerald-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-white">View Dashboard</h3>
                                        <svg className="h-5 w-5 text-slate-600 transition-all duration-300 group-hover:text-emerald-400 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
                                        Monitor triage outcomes, view analytics, and track patient
                                        classification history at a glance.
                                    </p>
                                    <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                        <span>Open dashboard</span>
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Footer ─── */}

        </div>
    );
}

export default LandingPage;
