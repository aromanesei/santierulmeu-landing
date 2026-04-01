import { useState, useEffect } from "react";

const FEATURES = [
  { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>), title: "Registru digital al proiectului", desc: "Toate documentele într-un singur loc: autorizații, avize, polițe, contracte — cu status în timp real. Știi instant ce e valid, ce expiră și ce lipsește." },
  { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>), title: "Comunicare structurată", desc: "Nu un alt grup de WhatsApp. Discuții organizate pe teme: neconformități, aprobări materiale, clarificări proiect — fiecare cu responsabil și termen." },
  { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>), title: "Jurnal de șantier digital", desc: "Dirigintele completează zilnic, constructorul confirmă. Cu foto geolocalizate și export PDF pentru ISC. Valoare juridică prin semnătură electronică." },
  { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>), title: "Alerte automate", desc: "Polița RCA expiră în 10 zile? Lipsește PV-ul de fază determinantă? Ai notificare. Nu mai depinzi de memoria nimănui." },
  { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>), title: "Pregătit pentru audit", desc: "Control ISC mâine? Totul e într-un click: documente, jurnale, procese verbale. Trasabilitate completă pe fiecare decizie." },
  { icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>), title: "Toți actorii, un singur loc", desc: "Beneficiar, proiectant, diriginte, constructor, RTE — fiecare vede ce-i relevant. Roluri clare, responsabilități transparente." },
];

const PROBLEMS = [
  { emoji: "📱", text: "Informații pe WhatsApp, imposibil de urmărit" },
  { emoji: "📋", text: "Registrul de șantier completat de mână, pe hârtie" },
  { emoji: "🔍", text: "Documente risipite la 5 persoane diferite" },
  { emoji: "⏰", text: "Afli despre probleme când e deja prea târziu" },
  { emoji: "😰", text: "Panică la fiecare control ISC" },
];

const ROLES = [
  { role: "Beneficiar", desc: "Dashboard cu toate proiectele, alerte, documente. Control total fără să suni pe nimeni.", color: "#0F6E56" },
  { role: "Diriginte", desc: "Jurnal digital, neconformități cu foto, notificări faze determinante. Totul documentat.", color: "#185FA5" },
  { role: "Constructor", desc: "Upload situații lucrări, PV-uri, declarații conformitate. Comunicare directă cu proiectantul.", color: "#854F0B" },
  { role: "Proiectant", desc: "Răspuns rapid la RFI-uri, upload revizii, asistență tehnică trasabilă.", color: "#534AB7" },
];

const PRIVACY_POLICY = `POLITICA DE CONFIDENȚIALITATE

Ultima actualizare: 1 aprilie 2026

1. OPERATOR DE DATE PERSONALE

Operatorul de date personale este SC ȘANTIERULMEU SRL, cu sediul în Bld. Tudor Vladimirescu 45A, Iași, România, CUI 43672749, J22/397/2021, email: contact@santierulmeu.ro.

2. CE DATE PERSONALE COLECTĂM

a) Date furnizate direct de dumneavoastră:
- Adresa de email (la înscrierea pentru acces timpuriu)
- Rolul profesional selectat (beneficiar, diriginte, constructor, proiectant)
- Numele și prenumele (la crearea contului — funcționalitate viitoare)
- Datele firmei (denumire, CUI — funcționalitate viitoare)

b) Date colectate automat:
- Adresa IP
- Tipul browserului și dispozitivului
- Date de navigare agregate (prin cookie-uri analitice, doar cu consimțământul dvs.)

3. SCOPUL PRELUCRĂRII DATELOR

- Comunicarea privind lansarea platformei și accesul timpuriu (temei: consimțământ, art. 6 alin. 1 lit. a GDPR)
- Crearea și administrarea contului de utilizator (temei: executarea contractului, art. 6 alin. 1 lit. b GDPR)
- Îmbunătățirea serviciilor pe baza datelor agregate (temei: interes legitim, art. 6 alin. 1 lit. f GDPR)
- Respectarea obligațiilor legale (temei: obligație legală, art. 6 alin. 1 lit. c GDPR)

4. DURATA STOCĂRII

- Date lista de așteptare (email, rol): max. 2 ani de la colectare
- Date cont utilizator: pe durata contului + 3 ani după ștergere
- Date facturare: 10 ani (legislație fiscală)
- Cookie-uri analitice: max. 13 luni

5. CU CINE PARTAJĂM DATELE

Nu vindem și nu închiriem datele dvs. personale. Partajăm date cu:
- Furnizori de servicii tehnice (hosting, email) — pe bază de acord de prelucrare
- Autorități publice, când legea o impune

Furnizori actuali: Supabase Inc. (date în UE), HZONE (România).

6. DREPTURILE DUMNEAVOASTRĂ (GDPR)

Aveți dreptul de: acces, rectificare, ștergere, restricționare, portabilitate, opoziție, retragere consimțământ, depunere plângere la ANSPDCP (www.dataprotection.ro).

Contact: contact@santierulmeu.ro — răspundem în max. 30 de zile.

7. SECURITATEA DATELOR

Criptare în tranzit (HTTPS/TLS), control acces bazat pe roluri, backup-uri regulate.

8. TRANSFERURI INTERNAȚIONALE

Date stocate în UE. Pentru furnizori din afara UE/SEE: clauze contractuale standard.

9. MODIFICĂRI

Modificările semnificative vor fi comunicate prin email sau notificare pe platformă.

10. CONTACT

SC ȘANTIERULMEU SRL, Bld. Tudor Vladimirescu 45A, Iași, România
Email: contact@santierulmeu.ro`;

