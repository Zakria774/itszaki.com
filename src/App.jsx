
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";
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
    technologies: ["AI-assisted development", "Financial dashboards", "Web"],
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
    technologies: ["Python", "Playwright", "MCP"],
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
    technologies: ["C++", "OOP", "Game mechanics"],
    status: "In development",
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
    technologies: ["Python", "Playwright", "Groq API"],
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

// Web3Forms access keys are public identifiers, not secret API keys.
const WEB3FORMS_ACCESS_KEY = "8d2ec88e-88ba-487b-adef-5b72461def96";

const skills = [
  "Python",
  "C++",
  "AI Systems",
  "AI Automation",
  "Playwright",
  "Linux",
];

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
      project.details &&
      Array.isArray(project.technologies) &&
      project.technologies.length > 0
  );
}

function assertSkillsAreValid(items) {
  return Array.isArray(items) && items.length > 0 && items.every(Boolean);
}

if (import.meta.env.DEV) {
  console.assert(
    assertProjectDataIsValid(projects),
    "Every project must have its required fields."
  );
  console.assert(
    assertSkillsAreValid(skills),
    "Skills must be a non-empty list."
  );
}

export default function MZPortfolioIntro() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState("idle");

  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const introRef = useRef(null);
  const fullNameRef = useRef(null);
  const mzRef = useRef(null);
  const dashboardRef = useRef(null);
  const cardRef = useRef(null);

  const modalRef = useRef(null);
  const modalCloseRef = useRef(null);
  const lastProjectTriggerRef = useRef(null);

const contactStartedAtRef = useRef(0);
const lastSentAtRef = useRef(0);

