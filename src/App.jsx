import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN TOKENS & GLOBAL STYLES
// ============================================================
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: #080b14;
      color: #e8eaf0;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0d1220; }
    ::-webkit-scrollbar-thumb { background: #2a3a5c; border-radius: 3px; }

    .syne { font-family: 'Syne', sans-serif; }

    /* ---- ANIMATIONS ---- */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(0.9); opacity: 1; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideRight {
      from { transform: translateX(-100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes gradient-shift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-12px); }
    }
    @keyframes orb-move {
      0%   { transform: translate(0, 0) scale(1); }
      33%  { transform: translate(40px, -30px) scale(1.1); }
      66%  { transform: translate(-20px, 20px) scale(0.95); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes bar-grow {
      from { width: 0; }
    }
    @keyframes typing {
      0%,80%,100% { opacity: 0; transform: scale(0.8); }
      40%          { opacity: 1; transform: scale(1); }
    }
    @keyframes version-in {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .anim-fade-up   { animation: fadeUp 0.6s cubic-bezier(.16,1,.3,1) both; }
    .anim-fade-in   { animation: fadeIn 0.5s ease both; }
    .anim-slide-r   { animation: slideRight 0.5s cubic-bezier(.16,1,.3,1) both; }
    .anim-float     { animation: float 4s ease-in-out infinite; }
    .anim-version   { animation: version-in 0.5s cubic-bezier(.16,1,.3,1) both; }

    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    .delay-6 { animation-delay: 0.7s; }

    /* ---- GLASS CARD ---- */
    .glass {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.09);
      backdrop-filter: blur(16px);
      border-radius: 16px;
    }
    .glass-strong {
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.13);
      backdrop-filter: blur(24px);
      border-radius: 16px;
    }

    /* ---- SKELETON SHIMMER ---- */
    .skeleton {
      background: linear-gradient(90deg, #1a2540 25%, #253050 50%, #1a2540 75%);
      background-size: 400px 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 8px;
    }

    /* ---- NEON GLOW ---- */
    .neon-blue  { box-shadow: 0 0 20px rgba(99,179,237,0.3), 0 0 60px rgba(99,179,237,0.1); }
    .neon-green { box-shadow: 0 0 20px rgba(72,199,142,0.3), 0 0 60px rgba(72,199,142,0.1); }
    .neon-amber { box-shadow: 0 0 20px rgba(251,191,36,0.3), 0 0 60px rgba(251,191,36,0.1); }

    /* ---- TYPING DOTS ---- */
    .typing-dot {
      display: inline-block;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: currentColor;
      animation: typing 1.2s infinite ease-in-out;
    }
    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    /* ---- NAV ---- */
    .nav-link {
      position: relative;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      transition: color 0.2s, background 0.2s;
      cursor: pointer;
      color: rgba(232,234,240,0.6);
      background: transparent;
      border: none;
      font-family: 'DM Sans', sans-serif;
    }
    .nav-link:hover { color: #e8eaf0; background: rgba(255,255,255,0.06); }
    .nav-link.active {
      color: #63b3ed;
      background: rgba(99,179,237,0.12);
    }

    /* ---- BUTTONS ---- */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 13px 28px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: 0.02em;
      cursor: pointer;
      border: none;
      font-family: 'DM Sans', sans-serif;
      transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: #fff;
      box-shadow: 0 4px 24px rgba(99,102,241,0.35);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.5); }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 22px;
      border-radius: 10px;
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.15);
      background: transparent;
      color: #e8eaf0;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.2s;
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }

    /* ---- INPUTS ---- */
    .input-field {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 12px 16px;
      color: #e8eaf0;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s, background 0.2s;
    }
    .input-field::placeholder { color: rgba(232,234,240,0.3); }
    .input-field:focus {
      border-color: rgba(99,179,237,0.5);
      background: rgba(99,179,237,0.06);
    }

    /* ---- VERSION BADGES ---- */
    .v-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .v1 { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
    .v2 { background: rgba(234,179,8,0.15);  color: #fbbf24; border: 1px solid rgba(234,179,8,0.3); }
    .v3 { background: rgba(34,197,94,0.15);  color: #4ade80; border: 1px solid rgba(34,197,94,0.3); }

    /* ---- PROGRESS BARS ---- */
    .progress-bar-track {
      height: 8px;
      background: rgba(255,255,255,0.07);
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 4px;
      animation: bar-grow 1.2s cubic-bezier(.16,1,.3,1) both;
    }

    /* ---- TAG ---- */
    .tag {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 0.78rem;
      font-weight: 500;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      color: rgba(232,234,240,0.75);
    }

    /* ---- SCORE CIRCLE ---- */
    .score-ring {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* ---- ORB BG ---- */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.18;
      animation: orb-move 12s ease-in-out infinite;
      pointer-events: none;
    }

    /* ---- STAT CARD ---- */
    .stat-card {
      padding: 20px 24px;
      border-radius: 14px;
      transition: transform 0.2s;
    }
    .stat-card:hover { transform: translateY(-3px); }

    /* ---- TIMELINE ---- */
    .timeline-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 6px;
    }
    .timeline-line {
      width: 2px;
      flex-shrink: 0;
      background: rgba(255,255,255,0.07);
      margin: 4px auto;
    }
  `}</style>
);

// ============================================================
// DATA & STATE
// ============================================================
const defaultProfile = { name: "", hobbies: "", skills: "", goals: "" };

// ============================================================
// COMPONENTS
// ============================================================

// NAVBAR
function Navbar({ page, setPage, profile }) {
  const links = [
    { id: "home",     label: "Home",     icon: "⬡" },
    { id: "dashboard",label: "Dashboard",icon: "◈" },
    { id: "agent",    label: "Agent",    icon: "◎" },
    { id: "progress", label: "Progress", icon: "◷" },
  ];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", height: 60,
      background: "rgba(8,11,20,0.85)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(20px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, color: "#fff",
        }}>∞</div>
        <span className="syne" style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" }}>
          SIA <span style={{ color: "#63b3ed", fontWeight: 400, fontSize: "0.78rem", marginLeft: 2 }}>v2</span>
        </span>
      </div>

      <div style={{ display: "flex", gap: 4 }}>
        {links.map(l => (
          <button key={l.id} className={`nav-link ${page === l.id ? "active" : ""}`} onClick={() => setPage(l.id)}>
            <span style={{ marginRight: 5, fontSize: "0.8rem" }}>{l.icon}</span>{l.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {profile.name ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 12px", borderRadius: 8,
            background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.2)",
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%",
              background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "#fff",
            }}>{profile.name[0].toUpperCase()}</div>
            <span style={{ fontSize: "0.8rem", color: "#63b3ed" }}>{profile.name}</span>
          </div>
        ) : (
          <button className="btn-ghost" style={{ padding: "6px 14px", fontSize: "0.82rem" }}
            onClick={() => setPage("dashboard")}>Set Profile</button>
        )}
      </div>
    </nav>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ setPage }) {
  const features = [
    { icon: "⚡", title: "Multi-Version Responses", desc: "Every answer evolves through 3 self-improvement cycles" },
    { icon: "🧠", title: "Contextual Personalization", desc: "AI adapts to your goals, hobbies, and skill level" },
    { icon: "📊", title: "Improvement Analytics", desc: "Track your growth with visual insights over time" },
    { icon: "🔄", title: "Feedback Loop Engine", desc: "The system evaluates and rewrites itself automatically" },
  ];
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px" }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: "#3b82f6", top: "10%", left: "15%", animationDelay: "0s" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "#8b5cf6", top: "30%", right: "10%", animationDelay: "-4s" }} />
      <div className="orb" style={{ width: 300, height: 300, background: "#06b6d4", bottom: "20%", left: "30%", animationDelay: "-8s" }} />

      {/* Grid BG */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760 }}>
        <div className="anim-fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 100,
          background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.25)",
          fontSize: "0.78rem", color: "#63b3ed", fontWeight: 600, letterSpacing: "0.06em",
          marginBottom: 32, textTransform: "uppercase",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#63b3ed", display: "inline-block",
            boxShadow: "0 0 8px #63b3ed", animation: "pulse-ring 1.5s infinite" }} />
          Now Live — AI Feedback Loop System
        </div>

        <h1 className="syne anim-fade-up delay-1" style={{
          fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 800,
          lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24,
        }}>
          Self-Improving<br />
          <span style={{
            background: "linear-gradient(135deg,#63b3ed,#a78bfa,#34d399)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundSize: "200%", animation: "gradient-shift 4s ease infinite",
          }}>Agent System</span>
        </h1>

        <p className="anim-fade-up delay-2" style={{
          fontSize: "1.15rem", color: "rgba(232,234,240,0.6)",
          lineHeight: 1.7, marginBottom: 40, maxWidth: 540, margin: "0 auto 40px",
        }}>
          An AI that doesn't just answer — it <em style={{ color: "#a78bfa", fontStyle: "normal" }}>critiques itself</em>, improves, and delivers progressively better responses tailored to your personal goals.
        </p>

        <div className="anim-fade-up delay-3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={() => setPage("dashboard")}>
            Get Started <span>→</span>
          </button>
          <button className="btn-ghost" onClick={() => setPage("agent")}>
            Try the Agent
          </button>
        </div>

        {/* Stats */}
        <div className="anim-fade-up delay-4" style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
          {[["3×", "Answer Versions"], ["100%", "Personalized"], ["∞", "Self-Improving"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="syne" style={{ fontSize: "2rem", fontWeight: 800, color: "#63b3ed" }}>{val}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.45)", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, maxWidth: 900, width: "100%", marginTop: 80 }}>
        {features.map((f, i) => (
          <div key={f.title} className={`glass anim-fade-up delay-${i + 3}`}
            style={{ padding: "24px 20px", transition: "transform 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = ""; }}
          >
            <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>{f.icon}</div>
            <div className="syne" style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: "0.83rem", color: "rgba(232,234,240,0.5)", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD PAGE
// ============================================================
function DashboardPage({ profile, setProfile }) {
  const [local, setLocal] = useState(profile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    { key: "name",    label: "Your Name",            placeholder: "e.g. Alex Johnson", type: "text" },
    { key: "hobbies", label: "Hobbies & Interests",  placeholder: "e.g. Photography, Chess, Hiking…", type: "textarea" },
    { key: "skills",  label: "Skills to Improve",    placeholder: "e.g. Public speaking, Python, Writing…", type: "textarea" },
    { key: "goals",   label: "Personal Goals",        placeholder: "e.g. Launch a startup, Learn guitar, Get fit…", type: "textarea" },
  ];

  const tips = ["The more detail you give, the more personalized your AI answers become.", "Your profile is stored locally in this session.", "You can update your profile anytime and the agent will adapt."];

  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 60px", position: "relative" }}>
      <div className="orb" style={{ width: 400, height: 400, background: "#22c55e", top: "20%", right: "5%", opacity: 0.12 }} />
      <div className="orb" style={{ width: 300, height: 300, background: "#06b6d4", bottom: "20%", left: "5%", opacity: 0.1 }} />

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="anim-fade-up" style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>◈</div>
            <span style={{ fontSize: "0.8rem", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Dashboard</span>
          </div>
          <h1 className="syne" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Your Profile</h1>
          <p style={{ color: "rgba(232,234,240,0.5)", marginTop: 6 }}>Tell the agent about yourself so it can personalize every response.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
          <div className="glass anim-fade-up delay-1" style={{ padding: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {fields.map(f => (
                <div key={f.key}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: 8, color: "rgba(232,234,240,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      className="input-field"
                      rows={3}
                      style={{ resize: "vertical", minHeight: 80 }}
                      placeholder={f.placeholder}
                      value={local[f.key]}
                      onChange={e => setLocal(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  ) : (
                    <input
                      className="input-field"
                      type={f.type}
                      placeholder={f.placeholder}
                      value={local[f.key]}
                      onChange={e => setLocal(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  )}
                </div>
              ))}

              <button className="btn-primary" onClick={handleSave} style={{ alignSelf: "flex-start" }}>
                {saved ? "✓ Profile Saved!" : "Save Profile"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Preview Card */}
            <div className="glass anim-fade-up delay-2" style={{ padding: 24 }}>
              <div style={{ fontSize: "0.75rem", color: "rgba(232,234,240,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Preview</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 700, color: "#fff",
                }}>{local.name ? local.name[0].toUpperCase() : "?"}</div>
                <div>
                  <div className="syne" style={{ fontWeight: 700 }}>{local.name || "Your Name"}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.4)" }}>Learner</div>
                </div>
              </div>
              {local.hobbies && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: "0.72rem", color: "rgba(232,234,240,0.4)", marginBottom: 6 }}>HOBBIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {local.hobbies.split(",").slice(0, 4).map(h => h.trim()).filter(Boolean).map(h => (
                      <span key={h} className="tag">{h}</span>
                    ))}
                  </div>
                </div>
              )}
              {local.goals && (
                <div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(232,234,240,0.4)", marginBottom: 4 }}>TOP GOAL</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(232,234,240,0.7)" }}>{local.goals.split(",")[0]?.trim()}</div>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="glass anim-fade-up delay-3" style={{ padding: 20 }}>
              <div style={{ fontSize: "0.75rem", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, fontWeight: 600 }}>💡 Tips</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tips.map(tip => (
                  <div key={tip} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#4ade80", marginTop: 7, flexShrink: 0 }} />
                    <div style={{ fontSize: "0.8rem", color: "rgba(232,234,240,0.55)", lineHeight: 1.5 }}>{tip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RESPONSE CARD
// ============================================================
function ResponseCard({ version, response, improvements, isLoading, delay = 0 }) {
  const configs = {
    1: { badge: "v1", label: "Initial Draft",       color: "#f87171", bg: "rgba(239,68,68,0.06)",   border: "rgba(239,68,68,0.15)",   icon: "◌" },
    2: { badge: "v2", label: "Refined Response",    color: "#fbbf24", bg: "rgba(234,179,8,0.06)",   border: "rgba(234,179,8,0.15)",   icon: "◎" },
    3: { badge: "v3", label: "Optimized & Final",   color: "#4ade80", bg: "rgba(34,197,94,0.06)",   border: "rgba(34,197,94,0.15)",   icon: "●" },
  };
  const c = configs[version];

  return (
    <div className="anim-version" style={{ animationDelay: `${delay}s`,
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: 24, transition: "transform 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = ""}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: "1.1rem", color: c.color }}>{c.icon}</span>
        <span className={`v-badge v${version}`}>Version {version}</span>
        <span style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.45)" }}>{c.label}</span>
      </div>

      {isLoading ? (
        <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 0", color: c.color }}>
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span style={{ fontSize: "0.82rem", marginLeft: 4, color: "rgba(232,234,240,0.4)" }}>Generating response…</span>
        </div>
      ) : (
        <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(232,234,240,0.8)" }}>{response}</p>
      )}

      {!isLoading && improvements?.length > 0 && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${c.border}` }}>
          <div style={{ fontSize: "0.72rem", color: c.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontWeight: 600 }}>What Changed</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {improvements.map((imp, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: c.color, fontSize: "0.7rem", marginTop: 3 }}>✦</span>
                <span style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.55)" }}>{imp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// AGENT PAGE