const COOKIES_POLICY = `POLITICA DE UTILIZARE COOKIES

Ultima actualizare: 1 aprilie 2026

1. CE SUNT COOKIE-URILE?

Cookie-urile sunt fișiere text de mici dimensiuni plasate pe dispozitivul dvs. de site-urile web vizitate.

2. OPERATOR

SC ȘANTIERULMEU SRL, Bld. Tudor Vladimirescu 45A, Iași, CUI 43672749.

3. CE COOKIE-URI UTILIZĂM

a) Cookie-uri strict necesare — esențiale, nu pot fi dezactivate
- Sesiune utilizator (durata: sesiune)
- Preferință cookie consent (durata: 12 luni)

b) Cookie-uri analitice — doar cu consimțământul dvs.
- Date agregate și anonimizate despre utilizarea site-ului

c) Cookie-uri funcționale — rețin preferințele (limbă, regiune)

4. CONTROL

- Acceptați/refuzați prin banner-ul de consimțământ
- Modificați setările browserului
- Retrageți consimțământul oricând

5. SETĂRI BROWSER

Chrome: Setări > Confidențialitate > Cookie-uri
Firefox: Setări > Viață privată și securitate
Safari: Preferințe > Confidențialitate
Edge: Setări > Cookie-uri și permisiuni

6. CONTACT

SC ȘANTIERULMEU SRL — contact@santierulmeu.ro`;

const TERMS = `TERMENI ȘI CONDIȚII DE UTILIZARE

Ultima actualizare: 1 aprilie 2026

1. INFORMAȚII GENERALE

Site-ul santierulmeu.ro este operat de SC ȘANTIERULMEU SRL, Bld. Tudor Vladimirescu 45A, Iași, CUI 43672749, J22/397/2021, email: contact@santierulmeu.ro.

2. OBIECTUL PLATFORMEI

ȘantierulMeu este o platformă digitală pentru gestionarea comunicării și documentației pe șantierele de construcții din România.

3. ÎNREGISTRAREA PENTRU ACCES TIMPURIU

3.1. Furnizați adresa de email și, opțional, rolul profesional.
3.2. Datele vor fi utilizate exclusiv pentru informare despre lansare, conform Politicii de Confidențialitate.
3.3. Vă puteți dezabona oricând la contact@santierulmeu.ro.

4. LIMITAREA RĂSPUNDERII

4.1. Platforma este în dezvoltare. Funcționalitățile prezentate pot suferi modificări.
4.2. ȘantierulMeu nu înlocuiește obligațiile legale conform Legii 10/1995, HG 907/2016 sau altor reglementări.
4.3. Operatorul nu răspunde pentru decizii luate exclusiv pe baza informațiilor din platformă.

5. PROPRIETATE INTELECTUALĂ

Toate conținuturile sunt proprietatea SC ȘANTIERULMEU SRL. Reproducerea fără acord scris e interzisă.

6. PROTECȚIA DATELOR

Conform Politicii de Confidențialitate și GDPR (Regulamentul UE 2016/679).

7. LEGEA APLICABILĂ

7.1. Legislația română.
7.2. Competență: instanțele din Iași, România.
7.3. Platforma SOL: https://ec.europa.eu/consumers/odr

8. ANPC

Autoritatea Națională pentru Protecția Consumatorilor: www.anpc.gov.ro
Bulevardul Aviatorilor nr. 72, Sector 1, București.

9. CONTACT

SC ȘANTIERULMEU SRL, Bld. Tudor Vladimirescu 45A, Iași
CUI: 43672749 — contact@santierulmeu.ro`;

