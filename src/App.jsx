import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "./components/BorderGlow";

gsap.registerPlugin(ScrollTrigger);

let introPlayedInThisVisit = false;

const projects = [
  {
    number: "01",
    type: "Hackathon",
    title: "Noma",
    description:
      "AI-powered accounting web app for tracking sales and purchase data, built using AI-assisted development tools.",
    image: "/noma.svg",
    github:
      "https://github.com/Zakria774/Noma-AI-Powered-Financial-Dashboard-Hackathon-Project-.git",
    details:
      "Noma is an AI-powered financial dashboard created during Micathon. It helps manage accounting workflows, visualize transactions, and simplify financial tracking through a clean interface.",
  },
  {
    number: "02",
    type: "MCP Server",
    title: "Job Finder MCP",
    description:
      "A Model Context Protocol server that scrapes and recommends remote job listings for AI agents, built with Python and Playwright.",
    image: "/job-finder-mcp.svg",
    github: "https://github.com/Zakria774/Job_Finder_mcp_docker",
    details:
      "Job Finder MCP connects AI assistants to real remote job listings through the Model Context Protocol. Built with Python and Playwright, it scrapes job boards behind the scenes and exposes a search tool so an LLM can find, compare, and recommend roles conversationally, no manual browsing required.",
  },
  {
    number: "03",
    type: "C++ / OOP",
    title: "2D Racing Game",
    description:
      "In-progress racing game applying OOP concepts, player movement, collision detection, and modular design.",
    image: "/racing-game.svg",
    github: "#",
    details:
      "A C++ racing game focused on object-oriented programming concepts, collision mechanics, and gameplay systems.",
  },
  {
    number: "04",
    type: "AI Automation",
    title: "AI Travel Planner",
    description:
      "A Python tool that scrapes flights and hotels with Playwright, then uses the Groq LLM to recommend the best full itinerary.",
    image: "/travel-planner.svg",
    github: "https://github.com/Zakria774/AI-travel-planner.git",
    details:
      "AI Travel Planner automates trip research end to end. It scrapes live flight options from Google Flights and hotel listings from Booking.com using Playwright, then feeds everything to the Groq API, which weighs price, travel time, hotel quality, and location to recommend the best complete itinerary.",
  },
];

const skills = ["Python", "C++", "AI Systems", "AI Automation", "Playwright", "Linux"];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#works", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

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

// Only run these checks in development — no reason to spend cycles on them in production.
if (import.meta.env.DEV) {
  console.assert(
    assertProjectDataIsValid(projects),
    "Each project must include number, type, title, description, image, github, and details."
  );
  console.assert(assertSkillsAreValid(skills), "Skills must be a non-empty list.");
}

