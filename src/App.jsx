import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

let introPlayedInThisVisit = false;

const projects = [
  {
    number: "01",
    type: "Hackathon",
    title: "Noma",
    description:
      "AI-powered accounting web app for tracking sales and purchase data, built using AI-assisted development tools.",
    image: "/noma.png",
    github:
      "https://github.com/Zakria774/Noma-AI-Powered-Financial-Dashboard-Hackathon-Project-.git",
    details:
      "Noma is an AI-powered financial dashboard created during Micathon. It helps manage accounting workflows, visualize transactions, and simplify financial tracking through a clean interface.",
  },
  {
    number: "02",
    type: "Semester Project",
    title: "Scientific Calculator",
    description:
      "Advanced calculator supporting trigonometry, logarithms, and complex mathematical expressions.",
    image: "/calc.png",
    github: "https://github.com/Zakria774/CS101-project.git",
    details:
      "A scientific calculator built for mathematical computation with support for advanced operations and expression handling.",
  },
  {
    number: "03",
    type: "C++ / OOP",
    title: "2D Racing Game",
    description:
      "In-progress racing game applying OOP concepts, player movement, collision detection, and modular design.",
    image: "/race_new.png",
    github: "#",
    details:
      "A C++ racing game focused on object-oriented programming concepts, collision mechanics, and gameplay systems.",
  },
];

const skills = ["Python", "C++", "AI Systems", "Automation", "React", "JavaScript"];

function assertProjectDataIsValid(items) {
  return items.every(
    (project) =>
      project.number &&
      project.type &&
      project.title &&
      project.description &&
      project.image &&
      typeof project.github === "string" &&
      project.details
  );
}

function assertSkillsAreValid(items) {
  return Array.isArray(items) && items.length > 0 && items.every(Boolean);
}

console.assert(
  assertProjectDataIsValid(projects),
  "Each project must include number, type, title, description, image, github, and details."
);

console.assert(assertSkillsAreValid(skills), "Skills must be a non-empty list.");

