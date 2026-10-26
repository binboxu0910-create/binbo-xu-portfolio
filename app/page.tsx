import Image from "next/image";
import { projects } from "./projects";
import { PortfolioBoard, type ProjectCardData } from "./portfolio-board";
import { Icon } from "./icons";

const cardCopy: Record<string, { title: string; summary: string; metric?: string; metricLabel?: string }> = {
  "wildpath-wildlife-incidents": { title: "WildPath", summary: "A working wildlife incident tool, from reporting and duplicate review to a shared map.", metric: "From a product idea to a live MVP", metricLabel: "Product design & AI-assisted development" },
  "flight-delay-risk": { title: "Flight delay & connection risk", summary: "An Excel simulation to explore how much time a traveler should leave between flights.", metric: "90 minutes brought simulated risk below 5%", metricLabel: "Simulation & decision analysis" },
  "tuneworks-sql-bi": { title: "TuneWorks business intelligence", summary: "Using SQL and visualizations to investigate the business behind the bookings.", metricLabel: "Demand, customer value & revenue risk" },
  "insurance-risk-pricing": { title: "Insurance Risk-Based Pricing", summary: "Statistical modeling to estimate insurance losses and support risk-based pricing.", metric: "2nd place in the course competition", metricLabel: "Statistical modeling" },
  "ai-text-data-quality": { title: "Human vs. AI text detection", summary: "Preparing a balanced, duplicate-free dataset for the team’s text-classification models.", metric: "A trustworthy foundation for modeling", metricLabel: "Data cleaning & source-bias checks" },
  "syncsc-product-research": { title: "SyncSC", summary: "Researching a student dashboard that brings schedules, networking, and recruiting together.", metric: "AI case competition semifinalist", metricLabel: "User research & product strategy" },
  "project-painter-budget": { title: "Project Painter", summary: "Comparing two delivery plans through the cost baselines and budget workbooks I built.", metric: "3 days faster, $9K less", metricLabel: "Modeled improvement of the recommended plan" },
  "economic-data-quality": { title: "Economic data & sales forecasting", summary: "Leading the data group to align economic indicators and agree on a better missing-value strategy.", metric: "Model-ready data", metricLabel: "Data cleaning & team leadership" },
};
const cards: ProjectCardData[] = projects.map(project => ({
  slug: project.slug,
  title: cardCopy[project.slug]?.title ?? project.title,
  summary: cardCopy[project.slug]?.summary ?? project.summary,
  metric: cardCopy[project.slug]?.metric ?? project.metric,
  metricLabel: cardCopy[project.slug]?.metricLabel ?? project.metricLabel,
}));

export default function Home() {
  return (
    <main className="home-page" id="top">
      <a className="skip-link" href="#work">Skip to projects</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Binbo Xu home">Binbo Xu</a>
        <nav aria-label="Primary navigation">
          <a href="/Binbo_Xu_Resume.pdf?v=2c91d4eb" target="_blank" rel="noreferrer">Resume</a>
          <a href="https://www.linkedin.com/in/binboxu" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:binboxu01@hotmail.com">Contact</a>
        </nav>
      </header>
      <section className="hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <h1 id="intro-title">Hi, I’m Binbo.</h1>
          <p className="hero-summary">I’m studying Business Analytics at USC.<br />This is a collection of things I’ve worked on,<br className="desktop-break" /> and a few things I’m into.</p>
          <p className="hero-meta">Applied mathematics &amp; business at Rochester<br />Open to analyst, business analyst, and data-focused roles.</p>
        </div>
        <figure className="portrait-wrap">
          <Image className="portrait" src="/personal/binbo-portrait.jpg" alt="Professional portrait of Binbo Xu" width={629} height={640} priority unoptimized />
          <figcaption><Icon name="pin" />Currently in Los Angeles</figcaption>
        </figure>
      </section>
      <PortfolioBoard projects={cards}>
        <section className="background-section" id="experience" aria-label="Experience and education">
          <div className="experience-column">
            <h2>Experience</h2>
            <article className="timeline-item">
              <div className="timeline-topline"><h3>Corporate Banking Analyst Intern</h3><span>May – July 2024</span></div>
              <p className="organization">China Everbright Bank</p>
              <p>Supported credit reviews for 5+ corporate clients by connecting financial statements, credit records, operating documents, and client follow-up into a more complete due-diligence view.</p>
            </article>
          </div>
          <div className="education-column">
            <h2>Education</h2>
            <article className="timeline-item">
              <div className="timeline-topline"><h3>University of Southern California</h3><span>2025 – 2027</span></div>
              <p>M.S. Business Analytics · GPA 3.81</p>
            </article>
            <article className="timeline-item compact-item">
              <div className="timeline-topline"><h3>University of Rochester</h3><span>Class of 2025</span></div>
              <p>B.S. Applied Mathematics · B.A. Business · GPA 3.70</p>
            </article>
          </div>
        </section>
        <section className="toolkit-section" aria-labelledby="toolkit-title">
          <h2 id="toolkit-title">Tools I use</h2>
          <div className="toolkit-lines">
            <p><span>Analyze</span>SQL, Python, Excel, data cleaning, EDA</p>
            <p><span>Model</span>Statistical learning, forecasting, Monte Carlo, scenario analysis</p>
            <p><span>Communicate</span>Business recommendations, visualization, team leadership</p>
          </div>
        </section>
      </PortfolioBoard>
      <footer className="site-footer home-footer" id="contact">
        <span>Binbo Xu <span className="footer-location">/ Los Angeles</span></span>
        <div><a href="mailto:binboxu01@hotmail.com">Email</a><a href="https://www.linkedin.com/in/binboxu" target="_blank" rel="noreferrer">LinkedIn</a><a href="/Binbo_Xu_Resume.pdf?v=2c91d4eb" target="_blank" rel="noreferrer">Resume</a></div>
      </footer>
    </main>
  );
}
