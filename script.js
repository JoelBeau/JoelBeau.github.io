const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('.nav-menu a[href*="#"]');
const sections = document.querySelectorAll("main section[id]");
const yearTarget = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const typedText = document.getElementById("typed-text");

const terminalShell = document.getElementById("terminal-shell");
const terminalOutput = document.getElementById("terminal-output");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");

const links = {
  github: "https://github.com/JoelBeau",
  linkedin: "https://www.linkedin.com/in/joel-beauregard-b74b54315",
  resume: "assets/Joel_Beauregard_Resume.pdf"
};

const sectionSelectors = {
  about: "index.html#about",
  experience: "index.html#experience",
  oracle: "index.html#experience",
  projects: "index.html#projects",
  socketscout: "index.html#projects",
  thermo: "index.html#projects",
  captions: "index.html#projects",
  skills: "index.html#skills",
  education: "index.html#education",
  contact: "index.html#contact"
};

const commandDocs = [
  "help          list available commands",
  "whoami        quick professional summary",
  "about         in-depth background summary",
  "focus         current technical interests",
  "experience    detailed experience overview",
  "oracle        Oracle internship details",
  "captions      Tacit Captions research details",
  "projects      featured project overview",
  "socketscout   networking project details",
  "thermo        thermodynamics database details",
  "skills        technical toolkit snapshot",
  "education     academic background",
  "contact       ways to reach me",
  "ls            list items in the current directory",
  "pwd           show current terminal path",
  "cd <dir>      change directories",
  "cat <file>    read a file in the current directory",
  "open <item>   jump to a section on the site",
  "github        open GitHub profile",
  "linkedin      open LinkedIn profile",
  "resume        open resume PDF",
  "clear         clear terminal output"
];

const virtualDirectories = {
  "~/profile": [
    "about.txt",
    "oracle.log",
    "experience.log",
    "projects/",
    "skills.json",
    "contact.vcf",
    "resume.pdf",
    "github.link",
    "linkedin.link"
  ],
  "~/profile/projects": [
    "socketscout.md",
    "thermo-database.md",
    "multi-modal-sensor-captioning.md"
  ]
};