export default function MZPortfolioIntro() {
  const [selectedProject, setSelectedProject] = useState(null);
  const introRef = useRef(null);
  const fullNameRef = useRef(null);
  const mzRef = useRef(null);
  const dashboardRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const hasPlayedIntro = introPlayedInThisVisit;

    if (hasPlayedIntro) {
      gsap.set(introRef.current, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(dashboardRef.current, { autoAlpha: 1 });
      gsap.set(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      return undefined;
    }

    introPlayedInThisVisit = true;

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

    gsap.set(dashboardRef.current, { autoAlpha: 0 });
    gsap.set(cardRef.current, {
      autoAlpha: 0,
      y: 70,
      scale: 0.96,
      filter: "blur(14px)",
    });
    gsap.set(fullNameRef.current, {
      autoAlpha: 0,
      scale: 1.18,
      filter: "blur(14px)",
    });
    gsap.set(mzRef.current, {
      autoAlpha: 0,
      scale: 1.2,
      letterSpacing: "0.38em",
      filter: "blur(16px)",
      transformOrigin: "center center",
    });

    tl.to(fullNameRef.current, {
      autoAlpha: 1,
      scale: 1,
      filter: "blur(0px)",
      letterSpacing: "-0.07em",
      duration: 1.15,
      ease: "expo.out",
    })
      .to(fullNameRef.current, {
        scale: 0.86,
        letterSpacing: "-0.13em",
        filter: "blur(8px)",
        duration: 0.55,
        ease: "power3.inOut",
      })
      .to(fullNameRef.current, {
        autoAlpha: 0,
        scale: 0.78,
        filter: "blur(18px)",
        duration: 0.42,
        ease: "power3.inOut",
      })
      .to(
        mzRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          letterSpacing: "0.03em",
          filter: "blur(0px)",
          duration: 0.85,
          ease: "expo.out",
        },
        "-=0.55"
      )
      .to(mzRef.current, {
        scale: 42,
        letterSpacing: "0.18em",
        filter: "blur(1px)",
        duration: 1.85,
        ease: "expo.inOut",
      })
      .to(
        dashboardRef.current,
        {
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        "-=1.25"
      )
      .to(
        cardRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "expo.out",
        },
        "-=0.55"
      )
      .to(
        introRef.current,
        {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => {
            if (introRef.current) introRef.current.style.pointerEvents = "none";
          },
        },
        "-=0.15"
      );

    return () => tl.kill();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f5f5f2] text-black">
      <div
        ref={introRef}
        className="fixed inset-0 z-30 flex items-center justify-center bg-[#f5f5f2]"
      >
        <h1
          ref={fullNameRef}
          className="absolute select-none text-6xl font-black uppercase tracking-[-0.07em] text-black sm:text-8xl lg:text-9xl"
        >
          M ZAKRIA
        </h1>

        <h1
          ref={mzRef}
          className="absolute origin-center select-none text-8xl font-black text-black opacity-0 sm:text-[10rem] lg:text-[13rem]"
        >
          MZ
        </h1>
      </div>

      <section
        ref={dashboardRef}
        className="min-h-screen bg-[#f5f5f2] p-4 opacity-0 sm:p-6 lg:p-10"
      >
        <div
          ref={cardRef}
          className="relative mx-auto flex min-h-[88vh] w-full max-w-[1500px] flex-col rounded-[28px] bg-white text-black opacity-0 shadow-[0_10px_60px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
        >
          <nav className="sticky top-4 z-20 mx-4 mt-4 flex h-16 items-center justify-between rounded-full border border-black/10 bg-black px-5 text-white shadow-xl shadow-black/10 sm:mx-6 sm:px-8 lg:mx-10">
            <a href="#home" className="text-2xl font-black tracking-[-0.05em]">
              MZ
            </a>

            <div className="hidden items-center gap-7 text-xs font-medium uppercase tracking-wide md:flex">
              <a className="transition hover:text-white/50" href="#home">
                Home
              </a>
              <a className="transition hover:text-white/50" href="#works">
                Projects
              </a>
              <a className="transition hover:text-white/50" href="#about">
                About
              </a>
              <a className="transition hover:text-white/50" href="#skills">
                Skills
              </a>
              <a className="transition hover:text-white/50" href="#contact">
                Contact
              </a>
            </div>

            <a
              className="rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-white/80"
              href="/cv.pdf"
              download
            >
              Download CV
            </a>
          </nav>

          <main
            id="home"
            className="flex flex-1 scroll-mt-28 items-center px-6 py-20 sm:px-10 lg:px-12 lg:py-28"
          >
            <section className="max-w-5xl">
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-black/40">
                AI • AUTOMATION • SYSTEMS
              </p>

              <h2 className="text-[18vw] font-black leading-[0.82] tracking-[-0.1em] sm:text-[14vw] lg:text-[8vw]">
                M ZAKRIA
              </h2>

              <p className="mt-10 max-w-3xl text-xl font-medium uppercase leading-tight tracking-[-0.04em] text-black/70 sm:text-2xl lg:text-[2rem]">
                Computer Science student building intelligent systems,
                automation tools, and modern digital experiences.
              </p>

              <div className="mt-14 flex flex-wrap items-center gap-4">
                

                <a
                  href="#works"
                  className="text-sm uppercase tracking-wide text-black/40 transition hover:text-black"
                >
                  View Projects ↓
                </a>
              </div>
            </section>
          </main>

          <section
            id="works"
            className="scroll-mt-28 border-t border-black/10 px-6 py-8 sm:px-10 lg:px-12"
          >
            <div className="mb-7 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-black/40">
                  Selected Work
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
                  Projects
                </h3>
              </div>
              <span className="hidden text-sm uppercase tracking-wide text-black/40 sm:block">
                03 Projects
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {projects.map((project) => (
                <button
                  key={project.number}
                  type="button"
                  onMouseEnter={() => setSelectedProject(project)}
                  onMouseLeave={() => setSelectedProject(null)}
                  className="group relative min-h-[180px] w-full overflow-hidden rounded-2xl border border-black/5 bg-[#fafaf8] p-6 text-left transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full scale-110 object-cover transition duration-700 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                  </div>

                  <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-black/40 transition group-hover:text-white/80">
                      <span>{project.type}</span>
                      <span>{project.number}</span>
                    </div>

                    <div>
                      <h4 className="text-3xl font-black tracking-[-0.04em] transition duration-300 group-hover:scale-[1.02] group-hover:text-white sm:text-5xl">
                        {project.title}
                      </h4>
                      
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section
            id="about"
            className="scroll-mt-28 grid grid-cols-1 gap-8 border-t border-black/10 px-6 py-10 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"
          >
            <div>
              <p className="mb-2 text-xl font-bold uppercase tracking-wide text-black">
                About
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.05em]">
                Research-driven builder
              </h3>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-black/60 sm:text-lg">
              <p>
                I’m a Computer Science student passionate about AI, automation,
                and intelligent systems, with a strong focus on research-driven
                solutions that create real-world impact.
              </p>
            </div>
          </section>

          <section
            id="skills"
            className="scroll-mt-28 border-t border-black/10 px-6 py-10 sm:px-10 lg:px-12"
          >
            <div className="mb-8">
              <p className="mb-2 text-xl font-bold uppercase tracking-wide text-black">
                What I Know
              </p>
              <h3 className="text-3xl font-black tracking-[-0.05em]">
                Skills & Technologies
              </h3>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium text-black sm:text-base">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-black/10 px-5 py-3"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <footer
            id="contact"
            className="scroll-mt-28 px-6 pb-8 sm:px-10 lg:px-12"
          >
            <div className="flex flex-col gap-5 border-t border-black/10 pt-7 text-xs font-medium uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <div className="flex flex-wrap gap-5">
                <a
                  className="group relative min-w-[170px] transition hover:opacity-100"
                  href="mailto:zakriamuhmmad07@gmail.com,zakriamuhmmad07@icloud.com"
                >
                  <span className="transition group-hover:opacity-0">
                    Email ↗
                  </span>
                  <span className="absolute left-0 top-0 opacity-0 transition group-hover:opacity-100">
                    zakriamuhmmad07
                  </span>
                </a>

                <a
                  className="group relative min-w-[170px] transition hover:opacity-100"
                  href="https://www.linkedin.com/in/muhammad-zakria-382640403?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="transition group-hover:opacity-0">
                    LinkedIn ↗
                  </span>
                  <span className="absolute left-0 top-0 opacity-0 transition group-hover:opacity-100">
                    Muhammad Zakria
                  </span>
                </a>

                <a
                  className="group relative min-w-[170px] transition hover:opacity-100"
                  href="https://github.com/Zakria774"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="transition group-hover:opacity-0">
                    GitHub ↗
                  </span>
                  <span className="absolute left-0 top-0 opacity-0 transition group-hover:opacity-100">
                    Zakria774
                  </span>
                </a>

                
              </div>
              <span>Scroll to explore ↓</span>
            </div>
          </footer>

          {selectedProject && (
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6">
              <div className="relative w-full max-w-4xl rounded-[28px] border border-black/10 bg-white p-8 shadow-2xl">
                <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                  <div className="overflow-hidden rounded-2xl border border-black/10">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-black/40">
                      {selectedProject.type}
                    </p>

                    <h2 className="mt-3 text-5xl font-black tracking-[-0.06em]">
                      {selectedProject.title}
                    </h2>

                    <p className="mt-6 text-base leading-relaxed text-black/60">
                      {selectedProject.details}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                      {selectedProject.github !== "#" && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="pointer-events-auto rounded-full bg-black px-6 py-3 text-sm uppercase tracking-wide text-white transition hover:bg-black/80"
                        >
                          View GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
