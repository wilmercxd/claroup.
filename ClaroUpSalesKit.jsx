import { useState } from "react";

const TABS = [
  { id: "inicio", label: "🏠 Inicio", emoji: "🏠" },
  { id: "producto", label: "🛡️ Producto", emoji: "🛡️" },
  { id: "guiones", label: "🎙️ Guiones", emoji: "🎙️" },
  { id: "objeciones", label: "💬 Objeciones", emoji: "💬" },
  { id: "calculadora", label: "💰 Comisiones", emoji: "💰" },
  { id: "proceso", label: "⚙️ Proceso (BO)", emoji: "⚙️" },
];

const PRIMAS = [
  { rango: "$200.001 – $499.999", prima: 16000, diario: 534, comision: 14400, comisionAgente: 7200 },
  { rango: "$500.000 – $1.249.999", prima: 22500, diario: 750, comision: 20250, comisionAgente: 10125 },
  { rango: "$1.250.000 – $1.749.999", prima: 32000, diario: 1067, comision: 28800, comisionAgente: 14400 },
  { rango: "$1.750.000 o más", prima: 38000, diario: 1267, comision: 34200, comisionAgente: 17100 },
];

const OBJECTIONS = [
  {
    obj: "\"No me interesa, gracias\"",
    tipo: "Rechazo inicial",
    color: "#ef4444",
    respuestas: [
      {
        enfoque: "Empatía + Dato impactante",
        guion: "Entiendo perfectamente, [nombre]. Solo permítame 20 segundos: en Colombia se roban un celular cada 5 minutos. Su [modelo del equipo] es una inversión importante y por menos de lo que cuesta un café diario, usted lo protege contra hurto, daños y fallas. ¿Le cuento cómo funciona?"
      },
      {
        enfoque: "Pregunta de impacto",
        guion: "Claro que sí, [nombre]. Solo una pregunta rápida: si mañana le roban su celular o se le cae y se rompe la pantalla, ¿tiene cómo reponerlo de inmediato? Claro up le da esa tranquilidad. Son solo $[costo diario] al día."
      }
    ]
  },
  {
    obj: "\"Es muy caro / No tengo presupuesto\"",
    tipo: "Objeción de precio",
    color: "#f59e0b",
    respuestas: [
      {
        enfoque: "Comparación de valor",
        guion: "Entiendo su preocupación por el precio, [nombre]. Pero veámoslo así: estamos hablando de $[costo diario] al día, menos que un café o un pasaje de bus. Si le roban su [modelo] o se le daña, repararlo le costaría muchísimo más. Claro up es una inversión mínima para proteger una inversión grande."
      },
      {
        enfoque: "Costo de NO tenerlo",
        guion: "[Nombre], le voy a dar un dato: reparar la pantalla de un [modelo] puede costar más de $300.000, y si se lo roban, pierde toda su inversión. Con Claro up, por apenas $[prima mensual] al mes, queda cubierto. ¿No vale la pena esa tranquilidad?"
      }
    ]
  },
  {
    obj: "\"Ya tengo seguro / Ya estoy asegurado\"",
    tipo: "Competencia",
    color: "#3b82f6",
    respuestas: [
      {
        enfoque: "Diferenciación",
        guion: "¡Qué bueno que protege su equipo! Permítame preguntarle: ¿su seguro actual le cubre hurto simple, daño por caída Y falla eléctrica? ¿Le dan hasta 2 reemplazos en 12 meses? ¿Le envían el equipo a domicilio? Claro up tiene todo eso, y el deducible es solo del 25% en daños, menor que la mayoría del mercado."
      }
    ]
  },
  {
    obj: "\"Déjeme pensarlo\"",
    tipo: "Indecisión",
    color: "#8b5cf6",
    respuestas: [
      {
        enfoque: "Urgencia + Beneficio",
        guion: "Por supuesto, [nombre]. Solo tenga en cuenta que la cobertura empieza desde el momento en que lo activa. Si algo le pasa a su equipo mañana y no tiene el seguro, no habría forma de protegerlo después. Hoy es el mejor momento para activarlo. ¿Continuamos?"
      },
      {
        enfoque: "Facilidad de cancelación",
        guion: "Entiendo, [nombre]. Lo bueno es que Claro up no tiene permanencia: si usted lo prueba y decide que no lo quiere, lo cancela en cualquier momento llamando al *611 o en un CAV. No pierde nada probándolo, pero sí gana tranquilidad desde hoy."
      }
    ]
  },
  {
    obj: "\"Los seguros nunca sirven / Nunca pagan\"",
    tipo: "Desconfianza",
    color: "#ec4899",
    respuestas: [
      {
        enfoque: "Respaldo + Proceso claro",
        guion: "[Nombre], entiendo esa desconfianza. Claro up está respaldado por Allianz Seguros, una de las aseguradoras más grandes del mundo. El proceso es muy sencillo: usted llama al 01-800-093-0943, reporta lo que pasó, y en 2 a 5 días hábiles le envían su equipo de reemplazo a domicilio. Sin vueltas."
      }
    ]
  },
  {
    obj: "\"No necesito seguro, soy cuidadoso\"",
    tipo: "Falsa seguridad",
    color: "#14b8a6",
    respuestas: [
      {
        enfoque: "Escenario de hurto",
        guion: "Me alegra que sea tan cuidadoso, [nombre]. Pero lamentablemente el hurto no depende de usted. En Colombia roban un celular cada 5 minutos, y no importa qué tan cuidadoso sea. Además, Claro up también le cubre fallas eléctricas o mecánicas después de la garantía. Es protección completa."
      }
    ]
  },
  {
    obj: "\"¿Cuánto es el deducible? Eso es mucho\"",
    tipo: "Objeción de deducible",
    color: "#0ea5e9",
    respuestas: [
      {
        enfoque: "Comparación de pérdida total",
        guion: "El deducible en caso de daño es del 25% del valor del equipo, y en hurto es del 40%. Pero piénselo así: sin seguro, usted pierde el 100%. Con Claro up, paga solo una fracción y recibe un equipo nuevo o remanufacturado con 1 año de garantía. La diferencia es enorme."
      }
    ]
  }
];

