"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────── data ────────────────────────────────────── */
const NAV_LINKS = ["About", "Meal Plans", "Beverages", "Skincare", "Contact"];

const DIET_TYPES = [
  { label: "Balanced",      desc: "Complete nutrition across all food groups." },
  { label: "Vegan",         desc: "100% plant-based, whole food approach." },
  { label: "Vegetarian",    desc: "Plant-forward with flexibility." },
  { label: "Mediterranean", desc: "Heart-healthy, rich in omega-3s." },
  { label: "Ethnic",        desc: "Culture-rooted, tradition-honoring meals." },
];

const DRINKS = [
  { name: "Cranberry Lemongrass Apple", price: "$25" },
  { name: "Lime Rosemary Grapefruit",   price: "$25" },
  { name: "Mint Blueberry Lime",        price: "$25" },
  { name: "Fennel Apple Spritz",        price: "$18" },
  { name: "Peach Ginger Sparkler",      price: "$25" },
  { name: "Cherry Basil Refresher",     price: "$18" },
  { name: "Kiwi Lime Mint Refresher",   price: "$25" },
];

const PROCESS = [
  { n: "1", title: "Talk to a nutritionist.",  body: "A 45-minute session with a board-certified nutritionist. We learn about you — your body, your life, your goals." },
  { n: "2", title: "Your plan is built.",       body: "Our AI synthesizes the session into a fully personalized weekly meal plan, typically within 24–48 hours." },
  { n: "3", title: "Approve it.",               body: "Review your plan, swap anything you'd like. Your nutritionist is still in the loop." },
  { n: "4", title: "Groceries, handled.",       body: "Your full grocery list syncs directly with our delivery partners. One click and you're set." },
];

const PERKS = [
  "1:1 session with a licensed nutritionist",
  "AI-generated, fully custom meal plan",
  "Reviewed and refined until you love it",
  "Full grocery list — auto-synced to delivery",
  "Plan ready within 24–48 hours",
];

const BELIEFS = [
  { label: "Built by people.",   body: "Every plan, every flavor, every formula is shaped by real humans who care about how you feel." },
  { label: "For people.",        body: "We exist for the person who wants to feel good — not just look healthy on a feed." },
  { label: "Powered by science.", body: "Board-certified nutritionists and AI working together so the system gets smarter with every person it serves." },
];

const SERVICES = [
  { tag: "01 · Nutrition", title: "Personalized\nMeal Planning",  body: "AI-powered, nutritionist-backed plans tailored to your body, your goals, and your palate. Balanced, Vegan, Vegetarian, Mediterranean, and Ethnic.",          accent: "#1E3328", textColor: "#FAFAF6", link: "#meal-plans" },
  { tag: "02 · Beverages", title: "Sparkling\nBeverages",         body: "Two ingredients. Sparkling water + natural extracts. No sugar. No additives. Seven flavors crafted to taste clean and feel good.",                              accent: "#FAFAF6", textColor: "#1A1916", link: "#beverages" },
  { tag: "03 · Skincare",  title: "Natural\nSkincare",            body: "Thoughtfully formulated with quality ingredients for your natural radiance. Holistic wellness, inside and out.",                                                  accent: "#FAFAF6", textColor: "#1A1916", link: "#" },
  { tag: "04 · Planning",  title: "Interactive\nPlanning",        body: "Drinks, meals, interactive email planning — all seamlessly connected so your wellness routine runs itself.",                                                      accent: "#5C7A5E", textColor: "#FAFAF6", link: "#" },
];

const GCS_BUCKET = process.env.NEXT_PUBLIC_GCS_BUCKET_URL ?? "";

/* hero image: use GCS URL in production, local fallback for dev */
const HERO_IMG = GCS_BUCKET
  ? `${GCS_BUCKET}/hero/hero-bg.jpg`
  : "/hero-bg.jpg";

