type ProjectInsightProps = {
  slug: string;
};

const insightCopy: Record<string, { title: string; summary: string }> = {
  "wildpath-wildlife-incidents": {
    title: "Multiple observations. One traceable incident.",
    summary: "WildPath preserves the source evidence while connecting incident matching, quality assessment, human decisions, and geospatial analysis in a working prototype.",
  },
  "flight-delay-risk": {
    title: "90 minutes materially changed the risk profile.",
    summary: "It was the first practical option to bring simulated missed-connection risk below the 5% decision threshold.",
  },
  "tuneworks-sql-bi": {
    title: "Four SQL analyses supported four business decisions.",
    summary: "The work translated relational data into actionable insights for demand planning, customer strategy, revenue risk, and retention.",
  },
  "insurance-risk-pricing": {
    title: "The HALC model translated claim behavior into pricing signals.",
    summary: "A Tweedie objective reflected the zero-heavy, right-skewed loss distribution and supported interpretable risk-based pricing decisions.",
  },
  "ai-text-data-quality": {
    title: "Reliable modeling started with a defensible dataset.",
    summary: "The cleaning pipeline transformed three inconsistent sources into a balanced, duplicate-free dataset before team modeling began.",
  },
  "syncsc-product-research": {
    title: "A unified dashboard emerged as the clearest product direction.",
    summary: "User research prioritized one place for schedules, networking, and recruiting, helping ground the concept in demonstrated student needs.",
  },
  "project-painter-budget": {
    title: "The recommended plan was faster and leaner.",
    summary: "My cost baselines showed that Option 2 offered the stronger modeled combination of schedule and budget performance.",
  },
  "economic-data-quality": {
    title: "The forecasting pipeline became defensible before modeling began.",
    summary: "I aligned 25 economic indicators, improved the missing-value methodology, and established consistent inputs for the team’s forecasting workflow.",
  },
};

function WildPathInsight() {
  return (
    <div className="wildpath-visual">
      <div className="wildpath-records" aria-label="The synthetic demo consolidates 306 observations into 250 canonical incidents">
        <p><strong>306</strong><span>source observations</span></p>
        <span aria-hidden="true">→</span>
        <p><strong>250</strong><span>canonical incidents</span></p>
      </div>
      <p className="wildpath-scope">Synthetic Los Angeles demo data</p>
      <ol className="wildpath-flow" aria-label="Incident workflow">
        <li><span>01</span><strong>Match</strong><small>Species · 500 m · 24 h</small></li>
        <li><span>02</span><strong>Review</strong><small>Evidence · Decision · Reason</small></li>
        <li><span>03</span><strong>Analyze</strong><small>Map · Filters · Export</small></li>
      </ol>
      <p className="visual-note">Source reports and review history remain attached to the incident. Jev runs as a separate shadow assessment.</p>
    </div>
  );
}

function FlightInsight() {
  return (
    <div className="risk-visual" role="img" aria-label="Simulated missed-connection risk falls from 8.74 percent at 45 minutes to 3.93 percent at 90 minutes, crossing below the 5 percent threshold">
      <div className="risk-scale"><span>0%</span><span>5% threshold</span><span>10%</span></div>
      <div className="risk-plot">
        <i className="risk-threshold" aria-hidden="true" />
        <div className="risk-row">
          <span>45 min</span>
          <div><b style={{ width: "87.4%" }} /><strong>8.74%</strong></div>
        </div>
        <div className="risk-row recommended">
          <span>90 min</span>
          <div><b style={{ width: "39.3%" }} /><strong>3.93%</strong></div>
        </div>
      </div>
      <p className="visual-callout"><strong>−4.81 pts</strong><span>simulated risk reduction, 45 → 90 min</span></p>
    </div>
  );
}

function SqlInsight() {
  const rows = [
    ["Q06", "Demand seasonality", "Resource planning"],
    ["Q07", "Customer tiers", "Segment strategy"],
    ["Q08", "Revenue concentration", "Portfolio risk"],
    ["Q12", "Repeat-booking gaps", "Retention timing"],
  ];

  return (
    <div className="query-visual" role="img" aria-label="Queries 6, 7, 8, and 12 connect demand, segmentation, revenue concentration, and repeat booking analysis to business decisions">
      <div className="query-header"><span>Query</span><span>Pattern found</span><span>Decision supported</span></div>
      {rows.map(([query, pattern, decision]) => (
        <div className="query-row" key={query}>
          <strong>{query}</strong><span>{pattern}</span><span>{decision}</span>
        </div>
      ))}
      <p className="visual-note">Data dictionary · SQL · Visualization · Business interpretation</p>
    </div>
  );
}

function InsuranceInsight() {
  return (
    <a
      className="poster-visual"
      href="/work/insurance-risk-pricing/research-poster.pdf"
      target="_blank"
      rel="noreferrer"
      aria-label="Open the Insurance Risk-Based Pricing final presentation poster as a PDF"
    >
      <img
        src="/work/insurance-risk-pricing/research-poster.png"
        alt="Final presentation poster summarizing the insurance risk-based pricing problem, prediction framework, model metrics, explainable risk drivers, and business recommendations"
      />
    </a>
  );
}

