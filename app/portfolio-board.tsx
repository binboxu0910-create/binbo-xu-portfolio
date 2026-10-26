"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";

export type ProjectCardData = { slug: string; title: string; summary: string; metric: string; metricLabel: string };
type Photo = { src: string; alt: string; title: string; width: number; height: number };
const referencePhotos: Photo[] = [
  { src: "/personal/familiar-pose-1.jpg", alt: "Two side-by-side photographs with the same playful pointing pose", title: "A familiar pose", width: 1281, height: 720 },
  { src: "/personal/familiar-pose-2.jpg", alt: "Two side-by-side photographs recreating a pose while holding a handwritten sign", title: "Another familiar pose", width: 1281, height: 720 },
];
const golfPhoto: Photo = { src: "/golf-after-rain-bright.jpg", alt: "Following through on a golf swing on a course beneath a cloudy sky", title: "Out on the course", width: 588, height: 1280 };
const graduationPhoto: Photo = { src: "/personal/graduation-basketball.jpg", alt: "Five graduates in graduation gowns posing outdoors with basketballs", title: "Basketball made the photo", width: 1050, height: 1400 };

function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link className="project-card" href={`/projects/${project.slug}`}>
      <div className="project-card-copy"><h2>{project.title}</h2><p>{project.summary}</p></div>
      <div className="project-card-result">
        <div><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
        <span className="project-card-open"><Icon name="arrow" /><span className="sr-only">View case study</span></span>
      </div>
    </Link>
  );
}

export function PortfolioBoard({ projects, children }: { projects: ProjectCardData[]; children: ReactNode }) {
  const [tab, setTab] = useState<"work" | "life">("work");
  const [pose, setPose] = useState(0);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const workTabRef = useRef<HTMLButtonElement>(null);
  const lifeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncHash = () => setTab(window.location.hash === "#off-the-clock" ? "life" : "work");
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function selectTab(next: "work" | "life", focus = false) {
    setTab(next);
    window.history.replaceState(null, "", next === "life" ? "#off-the-clock" : "#work");
    if (focus) (next === "life" ? lifeTabRef : workTabRef).current?.focus();
  }
  function onTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    selectTab(event.key === "Home" ? "work" : event.key === "End" ? "life" : tab === "work" ? "life" : "work", true);
  }
  function openPhoto(photo: Photo) {
    setActivePhoto(photo);
    dialogRef.current?.showModal();
  }
  const reference = referencePhotos[pose];

  return (
    <section className="portfolio-board" id="work" aria-label="My work and interests">
      <div className="board-navigation">
        <div className="board-tabs" role="tablist" aria-label="Explore my work and interests" onKeyDown={onTabKeyDown}>
          <button ref={workTabRef} id="work-tab" role="tab" aria-controls="work-panel" aria-selected={tab === "work"} tabIndex={tab === "work" ? 0 : -1} onClick={() => selectTab("work")} type="button">My work</button>
          <button ref={lifeTabRef} id="life-tab" role="tab" aria-controls="off-the-clock" aria-selected={tab === "life"} tabIndex={tab === "life" ? 0 : -1} onClick={() => selectTab("life")} type="button">Off the clock</button>
        </div>
        <span className="board-context">{tab === "work" ? "A few selected projects" : "Beyond my projects"}</span>
      </div>
      <div id="work-panel" role="tabpanel" aria-labelledby="work-tab" hidden={tab !== "work"}>
        <div className="project-grid">{projects.slice(0, 4).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
        <details className="more-projects">
          <summary><span>More from my project collection <span className="more-count">{projects.length - 4}</span></span><Icon name="chevron" /></summary>
          <div className="project-grid">{projects.slice(4).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
        </details>
        <section className="how-work" id="about" aria-labelledby="how-work-title">
          <div><h2 id="how-work-title">How I work</h2><p>I often find myself doing the groundwork: cleaning the data, checking an assumption, or building the spreadsheet behind a recommendation. In a team, I also help different approaches find common ground.</p></div>
          <button className="personal-corner" type="button" onClick={() => selectTab("life", true)}>
            <span className="personal-corner-icon"><Icon name="headphones" /></span>
            <span><span className="personal-corner-label">Get to know me off the clock</span><span className="personal-corner-name">Sports &amp; Eason Chan</span></span>
            <Icon name="arrow" />
          </button>
        </section>
        {children}
      </div>
      <div id="off-the-clock" role="tabpanel" aria-labelledby="life-tab" hidden={tab !== "life"}>
        <div className="off-clock-intro"><h2>Off the clock</h2><p>Basketball, billiards, golf, and Eason Chan.</p></div>
        <div className="photo-grid">
          <figure className="memory-photo reference-photo">
            <button className="photo-media" type="button" aria-label="Enlarge the side-by-side pose photo" onClick={() => openPhoto(reference)}>
              <Image src={reference.src} alt={reference.alt} width={reference.width} height={reference.height} unoptimized />
              <span className="photo-enlarge"><Icon name="expand" /></span>
            </button>
            <figcaption>
              <div><h3>A familiar pose</h3><p>A reference, and my take on it.</p></div>
              <button className="switch-pose" type="button" onClick={() => setPose(value => (value + 1) % referencePhotos.length)}><Icon name="repeat" />Another pose</button>
              <span className="sr-only" role="status">Photo {pose + 1} of {referencePhotos.length}</span>
            </figcaption>
          </figure>
          <figure className="memory-photo golf-photo">
            <button className="photo-media" type="button" aria-label="Enlarge the golf photo" onClick={() => openPhoto(golfPhoto)}>
              <Image src={golfPhoto.src} alt={golfPhoto.alt} width={golfPhoto.width} height={golfPhoto.height} unoptimized />
              <span className="photo-enlarge"><Icon name="expand" /></span>
            </button>
            <figcaption><div><h3>Out on the course</h3><p>Golf.</p></div></figcaption>
          </figure>
          <figure className="memory-photo graduation-photo">
            <button className="photo-media" type="button" aria-label="Enlarge the graduation basketball photo" onClick={() => openPhoto(graduationPhoto)}>
              <Image src={graduationPhoto.src} alt={graduationPhoto.alt} width={graduationPhoto.width} height={graduationPhoto.height} unoptimized />
              <span className="photo-enlarge"><Icon name="expand" /></span>
            </button>
            <figcaption><div><h3>Basketball made the photo</h3><p>Graduation day.</p></div></figcaption>
          </figure>
        </div>
      </div>
      <dialog ref={dialogRef} className="photo-dialog" aria-label={activePhoto?.title ?? "Full photo"} onClose={() => setActivePhoto(null)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
        <div className="photo-dialog-header"><span>{activePhoto?.title}</span><button type="button" aria-label="Close photo" onClick={() => dialogRef.current?.close()}><Icon name="close" /></button></div>
        {activePhoto && <Image src={activePhoto.src} alt={activePhoto.alt} width={activePhoto.width} height={activePhoto.height} unoptimized />}
      </dialog>
    </section>
  );
}
