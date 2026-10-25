import { useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  Code2,
  Cpu,
  Home,
  Instagram,
  Mail,
  MessageCircle,
  Scale,
  ShieldCheck,
  Send,
  Server,
  Settings,
  Wrench,
} from "lucide-react"
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { Dock } from "@/components/ui/dock-two"

const skillList = [
  { name: "C / C++", id: "cplusplus" },
  { name: "SQL", id: "sql" },
  { name: "Ensamblador", id: "ensamblador" },
  { name: "HTML, CSS & JS", id: "web" },
  { name: "Python", id: "python" },
  { name: "Java", id: "java" },
  { name: "DevOps", id: "devops" },
  { name: "React", id: "react" },
  { name: "Node.js", id: "node" },
]

const terms = [
  {
    title: "1. Propiedad Intelectual",
    paragraphs: [
      <><strong className="highlight">Código propietario:</strong> Todo sistema o aplicación creada es de código propietario. La decisión de hacerlo Open-Source corresponde exclusivamente al desarrollador.</>,
      <><strong className="highlight">Mantenimiento:</strong> Las actualizaciones y mantenimiento post-entrega se facturarán según tarifas vigentes y tiempo de trabajo requerido.</>,
    ],
  },
  {
    title: "2. Licencias de Uso",
    paragraphs: [
      <>La compra del servicio de desarrollo otorga <strong className="highlight">licencia de uso</strong>, no propiedad del software.</>,
      <>La adquisición de derechos de autor requiere pago adicional, transfiriendo todas las responsabilidades de mantenimiento al comprador.</>,
    ],
  },
  {
    title: "3. Transferencia de Propiedad",
    paragraphs: [
      <>La venta de propiedad intelectual libera al desarrollador de cualquier obligación de mantenimiento, salvo contrato específico.</>,
      <>Modificaciones posteriores por el cliente o terceros anulan la responsabilidad técnica del desarrollador original.</>,
    ],
  },
  {
    title: "4. Responsabilidades Técnicas",
    paragraphs: [
      <>El desarrollador garantiza entrega en <strong className="highlight">condiciones óptimas</strong> según especificaciones acordadas.</>,
      <>Errores por modificaciones no autorizadas requerirán nuevo contrato de mantenimiento para su corrección.</>,
    ],
  },
  {
    title: "5. Tarifación y Mantenimiento",
    paragraphs: [
      <>Servicios de mantenimiento se facturan según <strong className="highlight">tarifas vigentes</strong> al momento de la solicitud.</>,
      <>Diagnósticos sin solución viable solo generarán cobro por la revisión inicial.</>,
    ],
  },
  {
    title: "6. Confidencialidad",
    paragraphs: [
      <>Se mantendrá estricta confidencialidad sobre proyectos y código, excepto cuando expresamente se libere como Open-Source por decisión del desarrollador.</>,
    ],
  },
  {
    title: "7. Gestión Contractual",
    paragraphs: [
      <>Los contratos son <strong className="highlight">vinculantes</strong> hasta su finalización según términos acordados.</>,
      <>Terminación anticipada por el cliente requerirá compensación por trabajo realizado y entrega de código en estado actual.</>,
    ],
  },
]