const fileContents = {
  "~/profile/about.txt":
    "Joel Beauregard\n\nComputer Science / Software Engineering student at the University of Texas at Arlington focused on systems, networking, cloud infrastructure, cybersecurity, and practical developer tooling. I’m building toward software engineering roles where infrastructure awareness, technical depth, and real-world execution matter.\n\nMy strongest work sits close to production-minded engineering: network visibility, signal-rich tooling, automation, and developer-facing systems that solve concrete problems.",
  "~/profile/oracle.log":
    "Oracle | Software Engineering Intern | Summer 2025 | Returning Summer 2026\n\nResearched, designed, and documented a Network Traffic Analytics feature for Oracle Private Cloud Appliance focused on SR-IOV Virtual Cloud Network visibility and observability.\n\nHighlights:\n- Analyzed network traffic flows and system constraints to guide architecture and feature design.\n- Collaborated with senior engineers to prototype the feature and help lay the groundwork for a future customer-facing networking capability.\n- Built and validated feature infrastructure with Python and Bash, containerized with Podman, orchestrated in Kubernetes, and integrated into existing CI/CD pipelines.\n- Tested against Cisco switches and Oracle PCA hardware in production-like environments.\n- Ported 180+ Network Controller tests into a MySQL-backed containerized framework for more reliable validation and CI execution.\n- Improved test performance by about 80% and refactored over half of the ported tests to strengthen error handling, edge-case coverage, and diagnostics.",
  "~/profile/experience.log":
    "Experience Overview\n\n1. Oracle - Software Engineering Intern\nNetworking-focused infrastructure work for Oracle PCA, spanning feature research/design, CI/CD-aware test infrastructure, containerization, hardware validation, and large-scale unit test modernization.\n\n2. Tacit Captions / The Hybrid Atelier - Research Assistant\nWorked with a six-person multidisciplinary team on a multi-modal caption rendering system for sensor-based feedback. Built Python + pandas data pipelines, implemented signal-processing logic, generated synchronized WebVTT captions, contributed to research writing, and connected implementation choices back to the literature on assistive and multi-modal captioning.",
  "~/profile/skills.json":
    '{\n  "languages": ["Python", "Java", "C", "SQL", "Bash"],\n  "tools": ["Git", "GitHub", "Docker", "Podman", "Kubernetes", "PyTest", "SQLAlchemy"],\n  "platforms": ["Linux", "MySQL"],\n  "focus": ["Systems", "Networking", "Cloud Infrastructure", "Security", "Automation"]\n}',
  "~/profile/contact.vcf":
    "GitHub: https://github.com/JoelBeau\nLinkedIn: https://www.linkedin.com/in/joel-beauregard-b74b54315\nEmail: available on request",
  "~/profile/resume.pdf":
    "Binary file preview unavailable here. Run 'resume' to open the PDF.",
  "~/profile/github.link":
    "GitHub profile -> https://github.com/JoelBeau",
  "~/profile/linkedin.link":
    "LinkedIn profile -> https://www.linkedin.com/in/joel-beauregard-b74b54315",
  "~/profile/projects/socketscout.md":
    "SocketScout\nrepo -> https://github.com/JoelBeau/socketscout\n\nA high-performance concurrent port scanner built in Python around asyncio-driven orchestration, per-host state isolation, and modular service interrogation.\n\nHighlights:\n- Scans multiple hosts and large port ranges concurrently using non-blocking I/O.\n- Supports TCP connect scanning by default, optional SYN-based scanning, and modular banner grabbing.\n- Separates orchestration, networking primitives, validation, and output formatting cleanly.\n- Reflects my interest in networking internals, systems correctness, and practical security tooling.",
  "~/profile/projects/thermo-database.md":
    "Thermodynamics Database\nrepo -> https://github.com/JoelBeau/thermo-database\n\nA practical database and scripting project centered on storing and querying thermodynamic table values in a Linux-first workflow.\n\nHighlights:\n- Built a MySQL-backed database with SQL scripts and repeatable setup logic.\n- Used CSV ingestion, parsing, Bash automation, and Python lookup tooling to support efficient retrieval.\n- Demonstrates applied data organization, scripting, automation, and systems-oriented workflow design.",
  "~/profile/projects/multi-modal-sensor-captioning.md":
    "Multi-Modal Sensor Captioning System\n\nResearch-driven caption rendering system developed through Tacit Captions / The Hybrid Atelier.\n\nPaper context:\n- Associated with the paper 'TacitCaptions: Externalizing Tacit Skills within Neon Glass Bending Practices through Sensor-Video Synchronized Cues'.\n- Framed around externalizing tacit skill cues through synchronized sensor-video feedback.\n\nHighlights:\n- Built Python + pandas pipelines to extract, clean, analyze, and validate time-series sensor data.\n- Implemented signal-processing logic to detect state changes and map sensor behavior into synchronized WebVTT caption events.\n- Validated data pipelines against live sensor input and helped connect implementation details back to the paper's methodology and design goals.\n- Supported a multi-modal assistive captioning environment rather than a purely academic proof-of-concept."
};

