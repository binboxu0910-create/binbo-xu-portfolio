import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the portfolio home with all eight case studies", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Binbo Xu \| Business Analytics Portfolio<\/title>/i);
  assert.match(html, /Professional portrait of Binbo Xu/);
  assert.match(html, /src="\/personal\/binbo-portrait\.jpg"/);
  assert.match(html, /Hi, I’m Binbo/);
  assert.match(html, /How I work/);
  assert.match(html, /Off the clock/);
  assert.match(html, /Basketball, billiards, golf, and Eason Chan/);
  assert.match(html, /class="project-card"/);
  assert.doesNotMatch(html, /Analytical by training, collaborative by default/);
  assert.doesNotMatch(html, /Basketball gives me the team energy/i);
  assert.match(html, /src="\/golf-after-rain-bright\.jpg"/);
  assert.match(html, /Following through on a golf swing/);
  assert.match(html, /Out on the course/);
  assert.match(html, /personal\/familiar-pose-1\.jpg/);
  assert.match(html, /personal\/graduation-basketball\.jpg/);
  assert.match(html, /Another pose/);
  assert.equal((html.match(/href="\/Binbo_Xu_Resume\.pdf\?v=2c91d4eb"/g) ?? []).length, 2);
  assert.doesNotMatch(html, /Turning messy questions into clear decisions/i);

  const projectLinks = html.match(/href="\/projects\//g) ?? [];
  assert.equal(projectLinks.length, 8);
  assert.ok(
    html.indexOf("/projects/tuneworks-sql-bi") < html.indexOf("/projects/insurance-risk-pricing"),
    "SQL case study should appear before Insurance",
  );
});

test("renders a project detail page with role, result, and direct materials", async () => {
  const response = await render("/projects/flight-delay-risk");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Flight Delay &amp; Missed-Connection Risk Simulation/);
  assert.match(html, /My role/);
  assert.match(html, /Problem Formulation and Results sections/);
  assert.match(html, /Project materials/);
  assert.match(html, /simulation-workbook\.xlsx/);
  assert.match(html, /<iframe[^>]*presentation\.pdf/i);
  assert.match(html, /Core conclusion/);
  assert.match(html, /href="\/Binbo_Xu_Resume\.pdf\?v=2c91d4eb"/);
  assert.match(html, /−4\.81 pts/);
});

test("keeps Flight chart labels and result copy consistent with the final report", async () => {
  const response = await render("/projects/flight-delay-risk");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Modeled risk fell from 8\.74% at 45 minutes to 3\.93% at 90 minutes/);
  assert.match(html, /<span>45 min<\/span>/);
  assert.match(html, /<span>90 min<\/span>/);
  assert.match(html, /width:87\.4%/);
  assert.match(html, /width:39\.3%/);
  assert.match(html, /8\.74 percent at 45 minutes to 3\.93 percent at 90 minutes/);
  assert.match(html, /simulated risk reduction, 45 → 90 min/);
  assert.doesNotMatch(html, /8\.7(?:4)?(?:%| percent) at 60 minutes/);
});