const privacySections = [
  {
    title: "1. Recopilación de Datos",
    paragraphs: ["Registramos información de contacto (email, teléfono) y detalles del proyecto proporcionados voluntariamente por el cliente.", "Conservamos registros de conversaciones (chats, emails) como respaldo legal, almacenados localmente en dispositivos protegidos."],
  },
  {
    title: "2. Uso de la Información",
    paragraphs: ["Los datos se utilizan exclusivamente para:"],
    details: ["Ejecución de servicios contratados", "Comunicación profesional", "Respaldo legal de acuerdos"],
  },
  {
    title: "3. Almacenamiento Seguro",
    paragraphs: ["Capturas de pantalla y registros de chat se almacenan en:"],
    details: ["Dispositivos locales con cifrado AES-256", "Acceso restringido mediante autenticación biométrica", "Período de retención: 5 años tras la finalización del contrato"],
  },
  {
    title: "4. Compartición de Datos",
    paragraphs: ["Los datos solo podrán ser revelados:"],
    details: ["Por requerimiento judicial", "En procesos legales donde sean evidencia esencial", "Con consentimiento explícito por escrito del cliente"],
  },
  {
    title: "5. Derechos del Usuario",
    paragraphs: ["Puede solicitar:"],
    details: ["Acceso a sus datos personales almacenados", "Rectificación de información inexacta", "Eliminación de datos no esenciales", "Excepciones: datos necesarios para cumplimiento legal o resolución de disputas activas"],
  },
  {
    title: "6. Cookies y Tecnología",
    paragraphs: ["Este sitio web no utiliza cookies de seguimiento.", "Solo empleamos cookies técnicas esenciales para funcionalidad básica."],
  },
  {
    title: "7. Medidas de Seguridad",
    paragraphs: ["Implementamos:"],
    details: ["Cifrado de extremo a extremo en comunicaciones", "Copias de seguridad en frío sin conexión a internet", "Autenticación de dos factores para acceso a datos"],
  },
]

function useRevealOnScroll() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>(".reveal")]
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-visible")
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12 })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname, reducedMotion])
}

function scrollToSection(id: string, reducedMotion: boolean | null) {
  const section = document.getElementById(id)
  if (!section) return

  const top = section.getBoundingClientRect().top + window.scrollY - 32
  window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" })
}

function ParticleField() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = document.querySelector<HTMLCanvasElement>(".particle-field")
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; hue: number }[] = []
    let width = 0
    let height = 0
    let frame = 0
    let stopped = false
    let pointerX = -1000
    let pointerY = -1000

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      const count = Math.min(92, Math.max(30, Math.floor(width / 16)))
      while (particles.length < count) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.55,
          radius: Math.random() * 1.5 + 0.55,
          hue: Math.random() > 0.5 ? 338 : 194,
        })
      }
      particles.length = count
    }

    const draw = () => {
      if (stopped) return
      context.clearRect(0, 0, width, height)
      particles.forEach((particle, index) => {
        const pointerDistanceX = pointerX - particle.x
        const pointerDistanceY = pointerY - particle.y
        const pointerDistance = Math.hypot(pointerDistanceX, pointerDistanceY)
        if (pointerDistance < 190 && pointerDistance > 0) {
          const influence = (1 - pointerDistance / 190) * 0.025
          particle.vx += (pointerDistanceX / pointerDistance) * influence
          particle.vy += (pointerDistanceY / pointerDistance) * influence
        }
        particle.vx *= 0.995
        particle.vy *= 0.995
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        context.beginPath()
        const pulse = 0.72 + Math.sin(performance.now() * 0.0015 + index) * 0.18
        context.fillStyle = `hsla(${particle.hue}, 90%, 76%, ${pulse})`
        context.shadowBlur = 16
        context.shadowColor = `hsla(${particle.hue}, 90%, 72%, 0.48)`
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
        context.shadowBlur = 0

        for (let otherIndex = index + 1; otherIndex < particles.length; otherIndex += 1) {
          const other = particles[otherIndex]
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance > 145) continue
          context.beginPath()
          context.strokeStyle = `rgba(133, 177, 220, ${(1 - distance / 145) * 0.18})`
          context.lineWidth = 0.7
          context.moveTo(particle.x, particle.y)
          context.lineTo(other.x, other.y)
          context.stroke()
        }

        if (pointerDistance < 190) {
          context.beginPath()
          context.strokeStyle = `rgba(170, 195, 255, ${(1 - pointerDistance / 190) * 0.28})`
          context.lineWidth = 0.85
          context.moveTo(particle.x, particle.y)
          context.lineTo(pointerX, pointerY)
          context.stroke()
        }
      })
      frame = window.requestAnimationFrame(draw)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopped = true
        window.cancelAnimationFrame(frame)
      } else if (stopped) {
        stopped = false
        frame = window.requestAnimationFrame(draw)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    const onPointerLeave = () => {
      pointerX = -1000
      pointerY = -1000
    }

    resize()
    frame = window.requestAnimationFrame(draw)
    window.addEventListener("resize", resize, { passive: true })
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => {
      stopped = true
      window.cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [reducedMotion])

  return <canvas className="particle-field" aria-hidden="true" />
}

