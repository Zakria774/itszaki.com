import React, { useEffect, useRef } from "react";
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
    href: "https://github.com/Zakria774/Noma-AI-Powered-Financial-Dashboard-Hackathon-Project-.git",
  },
  {
    number: "02",
    type: "Semester Project",
    title: "Scientific Calculator",
    description:
      "Advanced calculator supporting trigonometry, logarithms, and complex mathematical expressions.",
    image: "/calc.png",
    href: "https://github.com/Zakria774/CS101-project.git",
  },
  {
    number: "03",
    type: "C++ / OOP",
    title: "2D Racing Game",
    description:
      "In-progress racing game applying OOP concepts, player movement, collision detection, and modular design.",
    image: "/race.png",
    href: "#",
  },
];

export default function MZPortfolioIntro() {
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
    <div className="relative min-h-screen bg-white text-black">
      <div
        ref={introRef}
        className="fixed inset-0 z-30 flex items-center justify-center bg-white"
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
        className="min-h-screen bg-white p-4 opacity-0 sm:p-6 lg:p-10"
      >
        <div
          ref={cardRef}
          className="relative mx-auto flex min-h-[88vh] w-full max-w-[1500px] flex-col rounded-[28px] bg-[#f7f6f3] text-black opacity-0 shadow-2xl ring-1 ring-black/10"
        >
          <nav className="flex h-20 items-center justify-between border-b border-black/10 px-6 sm:px-10 lg:px-12">
            <div className="text-2xl font-black tracking-[-0.05em]">MZ</div>

            <div className="hidden items-center gap-10 text-sm font-medium md:flex">
              <a className="transition hover:opacity-50" href="#works">
                Works
              </a>
              <a className="transition hover:opacity-50" href="#about">
                About
              </a>
              <a className="transition hover:opacity-50" href="#services">
                Services
              </a>
              <a className="transition hover:opacity-50" href="#contact">
                Contact
              </a>
              <a
                className="rounded-full border border-black/15 px-5 py-2 transition hover:bg-black hover:text-white"
                href="/cv.pdf"
                download
              >
                Download CV
              </a>
            </div>

            <button
              className="h-4 w-4 rounded-full bg-black transition hover:scale-125"
              aria-label="Theme button"
            />
          </nav>

          <main className="grid flex-1 grid-cols-1 gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-10">
            <section className="flex flex-col justify-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wide">
                Hi, I’m
              </p>

              <h2 className="text-[19vw] font-black leading-[0.82] tracking-[-0.09em] sm:text-[15vw] lg:text-[8.6vw]">
                M ZAKRIA
              </h2>

              <p className="mt-8 max-w-3xl text-2xl font-medium uppercase leading-tight tracking-[-0.04em] sm:text-3xl lg:text-[2.1rem]">
                AI-focused Computer Science student building intelligent systems
                and web products
              </p>

              <div className="my-9 h-px max-w-xl bg-black/10" />

              <p className="max-w-xl text-base leading-relaxed text-black/60 sm:text-lg">
                Passionate about AI, automation, and research-driven solutions
                that create real-world impact.
              </p>
            </section>

            <section className="flex flex-col items-center justify-center gap-6 lg:items-end">
              {/* CV BOX */}
              <div className="w-[120px] h-[120px] rounded-xl border border-black/15 flex flex-col items-center justify-center bg-white shadow-sm">
                <span className="text-lg font-bold tracking-wide">MY CV</span>
                <a
                  href="/cv.pdf"
                  download
                  className="mt-2 text-xs uppercase tracking-wide border border-black/20 px-3 py-1 rounded-full transition hover:bg-black hover:text-white"
                >
                  Download
                </a>
              </div>

              {/* IMAGE */}
              <div className="relative aspect-[4/5] w-full max-w-[390px] overflow-hidden rounded-2xl bg-neutral-300 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/20" />
                <div className="flex h-full w-full items-center justify-center px-8 text-center text-lg font-medium text-black/40">
                  Add Your Photo Here
                </div>

                <div className="absolute bottom-5 left-5 rounded-full bg-white/75 px-4 py-2 text-xs font-medium uppercase tracking-wide backdrop-blur">
                  AI / Automation / Web
                </div>
              </div>
            </section>
          </main>

          <section
            id="works"
            className="border-t border-black/10 px-6 py-8 sm:px-10 lg:px-12"
          >
            <div className="mb-7 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-black/50">
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
                <a
                  key={project.number}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative min-h-[230px] overflow-hidden rounded-2xl border border-black/10 bg-white/50 p-6 transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full scale-110 object-cover transition duration-700 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/55" />
                  </div>

                  <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-black/40 transition group-hover:text-white/70">
                      <span>{project.type}</span>
                      <span>{project.number}</span>
                    </div>

                    <div>
                      <h4 className="text-3xl font-black tracking-[-0.04em] transition duration-300 group-hover:scale-[1.02] group-hover:text-white sm:text-5xl">
                        {project.title}
                      </h4>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/70 transition group-hover:text-white/85 sm:text-base">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section
            id="about"
            className="grid grid-cols-1 gap-8 border-t border-black/10 px-6 py-8 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"
          >
            <div>
              <p className="text-xl font-bold uppercase tracking-wide text-black mb-2">
                About
              </p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.05em]">
                Research-driven builder
              </h3>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-black/65 sm:text-lg">
              <p>
                I’m a Computer Science student passionate about AI, automation,
                and intelligent systems, with a strong focus on research-driven
                solutions that create real-world impact.
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-medium text-black">
                <span className="rounded-full border border-black/10 px-4 py-2">
                  Python
                </span>
                <span className="rounded-full border border-black/10 px-4 py-2">
                  C++
                </span>
                <span className="rounded-full border border-black/10 px-4 py-2">
                  AI Systems
                </span>
                <span className="rounded-full border border-black/10 px-4 py-2">
                  Automation
                </span>
              </div>
            </div>
          </section>

          <footer id="contact" className="px-6 pb-8 sm:px-10 lg:px-12">
            <div className="flex flex-col gap-5 border-t border-black/10 pt-7 text-xs font-medium uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <div className="flex flex-wrap gap-5">
                <a
                  className="transition hover:opacity-50"
                  href="mailto:zakriamuhmmad07@gmail.com"
                >
                  Email ↗
                </a>
                <a className="transition hover:opacity-50" href="#">
                  LinkedIn ↗
                </a>
                <a className="transition hover:opacity-50" href="#">
                  GitHub ↗
                </a>
                <a
                  className="rounded-full border border-black/15 px-4 py-2 transition hover:bg-black hover:text-white"
                  href="/cv.pdf"
                  download
                >
                  Download CV ↓
                </a>
              </div>
              <span>Scroll to explore ↓</span>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