useEffect(() => {
  contactStartedAtRef.current = Date.now();
}, []);

  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const projectRefs = useRef([]);
  const dotRefs = useRef([]);

  // Listen for operating-system reduced-motion settings.
  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const onChange = (event) => {
      setReducedMotion(event.matches);
    };

    query.addEventListener("change", onChange);

    return () => {
      query.removeEventListener("change", onChange);
    };
  }, []);

  // Introduction animation with proper cleanup.
  useEffect(() => {
    const hasPlayedIntro = introPlayedInThisVisit;

    if (hasPlayedIntro || reducedMotion) {
      introPlayedInThisVisit = true;

      gsap.set(introRef.current, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set(dashboardRef.current, {
        autoAlpha: 1,
      });

      gsap.set(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "expo.inOut",
        },
        onComplete: () => {
          introPlayedInThisVisit = true;
        },
      });

      gsap.set(dashboardRef.current, {
        autoAlpha: 0,
      });

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
              if (introRef.current) {
                introRef.current.style.pointerEvents = "none";
              }
            },
          },
          "-=0.15"
        );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  // Project timeline animations.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          projectRefs.current.filter(Boolean),
          { autoAlpha: 1, y: 0 }
        );

        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, {
            scaleY: 1,
          });
        }

        gsap.set(dotRefs.current.filter(Boolean), {
          backgroundColor: "#7C3AED",
          scale: 1,
        });

        return;
      }

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
          {
            autoAlpha: 0,
            y: 50,
          },
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
          {
            backgroundColor: "rgba(0,0,0,0.15)",
            scale: 1,
          },
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
  }, [reducedMotion]);

  // Project modal accessibility and focus management.
  useEffect(() => {
    if (!selectedProject) return undefined;

    const pageRoot = document.getElementById("root");
    const wasInert = pageRoot?.inert ?? false;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (pageRoot) {
      pageRoot.inert = true;
    }

    modalCloseRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedProject(null);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) {
        return;
      }

      const focusables = Array.from(
        modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.getClientRects().length > 0);

      if (focusables.length === 0) {
        event.preventDefault();
        modalRef.current.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      const outside = !modalRef.current.contains(
        document.activeElement
      );

      if (
        event.shiftKey &&
        (document.activeElement === first || outside)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || outside)
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;

      if (pageRoot) {
        pageRoot.inert = wasInert;
      }

      if (lastProjectTriggerRef.current?.isConnected) {
        lastProjectTriggerRef.current.focus();
      }
    };
  }, [selectedProject]);

  // Contact form validation and Web3Forms integration.
  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (contactStatus === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("botcheck")) {
      setContactStatus("sent");
      form.reset();
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (
      !name ||
      !email ||
      !message ||
      name.length > 100 ||
      email.length > 254 ||
      message.length > 3000
    ) {
      setContactStatus("error");
      return;
    }

    if (
      Date.now() - contactStartedAtRef.current < 1200 ||
      Date.now() - lastSentAtRef.current < 15000
    ) {
      setContactStatus("error");
      return;
    }

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      const subject = encodeURIComponent(
        `Message from ${name} via itszaki.com`
      );

      const body = encodeURIComponent(
        `${message}\n\n${name}\n${email}`
      );

      window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      return;
    }

    setContactStatus("sending");

    const controller = new AbortController();

    const timeout = window.setTimeout(() => {
      controller.abort();
    }, 12000);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Message from ${name} via itszaki.com`,
            from_name: name,
            name,
            email,
            message,
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        lastSentAtRef.current = Date.now();
        contactStartedAtRef.current = Date.now();
        setContactStatus("sent");
        form.reset();
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const handleNavLinkClick = () => {
    setMobileNavOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#f5efe0] text-black">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3 focus:text-black"
      >
        Skip to content
      </a>

      <div
        ref={introRef}
        aria-hidden="true"
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
          <nav
            aria-label="Main navigation"
            className="sticky top-4 z-20 mx-4 mt-4 rounded-full border border-black/10 bg-black text-white shadow-xl shadow-black/10 sm:mx-6 lg:mx-10"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <a
                href="#home"
                className="text-2xl font-black tracking-[-0.05em]"
              >
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
                  onClick={() =>
                    setMobileNavOpen((open) => !open)
                  }
                  aria-label={
                    mobileNavOpen ? "Close menu" : "Open menu"
                  }
                  aria-expanded={mobileNavOpen}
                  className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 md:hidden"
                >
                  <span
                    className={`h-0.5 w-4 transition-transform ${
                      mobileNavOpen
                        ? "translate-y-2 rotate-45 bg-violet-400"
                        : "bg-white"
                    }`}
                  />
                  <span
                    className={`h-0.5 w-4 bg-white transition-opacity ${
                      mobileNavOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 w-4 transition-transform ${
                      mobileNavOpen
                        ? "-translate-y-2 -rotate-45 bg-violet-400"
                        : "bg-white"
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
                colors={[
                  "#7C3AED",
                  "#C4B5FD",
                  "#4C1D95",
                ]}
                className="px-8 py-12 text-center sm:px-16 sm:py-16"
              >
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-violet-600">
                  AI • AUTOMATION • SYSTEMS
                </p>

                <h1 className="whitespace-nowrap text-[11vw] font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-[8vw] lg:text-[5.5vw]">
                  M ZAKRIA
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-lg font-medium uppercase leading-tight tracking-[-0.03em] text-black/70 sm:text-xl lg:text-2xl">
                  Computer Science student building intelligent systems,
                  automation tools, and modern digital experiences.
                </p>
              </BorderGlow>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#works"
                  className="rounded-full bg-violet-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-700"
                >
                  View projects
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-black/15 px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:border-violet-600 hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-700"
                >
                  Contact me
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
                        <li
                          key={point}
                          className="flex gap-3"
                        >
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
                {String(projects.length).padStart(2, "0")} Projects
              </span>
            </div>

            <div
              ref={timelineRef}
              className="relative py-6"
            >
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
                      className={`relative flex ${
                        isEven ? "" : "md:justify-end"
                      }`}
                    >
                      <span
                        ref={(el) => {
                          dotRefs.current[i] = el;
                        }}
                        className="absolute left-6 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-black/15 md:left-1/2"
                      />

                      <div
                        ref={(el) => {
                          projectRefs.current[i] = el;
                        }}
                        className={`w-full pl-16 opacity-0 md:w-1/2 md:pl-0 ${
                          isEven
                            ? "md:pr-16"
                            : "md:pl-16"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(event) => {
                            lastProjectTriggerRef.current =
                              event.currentTarget;

                            setSelectedProject(project);
                          }}
                          aria-haspopup="dialog"
                          aria-controls={
                            selectedProject?.number === project.number
                              ? "project-details-dialog"
                              : undefined
                          }
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

                              <span className="text-black/40">
                                {project.number}
                              </span>
                            </div>

                            <h4 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                              {project.title}
                            </h4>

                            <p className="mt-2 text-sm leading-relaxed text-black/60">
                              {project.description}
                            </p>

                            <div
                              className="mt-4 flex flex-wrap gap-2"
                              aria-label="Technologies used"
                            >
                              {project.technologies.map(
                                (technology) => (
                                  <span
                                    key={technology}
                                    className="rounded-full border border-violet-600/20 bg-white/70 px-2.5 py-1 text-xs font-medium text-violet-800"
                                  >
                                    {technology}
                                  </span>
                                )
                              )}
                            </div>

                            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-violet-700">
                              {project.status || "View project details"}{" "}
                              <span aria-hidden="true">↗</span>
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
                I’m a Computer Science student passionate about AI,
                automation, and intelligent systems, with a strong focus
                on research-driven solutions that create real-world impact.
              </p>

              <p>
                Looking forward, I’m interested in research opportunities
                where I can collaborate on cutting-edge AI projects, explore
                novel intelligent systems, and contribute to impactful
                discoveries. I enjoy combining technical rigor with
                creativity, and I’m always seeking ways to learn, innovate,
                and make technology meaningful.
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
                If you want me to work with you, collaborate on a project,
                or have an opportunity in mind, send me a message.
                I’d love to hear from you.
              </p>

              <div className="mt-10 flex flex-col items-start gap-6">
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
                  className="group relative flex h-16 min-w-[260px] items-center justify-start text-xl font-bold uppercase tracking-wide transition hover:text-violet-600"
                >
                  <span className="transition duration-300 group-hover:-translate-x-2 group-hover:opacity-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-11 w-11"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </span>

                  <span className="absolute inset-0 flex items-center justify-start whitespace-nowrap opacity-0 transition duration-300 group-hover:opacity-100">
                    Muhammad Zakria
                  </span>
                </a>

                <a
                  href="https://github.com/Zakria774"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub: Zakria774"
                  className="group relative flex h-16 min-w-[260px] items-center justify-start text-xl font-bold uppercase tracking-wide transition hover:text-violet-600"
                >
                  <span className="transition duration-300 group-hover:-translate-x-2 group-hover:opacity-0">
                    <svg
                      viewBox="0 0 19 19"
                      className="h-11 w-11"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
                      />
                    </svg>
                  </span>

                  <span className="absolute inset-0 flex items-center justify-start whitespace-nowrap opacity-0 transition duration-300 group-hover:opacity-100">
                    Zakria774
                  </span>
                </a>
              </div>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <label
                htmlFor="contact-name"
                className="sr-only"
              >
                Your name
              </label>

              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                maxLength={100}
                required
                placeholder="Your name"
                className="w-full rounded-2xl border border-black/10 bg-[#faf5ea] px-5 py-3.5 text-base text-black outline-none transition placeholder:text-black/30 focus:border-violet-600"
              />

              <label
                htmlFor="contact-email"
                className="sr-only"
              >
                Your email
              </label>

              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                maxLength={254}
                required
                placeholder="Your email"
                className="w-full rounded-2xl border border-black/10 bg-[#faf5ea] px-5 py-3.5 text-base text-black outline-none transition placeholder:text-black/30 focus:border-violet-600"
              />

              <label
                htmlFor="contact-message"
                className="sr-only"
              >
                Your message
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={3000}
                rows={6}
                placeholder="Your message"
                className="w-full rounded-2xl border border-black/10 bg-[#faf5ea] px-5 py-3.5 text-base text-black outline-none transition placeholder:text-black/30 focus:border-violet-600 resize-none"
              />

              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="self-start rounded-full bg-black px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-violet-600 disabled:opacity-50"
              >
                {contactStatus === "sending"
                  ? "Sending…"
                  : "Send message"}
              </button>

              {contactStatus === "sent" && (
                <p
                  role="status"
                  className="text-base text-violet-700"
                >
                  Message sent. Thank you, I’ll get back to you soon.
                </p>
              )}

              {contactStatus === "error" && (
                <p
                  role="alert"
                  className="text-base text-red-600"
                >
                  Your message could not be sent. Please review it,
                  wait a moment, or email me directly.
                </p>
              )}
            </form>
          </section>

          <footer className="px-6 pb-8 sm:px-10 lg:px-12">
            <div className="flex flex-col gap-5 border-t border-black/10 pt-7 text-xs font-medium uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span className="text-black/40">
                © M Zakria
              </span>

              <a
                href="#home"
                className="transition hover:text-violet-600"
              >
                Back to top ↑
              </a>
            </div>
          </footer>

          {selectedProject &&
            createPortal(
              <div
                className="fixed inset-0 z-50 overflow-y-auto bg-black/35 p-3 sm:p-6"
                onPointerDown={(event) => {
                  if (
                    !modalRef.current?.contains(event.target)
                  ) {
                    setSelectedProject(null);
                  }
                }}
              >
                <div className="flex min-h-full items-center justify-center">
                  <div
                    id="project-details-dialog"
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="project-dialog-title"
                    aria-describedby="project-dialog-description"
                    tabIndex={-1}
                    className="relative w-full max-w-4xl rounded-[28px] border border-black/10 bg-white p-5 pt-16 shadow-2xl sm:p-8"
                  >
                    <button
                      ref={modalCloseRef}
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close project details"
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg leading-none transition hover:bg-black/5 sm:right-6 sm:top-6"
                    >
                      ×
                    </button>

                    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:gap-10">
                      <div className="overflow-hidden rounded-2xl border border-black/10">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-violet-600">
                          {selectedProject.type}
                        </p>

                        <h2
                          id="project-dialog-title"
                          className="mt-3 text-3xl font-black tracking-[-0.06em] sm:text-5xl"
                        >
                          {selectedProject.title}
                        </h2>

                        <p
                          id="project-dialog-description"
                          className="mt-6 text-base leading-relaxed text-black/70"
                        >
                          {selectedProject.details}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {selectedProject.technologies.map(
                            (technology) => (
                              <span
                                key={technology}
                                className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-800"
                              >
                                {technology}
                              </span>
                            )
                          )}
                        </div>

                        {selectedProject.status && (
                          <p className="mt-4 text-sm font-semibold text-violet-700">
                            {selectedProject.status}
                          </p>
                        )}

                        <div className="mt-8 flex flex-wrap gap-4">
                          {selectedProject.github !== "#" ? (
                            <a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-violet-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-violet-700"
                            >
                              View GitHub
                            </a>
                          ) : (
                            <p className="text-sm text-black/60">
                              Source code isn't public yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
      </section>
    </div>
  );
}
