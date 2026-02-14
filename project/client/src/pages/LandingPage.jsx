import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { Sun, Moon, Mail, Phone, ArrowRight, Activity, Eye, EyeOff } from "lucide-react";

function LandingPage() {
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const [loginMode, setLoginMode] = useState("email"); // "email" | "mobile"
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Regex checks for two-step reveal
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMobileValid = /^\+?\d[\d\s-]{8,}$/.test(mobile);
    const identifierReady = loginMode === "email" ? isEmailValid : isMobileValid;

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] bg-medical-pattern relative overflow-hidden antialiased transition-colors duration-300">
            {/* Theme toggle */}
            <div className="absolute top-5 right-5 z-20">
                <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md cursor-pointer"
                >
                    {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>

            {/* Main */}
            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 py-12">
                <div className="w-full max-w-5xl rounded-2xl border border-purple-200 dark:border-purple-500/20 bg-white dark:bg-slate-900/80 shadow-lg shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-colors duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
                        {/* ── Left 50%: Branding ── */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 border-b lg:border-b-0 lg:border-r border-purple-100 dark:border-purple-500/15 p-10 sm:p-14 flex flex-col justify-center transition-colors duration-300">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-500/30 bg-purple-50 dark:bg-purple-500/10 px-3.5 py-1 w-fit mb-8">
                                <Activity className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
                                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-wide">
                                    Hackathon 2026
                                </span>
                            </div>

                            {/* Title — no icons above */}
                            <h1
                                style={{ fontFamily: "Arial, sans-serif" }}
                                className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4"
                            >
                                Smart Patient
                                <br />
                                Triage System
                            </h1>

                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                                AI-driven triage platform delivering explainable risk
                                classification and department recommendations in real time.
                            </p>

                            <div className="h-px bg-purple-100 dark:bg-purple-500/15 mb-5" />

                            <div className="flex flex-wrap gap-2">
                                {["AI Classification", "Real-Time", "Risk Scoring", "Instant Results"].map((t) => (
                                    <span key={t} className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* ── Right 50%: Login Card ── */}
                        <div className="p-10 sm:p-14 flex flex-col justify-center">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                Welcome back
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-7">
                                Sign in to continue to your dashboard
                            </p>

                            {/* Login mode toggle */}
                            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
                                <button
                                    type="button"
                                    onClick={() => setLoginMode("email")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${loginMode === "email"
                                        ? "bg-purple-600 text-white"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    <Mail className="h-4 w-4" />
                                    Email
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoginMode("mobile")}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${loginMode === "mobile"
                                        ? "bg-purple-600 text-white"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    <Phone className="h-4 w-4" />
                                    Mobile
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-4">
                                {loginMode === "email" ? (
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@hospital.org"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91 98765 43210"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                                        />
                                    </div>
                                )}

                                {/* Phase 2: Password — revealed once identifier is valid */}
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${identifierReady
                                            ? "max-h-40 opacity-100"
                                            : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required={identifierReady}
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-black px-4 py-3 pr-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-purple-500" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-slate-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-800 dark:bg-slate-700 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer mt-2"
                                >
                                    Sign In
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </form>

                            <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-5">
                                FS Pragyan 2026 &middot; Healthcare Innovation Track
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
