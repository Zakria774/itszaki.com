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

const experiences = [
  {
    type: "Society",
    role: "Event Organizer & Host",
    org: "Nexus Society, GIK Institute",
    date: "October 2026",
    description:
      "Managed and hosted a cybersecurity event for the society, with almost 50 participants.",
    highlights: [
      "Organized the event in a team of two",
      "Demonstrated Linux and WiFi hacking to the participants",
      "Hosted a mystery-solving game to keep the audience involved",
    ],
  },
  {
    type: "Hackathon",
    role: "Team Lead",
    org: "Micathon",
    date: "January 2026",
    description:
      "Led a team of four to a top 5 finish out of roughly 15 to 20 teams.",
    highlights: [
      "Led the building of Noma, an AI-powered financial dashboard for tracking sales and purchase data",
      "Led the final presentation",
    ],
  },
  {
    type: "Hackathon",
    role: "Team Lead",
    org: "Hack Summer",
    date: "July 2026",
    description:
      "Led a team of three to a top 8 finish out of almost 30 teams.",
    highlights: [
      "Led the building of Trust Gap, a website that checks whether a job posting is safe by finding the information missing from its description",
      "Led the final presentation",
    ],
  },
];

const CONTACT_EMAIL = "zakriamuhmmad07@gmail.com";
// Web3Forms access key (safe to keep in front-end code, it only allows sending to your inbox).
const WEB3FORMS_ACCESS_KEY = "8d2ec88e-88ba-487b-adef-5b72461def96";

const skills = ["Python", "C++", "AI Systems", "AI Automation", "Playwright", "Linux"];

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
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
  const [contactStatus, setContactStatus] = useState("idle");
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

  // Send the contact form straight to your inbox through Web3Forms.
  // Falls back to the visitor's email app until an access key is set.
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      const body = `${message}\n\n${name}\n${email}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Message from ${name} via itszaki.com`
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setContactStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Message from ${name} via itszaki.com`,
          from_name: name,
          name,
          email,
          message,
          ...(data.get("botcheck") ? { botcheck: "on" } : {}),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setContactStatus("sent");
        form.reset();
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };

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
                  href="/Muhammad_Zakria_Resume.docx"
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
            id="experience"
            className="scroll-mt-28 border-t border-black/10 px-6 py-10 sm:px-10 lg:px-12"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-black tracking-[-0.05em]">
                Beyond the Classroom
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              {experiences.map((item) => (
                <div
                  key={item.role + item.org}
                  className="rounded-2xl border border-black/5 bg-[#faf5ea] p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-violet-600/40 px-3 py-1 text-xs uppercase tracking-wide text-violet-700">
                      {item.type}
                    </span>
                    {item.date && (
                      <span className="text-xs uppercase tracking-wide text-black/40">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <h4 className="mt-5 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                    {item.role}
                  </h4>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-black/40">
                    {item.org}
                  </p>
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-black/60">
                    {item.description}
                  </p>
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-4 max-w-3xl space-y-2 text-base leading-relaxed text-black/60">
                      {item.highlights.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

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

          <section
            id="contact"
            className="scroll-mt-28 grid grid-cols-1 gap-10 border-t border-black/10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20"
          >
            <div>
              <p className="mb-2 text-xl font-bold uppercase tracking-wide text-black">
                Contact
              </p>
              <h3 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                Let’s work together
              </h3>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-black/60">
                If you want me to work with you, collaborate on a project, or
                have an opportunity in mind, send me a message. I’d love to
                hear from you.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Let%27s%20work%20together`}
                  className="rounded-full bg-violet-600 px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-violet-700"
                >
                  Send me an email
                </a>
                <a
                  href="https://www.linkedin.com/in/muhammad-zakria-382640403?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn: Muhammad Zakria"
                  className="group relative flex h-16 min-w-[190px] items-center justify-start text-xl font-bold uppercase tracking-wide transition hover:text-violet-600"
                >
                  <span className="transition duration-300 group-hover:-translate-x-2 group-hover:opacity-0">
                    <svg viewBox="0 0 24 24" className="h-11 w-11" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-start opacity-0 transition duration-300 group-hover:opacity-100">
                    Muhammad Zakria
                  </span>
                </a>
                <a
                  href="https://github.com/Zakria774"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub: Zakria774"
                  className="group relative flex h-16 min-w-[190px] items-center justify-start text-xl font-bold uppercase tracking-wide transition hover:text-violet-600"
                >
                  <span className="transition duration-300 group-hover:-translate-x-2 group-hover:opacity-0">
                    <svg viewBox="0 0 19 19" className="h-11 w-11" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-start opacity-0 transition duration-300 group-hover:opacity-100">
                    Zakria774
                  </span>
                </a>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-black/10 bg-[#faf5ea] px-5 py-3.5 text-base text-black outline-none transition placeholder:text-black/30 focus:border-violet-600"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="w-full rounded-2xl border border-black/10 bg-[#faf5ea] px-5 py-3.5 text-base text-black outline-none transition placeholder:text-black/30 focus:border-violet-600"
              />
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Your message"
                className="w-full rounded-2xl border border-black/10 bg-[#faf5ea] px-5 py-3.5 text-base text-black outline-none transition placeholder:text-black/30 focus:border-violet-600 resize-none"
              />
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="self-start rounded-full bg-black px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-violet-600 disabled:opacity-50"
              >
                {contactStatus === "sending" ? "Sending…" : "Send message"}
              </button>
              {contactStatus === "sent" && (
                <p className="text-base text-violet-700">
                  Message sent. Thank you, I’ll get back to you soon.
                </p>
              )}
              {contactStatus === "error" && (
                <p className="text-base text-red-600">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </section>

          <footer className="px-6 pb-8 sm:px-10 lg:px-12">
            <div className="flex flex-col gap-5 border-t border-black/10 pt-7 text-xs font-medium uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span className="text-black/40">© M Zakria</span>
              <a href="#home" className="transition hover:text-violet-600">
                Back to top ↑
              </a>
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