function LegalHubPage() {
  return (
    <main className="legacy-page legal-hub">
      <p className="eyebrow">INFORMACIÓN Y TRANSPARENCIA</p>
      <h1 className="glass reveal">Centro legal</h1>
      <p className="legal-hub-intro">Consulta las condiciones de los servicios y cómo se trata la información personal.</p>
      <div className="legal-hub-links">
        <Link className="legal-hub-link glass reveal" to="/terminos">
          <Scale aria-hidden="true" />
          <span><strong>Términos y condiciones</strong><small>Condiciones aplicables a los servicios y proyectos.</small></span>
          <span className="method-arrow" aria-hidden="true">↗</span>
        </Link>
        <Link className="legal-hub-link glass reveal" to="/politica-de-privacidad">
          <ShieldCheck aria-hidden="true" />
          <span><strong>Política de privacidad</strong><small>Información sobre el uso, conservación y protección de datos.</small></span>
          <span className="method-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
      <section className="legal-rights glass reveal" id="derechos">
        <h2>Consultas y derechos sobre tus datos</h2>
        <p>Para ejercer tus derechos o realizar una consulta relacionada con la privacidad, escribe a <a href="mailto:DantalionLord@proton.me">DantalionLord@proton.me</a>.</p>
        <Link className="text-link" to="/politica-de-privacidad">Lee la política de privacidad <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  )
}

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="app-page">
      <section id="inicio" className="hero-section">
        <div className="hero-copy reveal">
          <div className="availability"><span className="availability-dot" /> DISPONIBLE PARA PROYECTOS</div>
          <p className="eyebrow">DESARROLLO · SISTEMAS · SOPORTE</p>
          <h1>Tecnología que<br />hace <span className="text-gradient">avanzar</span><br />tus ideas.</h1>
          <p className="hero-description">Desarrollo de software y soporte TI para convertir problemas complejos en soluciones simples, útiles y hechas a tu medida.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contacto">Empecemos un proyecto <span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href="#servicios">Explorar servicios <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-note"><span className="note-line" /> Ideas claras. Código sólido. Resultados reales.</div>
        </div>
        <div className="hero-visual reveal" aria-label="Perfil de Dantalion, desarrollador de software">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-glow" />
          <div className="profile-frame">
            <img src="/img/profile-new.jpg" alt="Retrato de Dantalion" className="profile-img" />
            <span className="profile-index">01 / CREATOR</span>
          </div>
          <div className="floating-card floating-card-top"><span className="floating-icon" aria-hidden="true">✳</span><span><strong>Soluciones</strong><small>pensadas para ti</small></span></div>
          <div className="floating-card floating-card-bottom"><span className="code-pulse" /><span><strong>Software & TI</strong><small>de la idea a producción</small></span></div>
        </div>
        <a className="scroll-cue" href="#servicios"><span /> DESLIZA PARA EXPLORAR</a>
      </section>

      <section id="servicios" className="content-section services-section">
        <div className="section-heading reveal">
          <p className="eyebrow">LO QUE PUEDO HACER</p>
          <h2>Soluciones para cada <span className="text-gradient">desafío.</span></h2>
          <p>El enfoque correcto, las herramientas adecuadas y atención al detalle en cada etapa.</p>
        </div>
        <div className="services-grid">
          <article className="service-card glass reveal">
            <div className="card-topline"><span className="service-number">01</span><Code2 className="service-icon" aria-hidden="true" /></div>
            <h3>Desarrollo de software</h3><p>Herramientas y aplicaciones personalizadas que se adaptan a tus procesos y objetivos.</p>
            <Link to="/tarifas" className="text-link">Explorar tarifas <span aria-hidden="true">↗</span></Link>
          </article>
          <article className="service-card glass reveal">
            <div className="card-topline"><span className="service-number">02</span><Server className="service-icon" aria-hidden="true" /></div>
            <h3>Sistemas & mantenimiento</h3><p>Optimización, actualizaciones y mantenimiento para Windows, Linux y Android.</p>
            <Link to="/tarifas" className="text-link">Explorar tarifas <span aria-hidden="true">↗</span></Link>
          </article>
          <article className="service-card glass reveal">
            <div className="card-topline"><span className="service-number">03</span><Wrench className="service-icon" aria-hidden="true" /></div>
            <h3>Soporte de hardware</h3><p>Diagnóstico, reparación y mantenimiento de equipos electrónicos con atención cercana.</p>
            <Link to="/tarifas" className="text-link">Explorar tarifas <span aria-hidden="true">↗</span></Link>
          </article>
        </div>
      </section>

      <section id="habilidades" className="content-section skills-section">
        <div className="skills-intro reveal">
          <p className="eyebrow">HERRAMIENTAS DE TRABAJO</p>
          <h2>Una base técnica.<br /><span className="text-gradient">Muchas posibilidades.</span></h2>
          <p>Experiencia en distintos lenguajes y tecnologías para elegir la solución que mejor encaja con cada proyecto.</p>
          <Link to="/competencias" className="text-link">Ver todas las habilidades <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="skills-panel glass reveal">
          {skillList.map((skill) => (
            <Link className="technology-tag" key={skill.id} to={`/competencias#${skill.id}`}>
              <Code2 aria-hidden="true" />{skill.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="pricing-callout reveal">
        <div><p className="eyebrow">PRECIOS TRANSPARENTES</p><h2>Tu próximo proyecto<br />empieza con una conversación.</h2><p>Revisemos lo que necesitas y encontremos un modelo que tenga sentido.</p></div>
        <button className="button button-primary" onClick={() => navigate("/tarifas")}>Consultar tarifas <span aria-hidden="true">↗</span></button>
      </section>

      <section id="contacto" className="contact-section content-section">
        <div className="contact-card glass reveal">
          <div className="contact-copy">
            <span className="contact-avatar" aria-hidden="true">D</span>
            <p className="eyebrow">CONECTEMOS</p>
            <h2>Encuéntrame<br /><span className="text-gradient">en mis redes.</span></h2>
            <p>Elige tu canal favorito y hablemos sobre tu próxima idea.</p>
          </div>
          <div className="contact-links" aria-label="Redes y contacto">
            <a href="mailto:DantalionLord@proton.me" className="contact-method"><span className="contact-method-icon"><Mail aria-hidden="true" /></span><span><small>CONTACTO DIRECTO</small><strong>Email</strong></span><span className="method-arrow" aria-hidden="true">↗</span></a>
            <a href="https://t.me/DantalionLord" target="_blank" rel="noopener noreferrer" className="contact-method"><span className="contact-method-icon"><Send aria-hidden="true" /></span><span><small>MENSAJE INSTANTÁNEO</small><strong>Telegram</strong></span><span className="method-arrow" aria-hidden="true">↗</span></a>
            <a href="https://wa.me/qr/YF7KAE2AEPCBJ1?s=v" target="_blank" rel="noopener noreferrer" className="contact-method"><span className="contact-method-icon"><MessageCircle aria-hidden="true" /></span><span><small>MENSAJE INSTANTÁNEO</small><strong>WhatsApp</strong></span><span className="method-arrow" aria-hidden="true">↗</span></a>
            <a href="https://www.instagram.com/dantalionl0rd?vrfl=MWQ2a3lqcGpkdzc5Mw==" target="_blank" rel="noopener noreferrer" className="contact-method"><span className="contact-method-icon"><Instagram aria-hidden="true" /></span><span><small>ENCUÉNTRAME EN REDES</small><strong>Instagram</strong></span><span className="method-arrow" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </div>
  )
}

const pricingTiers = [
  { title: "Desarrollo de Software", range: "$600 - $1200", features: ["Facturación por Producto", "Estimación inicial sin costo", "Tarifa variable según complejidad", "Desglose detallado por módulos", "Entrega de software y licencia comercial"] },
  { title: "Mantenimiento de Sistemas", range: "$25 - $60", features: ["Tarifa variable según complejidad", "Admisible para Windows / Linux / Android", "Incluye mantenimiento de Bases de Datos"] },
  { title: "Desarrollo Web", range: "$150 - $250", features: ["Tarifa variable según complejidad", "Adquisición de VPS", "Soporte prioritario (+20%)"] },
  { title: "Reparación y Mantenimiento de Hardware", range: "$50 - $100", features: ["Tarifa variable según complejidad", "El precio de componentes se cobra aparte", "Limpieza incluida"] },
]

function PricingPage() {
  return (
    <main className="legacy-page pricing-container">
      <div className="full-width-card glass reveal">
        <p className="eyebrow">INVERSIÓN EN TU PROYECTO</p><h1>Estructura de Tarifas</h1>
        {pricingTiers.map((tier) => (
          <section className="pricing-tier reveal" key={tier.title}>
            <h2>{tier.title}</h2><div className="price-range">{tier.range}</div>
            <ul>{tier.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
          </section>
        ))}
        <section className="pricing-tier reveal">
          <h2>Modelo Personalizado</h2>
          <div className="price-conditions">
            <div className="price-option"><h3>Proyecto Completo</h3><p>Precio fijo según alcance</p><div className="price-note">(Estimación detallada previa)</div></div>
            <div className="price-option"><h3>Suscripción Mensual</h3><p>Desde $500/mes</p><div className="price-note">(Incluye 10h de mantenimiento y más)</div></div>
          </div>
        </section>
      </div>
    </main>
  )
}

const skillDetails: {
  id: string
  name: string
  description: string
  features: string[]
}[] = [
  { ...skillList[0], description: "Desarrollo de sistemas de bajo nivel, optimización de rendimiento, creación de drivers y software embebido.", features: ["Multithreading y gestión de memoria", "Interacción directa con hardware", "Librerías como Boost y Qt"] },
  { ...skillList[4], description: "Desarrollo de scripts de automatización, análisis de datos y aplicaciones web con Django o Flask.", features: ["Machine Learning con TensorFlow", "Web scraping con BeautifulSoup", "Desarrollo de APIs REST"] },
  { ...skillList[2], description: "Lenguaje simbólico cercano al lenguaje máquina, ideal para programas que requieren control hasta el nivel de byte o bit.", features: ["Sistemas embebidos y maquinaria", "Programación de Kernels", "Depuración e ingeniería inversa"] },
  { ...skillList[3], description: "Tecnologías fundamentales para construir el contenido, los estilos y la interacción de sitios y aplicaciones web.", features: ["Páginas web", "Aplicaciones web", "Blogs, foros y redes sociales"] },
  { ...skillList[5], description: "Lenguaje de programación y plataforma informática utilizado en aplicaciones de escritorio, web y Android.", features: ["Aplicaciones Android", "Aplicaciones web", "Aplicaciones generales"] },
  { ...skillList[1], description: "Lenguaje para describir conjuntos de datos, guardar información, modificarla y consultarla de forma sencilla.", features: ["Bases de datos", "Manejo de información", "Sistemas de información"] },
  { id: "devops", name: "DevOps", description: "Prácticas y herramientas para automatizar flujos de desarrollo, entrega y operación de software.", features: ["Integración y entrega continua", "Automatización de despliegues", "Observabilidad y operación"] },
  { id: "react", name: "React", description: "Biblioteca para crear interfaces de usuario interactivas mediante componentes reutilizables.", features: ["Interfaces basadas en componentes", "Estado y eventos", "Aplicaciones web interactivas"] },
  { id: "node", name: "Node.js", description: "Entorno de ejecución JavaScript para crear servicios y herramientas del lado del servidor.", features: ["APIs y servicios web", "Aplicaciones asíncronas", "Herramientas de desarrollo"] },
]

function SkillsPage() {
  return (
    <main className="legacy-page skills-detail-container">
      <p className="eyebrow">EXPERIENCIA TÉCNICA</p><h1 className="glass reveal">Detalles de Habilidades</h1>
      {skillDetails.map((skill) => (
        <article className="skill-detail glass reveal" id={skill.id} key={skill.id}>
          <h2>{skill.name}</h2>
          <p className="skill-description">{skill.description}</p>
          <ul>{skill.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </article>
      ))}
    </main>
  )
}

function LegalPage() {
  return (
    <main className="legacy-page legal-container">
      <p className="eyebrow">INFORMACIÓN LEGAL</p><h1 className="glass reveal">Términos y Condiciones</h1>
      {terms.map((term) => <article className="term-section glass reveal" key={term.title}><h2>{term.title}</h2><ol>{term.paragraphs.map((paragraph, index) => <li key={`${term.title}-${index}`}>{paragraph}</li>)}</ol></article>)}
      <Link className="text-link" to="/centro-legal">Volver al centro legal <span aria-hidden="true">↗</span></Link>
    </main>
  )
}

function PrivacyPage() {
  return (
    <main className="legacy-page legal-container">
      <p className="eyebrow">INFORMACIÓN LEGAL</p><h1 className="glass reveal">Política de Privacidad</h1>
      {privacySections.map((section) => <article className="term-section glass reveal" key={section.title}><h2>{section.title}</h2><ol>{section.paragraphs.map((paragraph) => <li key={paragraph}>{paragraph}{section.details && <ul>{section.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</li>)}</ol></article>)}
      <Link className="text-link" to="/centro-legal#derechos">Consultas y derechos sobre tus datos <span aria-hidden="true">↗</span></Link>
      <p className="legal-back-link"><Link className="text-link" to="/centro-legal">Volver al centro legal <span aria-hidden="true">↗</span></Link></p>
    </main>
  )
}

function NotFoundPage() {
  return <main className="legacy-page"><div className="glass full-width-card"><p className="eyebrow">404</p><h1>Página no encontrada</h1><Link className="text-link" to="/">Volver al inicio ↗</Link></div></main>
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const dockItems = [
    { icon: Home, label: "Inicio", onClick: () => navigate("/") },
    { icon: Code2, label: "Servicios", onClick: () => navigateToSection("servicios") },
    { icon: Cpu, label: "Habilidades", onClick: () => navigateToSection("habilidades") },
    { icon: Settings, label: "Precios", onClick: () => navigate("/tarifas") },
    { icon: Mail, label: "Contacto", onClick: () => navigateToSection("contacto") },
    { icon: Scale, label: "Legal", onClick: () => navigate("/centro-legal") },
  ]

  function navigateToSection(id: string) {
    if (location.pathname !== "/") {
      navigate(`/#${id}`)
      return
    }
    scrollToSection(id, reducedMotion)
  }

  useRevealOnScroll()

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Dantalion — Desarrollo de Software & Soporte TI",
      "/tarifas": "Tarifas | Dantalion",
      "/competencias": "Habilidades | Dantalion",
      "/centro-legal": "Centro legal | Dantalion",
      "/terminos": "Términos y Condiciones | Dantalion",
      "/politica-de-privacidad": "Política de Privacidad | Dantalion",
    }
    document.title = titles[location.pathname] ?? "Página no encontrada | Dantalion"
  }, [location.pathname])

  useEffect(() => {
    if (location.hash) {
      const frame = window.requestAnimationFrame(() => scrollToSection(location.hash.slice(1), reducedMotion))
      return () => window.cancelAnimationFrame(frame)
    } else if (location.pathname !== "/competencias") {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
    }
  }, [location.pathname, location.hash, reducedMotion])

  return (
    <div className="home-page app-shell">
      <ParticleField />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <motion.div
        key={location.pathname}
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tarifas" element={<PricingPage />} />
          <Route path="/competencias" element={<SkillsPage />} />
          <Route path="/centro-legal" element={<LegalHubPage />} />
          <Route path="/terminos" element={<LegalPage />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
      <Dock className="app-dock" items={dockItems} />
    </div>
  )
}

export default App