const commandHistory = [];
let historyIndex = -1;
let currentDirectory = "~/profile";

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const updateActiveNav = () => {
  if (!sections.length) {
    return;
  }

  const homeLink = document.querySelector('.nav-menu a[href="index.html"], .nav-menu a[href="#top"], .nav-menu a[href="index.html#top"]');
  const offset = window.scrollY + 140;
  let matchedSection = false;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-menu a[href="#${id}"], .nav-menu a[href$="#${id}"]`);

    if (!link) {
      return;
    }

    const isActive =
      offset >= section.offsetTop &&
      offset < section.offsetTop + section.offsetHeight;

    link.classList.toggle("active", isActive);
    if (isActive) {
      matchedSection = true;
    }
  });

  if (homeLink) {
    homeLink.classList.toggle("active", !matchedSection || offset < (sections[0]?.offsetTop || 0));
  }
};

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);

if (typedText && !prefersReducedMotion.matches) {
  const messages = [
    "init --focus software-engineering systems networking",
    "tracking -> cloud infrastructure network-visibility developer-platforms",
    "current_state: building practical systems and networking tools"
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const currentMessage = messages[messageIndex];
    typedText.textContent = currentMessage.slice(0, charIndex);

    if (!deleting && charIndex < currentMessage.length) {
      charIndex += 1;
      setTimeout(type, 55);
      return;
    }

    if (!deleting && charIndex === currentMessage.length) {
      deleting = true;
      setTimeout(type, 1700);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(type, 22);
      return;
    }

    deleting = false;
    messageIndex = (messageIndex + 1) % messages.length;
    setTimeout(type, 350);
  };

  type();
} else if (typedText) {
  typedText.textContent = "focus: software engineering, systems, networking, infrastructure";
}

const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const scrollTerminalToBottom = () => {
  if (terminalOutput) {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
};

const appendPromptLine = (command) => {
  if (!terminalOutput) {
    return;
  }

  const line = document.createElement("p");
  line.className = "terminal-line";
  line.innerHTML = `
    <span class="prompt-user">joel@portfolio</span>
    <span class="prompt-divider">:</span>
    <span class="prompt-path">${currentDirectory.replace('~/profile', '~/profile')}</span>
    <span class="prompt-symbol">$</span>
    <span class="terminal-command"></span>
  `;

  line.querySelector(".terminal-command").textContent = command;
  terminalOutput.appendChild(line);
};

const appendResponse = (content, className = "terminal-response") => {
  if (!terminalOutput) {
    return;
  }

  const block = document.createElement("div");
  block.className = className;
  block.textContent = content;
  terminalOutput.appendChild(block);
  scrollTerminalToBottom();
};

const appendHtmlResponse = (content, className = "terminal-response") => {
  if (!terminalOutput) {
    return;
  }

  const block = document.createElement("div");
  block.className = className;
  block.innerHTML = content;
  terminalOutput.appendChild(block);
  scrollTerminalToBottom();
};

const resolveDirectory = (target) => {
  if (!target || target === "~" || target === "~/profile") {
    return "~/profile";
  }

  if (target === "..") {
    return currentDirectory === "~/profile/projects" ? "~/profile" : currentDirectory;
  }

  if (target === "projects" || target === "./projects" || target === "~/profile/projects") {
    return "~/profile/projects";
  }

  return null;
};

const resolveFilePath = (target) => {
  if (!target) {
    return null;
  }

  if (target.startsWith("~/")) {
    return target;
  }

  return `${currentDirectory}/${target}`;
};

const openSection = (key) => {
  const target = sectionSelectors[key];

  if (!target) {
    appendResponse(`open: unknown target '${key}'`);
    return;
  }

  appendResponse(`opening ${target}`);
  window.location.href = target;
};

const commandHandlers = {
  help: () => appendResponse(commandDocs.join("\n")),
  whoami: () =>
    appendResponse(
      "Joel Beauregard | Software engineering student focused on systems, networking, cloud infrastructure, and security-minded tooling.\n\nI’m especially interested in practical engineering work that sits close to infrastructure, developer platforms, and network-aware software rather than purely classroom-scale builds."
    ),
  about: () =>
    appendResponse(fileContents["~/profile/about.txt"]),
  focus: () =>
    appendResponse(
      "Current focus areas:\n- Systems and networking\n- Cloud infrastructure and platform-minded software\n- Security-aware tooling\n- Developer experience and automation\n- Research and engineering work that turns signals into usable feedback"
    ),
  experience: () =>
    appendResponse(fileContents["~/profile/experience.log"]),
  oracle: () =>
    appendResponse(fileContents["~/profile/oracle.log"]),
  captions: () =>
    appendResponse(fileContents["~/profile/projects/multi-modal-sensor-captioning.md"]),
  projects: () =>
    appendResponse(
      "Featured projects\n\n1. SocketScout\nConcurrent Python port scanner with asyncio-based orchestration, optional SYN scanning, banner grabbing, and clean per-host state isolation.\nrepo -> https://github.com/JoelBeau/socketscout\n\n2. Thermodynamics Database\nMySQL-backed lookup and automation project using SQL, Bash, CSV ingestion, and Python tooling.\nrepo -> https://github.com/JoelBeau/thermo-database\n\n3. Multi-Modal Sensor Captioning System\nResearch-driven caption rendering system that transformed live sensor data into synchronized WebVTT captions for a multi-modal feedback environment.\nUse 'cat multi-modal-sensor-captioning.md' after 'cd projects' for details."
    ),
  socketscout: () =>
    appendResponse(fileContents["~/profile/projects/socketscout.md"]),
  thermo: () =>
    appendResponse(fileContents["~/profile/projects/thermo-database.md"]),
  skills: () =>
    appendResponse(
      "Technical toolkit\n\nLanguages:\n- Python, Java, C, SQL, Bash\n\nTools:\n- Git, GitHub, Docker, Podman, Kubernetes, PyTest, SQLAlchemy\n\nPlatforms / Systems:\n- Linux, MySQL, networking fundamentals, cloud / infrastructure concepts\n\nWorking style:\n- Practical software engineering, automation, debugging, and system-aware implementation"
    ),
  education: () =>
    appendResponse(
      "University of Texas at Arlington\nComputer Science / Software Engineering student\nExpected Graduation: May 2027\nGPA: 4.0\nCoursework: Secure Programming, Operating Systems, Databases, Computer Organization, Data Structures and Algorithms, Object-Oriented Programming"
    ),
  contact: () =>
    appendHtmlResponse(
      `Reach out via <a href="${links.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>, <a href="${links.github}" target="_blank" rel="noreferrer">GitHub</a>, or email once contact details are finalized.`
    ),
  ls: () => appendResponse(virtualDirectories[currentDirectory].join("\n")),
  pwd: () => appendResponse(currentDirectory),
  github: () => {
    appendResponse(`opening ${links.github}`);
    openLink(links.github);
  },
  linkedin: () => {
    appendResponse(`opening ${links.linkedin}`);
    openLink(links.linkedin);
  },
  resume: () => {
    appendResponse(`opening ${links.resume}`);
    openLink(links.resume);
  },
  clear: () => {
    if (terminalOutput) {
      terminalOutput.innerHTML = "";
    }
  }
};