/* ─────────────────────────── component ───────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const S = {
    /* reusable style snippets */
    label: { fontSize: "0.6875rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#5C7A5E", fontWeight: 600 },
    labelDark: { fontSize: "0.6875rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(250,250,246,0.4)", fontWeight: 600 },
    serif: { fontFamily: "var(--font-playfair), serif" },
  };

  return (
    <div style={{ background: "#FAFAF6", color: "#1A1916", fontFamily: "var(--font-inter), system-ui, sans-serif" }}>

      {/* ══ NAV ═══════════════════════════════════════════════════════════════ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(250,250,246,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #E2DDD5" : "1px solid transparent",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,40px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <span style={{ ...S.serif, fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.02em", color: "#1A1916" }}>
            Citi<span style={{ color: "#5C7A5E" }}>Grove</span>
          </span>

          {/* Desktop nav — className controls visibility; inline style only sets gap */}
          <nav className="hidden md:flex" style={{ gap: 36 }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                style={{ fontSize: "0.8125rem", color: "#6B6660", letterSpacing: "0.01em", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1A1916")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B6660")}>
                {l}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* CTA button */}
            <a href="https://form.typeform.com/to/r6ucQF6l" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.8125rem", padding: "10px 22px", borderRadius: 100, background: "#1E3328", color: "#FAFAF6", textDecoration: "none", letterSpacing: "0.02em", transition: "background 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2A4A38")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1E3328")}>
              Get Started
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", width: 22, height: 1.5, background: "#1A1916", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 1.5, background: "#1A1916", transition: "all 0.3s", opacity: mobileMenuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 1.5, background: "#1A1916", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div style={{ background: "rgba(250,250,246,0.97)", backdropFilter: "blur(16px)", borderTop: "1px solid #E2DDD5", padding: "24px clamp(20px,5vw,40px)" }}>
            {NAV_LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: "block", padding: "12px 0", fontSize: "1rem", color: "#1A1916", textDecoration: "none", borderBottom: "1px solid #E2DDD5" }}>
                {l}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: `0 clamp(20px,5vw,40px) clamp(60px,8vw,100px)`, position: "relative", overflow: "hidden" }}>

        {/* Background image */}
        <Image
          src={HERO_IMG}
          alt="CitiGrove wellness hero background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />

        {/* Cream gradient overlay — readable text at bottom, image shows top-right */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(160deg, rgba(245,240,232,0.45) 0%, rgba(245,240,232,0.7) 30%, rgba(245,240,232,0.92) 65%, #F5F0E8 100%)",
        }} />

        {/* Top label */}
        <div style={{ position: "absolute", top: "clamp(84px,12vh,108px)", left: "clamp(20px,5vw,40px)", zIndex: 2 }}>
          <span style={{ ...S.label }}>Wellness · Nutrition · Community</span>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: "clamp(20px,3vw,28px)" }}>
            <span style={{ display: "inline-block", fontSize: "0.75rem", letterSpacing: "0.14em", border: "1px solid #C8C2BA", borderRadius: 100, padding: "7px 16px", color: "#6B6660" }}>
              Est. 2026 · Board Certified Nutritionists · AI‑Powered
            </span>
          </div>

          <h1 style={{ ...S.serif, fontSize: "clamp(3rem,10.5vw,10rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.02em", color: "#1A1916", marginBottom: "clamp(32px,5vw,56px)" }}>
            <span style={{ display: "block" }}>Eat Good.</span>
            <span style={{ display: "block", color: "#5C7A5E" }}>Look Good.</span>
            <span style={{ display: "block", WebkitTextStroke: "1.5px #C8C2BA", color: "transparent" }}>Feel Good.</span>
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(20px,4vw,32px)" }}>
            <p style={{ maxWidth: 420, fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", color: "#6B6660", lineHeight: 1.75, flex: "1 1 280px" }}>
              A wellness ecosystem built by humans, for humans. Personalized nutrition,
              clean beverages, and skincare — all connected and all yours.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flexShrink: 0 }}>
              <a href="#about"
                style={{ fontSize: "0.875rem", padding: "13px 28px", borderRadius: 100, border: "1px solid #C8C2BA", color: "#1A1916", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                Learn more
              </a>
              <a href="https://form.typeform.com/to/r6ucQF6l" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "0.875rem", padding: "13px 28px", borderRadius: 100, background: "#1E3328", color: "#FAFAF6", textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap" }}>
                Get my plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#1E3328", padding: "14px 0", overflow: "hidden" }}>
        <div className="animate-marquee" style={{ display: "flex", whiteSpace: "nowrap" }}>
          {Array.from({ length: 3 }, (_, bloc) =>
            ["MEAL PLANNING", "SPARKLING BEVERAGES", "SKINCARE", "COMMUNITY", "AI POWERED",
             "BOARD CERTIFIED NUTRITIONISTS", "GROCERY DELIVERY", "HOLISTIC WELLNESS"].map((t, i) => (
              <span key={`${bloc}-${i}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 24, padding: "0 24px",
                  fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,250,246,0.5)", fontWeight: 600 }}>
                {t}
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(92,122,94,0.6)", flexShrink: 0 }} />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══ BELIEFS ═══════════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "#FAFAF6", padding: "clamp(72px,10vw,120px) clamp(20px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ ...S.label, marginBottom: "clamp(36px,6vw,56px)" }}>Our Beliefs</p>

          <p style={{ ...S.serif, fontSize: "clamp(1.6rem,4vw,3.25rem)", fontWeight: 500, lineHeight: 1.35, color: "#1A1916", maxWidth: 800, borderTop: "1px solid #E2DDD5", paddingTop: 40, marginBottom: "clamp(56px,8vw,100px)" }}>
            "We believe wellness isn't a destination. It's a practice — one that
            should be <em style={{ fontStyle: "italic", color: "#5C7A5E" }}>accessible, personal,</em> and
            deeply human."
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: "#E2DDD5" }}>
            {BELIEFS.map((b, i) => (
              <div key={i}
                style={{ background: "#FAFAF6", padding: "clamp(32px,4vw,48px) clamp(24px,3vw,36px)", transition: "background 0.25s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0EBE1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFAF6")}>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", color: "#B89A72", fontWeight: 600, display: "block", marginBottom: 20 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ ...S.serif, fontSize: "clamp(1.25rem,2vw,1.5rem)", fontWeight: 600, marginBottom: 14, color: "#1A1916" }}>{b.label}</h3>
                <p style={{ fontSize: "0.9375rem", color: "#6B6660", lineHeight: 1.7 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════════════════════ */}
      <section id="skincare" style={{ background: "#F0EBE1", padding: "clamp(72px,10vw,120px) clamp(20px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "clamp(16px,3vw,24px)", marginBottom: "clamp(48px,7vw,72px)" }}>
            <div>
              <p style={{ ...S.label, marginBottom: 16 }}>The Ecosystem</p>
              <h2 style={{ ...S.serif, fontSize: "clamp(2rem,5.5vw,4.25rem)", fontWeight: 700, lineHeight: 1.05, color: "#1A1916" }}>
                Everything you need,<br />
                <span style={{ color: "#5C7A5E" }}>in one place.</span>
              </h2>
            </div>
            <p style={{ maxWidth: 320, fontSize: "0.9375rem", color: "#6B6660", lineHeight: 1.7 }}>
              CitiGrove isn't a single product — it's a connected wellness system designed to work together.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 14 }}>
            {SERVICES.map((card, i) => (
              <a key={i} href={card.link}
                style={{
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  background: card.accent, borderRadius: 20,
                  padding: "clamp(28px,3.5vw,40px) clamp(24px,3vw,36px)",
                  minHeight: "clamp(260px,30vw,320px)", textDecoration: "none",
                  border: card.accent === "#FAFAF6" ? "1px solid #E2DDD5" : "none",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(26,25,22,0.09)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <span style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase", color: card.textColor, opacity: 0.45, fontWeight: 600 }}>{card.tag}</span>
                <div>
                  <h3 style={{ ...S.serif, fontSize: "clamp(1.5rem,2.5vw,1.75rem)", fontWeight: 700, lineHeight: 1.15, color: card.textColor, marginBottom: 14, whiteSpace: "pre-line" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: card.textColor, opacity: 0.65, lineHeight: 1.7 }}>{card.body}</p>
                </div>
                <span style={{ fontSize: "1.25rem", color: card.textColor, opacity: 0.4, alignSelf: "flex-end" }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MEAL PLANNING ═════════════════════════════════════════════════════ */}
      <section id="meal-plans" style={{ background: "#FAFAF6", padding: "clamp(72px,10vw,120px) clamp(20px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "clamp(48px,7vw,80px)", alignItems: "start" }}>

            <div>
              <p style={{ ...S.label, marginBottom: 24 }}>Meal Planning</p>
              <h2 style={{ ...S.serif, fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.08, color: "#1A1916", marginBottom: 24 }}>
                Your plan.<br />Your pace.
              </h2>
              <p style={{ fontSize: "clamp(0.9375rem,1.5vw,1.0625rem)", color: "#6B6660", lineHeight: 1.75, marginBottom: 16 }}>
                CitiGrove removes the friction from eating well. A licensed nutritionist
                learns who you are. Our AI builds the plan. Your groceries show up at the door.
              </p>
              <p style={{ fontSize: "0.9375rem", color: "#6B6660", lineHeight: 1.75, marginBottom: 40, opacity: 0.75 }}>
                Plans adapt over time. The more you use CitiGrove, the smarter and more
                personal your experience becomes.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
                {DIET_TYPES.map((d) => (
                  <button key={d.label} title={d.desc}
                    style={{ padding: "9px 20px", borderRadius: 100, fontSize: "0.8125rem", border: "1px solid #C8C2BA", background: "transparent", color: "#6B6660", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#1E3328"; el.style.color = "#FAFAF6"; el.style.borderColor = "#1E3328"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "#6B6660"; el.style.borderColor = "#C8C2BA"; }}>
                    {d.label}
                  </button>
                ))}
              </div>
              <a href="https://form.typeform.com/to/r6ucQF6l" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 32px", borderRadius: 100, background: "#1E3328", color: "#FAFAF6", textDecoration: "none", fontSize: "0.875rem", letterSpacing: "0.02em" }}>
                Start my plan →
              </a>
            </div>

            <div style={{ paddingTop: 8 }}>
              {PROCESS.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 28, paddingTop: 28, paddingBottom: 28, borderTop: "1px solid #E2DDD5" }}>
                  <span style={{ ...S.serif, fontSize: "1rem", fontWeight: 500, color: "#C8C2BA", flexShrink: 0, width: 20, marginTop: 3 }}>{step.n}</span>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1916", marginBottom: 8 }}>{step.title}</h4>
                    <p style={{ fontSize: "0.875rem", color: "#6B6660", lineHeight: 1.7 }}>{step.body}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #E2DDD5" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONSULTATION CTA ══════════════════════════════════════════════════ */}
      <section style={{ background: "#1E3328", padding: "clamp(72px,10vw,100px) clamp(20px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "clamp(48px,7vw,80px)", alignItems: "center" }}>
            <div>
              <p style={{ ...S.labelDark, marginBottom: 24 }}>Schedule a Consultation</p>
              <h2 style={{ ...S.serif, fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.08, color: "#FAFAF6", marginBottom: 24 }}>
                A plan made for<br /><span style={{ color: "#90B896" }}>exactly you.</span>
              </h2>
              <p style={{ fontSize: "clamp(0.875rem,1.4vw,1rem)", color: "rgba(250,250,246,0.6)", lineHeight: 1.75, maxWidth: 440 }}>
                Our meal planning process begins with a real conversation with a licensed
                nutritionist. We learn about your dietary needs, preferences, and goals —
                then our AI brings it all together.
              </p>
            </div>

            <div style={{ background: "rgba(250,250,246,0.06)", borderRadius: 24, border: "1px solid rgba(250,250,246,0.08)", padding: "clamp(32px,5vw,48px)" }}>
              <span style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontWeight: 800, color: "#FAFAF6", display: "block", lineHeight: 1 }}>$150</span>
              <span style={{ fontSize: "0.875rem", color: "rgba(250,250,246,0.4)", marginTop: 6, marginBottom: 32, display: "block" }}>Includes your first full week of meal planning</span>
              <ul style={{ listStyle: "none", margin: "0 0 32px", padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {PERKS.map((p) => (
                  <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: "0.875rem", color: "rgba(250,250,246,0.75)", lineHeight: 1.5 }}>
                    <span style={{ color: "#90B896", flexShrink: 0, marginTop: 1 }}>✓</span>{p}
                  </li>
                ))}
              </ul>
              <a href="https://form.typeform.com/to/r6ucQF6l" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "16px", borderRadius: 100, background: "#FAFAF6", color: "#1E3328", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.02em" }}>
                Book My Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BEVERAGES ═════════════════════════════════════════════════════════ */}
      <section id="beverages" style={{ background: "#F0EBE1", padding: "clamp(72px,10vw,120px) clamp(20px,5vw,40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "clamp(16px,3vw,24px)", marginBottom: "clamp(48px,7vw,72px)" }}>
            <div>
              <p style={{ ...S.label, marginBottom: 16 }}>Sparkling Beverages</p>
              <h2 style={{ ...S.serif, fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.08, color: "#1A1916" }}>
                Two ingredients.<br />Nothing to hide.
              </h2>
            </div>
            <p style={{ maxWidth: 340, fontSize: "0.9375rem", color: "#6B6660", lineHeight: 1.7 }}>
              Sparkling water and natural flavor extracts. No sugar, no artificial additives —
              just clean, honest refreshment.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 12 }}>
            {DRINKS.map((d, i) => (
              <div key={i}
                style={{ background: "#FAFAF6", borderRadius: 16, padding: "clamp(20px,2.5vw,28px) clamp(16px,2vw,24px)", border: "1px solid transparent", display: "flex", flexDirection: "column", gap: 12, transition: "all 0.2s", cursor: "pointer" }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "#C8C2BA"; el.style.boxShadow = "0 4px 24px rgba(26,25,22,0.05)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "transparent"; el.style.boxShadow = "none"; }}>
                <div style={{ height: 64, borderRadius: 10, background: `hsl(${(i * 37 + 100) % 360}, 28%, 88%)` }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#1A1916", lineHeight: 1.4 }}>{d.name}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#5C7A5E", flexShrink: 0 }}>{d.price}</span>
                </div>
                <button
                  style={{ marginTop: 4, padding: "9px 0", borderRadius: 100, border: "1px solid #C8C2BA", background: "transparent", fontSize: "0.8rem", color: "#6B6660", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#1E3328"; el.style.color = "#FAFAF6"; el.style.borderColor = "#1E3328"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "#6B6660"; el.style.borderColor = "#C8C2BA"; }}>
                  Add to cart
                </button>
              </div>
            ))}
            <div
              style={{ borderRadius: 16, padding: "clamp(20px,2.5vw,28px)", border: "1px dashed #C8C2BA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", transition: "background 0.2s", minHeight: 160 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFAF6")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
              <span style={{ fontSize: "1.5rem", color: "#C8C2BA" }}>+</span>
              <span style={{ fontSize: "0.8125rem", color: "#6B6660", textAlign: "center" }}>View all<br />flavors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════════════════════════════════ */}
      <section style={{ background: "#FAFAF6", padding: "clamp(72px,10vw,120px) clamp(20px,5vw,40px)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ ...S.label, marginBottom: 24 }}>Join the Community</p>
          <h2 style={{ ...S.serif, fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 700, lineHeight: 1.1, color: "#1A1916", marginBottom: 16 }}>
            10% off your<br />first order.
          </h2>
          <p style={{ fontSize: "clamp(0.9375rem,1.5vw,1rem)", color: "#6B6660", lineHeight: 1.75, marginBottom: 40 }}>
            Join the CitiGrove community for new flavors, meal planning tips, and
            early access to everything we&apos;re building.
          </p>
          <form onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto 16px", flexWrap: "wrap" }}>
            <input type="email" placeholder="your@email.com"
              style={{ flex: "1 1 200px", padding: "14px 20px", borderRadius: 100, border: "1px solid #C8C2BA", background: "#FAFAF6", fontSize: "0.875rem", color: "#1A1916", outline: "none", minWidth: 0 }} />
            <button type="submit"
              style={{ padding: "14px 24px", borderRadius: 100, background: "#1E3328", color: "#FAFAF6", border: "none", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", flexShrink: 0 }}>
              Subscribe
            </button>
          </form>
          <p style={{ fontSize: "0.75rem", color: "#C8C2BA" }}>No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════════════ */}
      <footer id="contact" style={{ background: "#1A1916", padding: "clamp(56px,8vw,80px) clamp(20px,5vw,40px) 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "clamp(36px,5vw,48px)", marginBottom: "clamp(48px,7vw,80px)" }}>
            <div style={{ gridColumn: "span 1" }}>
              <div style={{ ...S.serif, fontSize: "1.5rem", fontWeight: 700, color: "#FAFAF6", marginBottom: 20, letterSpacing: "0.02em" }}>
                Citi<span style={{ color: "#5C7A5E" }}>Grove</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(250,250,246,0.38)", lineHeight: 1.75, maxWidth: 280, marginBottom: 20 }}>
                A wellness ecosystem built by humans, for humans. Every product and service
                is designed to help you live vibrantly.
              </p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(250,250,246,0.3)", lineHeight: 1.8 }}>
                123 Bang Street Leviko, CA 8034<br />
                <a href="mailto:info@citigrove.com"
                  style={{ color: "rgba(250,250,246,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#5C7A5E")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(250,250,246,0.3)")}>
                  info@citigrove.com
                </a>
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,250,246,0.3)", fontWeight: 600, marginBottom: 24 }}>Pages</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Home", "About", "Shop", "Blog", "Team", "Contact", "Services"].map((p) => (
                  <li key={p}>
                    <a href="#" style={{ fontSize: "0.875rem", color: "rgba(250,250,246,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FAFAF6")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(250,250,246,0.4)")}>
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "0.6875rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,250,246,0.3)", fontWeight: 600, marginBottom: 24 }}>Services</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Meal Planning", "Sparkling Beverages", "Skincare", "Consultations", "Interactive Planning", "Grocery Delivery"].map((s) => (
                  <li key={s}>
                    <a href="#" style={{ fontSize: "0.875rem", color: "rgba(250,250,246,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FAFAF6")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(250,250,246,0.4)")}>
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(250,250,246,0.06)", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: "0.75rem", color: "rgba(250,250,246,0.2)" }}>© 2026 CitiGrove. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["Instagram", "https://instagram.com"], ["Facebook", "https://facebook.com"], ["Twitter", "https://twitter.com"]].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.75rem", color: "rgba(250,250,246,0.2)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(250,250,246,0.6)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(250,250,246,0.2)")}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
