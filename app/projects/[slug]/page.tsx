import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../projects";
import { ProjectInsight } from "./project-insight";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.title} | Binbo Xu`, description: project.summary } : {};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const preview = project.attachments.find((attachment) => attachment.preview);

  return (
    <main>
      <header className="site-header detail-header">
        <Link className="wordmark" href="/">Binbo Xu</Link>
        <nav aria-label="Project navigation">
          <Link href="/#work">All projects</Link>
          <a href="/Binbo_Xu_Resume.pdf?v=2c91d4eb" target="_blank" rel="noreferrer">Resume</a>
          <a href="mailto:binboxu01@hotmail.com">Contact</a>
        </nav>
      </header>

      <article className="case-study">
        <Link className="case-back" href="/#work">All projects</Link>
        <header className="case-hero">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="case-summary">{project.summary}</p>
          </div>
          <div className="case-metric">
            <strong>{project.metric}</strong>
            <span>{project.metricLabel}</span>
          </div>
        </header>

        <section className="case-overview">
          <div>
            <p className="eyebrow">Context</p>
            <p>{project.context}</p>
          </div>
          <div>
            <p className="eyebrow">My role</p>
            <p>{project.role}</p>
          </div>
        </section>

        <ProjectInsight slug={project.slug} />

        <section className="case-columns">
          <div>
            <p className="eyebrow">Method</p>
            <ol>{project.methods.map((method) => <li key={method}>{method}</li>)}</ol>
          </div>
          <div>
            <p className="eyebrow">Result</p>
            <ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
          </div>
        </section>

        <section className="case-tools">
          <p className="eyebrow">Tools & approaches</p>
          <p>{project.tools.join(" · ")}</p>
        </section>

        {(project.attachments.length > 0 || project.materialsNote) && (
          <section className="materials-section">
            <div className="materials-heading">
              <div>
                <h2>Project materials</h2>
              </div>
              {project.materialsNote && <p>{project.materialsNote}</p>}
            </div>

            {project.attachments.length > 0 && (
              <div className="attachment-list">
                {project.attachments.map((attachment) => (
                  <div className="attachment-item" key={attachment.href}>
                    <a href={attachment.href} target="_blank" rel="noreferrer">
                      <span>{attachment.label}</span>
                      <em>{attachment.format} ↗</em>
                    </a>
                    {attachment.accessPassword && (
                      <p className="attachment-password">Password: <code>{attachment.accessPassword}</code></p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {preview && (
              <div className="document-preview">
                <div className="preview-topline">
                  <span>{preview.label.replace("View ", "")}</span>
                  <a href={preview.href} target="_blank" rel="noreferrer">Open full screen ↗</a>
                </div>
                <iframe src={`${preview.href}#view=FitH`} title={`${project.title} document preview`} loading="lazy" />
              </div>
            )}
          </section>
        )}

        <nav className="case-pagination" aria-label="Browse project case studies">
          <Link href={`/projects/${previousProject.slug}`}>
            <span>Previous</span>
            {previousProject.title}
          </Link>
          <Link href={`/projects/${nextProject.slug}`}>
            <span>Next</span>
            {nextProject.title}
          </Link>
        </nav>
      </article>

      <footer className="site-footer detail-footer">
        <Link href="/">© {new Date().getFullYear()} Binbo Xu</Link>
        <Link href="/#work">All projects ↑</Link>
      </footer>
    </main>
  );
}