export default function MZPortfolioIntro() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const introRef = useRef(null);
  const fullNameRef = useRef(null);
  const mzRef = useRef(null);
  const dashboardRef = useRef(null);
  const cardRef = useRef(null);
  const modalRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const projectRefs = useRef([]);
  const dotRefs = useRef([]);

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

  // Animate the project timeline as the user scrolls: the center line draws
  // downward, each project card fades/slides in, and its node lights up violet.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (progressLineRef.current && timelineRef.current) {
        gsap.to(progressLineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        });
      }

      projectRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      dotRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { backgroundColor: "rgba(0,0,0,0.15)", scale: 1 },
          {
            backgroundColor: "#7C3AED",
            scale: 1.4,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Close the modal when clicking outside it, or pressing Escape.
  useEffect(() => {
    if (!selectedProject) return undefined;

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedProject(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  // Close mobile nav whenever a link is tapped.
  const handleNavLinkClick = () => setMobileNavOpen(false);

  return (
    <div className="relative min-h-screen bg-[#f5efe0] text-black">
      <div
        ref={introRef}
        className="fixed inset-0 z-30 flex items-center justify-center bg-[#f5efe0]"
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
        className="min-h-screen bg-[#f5efe0] p-4 opacity-0 sm:p-6 lg:p-10"
      >
        <div
          ref={cardRef}
          className="relative mx-auto flex min-h-[88vh] w-full max-w-[1500px] flex-col rounded-[28px] bg-white text-black opacity-0 shadow-[0_10px_60px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
        >
          <nav className="sticky top-4 z-20 mx-4 mt-4 rounded-full border border-black/10 bg-black text-white shadow-xl shadow-black/10 sm:mx-6 lg:mx-10">
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <a href="#home" className="text-2xl font-black tracking-[-0.05em]">
                MZ
              </a>

              <div className="hidden items-center gap-7 text-xs font-medium uppercase tracking-wide md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    className="transition hover:text-white/50"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  className="hidden rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-white/80 sm:block"
                  href="/Muhammad_Zakria_Resume.docx"
                  download
                >
                  Download CV
                </a>

                <button
                  type="button"
                  onClick={() => setMobileNavOpen((open) => !open)}
                  aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileNavOpen}
                  className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 md:hidden"
                >
                  <span
                    className={`h-0.5 w-4 transition-transform ${
                      mobileNavOpen ? "translate-y-2 rotate-45 bg-violet-400" : "bg-white"
                    }`}
                  />
                  <span
                    className={`h-0.5 w-4 bg-white transition-opacity ${
                      mobileNavOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 w-4 transition-transform ${
                      mobileNavOpen ? "-translate-y-2 -rotate-45 bg-violet-400" : "bg-white"
                    }`}
                  />
                </button>
              </div>
            </div>

            {mobileNavOpen && (
              <div className="flex flex-col gap-1 border-t border-white/10 px-5 pb-4 pt-3 text-sm font-medium uppercase tracking-wide md:hidden">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavLinkClick}
                    className="rounded-lg px-2 py-2 transition hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/cv.pdf"
                  download
                  onClick={handleNavLinkClick}
                  className="mt-2 rounded-full bg-white px-4 py-2 text-center text-xs font-bold text-black"
                >
                  Download CV
                </a>
              </div>
            )}
          </nav>

          <main
            id="home"
            className="flex flex-1 scroll-mt-28 items-center justify-center px-6 py-20 sm:px-10 lg:px-12 lg:py-28"
          >
            <section className="flex max-w-5xl flex-col items-center">
              <BorderGlow
                backgroundColor="#faf5ea"
                glowColor="262 83 58"
                borderRadius={24}
                glowRadius={30}
                glowIntensity={1}
                coneSpread={25}
                colors={["#7C3AED", "#C4B5FD", "#4C1D95"]}
                className="px-8 py-12 text-center sm:px-16 sm:py-16"
              >
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-violet-600">
                  AI • AUTOMATION • SYSTEMS
                </p>

                <h2 className="whitespace-nowrap text-[11vw] font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-[8vw] lg:text-[5.5vw]">
                  M ZAKRIA
                </h2>

                <p className="mx-auto mt-8 max-w-2xl text-lg font-medium uppercase leading-tight tracking-[-0.03em] text-black/70 sm:text-xl lg:text-2xl">
                  Computer Science student building intelligent systems,
                  automation tools, and modern digital experiences.
                </p>
              </BorderGlow>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#works"
                  className="text-sm uppercase tracking-wide text-black/40 transition hover:text-violet-600"
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
                04 Projects
              </span>
            </div>

            <div ref={timelineRef} className="relative py-6">
              <div className="pointer-events-none absolute inset-y-0 left-6 w-px bg-black/10 md:left-1/2" />
              <div
                ref={progressLineRef}
                className="pointer-events-none absolute inset-y-0 left-6 w-px origin-top scale-y-0 bg-violet-600 md:left-1/2"
              />

              <div className="flex flex-col gap-14">
                {projects.map((project, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <div
                      key={project.number}
                      className={`relative flex ${isEven ? "" : "md:justify-end"}`}
                    >
                      <span
                        ref={(el) => (dotRefs.current[i] = el)}
                        className="absolute left-6 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-black/15 md:left-1/2"
                      />

                      <div
                        ref={(el) => (projectRefs.current[i] = el)}
                        className={`w-full pl-16 opacity-0 md:w-1/2 md:pl-0 ${
                          isEven ? "md:pr-16" : "md:pl-16"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedProject((current) =>
                              current?.number === project.number ? null : project
                            )
                          }
                          aria-expanded={selectedProject?.number === project.number}
                          className="group relative w-full overflow-hidden rounded-2xl border border-black/5 bg-[#faf5ea] text-left transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
                        >
                          <div className="aspect-[16/9] w-full overflow-hidden bg-black/5">
                            <img
                              src={project.image}
                              alt={project.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          </div>

                          <div className="p-5 sm:p-6">
                            <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-wide">
                              <span className="rounded-full border border-violet-600/40 px-3 py-1 text-violet-700">
                                {project.type}
                              </span>
                              <span className="text-black/40">{project.number}</span>
                            </div>
                            <h4 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                              {project.title}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-black/50">
                              {project.description}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
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
              <p>
                Looking forward, I’m interested in research opportunities where
                I can collaborate on cutting-edge AI projects, explore novel
                intelligent systems, and contribute to impactful discoveries.
                I enjoy combining technical rigor with creativity, and I’m
                always seeking ways to learn, innovate, and make technology
                meaningful.
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
                  href="mailto:zakriamuhmmad07@gmail.com"
                >
                  <span className="transition group-hover:opacity-0">
                    Email ↗
                  </span>
                  <span className="absolute left-0 top-0 text-violet-700 opacity-0 transition group-hover:opacity-100">
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
                  <span className="absolute left-0 top-0 text-violet-700 opacity-0 transition group-hover:opacity-100">
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
                  <span className="absolute left-0 top-0 text-violet-700 opacity-0 transition group-hover:opacity-100">
                    Zakria774
                  </span>
                </a>
              </div>
              <span>Scroll to explore ↓</span>
            </div>
          </footer>

          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-6">
              <div
                ref={modalRef}
                className="relative w-full max-w-4xl rounded-[28px] border border-black/10 bg-white p-8 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg leading-none transition hover:bg-black/5"
                >
                  ×
                </button>

                <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                  <div className="overflow-hidden rounded-2xl border border-black/10">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-violet-600">
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
                          className="rounded-full bg-violet-600 px-6 py-3 text-sm uppercase tracking-wide text-white transition hover:bg-violet-700"
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