function LegalModal({ title, content, onClose }) {
  useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", overflowY: "auto" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, maxWidth: 720, width: "100%", padding: "40px 36px", position: "relative", margin: "20px 0" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", border: "none", background: "#f4f3ef", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#5f5e5a" }}>✕</button>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, paddingRight: 40 }}>{title}</h2>
        <div style={{ fontSize: 14, color: "#3d3d3a", lineHeight: 1.8, whiteSpace: "pre-line" }}>{content.trim()}</div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button onClick={onClose} style={{ padding: "10px 28px", borderRadius: 8, background: "#0F6E56", color: "#fff", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>Închide</button>
        </div>
      </div>
    </div>
  );
}

function CookieBanner({ onAccept, onReject, onDetails }) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9998, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid #e8e6df", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
      <p style={{ fontSize: 13, color: "#5f5e5a", maxWidth: 520, lineHeight: 1.5, margin: 0 }}>
        Acest site folosește cookie-uri strict necesare. Cookie-urile analitice sunt activate doar cu acordul dvs.{" "}
        <span onClick={onDetails} style={{ color: "#0F6E56", cursor: "pointer", textDecoration: "underline" }}>Detalii</span>
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onReject} style={{ padding: "8px 18px", borderRadius: 6, fontSize: 13, fontWeight: 500, border: "1px solid #d3d1c7", background: "#fff", color: "#5f5e5a", cursor: "pointer" }}>Doar necesare</button>
        <button onClick={onAccept} style={{ padding: "8px 18px", borderRadius: 6, fontSize: 13, fontWeight: 600, border: "none", background: "#0F6E56", color: "#fff", cursor: "pointer" }}>Accept toate</button>
      </div>
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);
  const [cookieConsent, setCookieConsent] = useState("undecided");

  const handleSubmit = () => { if (email && email.includes("@")) setSubmitted(true); };

  const LP = { privacy: { title: "Politica de confidențialitate", content: PRIVACY_POLICY }, cookies: { title: "Politica cookies", content: COOKIES_POLICY }, terms: { title: "Termeni și condiții", content: TERMS } };

  return (
    <div style={{ fontFamily: "'Instrument Sans', 'DM Sans', system-ui, sans-serif", color: "#1a1a18", background: "#fff", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
        .fade-up{animation:fadeUp .7s ease both}.fade-up-d1{animation:fadeUp .7s ease .1s both}.fade-up-d2{animation:fadeUp .7s ease .2s both}.fade-up-d3{animation:fadeUp .7s ease .3s both}
        .cta-btn{transition:all .2s ease;cursor:pointer;border:none}.cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(15,110,86,.25)}.cta-btn:active{transform:translateY(0)}
        .feature-card{transition:all .2s ease}.feature-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}
        .role-card{transition:all .25s ease}.role-card:hover{transform:translateY(-3px)}
        .nav-link{transition:color .15s ease;text-decoration:none}.nav-link:hover{color:#0F6E56}
        .problem-item{animation:slideIn .5s ease both}
        .legal-link{color:#888780;text-decoration:none;transition:color .15s ease;cursor:pointer}.legal-link:hover{color:#0F6E56;text-decoration:underline}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
        .pricing-card{border-radius:16px;padding:32px 28px;border:1.5px solid #e8e6df;background:#fff;transition:all .25s ease}
        .pricing-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}
        .pricing-card.featured{border-color:#0F6E56;box-shadow:0 4px 20px rgba(15,110,86,.12);position:relative}
        .pricing-feature{display:flex;align-items:flex-start;gap:8px;font-size:14px;color:#3d3d3a;line-height:1.5;margin-bottom:10px}
        .pricing-feature svg{flex-shrink:0;margin-top:2px}
        .pricing-note{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#888780;line-height:1.5;margin-bottom:8px}
        .pricing-note svg{flex-shrink:0;margin-top:2px}
        .upgrade-step{display:flex;align-items:center;gap:12px;padding:14px 20px;border-radius:10px;background:#fff;border:1px solid #e8e6df}
        .upgrade-step:hover{border-color:#1D9E75}
        @media(max-width:768px){.hero-grid{flex-direction:column!important}.features-grid{grid-template-columns:1fr!important}.roles-grid{grid-template-columns:1fr 1fr!important}.pricing-grid{grid-template-columns:1fr!important}.hero-text{text-align:center}.nav-desktop{display:none!important}.nav-mobile-toggle{display:flex!important}.section-pad{padding-left:20px!important;padding-right:20px!important}.hero-title{font-size:32px!important}.footer-grid{flex-direction:column!important;text-align:center!important}}
        @media(min-width:769px){.nav-mobile-toggle{display:none!important}.nav-mobile-menu{display:none!important}}
      `}</style>

      {cookieConsent === "undecided" && <CookieBanner onAccept={() => setCookieConsent("accepted")} onReject={() => setCookieConsent("rejected")} onDetails={() => setLegalModal("cookies")} />}
      {legalModal && LP[legalModal] && <LegalModal title={LP[legalModal].title} content={LP[legalModal].content} onClose={() => setLegalModal(null)} />}

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e8e6df", padding: "0 40px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1D9E75, #085041)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>Șantierul<span style={{ color: "#0F6E56" }}>Meu</span></span>
          </div>
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#problema" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: "#5f5e5a" }}>Problema</a>
            <a href="#functionalitati" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: "#5f5e5a" }}>Funcționalități</a>
            <a href="#roluri" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: "#5f5e5a" }}>Roluri</a>
            <a href="#acces" className="nav-link" style={{ fontSize: 14, fontWeight: 500, color: "#5f5e5a" }}>Acces timpuriu</a>
            <a href="#acces" className="cta-btn" style={{ padding: "8px 20px", borderRadius: 8, background: "#0F6E56", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Vreau acces</a>
          </div>
          <button className="nav-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "none", border: "none", cursor: "pointer" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a18" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile-menu" style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #e8e6df" }}>
            <a href="#problema" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: "#5f5e5a", textDecoration: "none" }}>Problema</a>
            <a href="#functionalitati" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: "#5f5e5a", textDecoration: "none" }}>Funcționalități</a>
            <a href="#roluri" onClick={() => setMenuOpen(false)} style={{ fontSize: 15, color: "#5f5e5a", textDecoration: "none" }}>Roluri</a>
            <a href="#acces" onClick={() => setMenuOpen(false)} className="cta-btn" style={{ padding: "10px 20px", borderRadius: 8, background: "#0F6E56", color: "#fff", fontSize: 15, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>Vreau acces</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 40px 64px", maxWidth: 1120, margin: "0 auto" }} className="section-pad">
        <div className="hero-grid" style={{ display: "flex", gap: 48, alignItems: "center" }}>
          <div className="hero-text" style={{ flex: 1 }}>
            <div className="fade-up" style={{ display: "inline-block", padding: "6px 14px", borderRadius: 20, background: "#E1F5EE", color: "#0F6E56", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Lansare în curând — acces timpuriu disponibil</div>
            <h1 className="fade-up-d1 hero-title" style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: 20 }}>Știi exact ce se întâmplă pe <span style={{ color: "#0F6E56" }}>șantierul tău</span></h1>
            <p className="fade-up-d2" style={{ fontSize: 18, lineHeight: 1.7, color: "#5f5e5a", marginBottom: 32, maxWidth: 520 }}>Platforma unde beneficiarul, dirigintele, constructorul și proiectantul colaborează transparent. Documente, comunicare și jurnal de șantier — totul într-un singur loc.</p>
            <div className="fade-up-d3" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#acces" className="cta-btn" style={{ padding: "14px 28px", borderRadius: 10, background: "#0F6E56", color: "#fff", fontSize: 16, fontWeight: 600, textDecoration: "none" }}>Vreau acces timpuriu</a>
              <a href="#functionalitati" className="cta-btn" style={{ padding: "14px 28px", borderRadius: 10, background: "#f4f3ef", color: "#1a1a18", fontSize: 16, fontWeight: 500, textDecoration: "none", border: "1px solid #d3d1c7" }}>Vezi funcționalități</a>
            </div>
            <div className="fade-up-d3" style={{ marginTop: 28, display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["Gratuit pentru beneficiari", "Fără instalare", "Conform Legea 10/1995"].map((t, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#5f5e5a" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
          <div className="fade-up-d2" style={{ flex: 1, maxWidth: 480, minWidth: 280 }}>
            <div style={{ background: "#f8f7f4", borderRadius: 16, border: "1px solid #e8e6df", padding: 24 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f09595" }}/><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF9F27" }}/><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#5DCAA5" }}/>
              </div>
              <div style={{ background: "#fff", borderRadius: 10, padding: 16, marginBottom: 12, border: "1px solid #e8e6df" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Reabilitare Școala Nr. 3</span>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "#E1F5EE", color: "#0F6E56" }}>In grafic</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "#e8e6df", marginBottom: 8 }}><div style={{ width: "68%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg, #1D9E75, #5DCAA5)" }}/></div>
                <div style={{ fontSize: 11, color: "#888780" }}>68% completat — Structură etaj 2</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[{ l: "Documente", v: "21/24", c: "#1a1a18" }, { l: "Alerte", v: "2", c: "#BA7517" }, { l: "Termen", v: "9 apr", c: "#534AB7" }].map((s, i) => (
                  <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 8, padding: 10, border: "1px solid #e8e6df" }}>
                    <div style={{ fontSize: 10, color: "#888780", marginBottom: 2 }}>{s.l}</div>
                    <div style={{ fontSize: i < 2 ? 18 : 14, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#FAEEDA", borderRadius: 8, padding: "8px 12px", borderLeft: "3px solid #EF9F27", fontSize: 12, color: "#633806" }}>⚠ Polița RCA constructor expiră în 8 zile</div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDIBILITY BAR */}
      <section style={{ background: "#f8f7f4", borderTop: "1px solid #e8e6df", borderBottom: "1px solid #e8e6df", padding: "20px 40px" }} className="section-pad">
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[{ v: "Legea 10", s: "Conform legislație" }, { v: "HG 907", s: "Faze documentație" }, { v: "ISC", s: "Pregătit pentru control" }, { v: "GDPR", s: "Date protejate" }].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0F6E56", fontFamily: "'JetBrains Mono',monospace" }}>{x.v}</span>
              <span style={{ fontSize: 12, color: "#888780" }}>{x.s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problema" style={{ padding: "80px 40px", maxWidth: 1120, margin: "0 auto" }} className="section-pad">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Problema pe care o rezolvăm</h2>
          <p style={{ fontSize: 17, color: "#5f5e5a", maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>Pe un șantier din România, informația circulă haotic. Beneficiarul află ultimul, documentele se pierd, și nimeni nu are o imagine clară.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 560, margin: "0 auto" }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} className="problem-item" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 10, background: "#fef8f6", border: "1px solid #f5c4b3", animationDelay: `${i * 0.08}s` }}>
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <span style={{ fontSize: 15, color: "#4a1b0c", fontWeight: 500 }}>{p.text}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 10, background: "#E1F5EE", border: "1px solid #9FE1CB" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#085041" }}>ȘantierulMeu rezolvă toate aceste probleme.</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="functionalitati" style={{ padding: "80px 40px", background: "#f8f7f4", borderTop: "1px solid #e8e6df", borderBottom: "1px solid #e8e6df" }} className="section-pad">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Totul într-un singur loc</h2>
            <p style={{ fontSize: 17, color: "#5f5e5a", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>Construit de oameni care proiectează și urmăresc șantiere în România. Fiecare funcționalitate rezolvă o problemă reală.</p>
          </div>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card" style={{ background: "#fff", borderRadius: 14, padding: 28, border: "1px solid #e8e6df" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#E1F5EE", color: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#5f5e5a", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roluri" style={{ padding: "80px 40px", maxWidth: 1120, margin: "0 auto" }} className="section-pad">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Fiecare rol vede ce-i relevant</h2>
          <p style={{ fontSize: 17, color: "#5f5e5a", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>Aceleași date, perspective diferite. Fiecare actor din proiect are dashboard-ul și permisiunile potrivite.</p>
        </div>
        <div className="roles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {ROLES.map((r, i) => (
            <div key={i} className="role-card" style={{ padding: 24, borderRadius: 14, border: "1px solid #e8e6df", borderTop: `3px solid ${r.color}`, background: "#fff" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: r.color, marginBottom: 8 }}>{r.role}</div>
              <p style={{ fontSize: 13, color: "#5f5e5a", lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "48px 40px", background: "#f8f7f4", borderTop: "1px solid #e8e6df", borderBottom: "1px solid #e8e6df" }} className="section-pad">
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 17, color: "#5f5e5a", lineHeight: 1.7, fontStyle: "italic" }}>"Construim ȘantierulMeu pentru că ne-am săturat să căutăm documente pe WhatsApp, să completăm registrul de șantier de mână, și să aflăm despre probleme când e prea târziu. Suntem proiectanți și ingineri care trăiesc aceste probleme zilnic."</p>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#085041", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 600 }}>AA</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Echipa ȘantierulMeu</div>
              <div style={{ fontSize: 12, color: "#888780" }}>Iași, România</div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNUP CTA */}
      <section id="acces" style={{ padding: "80px 40px", maxWidth: 640, margin: "0 auto", textAlign: "center" }} className="section-pad">
        {!submitted ? (
          <>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Fii printre primii utilizatori</h2>
            <p style={{ fontSize: 17, color: "#5f5e5a", lineHeight: 1.6, marginBottom: 32 }}>Lansăm în curând. Lasă-ne adresa de email și te anunțăm când platforma e gata. Primii 50 de utilizatori primesc acces gratuit 6 luni.</p>
            <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto 16px", flexWrap: "wrap" }}>
              <input type="email" placeholder="adresa@email.ro" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} style={{ flex: 1, minWidth: 200, padding: "14px 18px", borderRadius: 10, border: "1.5px solid #d3d1c7", fontSize: 15, outline: "none", background: "#fff" }} />
              <button onClick={handleSubmit} className="cta-btn" style={{ padding: "14px 28px", borderRadius: 10, background: "#0F6E56", color: "#fff", fontSize: 15, fontWeight: 600 }}>Vreau acces</button>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["Beneficiar", "Diriginte", "Constructor", "Proiectant"].map((r) => (
                <button key={r} onClick={() => setRole(role === r ? "" : r)} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 500, border: role === r ? "1.5px solid #0F6E56" : "1.5px solid #d3d1c7", background: role === r ? "#E1F5EE" : "#fff", color: role === r ? "#0F6E56" : "#5f5e5a", cursor: "pointer", transition: "all .15s ease" }}>{r}</button>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#b4b2a9", marginTop: 16 }}>
              Prin înscriere, ești de acord cu{" "}<span className="legal-link" onClick={() => setLegalModal("terms")}>Termenii și condițiile</span>{" "}și{" "}<span className="legal-link" onClick={() => setLegalModal("privacy")}>Politica de confidențialitate</span>.
            </p>
          </>
        ) : (
          <div style={{ padding: 40 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Mulțumim!</h3>
            <p style={{ fontSize: 16, color: "#5f5e5a", lineHeight: 1.6 }}>Te-ai înscris{role ? ` ca ${role.toLowerCase()}` : ""}. Te vom contacta când platforma e gata.</p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 40px 32px", borderTop: "1px solid #e8e6df", background: "#f8f7f4" }} className="section-pad">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 28 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #1D9E75, #085041)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Șantierul<span style={{ color: "#0F6E56" }}>Meu</span></span>
              </div>
              <p style={{ fontSize: 12, color: "#888780", lineHeight: 1.6, maxWidth: 240 }}>Platforma digitală pentru managementul șantierelor din România.</p>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5f5e5a", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Legal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span className="legal-link" style={{ fontSize: 13 }} onClick={() => setLegalModal("terms")}>Termeni și condiții</span>
                <span className="legal-link" style={{ fontSize: 13 }} onClick={() => setLegalModal("privacy")}>Politica de confidențialitate</span>
                <span className="legal-link" style={{ fontSize: 13 }} onClick={() => setLegalModal("cookies")}>Politica cookies</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5f5e5a", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Utile</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="https://www.anpc.gov.ro" target="_blank" rel="noopener noreferrer" className="legal-link" style={{ fontSize: 13 }}>ANPC</a>
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="legal-link" style={{ fontSize: 13 }}>Soluționarea online a litigiilor</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5f5e5a", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "#888780" }}>
                <span>contact@santierulmeu.ro</span>
                <span>Iași, România</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #e8e6df", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4, background: "#E6F1FB", fontSize: 11, color: "#0C447C", textDecoration: "none", fontWeight: 500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></svg>
                Platforma SOL
              </a>
              <a href="https://www.anpc.gov.ro" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4, background: "#FAEEDA", fontSize: 11, color: "#633806", textDecoration: "none", fontWeight: 500 }}>ANPC</a>
            </div>
            <div style={{ fontSize: 11, color: "#b4b2a9" }}>© 2026 ȘantierulMeu</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