const SCRIPTS = [
  {
    titulo: "🔥 Apertura Gancho — Después de cerrar la venta del terminal",
    contexto: "Justo después de confirmar la venta del equipo, antes de pasar a datos finales",
    guion: `¡Excelente elección con su [MODELO DEL EQUIPO], [nombre]! Ahora, le tengo una muy buena noticia: Claro tiene un beneficio exclusivo para proteger su nuevo celular contra hurto, daños y fallas. Se llama Claro up y le cuesta desde $[COSTO DIARIO] al día. ¿Le cuento cómo funciona?`,
    tip: "Usa el nombre del modelo específico del equipo que acaba de comprar. Eso personaliza y conecta emocionalmente con la compra que acaba de hacer."
  },
  {
    titulo: "💡 Presentación de Beneficios — El pitch de 30 segundos",
    contexto: "Cuando el cliente dice 'sí, cuénteme' o muestra interés",
    guion: `Claro up es un seguro respaldado por Allianz Seguros que le protege su [MODELO] en tres situaciones: si se lo roban, si se le daña por una caída, o si tiene una falla eléctrica después de la garantía.

Lo mejor es que:
✅ Le cubren hasta 2 veces en 12 meses
✅ Le envían el equipo de reemplazo a su casa en 2 a 5 días hábiles
✅ Y todo esto por solo $[PRIMA MENSUAL] al mes, que son apenas $[COSTO DIARIO] diarios

Toda la información del seguro la encuentra en www.claroup.co`,
    tip: "Enfatiza los 3 beneficios clave: cobertura amplia, rapidez de reemplazo y precio bajo. El 'desde $534 diarios' es tu mejor argumento."
  },
  {
    titulo: "📋 Guion de Cierre y Registro — Formalización",
    contexto: "Cuando el cliente acepta, pasar al registro formal",
    guion: `Perfecto, [nombre]. Le informo que esta llamada está siendo grabada por su seguridad y la calidad de nuestro servicio.

Voy a necesitar confirmar algunos datos:
• Nombre completo: [...]
• Tipo y número de documento: [...]
• Dirección: [...]
• Ciudad: [...]
• Correo electrónico: [...]
• Número de la línea postpago asociada: [...]

Ahora, ¿usted ha decidido contratar la Póliza Claro up para proteger su celular [MARCA], [MODELO] con IMEI [IMEI] en caso de hurto, hurto calificado, daño físico y falla?

La prima mensual corresponde a $[PRIMA] mensuales y se cobrará en su factura de telefonía móvil Claro.

¿Entiende que la vigencia es mensual con renovación automática mes a mes?`,
    tip: "Este es el guion regulatorio obligatorio. NO se puede omitir ningún campo. Lee con naturalidad, no como robot."
  },
  {
    titulo: "📜 Cierre Legal — Habeas Data y Confirmación Final",
    contexto: "Parte final obligatoria antes de cerrar",
    guion: `Le comento también que:
• La póliza cubre hasta 2 reemplazos en 12 meses consecutivos
• Para reportar un siniestro llama al 01-800-093-0943 o visita www.claroup.co
• Toda la información está en la póliza y certificado que recibirá próximamente
• Puede cancelar en cualquier momento en un CAV Claro o llamando al *611
• Tiene 5 días hábiles para retractarse desde la contratación

¿Me confirma la aceptación de ser asegurado bajo la Póliza Claro up en los términos informados?

[Esperar respuesta afirmativa]

Finalmente, Allianz Seguros y Claro tratarán sus datos personales para administrar la póliza. ¿Autoriza el tratamiento de sus datos personales?

¿Y autoriza la transferencia de datos a intermediarios, reaseguradores y Asurion Colombia?

¡Listo, [nombre]! Muchas gracias por su tiempo y por proteger su inversión. Le deseo un(a) feliz [día/tarde/noche].`,
    tip: "Las dos autorizaciones de datos son OBLIGATORIAS. Si el cliente dice NO a cualquiera, no se puede completar la venta."
  }
];