const runCommand = (rawInput) => {
  const input = rawInput.trim();

  if (!input) {
    return;
  }

  appendPromptLine(input);

  const [command, ...args] = input.split(/\s+/);
  const normalizedCommand = command.toLowerCase();

  if (normalizedCommand === "open") {
    const target = (args[0] || "").toLowerCase();

    if (!target) {
      appendResponse("usage: open <about|experience|oracle|projects|captions|skills|education|contact|github|linkedin|resume>");
      return;
    }

    if (target in links) {
      appendResponse(`opening ${links[target]}`);
      openLink(links[target]);
      return;
    }

    openSection(target);
    return;
  }

  if (normalizedCommand === "cd") {
    const target = resolveDirectory(args[0]);

    if (!target) {
      appendResponse(`cd: ${args[0] || ""}: No such directory`);
      return;
    }

    currentDirectory = target;
    appendResponse(`directory changed -> ${currentDirectory}`);
    return;
  }

  if (normalizedCommand === "cat") {
    const filePath = resolveFilePath(args[0]);

    if (!filePath) {
      appendResponse("usage: cat <file>");
      return;
    }

    if (!(filePath in fileContents)) {
      appendResponse(`cat: ${args[0]}: No such file`);
      return;
    }

    appendResponse(fileContents[filePath]);
    return;
  }

  if (normalizedCommand in commandHandlers) {
    commandHandlers[normalizedCommand](args);
    return;
  }

  appendResponse(
    `command not found: ${normalizedCommand}\nType 'help' to see available portfolio commands.`
  );
};

const bootstrapTerminal = () => {
  if (!terminalOutput) {
    return;
  }

  appendResponse("Portfolio terminal initialized.", "terminal-hint");
  appendResponse("Type 'help' to explore Joel's background, experience, projects, and research work.", "terminal-hint");
  appendResponse("Good starter commands: help, experience, oracle, captions, ls, cd projects, cat multi-modal-sensor-captioning.md", "terminal-hint");
};

if (terminalShell && terminalInput) {
  terminalShell.addEventListener("click", () => terminalInput.focus());
}

if (terminalForm && terminalInput) {
  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const command = terminalInput.value;

    if (!command.trim()) {
      return;
    }

    commandHistory.push(command);
    historyIndex = commandHistory.length;
    runCommand(command);
    terminalInput.value = "";
  });

  terminalInput.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) {
        return;
      }

      historyIndex = Math.max(0, historyIndex - 1);
      terminalInput.value = commandHistory[historyIndex];
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!commandHistory.length) {
        return;
      }

      historyIndex = Math.min(commandHistory.length, historyIndex + 1);
      terminalInput.value = commandHistory[historyIndex] || "";
    }
  });

  bootstrapTerminal();
}

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