function NlpInsight() {
  const folds = [
    { label: "Fold 1", value: "97.1%", height: "77.3%" },
    { label: "Fold 2", value: "96.6%", height: "63.8%" },
    { label: "Fold 3", value: "97.6%", height: "91%" },
    { label: "Fold 4", value: "95.6%", height: "41%" },
    { label: "Fold 5", value: "96.2%", height: "54.5%" },
  ];

  return (
    <div className="nlp-result-visual" role="img" aria-label="The team model achieved 96.6 percent average five-fold accuracy and correctly classified 539 of 550 balanced holdout samples. My contribution was the data-cleaning pipeline.">
      <div className="nlp-result-summary">
        <p><strong>96.6%</strong><span>average 5-fold accuracy</span></p>
        <p>Stable performance after the data-cleaning pipeline produced a balanced modeling dataset.</p>
      </div>
      <div className="nlp-result-panels">
        <section className="nlp-fold-panel">
          <h3>Stable across folds</h3>
          <p>95.6%–97.6% accuracy · ROC-AUC 0.998</p>
          <div className="nlp-fold-bars" aria-hidden="true">
            {folds.map((fold) => (
              <div key={fold.label}>
                <span>{fold.value}</span>
                <i><b style={{ height: fold.height }} /></i>
                <small>{fold.label}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="nlp-confusion-panel">
          <h3>539 of 550 correct</h3>
          <p>Balanced holdout · 275 human + 275 AI</p>
          <div className="nlp-confusion" aria-hidden="true">
            <span />
            <span>Pred. human</span>
            <span>Pred. AI</span>
            <span>Actual human</span>
            <strong>273</strong>
            <strong className="nlp-error">2</strong>
            <span>Actual AI</span>
            <strong className="nlp-error">9</strong>
            <strong>266</strong>
          </div>
        </section>
      </div>
      <div className="nlp-result-credit">
        <span>Modeling: team result</span>
        <span>My contribution: data-cleaning pipeline · 6,116 → 2,750 balanced records</span>
      </div>
    </div>
  );
}

function SyncInsight() {
  return (
    <div className="survey-visual" role="img" aria-label="User research identified a unified student dashboard as the most requested product direction, and SyncSC advanced to the AI case competition semifinal">
      <div className="survey-result">
        <span>Most requested direction</span>
        <strong>36.6%</strong>
        <p>Unified student dashboard</p>
        <div><b style={{ width: "36.6%" }} /></div>
      </div>
      <p className="visual-callout"><strong>Semifinalist</strong><span>AI case competition result</span></p>
    </div>
  );
}

function BudgetInsight() {
  return (
    <div className="comparison-visual" role="img" aria-label="Option 2 reduced modeled duration from 61 to 58 days and budget from 90 to 81 thousand dollars">
      <div className="comparison-group">
        <span>Duration</span>
        <div><label>Option 1</label><b style={{ width: "100%" }} /><strong>61 days</strong></div>
        <div className="recommended"><label>Option 2</label><b style={{ width: "95%" }} /><strong>58 days</strong></div>
      </div>
      <div className="comparison-group">
        <span>Budget</span>
        <div><label>Option 1</label><b style={{ width: "100%" }} /><strong>$90K</strong></div>
        <div className="recommended"><label>Option 2</label><b style={{ width: "90%" }} /><strong>$81K</strong></div>
      </div>
      <p className="visual-callout"><strong>−3 days · −$9K</strong><span>modeled improvement</span></p>
    </div>
  );
}

function EconomicInsight() {
  const steps = ["Audit coverage", "Align 25 indicators", "Interpolate from history", "Prepare train / test data"];
  return (
    <div className="data-flow-visual" role="img" aria-label="More than 18,000 rows and 50 fields were audited, 25 economic indicators were aligned, and historical interpolation produced modeling-ready train and test data">
      <div className="data-stats">
        <p><strong>18K+</strong><span>rows</span></p>
        <p><strong>50</strong><span>fields</span></p>
        <p><strong>25</strong><span>indicators</span></p>
      </div>
      <div className="data-steps">
        {steps.map((step, index) => <p key={step}><span>0{index + 1}</span><strong>{step}</strong></p>)}
      </div>
      <p className="visual-note">Data leadership · Missing-value strategy · Train/test alignment</p>
    </div>
  );
}

function InsightVisual({ slug }: ProjectInsightProps) {
  switch (slug) {
    case "wildpath-wildlife-incidents": return <WildPathInsight />;
    case "flight-delay-risk": return <FlightInsight />;
    case "tuneworks-sql-bi": return <SqlInsight />;
    case "insurance-risk-pricing": return <InsuranceInsight />;
    case "ai-text-data-quality": return <NlpInsight />;
    case "syncsc-product-research": return <SyncInsight />;
    case "project-painter-budget": return <BudgetInsight />;
    case "economic-data-quality": return <EconomicInsight />;
    default: return null;
  }
}

export function ProjectInsight({ slug }: ProjectInsightProps) {
  const copy = insightCopy[slug];
  if (!copy) return null;

  return (
    <section className="insight-section" aria-labelledby={`${slug}-insight-title`}>
      <div className="insight-intro">
        <p className="eyebrow">Core conclusion</p>
        <h2 id={`${slug}-insight-title`}>{copy.title}</h2>
        <p>{copy.summary}</p>
      </div>
      <figure className={`insight-figure insight-${slug}`}>
        <div className="insight-topline"><span>At a glance</span><span>Binbo Xu · Portfolio evidence</span></div>
        <InsightVisual slug={slug} />
        <figcaption>{slug === "insurance-risk-pricing" ? "Final presentation poster — click to open the full PDF." : "Summary visual based on the project materials and documented results."}</figcaption>
      </figure>
    </section>
  );
}