function fmt(n) {
  return new Intl.NumberFormat("es-CO").format(n);
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} style={{
      background: copied ? "#22c55e" : "rgba(220,38,38,0.1)",
      color: copied ? "#fff" : "#dc2626",
      border: "none",
      borderRadius: 8,
      padding: "6px 14px",
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    }}>
      {copied ? "✓ Copiado" : "📋 Copiar guion"}
    </button>
  );
}

function TabInicio() {
  const stats = [
    { icon: "⏱️", value: "Cada 5 min", label: "Se roba un celular en Colombia" },
    { icon: "💰", value: "Desde $534", label: "Costo diario del seguro" },
    { icon: "🔄", value: "2 siniestros", label: "Cubiertos en 12 meses" },
    { icon: "📦", value: "2-5 días", label: "Envío equipo de reemplazo" },
  ];

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
        borderRadius: 20,
        padding: "40px 32px",
        color: "#fff",
        marginBottom: 28,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "rgba(255,255,255,0.06)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -60, left: -30, width: 160, height: 160, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, marginBottom: 8 }}>Seguro Celular</div>
          <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.1, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Claro<span style={{ color: "#fbbf24" }}>-</span>up</div>
          <div style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.5, maxWidth: 500 }}>
            Tu guía completa para vender protección. No vendemos un gasto — vendemos tranquilidad.
          </div>
          <div style={{ marginTop: 20, padding: "12px 18px", background: "rgba(255,255,255,0.15)", borderRadius: 12, fontSize: 14, fontStyle: "italic", borderLeft: "3px solid #fbbf24" }}>
            "No estamos aquí para subir el precio del dispositivo; estamos aquí para bajar el costo del desastre"
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px 16px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#dc2626", fontFamily: "'Outfit', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: "1px solid #f3f4f6",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#111", fontFamily: "'Outfit', sans-serif" }}>🎯 Reglas de Oro del Vendedor Claro up</h3>
        {[
          { num: "1", rule: "Siempre ofrece Claro up después de cerrar la venta del terminal", detail: "El cliente acaba de invertir, está receptivo a proteger su compra." },
          { num: "2", rule: "Habla en costo diario, NO en prima mensual", detail: "\"$534 al día\" suena mucho mejor que \"$16.000 al mes\"." },
          { num: "3", rule: "Usa el nombre del modelo del equipo", detail: "\"Proteger su Samsung S24\" conecta más que \"proteger su celular\"." },
          { num: "4", rule: "Menciona el hurto como primer beneficio", detail: "Es el miedo #1. En Colombia se roba un celular cada 5 minutos." },
          { num: "5", rule: "Cierra con facilidad de cancelación", detail: "\"Sin permanencia, cancela cuando quiera\" elimina la barrera final." },
        ].map((r, i) => (
          <div key={i} style={{
            display: "flex",
            gap: 14,
            marginBottom: 14,
            padding: "12px 14px",
            background: i % 2 === 0 ? "#fef2f2" : "#f9fafb",
            borderRadius: 12,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#dc2626", color: "#fff", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, flexShrink: 0,
            }}>{r.num}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111", marginBottom: 2 }}>{r.rule}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{r.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabProducto() {
  const [selectedPrima, setSelectedPrima] = useState(null);

  return (
    <div>
      <div style={{
        background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>🛡️ ¿Qué cubre Claro up?</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
          {[
            { icon: "🔓", title: "Hurto y Hurto Calificado", desc: "Si le roban el celular al cliente, queda cubierto. Deducible: 40%", color: "#dc2626" },
            { icon: "📱", title: "Daño Físico", desc: "Caídas, pantalla rota, daño por líquidos. Deducible: 25%", color: "#f59e0b" },
            { icon: "⚡", title: "Falla Eléctrica/Mecánica", desc: "Después de vencer la garantía del fabricante. Deducible: 25%", color: "#3b82f6" },
          ].map((c, i) => (
            <div key={i} style={{
              padding: "20px 16px",
              borderRadius: 14,
              border: `2px solid ${c.color}20`,
              background: `${c.color}08`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: c.color, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.4 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>❌ ¿Qué NO cubre?</h3>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>Importante saberlo para NO prometer de más al cliente</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Pérdida", "Descuido", "Desaparición misteriosa", "Daño cosmético", "Uso abusivo del equipo"].map((e, i) => (
            <span key={i} style={{
              padding: "6px 14px", borderRadius: 20,
              background: "#fef2f2", color: "#dc2626",
              fontSize: 13, fontWeight: 600,
            }}>✗ {e}</span>
          ))}
        </div>
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: "'Outfit', sans-serif" }}>💵 Tabla de Primas — Toca para ver detalles</h3>
        {PRIMAS.map((p, i) => (
          <div key={i}
            onClick={() => setSelectedPrima(selectedPrima === i ? null : i)}
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              marginBottom: 10,
              cursor: "pointer",
              background: selectedPrima === i ? "#dc262610" : "#f9fafb",
              border: selectedPrima === i ? "2px solid #dc2626" : "2px solid transparent",
              transition: "all 0.2s",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{p.rango}</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Prima: ${fmt(p.prima)}/mes</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#dc2626", fontFamily: "'Outfit', sans-serif" }}>${fmt(p.diario)}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>por día</div>
              </div>
            </div>
            {selectedPrima === i && (
              <div style={{ marginTop: 14, padding: "12px 14px", background: "#fff", borderRadius: 10, fontSize: 13, lineHeight: 1.6, color: "#374151" }}>
                <strong>💬 Cómo presentarlo al cliente:</strong><br />
                "Su equipo de <strong>{p.rango}</strong> queda protegido por solo <strong>${fmt(p.diario)} al día</strong>. Eso es menos de lo que cuesta un tinto. Y si algo le pasa, le reemplazan el equipo en 2 a 5 días."<br /><br />
                <strong>📊 Tu comisión como agente:</strong> ${fmt(p.comisionAgente)}
              </div>
            )}
          </div>
        ))}
        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, fontStyle: "italic" }}>
          * Cifras en pesos colombianos, incluyen IVA. Prima calculada sobre precio sin subsidios ni descuentos.
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, #1e40af 0%, #1e3a5f 100%)",
        borderRadius: 16, padding: 24, color: "#fff",
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, fontFamily: "'Outfit', sans-serif" }}>🏆 Claro up vs Competencia</h3>
        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Deducible daño", claro: "25%", comp: "30-40%" },
              { label: "Siniestros/12 meses", claro: "2", comp: "1-2" },
              { label: "Falla eléctrica", claro: "✅ Sí", comp: "❌ No (Éxito)" },
              { label: "Daño líquido", claro: "✅ Sí", comp: "❌ No (Éxito)" },
              { label: "Pantalla rota", claro: "✅ Sí", comp: "❌ No (Éxito)" },
              { label: "Envío domicilio", claro: "✅ Sí", comp: "Varía" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 8 }}>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{r.label}</div>
                <div style={{ fontWeight: 700 }}>Claro up: {r.claro}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Otros: {r.comp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabGuiones() {
  const [expandedScript, setExpandedScript] = useState(0);

  return (
    <div>
      <div style={{
        background: "#fef2f2", borderRadius: 14, padding: "14px 18px",
        marginBottom: 20, fontSize: 13, color: "#991b1b",
        border: "1px solid #fecaca", lineHeight: 1.5,
      }}>
        💡 <strong>Tip Pro:</strong> Adapta el guion con el NOMBRE del cliente y el MODELO del equipo que acaba de comprar. Nunca leas como robot — conversa como si le estuvieras recomendando algo a un amigo.
      </div>

      {SCRIPTS.map((s, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 16, marginBottom: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
          overflow: "hidden",
        }}>
          <div
            onClick={() => setExpandedScript(expandedScript === i ? null : i)}
            style={{
              padding: "16px 20px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: expandedScript === i ? "#dc262608" : "transparent",
            }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111", fontFamily: "'Outfit', sans-serif" }}>{s.titulo}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{s.contexto}</div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#dc262615", color: "#dc2626",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700,
              transform: expandedScript === i ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}>▼</div>
          </div>

          {expandedScript === i && (
            <div style={{ padding: "0 20px 20px" }}>
              <div style={{
                background: "#111827", color: "#e5e7eb", borderRadius: 12,
                padding: "18px 20px", fontSize: 14, lineHeight: 1.7,
                fontFamily: "'JetBrains Mono', monospace",
                whiteSpace: "pre-wrap", marginBottom: 14,
              }}>
                {s.guion}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <CopyButton text={s.guion} />
                <div style={{
                  background: "#fef3c7", borderRadius: 10, padding: "8px 14px",
                  fontSize: 12, color: "#92400e", maxWidth: 400, lineHeight: 1.4,
                }}>
                  💡 <strong>Tip:</strong> {s.tip}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TabObjeciones() {
  const [expandedObj, setExpandedObj] = useState(null);

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)",
        borderRadius: 16, padding: "24px 20px", color: "#fff", marginBottom: 24,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>💬 Playbook de Objeciones</div>
        <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>
          Cada objeción es una oportunidad disfrazada. Aquí tienes las respuestas probadas para las 7 objeciones más comunes.
        </div>
      </div>

      {OBJECTIONS.map((o, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 16, marginBottom: 14,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: expandedObj === i ? `2px solid ${o.color}` : "1px solid #f3f4f6",
          overflow: "hidden", transition: "all 0.2s",
        }}>
          <div
            onClick={() => setExpandedObj(expandedObj === i ? null : i)}
            style={{ padding: "16px 20px", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  padding: "4px 10px", borderRadius: 8,
                  background: `${o.color}15`, color: o.color,
                  fontSize: 11, fontWeight: 700,
                }}>{o.tipo}</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{o.obj}</span>
              </div>
              <span style={{ fontSize: 18, color: "#9ca3af" }}>{expandedObj === i ? "−" : "+"}</span>
            </div>
          </div>

          {expandedObj === i && (
            <div style={{ padding: "0 20px 20px" }}>
              {o.respuestas.map((r, j) => (
                <div key={j} style={{
                  marginBottom: 12,
                  borderRadius: 12,
                  border: `1px solid ${o.color}20`,
                  overflow: "hidden",
                }}>
                  <div style={{
                    background: `${o.color}10`,
                    padding: "8px 14px",
                    fontSize: 12, fontWeight: 700, color: o.color,
                  }}>
                    Enfoque: {r.enfoque}
                  </div>
                  <div style={{
                    padding: "14px 16px",
                    fontSize: 14, lineHeight: 1.6, color: "#374151",
                    background: "#fafafa",
                  }}>
                    {r.guion}
                  </div>
                  <div style={{ padding: "8px 16px", background: "#fafafa", borderTop: "1px solid #f3f4f6" }}>
                    <CopyButton text={r.guion} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TabCalculadora() {
  const [selectedPrima, setSelectedPrima] = useState(0);
  const [ventas, setVentas] = useState(10);

  const p = PRIMAS[selectedPrima];
  const comisionAgente = p.comisionAgente;
  const totalMes = comisionAgente * ventas;

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
        borderRadius: 16, padding: "24px 20px", color: "#fff", marginBottom: 24,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>💰 Calculadora de Comisiones</div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>
          Calcula cuánto ganas vendiendo Claro up. La comisión se paga por cada venta efectiva.
        </div>
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
      }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Selecciona el rango de precio del equipo:</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          {PRIMAS.map((pr, i) => (
            <div key={i}
              onClick={() => setSelectedPrima(i)}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                cursor: "pointer",
                textAlign: "center",
                background: selectedPrima === i ? "#dc2626" : "#f9fafb",
                color: selectedPrima === i ? "#fff" : "#374151",
                border: selectedPrima === i ? "2px solid #dc2626" : "2px solid #e5e7eb",
                transition: "all 0.2s",
              }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{pr.rango}</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Prima: ${fmt(pr.prima)}</div>
            </div>
          ))}
        </div>

        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>¿Cuántas ventas Claro up al mes?</h4>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
          <input
            type="range" min="1" max="50" value={ventas}
            onChange={(e) => setVentas(Number(e.target.value))}
            style={{ flex: 1, accentColor: "#dc2626" }}
          />
          <div style={{
            width: 56, height: 42, display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 10, background: "#dc2626", color: "#fff",
            fontWeight: 800, fontSize: 20, fontFamily: "'Outfit', sans-serif",
          }}>{ventas}</div>
        </div>
        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 20 }}>Arrastra para ajustar</div>
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, padding: 24, marginBottom: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
      }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>💵 Comisión por Venta según Prima</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20 }}>
          {PRIMAS.map((pr, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "14px 12px", borderRadius: 12,
              background: selectedPrima === i ? "#dc262610" : "#f9fafb",
              border: selectedPrima === i ? "2px solid #dc2626" : "1px solid #e5e7eb",
            }}>
              <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>Prima ${fmt(pr.prima)}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: selectedPrima === i ? "#dc2626" : "#374151", fontFamily: "'Outfit', sans-serif" }}>${fmt(pr.comisionAgente)}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>por venta</div>
            </div>
          ))}
        </div>

        <div style={{
          background: "linear-gradient(135deg, #dc2626, #991b1b)",
          borderRadius: 14, padding: "20px 24px", color: "#fff", textAlign: "center",
        }}>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>🎉 Total con {ventas} ventas de prima ${fmt(p.prima)}</div>
          <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
            ${fmt(totalMes)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
            ${fmt(comisionAgente)} × {ventas} ventas
          </div>
        </div>

        <div style={{ marginTop: 16, padding: "12px 16px", background: "#fffbeb", borderRadius: 10, fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
          ⚠️ <strong>Condiciones:</strong> No se pagan servicios cancelados el mismo mes. La venta debe ser transparente y con consentimiento del cliente. Cualquier PQR es motivo de descargos.
        </div>
      </div>
    </div>
  );
}

function TabProceso() {
  const steps = [
    { num: "1", title: "Ingresar a AC", desc: "Abre el sistema de gestión con el módulo de la cuenta del cliente." },
    { num: "2", title: "Buscar al cliente", desc: "Ingresa el criterio de búsqueda (cédula, línea, etc.) y presiona Buscar." },
    { num: "3", title: "Contrato / Servicios", desc: "Ingresa a la sección de Contrato y luego a Servicios del cliente." },
    { num: "4", title: "Seleccionar Asg/Reg", desc: "Busca la opción de Asignación/Registro de servicios." },
    { num: "5", title: "Otros Paquetes", desc: "Abre la sección de Otros Paquetes donde aparecen las opciones de Claro up." },
    { num: "6", title: "Seleccionar Claro Up Full", desc: "Se despliegan las opciones. Se habilita solo la opción que corresponda según el valor del equipo." },
    { num: "7", title: "Seleccionar valor del deducible", desc: "Elige el valor que corresponda al rango de precio del equipo vendido." },
    { num: "8", title: "Revisar Servicios a Asignar", desc: "Presiona 'Revisar Servicios a ser Asignados' para confirmar." },
    { num: "9", title: "Asignar servicio", desc: "Selecciona el servicio y presiona 'Asignar los servicios listados'." },
    { num: "10", title: "Verificar activación", desc: "Confirma que el servicio aparece activo en la lista de servicios y en ticklers." },
  ];

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #2563eb 0%, #1e3a5f 100%)",
        borderRadius: 16, padding: "24px 20px", color: "#fff", marginBottom: 24,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>⚙️ Activación en Sistema</div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>
          Paso a paso para activar Claro up Full en el sistema AC después de que el cliente acepte.
        </div>
        <div style={{
          marginTop: 12, padding: "8px 14px", background: "rgba(255,255,255,0.15)",
          borderRadius: 8, fontSize: 13, fontWeight: 700,
          display: "inline-block", border: "1px solid rgba(255,255,255,0.3)",
        }}>📌 Este proceso aplica únicamente para Backoffice</div>
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
        marginBottom: 20,
      }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 16, marginBottom: i < steps.length - 1 ? 0 : 0,
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "#2563eb", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: 14, flexShrink: 0,
              }}>{s.num}</div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, height: 28, background: "#dbeafe", margin: "4px 0" }} />
              )}
            </div>
            <div style={{ paddingBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.4, marginTop: 2 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "#fff", borderRadius: 16, padding: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
        marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, fontFamily: "'Outfit', sans-serif" }}>📞 Datos Clave para el Cliente</h3>
        {[
          { label: "Línea de siniestros Claro up", value: "01-800-093-0943", icon: "📱" },
          { label: "Página web", value: "www.claroup.co", icon: "🌐" },
          { label: "Cancelación", value: "CAV Claro o *611", icon: "❌" },
          { label: "Retracto", value: "5 días hábiles después de contratación", icon: "🔄" },
          { label: "Aseguradora", value: "Allianz Seguros S.A.", icon: "🏦" },
          { label: "Tiempo reemplazo", value: "2 a 5 días hábiles a domicilio", icon: "📦" },
        ].map((d, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 14px", borderRadius: 10,
            background: i % 2 === 0 ? "#f0f9ff" : "#fff",
            marginBottom: 6,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{d.icon}</span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>{d.label}</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClaroUpTool() {
  const [activeTab, setActiveTab] = useState("inicio");

  const renderTab = () => {
    switch (activeTab) {
      case "inicio": return <TabInicio />;
      case "producto": return <TabProducto />;
      case "guiones": return <TabGuiones />;
      case "objeciones": return <TabObjeciones />;
      case "calculadora": return <TabCalculadora />;
      case "proceso": return <TabProceso />;
      default: return <TabInicio />;
    }
  };

  return (
    <div style={{
      fontFamily: "'Outfit', 'Segoe UI', sans-serif",
      background: "#f5f5f5",
      minHeight: "100vh",
      maxWidth: 720,
      margin: "0 auto",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{
        background: "#fff",
        padding: "12px 20px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "#dc2626", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 16,
          }}>C</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "#111", lineHeight: 1.1 }}>Claro<span style={{ color: "#dc2626" }}>-</span>up</div>
            <div style={{ fontSize: 10, color: "#9ca3af", letterSpacing: 1, textTransform: "uppercase" }}>Kit de Ventas TMK</div>
          </div>
        </div>
        <div style={{
          padding: "4px 10px", borderRadius: 6,
          background: "#dcfce7", color: "#166534",
          fontSize: 11, fontWeight: 700,
        }}>CXD 2026</div>
      </div>

      {/* Tab navigation */}
      <div style={{
        display: "flex",
        overflowX: "auto",
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 8px",
        position: "sticky",
        top: 61,
        zIndex: 99,
      }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "12px 14px",
            fontSize: 13,
            fontWeight: activeTab === t.id ? 700 : 500,
            color: activeTab === t.id ? "#dc2626" : "#6b7280",
            background: "transparent",
            border: "none",
            borderBottom: activeTab === t.id ? "3px solid #dc2626" : "3px solid transparent",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px" }}>
        {renderTab()}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "20px 16px 32px",
        fontSize: 11, color: "#9ca3af",
      }}>
        Herramienta interna CXD — Seguro Celular Claro up · Allianz Seguros S.A.<br />
        Conexiones Digitales BPO · Campaña TyT Claro Colombia
      </div>
    </div>
  );
}