test("renders a distinct core-conclusion visual for every project", async () => {
  const slugs = [
    "wildpath-wildlife-incidents",
    "flight-delay-risk",
    "tuneworks-sql-bi",
    "insurance-risk-pricing",
    "ai-text-data-quality",
    "syncsc-product-research",
    "project-painter-budget",
    "economic-data-quality",
  ];

  for (const slug of slugs) {
    const response = await render(`/projects/${slug}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`insight-figure insight-${slug}`));
    assert.match(html, /Core conclusion/);
    if (slug === "insurance-risk-pricing") {
      assert.match(html, /Insurance Risk-Based Pricing/);
      assert.match(html, /research-poster\.png/);
      assert.match(html, /Final presentation poster/);
    }
    if (slug === "ai-text-data-quality") {
      assert.match(html, /96\.6%/);
      assert.match(html, /539 of 550 correct/);
      assert.match(html, /Modeling: team result/);
      assert.match(html, /6,116 → 2,750 balanced records/);
    }
  }
});

test("renders WildPath with a usable demo link and accurate prototype scope", async () => {
  const response = await render("/projects/wildpath-wildlife-incidents");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /WildPath: Wildlife Incident Intelligence/);
  assert.match(html, /href="https:\/\/wildpath-web\.binboxu0910\.chatgpt\.site\/access"/);
  assert.match(html, /password/);
  assert.match(html, /synthetic observations/);
  assert.match(html, /AI-assisted development/);
  assert.match(html, /browser-local storage/);
  assert.doesNotMatch(html, /<iframe/i);
});

test("presents the SQL evidence as three focused documents", async () => {
  const response = await render("/projects/tuneworks-sql-bi");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /data-dictionary\.pdf/);
  assert.match(html, /queries-visualizations\.pdf/);
  assert.match(html, /final-report\.pdf/);
  assert.match(html, /<iframe[^>]*queries-visualizations\.pdf/i);
  assert.doesNotMatch(html, /sql-project\.pdf/);
});

test("keeps project facts and public assets centralized", async () => {
  const projectSource = await readFile(new URL("../app/projects.ts", import.meta.url), "utf8");
  assert.match(projectSource, /I wrote four SQL analyses covering demand seasonality, customer value segmentation, revenue concentration risk, and booking cadence/);
  assert.match(projectSource, /I owned the end-to-end data-cleaning pipeline/);
  assert.match(projectSource, /metric: "Semifinalist"/);
  assert.match(projectSource, /metric: "Model-ready data"/);
  assert.doesNotMatch(projectSource, /A teammate owned the LSTM model/);
  assert.match(projectSource, /Student ID numbers were removed/);

  const publicAssets = [
    "../public/Binbo_Xu_Resume.pdf",
    "../public/og.png",
    "../public/golf-after-rain-bright.jpg",
    "../public/personal/binbo-portrait.jpg",
    "../public/personal/familiar-pose-1.jpg",
    "../public/personal/familiar-pose-2.jpg",
    "../public/personal/graduation-basketball.jpg",
    "../public/work/flight-delay-risk/presentation.pdf",
    "../public/work/insurance-risk-pricing/final-report-public.pdf",
    "../public/work/insurance-risk-pricing/research-poster.png",
    "../public/work/ai-text-data-quality/final-presentation.pdf",
    "../public/work/tuneworks-sql-bi/data-dictionary.pdf",
    "../public/work/tuneworks-sql-bi/queries-visualizations.pdf",
    "../public/work/tuneworks-sql-bi/final-report.pdf",
    "../public/work/syncsc-product-research/case-competition-deck.pdf",
    "../public/work/project-painter-budget/final-presentation.pdf",
  ];
  await Promise.all(publicAssets.map((path) => access(new URL(path, import.meta.url))));
});

test("serves the requested replacement resume without changing its contents", async () => {
  const resume = await readFile(new URL("../public/Binbo_Xu_Resume.pdf", import.meta.url));
  assert.equal(createHash("sha256").update(resume).digest("hex"), "2c91d4ebd3c1748220d0c4c37fc420fd8f248c10b513aa84347f6357ab13a593");
  assert.equal(resume.subarray(0, 5).toString(), "%PDF-");
});

test("keeps demo credentials and private hosting identity out of the public snapshot", async () => {
  const projectSource = await readFile(new URL("../app/projects.ts", import.meta.url), "utf8");
  const config = await readFile(new URL("../vite.config.ts", import.meta.url), "utf8");
  assert.doesNotMatch(projectSource, /accessPassword:\s*"/);
  assert.doesNotMatch(projectSource, /WP-[A-Za-z0-9]{10,}/);
  assert.doesNotMatch(config, /\.openai\/hosting|appgprj_/);
});