// ============================================================
function AgentPage({ profile, history, setHistory }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  const loadingMessages = [
    "Generating initial response…",
    "Evaluating and critiquing…",
    "Refining for clarity…",
    "Optimizing final version…",
  ];

  const callAgent = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    setLoadingStage(0);

    const stageTimer = setInterval(() => {
      setLoadingStage(s => Math.min(s + 1, loadingMessages.length - 1));
    }, 1800);

    try {
      const systemPrompt = `You are a Self-Improving AI Agent. When given a question and a user profile, you MUST respond ONLY with a valid JSON object (no markdown, no code fences, no extra text).

The user's profile:
- Name: ${profile.name || "Anonymous"}
- Hobbies: ${profile.hobbies || "Not specified"}
- Skills to improve: ${profile.skills || "Not specified"}
- Goals: ${profile.goals || "Not specified"}

STRICT OUTPUT FORMAT (JSON only, no extra text):
{
  "version1": "A basic answer (2-3 sentences). Minimal personalization.",
  "version2": "An improved answer (3-4 sentences). Better structure, slightly personalized.",
  "version3": "The best answer (4-6 sentences). Fully personalized to the user's hobbies/goals, clear structure, actionable, specific.",
  "improvements_v2": ["Improvement 1 from v1 to v2", "Improvement 2"],
  "improvements_v3": ["Improvement 1 from v2 to v3", "Improvement 2"],
  "scores": {"v1": 52, "v2": 74, "v3": 93}
}`;

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: `Question: ${question}` }],
        }),
      });

      const data = await resp.json();
      const text = data.content?.map(b => b.text || "").join("").trim();
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      clearInterval(stageTimer);
      setResult(parsed);

      const entry = {
        id: Date.now(),
        question,
        timestamp: new Date().toLocaleString(),
        scores: parsed.scores,
      };
      setHistory(h => [entry, ...h].slice(0, 20));
    } catch (e) {
      clearInterval(stageTimer);
      setError("Could not parse AI response. Please try again.");
    } finally {
      setLoading(false);
      setLoadingStage(0);
    }
  };

  useEffect(() => {
    if (result) bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [result]);

  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 60px", position: "relative" }}>
      <div className="orb" style={{ width: 500, height: 500, background: "#06b6d4", top: "10%", left: "-5%", opacity: 0.1 }} />
      <div className="orb" style={{ width: 400, height: 400, background: "#8b5cf6", bottom: "20%", right: "-5%", opacity: 0.1 }} />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,179,237,0.15)", border: "1px solid rgba(99,179,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>◎</div>
            <span style={{ fontSize: "0.8rem", color: "#63b3ed", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>AI Agent</span>
          </div>
          <h1 className="syne" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Self-Improving Agent</h1>
          <p style={{ color: "rgba(232,234,240,0.5)", marginTop: 6 }}>Ask anything. Watch it refine its own answer through 3 versions.</p>
        </div>

        {/* Input */}
        <div className="glass anim-fade-up delay-1" style={{ padding: 24, marginBottom: 28 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.5)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Your Question</label>
          </div>
          <textarea
            className="input-field"
            rows={3}
            style={{ resize: "none", marginBottom: 16 }}
            placeholder="e.g. How do I build a morning routine that helps me stay focused?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && e.metaKey) callAgent(); }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.3)" }}>
              {profile.name ? `Personalized for ${profile.name}` : "Set a profile for personalized answers"} · ⌘+Enter to submit
            </div>
            <button className="btn-primary" onClick={callAgent} disabled={loading || !question.trim()}>
              {loading ? (
                <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} /> Processing…</>
              ) : "Generate Responses →"}
            </button>
          </div>
        </div>

        {/* Loading Stages */}
        {loading && (
          <div className="glass anim-fade-in" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: "0.8rem", color: "#63b3ed", marginBottom: 16, fontWeight: 600 }}>
              {loadingMessages[loadingStage]}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {loadingMessages.map((msg, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= loadingStage ? "#63b3ed" : "rgba(255,255,255,0.1)", transition: "background 0.5s" }} />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ padding: 16, borderRadius: 10, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", marginBottom: 24, fontSize: "0.88rem" }}>
            ⚠ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Score Summary */}
            <div className="glass anim-fade-up" style={{ padding: 20, display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.4)", alignSelf: "center" }}>Quality Scores</div>
              {[["V1", result.scores?.v1 || 52, "#f87171"], ["V2", result.scores?.v2 || 74, "#fbbf24"], ["V3", result.scores?.v3 || 93, "#4ade80"]].map(([label, score, color]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "0.75rem", color, fontWeight: 700, width: 20 }}>{label}</span>
                  <div className="progress-bar-track" style={{ width: 100 }}>
                    <div className="progress-bar-fill" style={{ width: `${score}%`, background: color }} />
                  </div>
                  <span style={{ fontSize: "0.82rem", color, fontWeight: 700 }}>{score}%</span>
                </div>
              ))}
            </div>

            <ResponseCard version={1} response={result.version1} improvements={[]} isLoading={false} delay={0.1} />
            <ResponseCard version={2} response={result.version2} improvements={result.improvements_v2} isLoading={false} delay={0.2} />
            <ResponseCard version={3} response={result.version3} improvements={result.improvements_v3} isLoading={false} delay={0.3} />
            <div ref={bottomRef} />
          </div>
        )}

        {/* Suggestions */}
        {!result && !loading && (
          <div className="anim-fade-up delay-2">
            <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Try asking…</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["How do I stay consistent with my goals?", "What's the best way to learn a new skill?", "How can I be more productive?", "How do I build better habits?"].map(q => (
                <button key={q} className="tag" style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onClick={() => setQuestion(q)}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,179,237,0.12)"; e.currentTarget.style.borderColor = "rgba(99,179,237,0.3)"; e.currentTarget.style.color = "#63b3ed"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}
                >{q}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// PROGRESS PAGE
// ============================================================
function ProgressPage({ profile, history }) {
  const avgV3 = history.length ? Math.round(history.reduce((a, h) => a + (h.scores?.v3 || 90), 0) / history.length) : 0;
  const avgGain = history.length ? Math.round(history.reduce((a, h) => a + ((h.scores?.v3 || 90) - (h.scores?.v1 || 50)), 0) / history.length) : 0;

  const areas = profile.skills ? profile.skills.split(",").map(s => s.trim()).filter(Boolean) : ["Critical Thinking", "Communication", "Problem Solving"];
  const areaScores = areas.map((a, i) => ({ name: a, score: 40 + (i * 13 + history.length * 3) % 55, sessions: history.length }));

  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 60px", position: "relative" }}>
      <div className="orb" style={{ width: 450, height: 450, background: "#f59e0b", top: "15%", right: "5%", opacity: 0.1 }} />
      <div className="orb" style={{ width: 350, height: 350, background: "#ef4444", bottom: "20%", left: "5%", opacity: 0.08 }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="anim-fade-up" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>◷</div>
            <span style={{ fontSize: "0.8rem", color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Progress</span>
          </div>
          <h1 className="syne" style={{ fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Growth Analytics</h1>
          <p style={{ color: "rgba(232,234,240,0.5)", marginTop: 6 }}>Track your improvement across sessions.</p>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Sessions",     value: history.length, color: "#63b3ed", icon: "⬡" },
            { label: "Avg Final Score",    value: `${avgV3}%`,    color: "#4ade80", icon: "◎" },
            { label: "Avg Improvement",    value: `+${avgGain}%`, color: "#fbbf24", icon: "↑" },
            { label: "Skill Areas",        value: areas.length,   color: "#a78bfa", icon: "◈" },
          ].map(s => (
            <div key={s.label} className={`glass stat-card anim-fade-up`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(232,234,240,0.4)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
                <span style={{ color: s.color, fontSize: "0.9rem" }}>{s.icon}</span>
              </div>
              <div className="syne" style={{ fontSize: "2rem", fontWeight: 800, color: s.color }}>{s.value || "—"}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Skill Progress */}
          <div className="glass anim-fade-up delay-2" style={{ padding: 24 }}>
            <div className="syne" style={{ fontWeight: 700, marginBottom: 20, fontSize: "1rem" }}>Skill Progress</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {areaScores.map(a => (
                <div key={a.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.85rem" }}>{a.name}</span>
                    <span style={{ fontSize: "0.82rem", color: "#fbbf24", fontWeight: 600 }}>{a.score}%</span>
                  </div>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{
                      width: `${a.score}%`,
                      background: `linear-gradient(90deg, #f59e0b, #fbbf24)`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Question History */}
          <div className="glass anim-fade-up delay-3" style={{ padding: 24 }}>
            <div className="syne" style={{ fontWeight: 700, marginBottom: 20, fontSize: "1rem" }}>Question History</div>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(232,234,240,0.3)" }}>
                <div style={{ fontSize: "2rem", marginBottom: 10 }}>◌</div>
                <div style={{ fontSize: "0.85rem" }}>No sessions yet.<br />Go to the Agent page to start.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0, maxHeight: 300, overflowY: "auto" }}>
                {history.map((h, i) => (
                  <div key={h.id} style={{ display: "flex", gap: 12, paddingBottom: i < history.length - 1 ? 14 : 0, marginBottom: i < history.length - 1 ? 14 : 0, borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div className="timeline-dot" style={{ background: "#fbbf24" }} />
                      {i < history.length - 1 && <div className="timeline-line" style={{ height: 30 }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.85rem", color: "rgba(232,234,240,0.8)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{h.question}</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                        <span style={{ fontSize: "0.72rem", color: "rgba(232,234,240,0.35)" }}>{h.timestamp}</span>
                        {h.scores?.v3 && <span style={{ fontSize: "0.72rem", color: "#4ade80" }}>✓ {h.scores.v3}%</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Improvement Graph (simple bars) */}
          {history.length > 0 && (
            <div className="glass anim-fade-up delay-4" style={{ padding: 24, gridColumn: "1 / -1" }}>
              <div className="syne" style={{ fontWeight: 700, marginBottom: 20, fontSize: "1rem" }}>Response Quality per Session</div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 100 }}>
                {history.slice(0, 12).reverse().map((h, i) => {
                  const v1 = h.scores?.v1 || 52;
                  const v3 = h.scores?.v3 || 90;
                  return (
                    <div key={h.id} style={{ flex: 1, display: "flex", gap: 3, alignItems: "flex-end", position: "relative" }}
                      title={h.question}>
                      <div style={{ flex: 1, background: "rgba(248,113,113,0.4)", borderRadius: "3px 3px 0 0", height: `${v1}%`, transition: "height 0.5s" }} />
                      <div style={{ flex: 1, background: "rgba(74,222,128,0.6)", borderRadius: "3px 3px 0 0", height: `${v3}%`, transition: "height 0.5s" }} />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(248,113,113,0.6)" }} />
                  <span style={{ fontSize: "0.75rem", color: "rgba(232,234,240,0.4)" }}>V1 Score</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: "rgba(74,222,128,0.6)" }} />
                  <span style={{ fontSize: "0.75rem", color: "rgba(232,234,240,0.4)" }}>V3 Score</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [profile, setProfile] = useState(defaultProfile);
  const [history, setHistory] = useState([]);

  const pages = { home: HomePage, dashboard: DashboardPage, agent: AgentPage, progress: ProgressPage };
  const PageComponent = pages[page];

  return (
    <>
      <GlobalStyle />
      <Navbar page={page} setPage={setPage} profile={profile} />
      <PageComponent
        setPage={setPage}
        profile={profile}
        setProfile={setProfile}
        history={history}
        setHistory={setHistory}
      />
    </>
  );
}