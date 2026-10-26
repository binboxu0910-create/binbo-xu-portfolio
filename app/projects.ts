export type ProjectAttachment = {
  label: string;
  href: string;
  format: "PDF" | "XLSX" | "IPYNB" | "WEB";
  preview?: boolean;
  accessPassword?: string;
};

export type Project = {
  number: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  metric: string;
  metricLabel: string;
  context: string;
  role: string;
  methods: string[];
  outcomes: string[];
  tools: string[];
  attachments: ProjectAttachment[];
  materialsNote?: string;
};

const projectRecords: Project[] = [
  {
    number: "08",
    slug: "wildpath-wildlife-incidents",
    category: "Product Development · Geospatial Analytics",
    title: "WildPath: Wildlife Incident Intelligence",
    summary: "An interactive web prototype connecting wildlife reports, geospatial analysis, data-quality checks, and human review in one workflow.",
    metric: "Interactive MVP",
    metricLabel: "a working reporting, mapping, analysis, and review workflow",
    context: "Multiple sightings can describe the same wildlife-road event, while incomplete or inconsistent reports can distort an analytical view. WildPath explores how to preserve the original evidence, consolidate observations into incidents, and support traceable review decisions using synthetic Los Angeles data.",
    role: "I defined the product scope and incident data model, then built and iterated the web prototype through AI-assisted development. I connected reporting, map filters, analysis, quality scoring, and human review into a guided experience.",
    methods: [
      "Separated individual observations from canonical incidents, matching the same species within 500 metres and 24 hours while preserving every source report.",
      "Connected the map, incident ledger, analysis, and CSV/GeoJSON exports through a shared filter state.",
      "Implemented a transparent 100-point evidence score and an optional server-side TypeSafe/Jev assessment recorded independently in shadow mode.",
      "Built approve, reject, and merge workflows with review reasons, lifecycle history, and browser-local persistence.",
      "Created a repeatable Pacific Coast Highway demo that guides visitors from the map to analysis and evidence review, with isolated demo state and restart controls.",
    ],
    outcomes: [
      "Delivered a deployed, password-protected MVP with an end-to-end reporting and review experience.",
      "Represented 306 synthetic observations as 250 canonical incidents, keeping multiple reports from inflating event counts.",
      "Enabled reviewers to inspect evidence, approve or reject incidents, merge duplicates, and retain the reasoning behind each decision.",
      "Made the same filtered records available across the map, analytical views, and exports, with a guided case for first-time visitors.",
    ],
    tools: ["TypeScript", "React", "MapLibre", "Geospatial matching", "Data-quality scoring", "TypeSafe / Jev", "AI-assisted development"],
    attachments: [
      { label: "Explore the live demo", href: "https://wildpath-web.binboxu0910.chatgpt.site/access", format: "WEB" },
      { label: "Read the methodology", href: "https://wildpath-web.binboxu0910.chatgpt.site/methodology", format: "WEB" },
    ],
    materialsNote: "The hosted demo is password-protected; access credentials are intentionally omitted from this public repository. It uses synthetic data and browser-local storage. Jev assessments are recorded for comparison and do not control publication.",
  },
  {
    number: "01",
    slug: "flight-delay-risk",
    category: "Decision Modeling",
    title: "Flight Delay & Missed-Connection Risk Simulation",
    summary: "A Monte Carlo model comparing four layover buffers through missed-connection risk, expected cost, and tail-risk measures.",
    metric: "90 min",
    metricLabel: "first practical layover buffer below the 5% simulated missed-connection threshold",
    context: "Travelers trade a shorter itinerary against the cost of a missed connection. The team framed layover selection as a two-stage decision under uncertainty and compared 45, 60, 90, and 120-minute buffers.",
    role: "I built the Excel-based simulation model, formulated the decision problem, and wrote the Problem Formulation and Results sections of the final report.",
    methods: [
      "Prepared 1.645 million U.S. flight records for parametric modeling.",
      "Modeled delay behavior with a zero-inflated process and fitted right-skewed distributions.",
      "Ran 10,000 Monte Carlo trials for each layover option.",
      "Compared missed-connection probability, expected cost, VaR, and CVaR instead of optimizing a single metric.",
    ],
    outcomes: [
      "The 90-minute option was the first practical buffer below the 5% simulated missed-connection threshold.",
      "Modeled risk fell from 8.74% at 45 minutes to 3.93% at 90 minutes.",
      "The 120-minute option remained the conservative choice for high-stakes trips.",
    ],
    tools: ["Excel", "Monte Carlo", "Probability distributions", "Risk analysis"],
    attachments: [
      { label: "View presentation", href: "/work/flight-delay-risk/presentation.pdf", format: "PDF", preview: true },
      { label: "Read final report", href: "/work/flight-delay-risk/final-report.pdf", format: "PDF" },
      { label: "Download simulation workbook", href: "/work/flight-delay-risk/simulation-workbook.xlsx", format: "XLSX" },
    ],
  },
  {
    number: "02",
    slug: "insurance-risk-pricing",
    category: "Statistical Learning",
    title: "Insurance Risk-Based Pricing",
    summary: "A risk-pricing study using claim-frequency and loss-cost models to identify the policy features most associated with insurance losses.",
    metric: "2nd place",
    metricLabel: "course project competition result",
    context: "The project examined insurance claim risk across multiple coverage types and translated model outputs into underwriting and pricing implications.",
    role: "I owned the HALC analysis, preparing the data, evaluating Tweedie XGBoost against a Random Forest benchmark, interpreting loss drivers, and contributing the findings to the final report.",
    methods: [
      "Built a Tweedie XGBoost model suited to zero-heavy, right-skewed insurance losses.",
      "Used Random Forest as a benchmark and applied grid search with cross-validation.",
      "Separated predictors from post-outcome fields to reduce target leakage.",
      "Interpreted feature importance for pricing and risk segmentation.",
    ],
    outcomes: [
      "The HALC model reached an MSE of 997,698 and an RMSE of approximately 999 on the evaluation set.",
      "Vehicle, policy, and driver characteristics emerged as meaningful loss drivers.",
      "The project earned 2nd place in the course competition.",
    ],
    tools: ["Python", "XGBoost", "Random Forest", "Cross-validation"],
    attachments: [
      { label: "Read public final report", href: "/work/insurance-risk-pricing/final-report-public.pdf", format: "PDF", preview: true },
      { label: "View research poster", href: "/work/insurance-risk-pricing/research-poster.pdf", format: "PDF" },
      { label: "Download analysis notebook", href: "/work/insurance-risk-pricing/analysis-notebook.ipynb", format: "IPYNB" },
      { label: "Read project brief", href: "/work/insurance-risk-pricing/project-brief.pdf", format: "PDF" },
    ],
    materialsNote: "Student ID numbers were removed from the public report; the analytical content is unchanged.",
  },
  {
    number: "03",
    slug: "ai-text-data-quality",
    category: "NLP · Data Quality",
    title: "A Trustworthy Dataset for AI-vs.-Human Text Detection",
    summary: "A reproducible data-cleaning pipeline that reconciled three text sources, controlled label bias, and created balanced modeling datasets.",
    metric: "6,116 → 2,750",
    metricLabel: "raw records converted into a balanced, model-ready dataset",
    context: "The team studied whether AI-generated and human-written essays could be distinguished reliably. Before modeling, inconsistent schemas, duplicated samples, and source-label effects had to be addressed.",
    role: "I owned the end-to-end data-cleaning pipeline, standardizing three source datasets, removing duplicates, addressing source-label bias, and delivering a balanced 2,750-record dataset for modeling.",
    methods: [
      "Standardized three source datasets into one schema with consistent text and labels.",
      "Audited missing values, duplicates, class balance, and text-length distributions.",
      "Reduced source-label bias by constructing balanced, source-controlled samples.",
      "Documented the transformation from 6,116 raw records to 2,750 modeling records, split evenly across classes.",
    ],
    outcomes: [
      "Produced a duplicate-free dataset with 1,375 AI-generated and 1,375 human-written records.",
      "Reduced source-label bias and established a reproducible foundation for model training.",
      "Using the cleaned dataset, the team’s modeling pipeline achieved 96.6% average five-fold cross-validation accuracy and 0.998 ROC-AUC.",
    ],
    tools: ["Python", "Pandas", "NLP preprocessing", "Data validation"],
    attachments: [
      { label: "View final presentation", href: "/work/ai-text-data-quality/final-presentation.pdf", format: "PDF", preview: true },
      { label: "Download my cleaning notebook", href: "/work/ai-text-data-quality/data-cleaning-notebook.ipynb", format: "IPYNB" },
    ],
    materialsNote: "The project did not retain a working LIME prototype link. The presentation is preserved as the complete team deliverable.",
  },
  {
    number: "04",
    slug: "tuneworks-sql-bi",
    category: "SQL · Business Intelligence",
    title: "TuneWorks SQL Business Intelligence",
    summary: "A relational analysis connecting customers, agents, entertainers, bookings, and music styles to support demand and customer strategy.",
    metric: "4 questions answered",
    metricLabel: "across demand, customer value, revenue risk, and booking cadence",
    context: "The project transformed a multi-table entertainment-booking database into a set of business questions and recommendations for customer strategy, demand planning, and revenue concentration.",
    role: "I wrote four SQL analyses covering demand seasonality, customer value segmentation, revenue concentration risk, and booking cadence. I also built the data dictionary and translated query outputs into decision-ready visualizations and business recommendations.",
    methods: [
      "Used grouped aggregation to analyze demand seasonality.",
      "Applied NTILE segmentation to organize customers into comparable tiers.",
      "Used window functions to evaluate revenue concentration.",
      "Applied LAG to study repeat-booking intervals and customer behavior.",
    ],
    outcomes: [
      "Identified monthly demand patterns to support resource and availability planning.",
      "Segmented customers by value and exposed areas of revenue concentration risk.",
      "Analyzed repeat-booking intervals to support more targeted retention decisions.",
    ],
    tools: ["SQL", "Relational modeling", "Window functions", "Visualization"],
    attachments: [
      { label: "View data dictionary", href: "/work/tuneworks-sql-bi/data-dictionary.pdf", format: "PDF" },
      { label: "View queries & visualizations", href: "/work/tuneworks-sql-bi/queries-visualizations.pdf", format: "PDF", preview: true },
      { label: "Read final report", href: "/work/tuneworks-sql-bi/final-report.pdf", format: "PDF" },
    ],
    materialsNote: "The original 182-page compilation has been separated into three focused documents so recruiters can review the data dictionary, query work, and final analysis independently.",
  },
  {
    number: "05",
    slug: "syncsc-product-research",
    category: "Product Research · AI Strategy",
    title: "SyncSC: An AI-Enabled Student Productivity Hub",
    summary: "A prototype concept unifying class schedules, networking, and recruiting in one student dashboard, informed by original user research.",
    metric: "Semifinalist",
    metricLabel: "AI case competition result",
    context: "SyncSC was designed for students juggling academic schedules, networking, recruiting, and fragmented tools. The case competition asked teams to connect research evidence with a realistic AI product strategy.",
    role: "I designed and distributed the questionnaire, structuring it to uncover student pain points, existing tool behavior, and priorities for future product features.",
    methods: [
      "Structured questions around time management, networking, recruiting, tool usage, and feature priorities.",
      "Collected 41 responses across four academic programs and eleven countries.",
      "Used response patterns to inform product priorities and adoption considerations.",
      "Connected the research findings to the proposed implementation, security, and AI features.",
    ],
    outcomes: [
      "Time management, networking, and recruiting emerged as the most important problem areas.",
      "A unified student dashboard was the most requested product direction.",
      "SyncSC advanced to the competition semifinal.",
    ],
    tools: ["Survey design", "User research", "Product strategy", "Figma"],
    attachments: [
      { label: "View case competition deck", href: "/work/syncsc-product-research/case-competition-deck.pdf", format: "PDF", preview: true },
    ],
    materialsNote: "The original Figma prototype domain has expired, so the competition deck is the preserved project artifact.",
  },
  {
    number: "06",
    slug: "project-painter-budget",
    category: "Project Analytics",
    title: "Project Painter 101: Cost & Schedule Scenario Analysis",
    summary: "A project-management case comparing two execution plans through baseline cost, schedule, and variance analysis.",
    metric: "−3 days · −$9K",
    metricLabel: "modeled improvement of the recommended option",
    context: "The case team compared two delivery approaches while balancing schedule, cost, safety, and quality constraints.",
    role: "I built the two cost-baseline workbooks used to compare the alternatives, evaluate actual-versus-baseline performance, and support the team’s final recommendation.",
    methods: [
      "Created a cost baseline for each project option.",
      "Compared activity duration, labor, and material assumptions across scenarios.",
      "Evaluated actual cost against the selected baseline.",
      "Presented the budget trade-offs as part of the team’s final recommendation.",
    ],
    outcomes: [
      "The recommended option modeled 58 days and $81K, compared with 61 days and $90K for the alternative.",
      "The analysis identified a potential three-day schedule improvement and $9K budget reduction.",
      "The updated cost baseline revealed an approximately $1K variance above plan.",
    ],
    tools: ["Excel", "Cost baseline", "Scenario analysis", "Project management"],
    attachments: [
      { label: "View final presentation", href: "/work/project-painter-budget/final-presentation.pdf", format: "PDF", preview: true },
      { label: "Download option one budget", href: "/work/project-painter-budget/option-one-budget.xlsx", format: "XLSX" },
      { label: "Download option two budget", href: "/work/project-painter-budget/option-two-budget.xlsx", format: "XLSX" },
    ],
  },
  {
    number: "07",
    slug: "economic-data-quality",
    category: "Data Leadership · Forecasting",
    title: "Economic Data Quality for Sales Forecasting",
    summary: "A data-leadership project that aligned 25 economic indicators and replaced a weak missing-value shortcut with a defensible cleaning approach.",
    metric: "Model-ready data",
    metricLabel: "25 economic indicators aligned with a defensible missing-value strategy",
    context: "The team used historical economic indicators to train a sales-forecasting pipeline and generate predictions on a held-out test dataset. The central challenge was inconsistent coverage and start dates across variables.",
    role: "As the data group lead, I established the cleaning standards, resolved disagreement over missing-value treatment, and aligned the sales and economic datasets for forecasting.",
    methods: [
      "Audited more than 18,000 rows and 50 fields across sales and economic data.",
      "Aligned 25 indicators with different reporting histories and start dates.",
      "Used historical patterns, trends, and visual checks to replace blanket 0/1 filling with defensible interpolation.",
      "Created shared standards so the data and modeling groups could work from consistent train/test inputs.",
    ],
    outcomes: [
      "Delivered consistent train and test datasets for the team’s sales-forecasting workflow.",
      "Replaced arbitrary blanket filling with a defensible interpolation approach based on historical patterns.",
      "Aligned the data and modeling groups around shared data-quality standards.",
    ],
    tools: ["Python", "Data cleaning", "Interpolation", "Team leadership"],
    attachments: [],
    materialsNote: "The 2024 dataset, notebook, and presentation were stored on a failed computer and could not be recovered. This case study documents my role without using the unrelated 2022 reference deck.",
  },
];

const projectOrder = [
  "wildpath-wildlife-incidents",
  "flight-delay-risk",
  "tuneworks-sql-bi",
  "insurance-risk-pricing",
  "ai-text-data-quality",
  "syncsc-product-research",
  "project-painter-budget",
  "economic-data-quality",
];

export const projects: Project[] = projectOrder.map((slug, index) => {
  const project = projectRecords.find((record) => record.slug === slug);
  if (!project) throw new Error(`Missing project record: ${slug}`);
  return { ...project, number: String(index + 1).padStart(2, "0") };
});

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
