const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('.nav-menu a[href*="#"]');
const navDropdowns = document.querySelectorAll(".nav-dropdown");
const sections = document.querySelectorAll("main section[id]");
const yearTarget = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const typedText = document.getElementById("typed-text");

const terminalShell = document.getElementById("terminal-shell");
const terminalOutput = document.getElementById("terminal-output");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalPromptPath = document.querySelector(".terminal-input-row .prompt-path");
const skillsTrack = document.getElementById("skills-track");
const skillsCards = skillsTrack ? Array.from(skillsTrack.querySelectorAll(".skills-card")) : [];
const skillsPrevButton = document.querySelector(".skills-nav-prev");
const skillsNextButton = document.querySelector(".skills-nav-next");
const projectTrack = document.getElementById("project-track");
const projectCards = projectTrack ? Array.from(projectTrack.querySelectorAll(".project-card")) : [];
const projectPrevButton = document.querySelector(".project-nav-prev");
const projectNextButton = document.querySelector(".project-nav-next");

const links = {
  github: "https://github.com/JoelBeau",
  linkedin: "https://www.linkedin.com/in/joel-beauregard-b74b54315",
  resume: "assets/Joel Beauregard Resume.pdf"
};

const sectionSelectors = {
  about: "index.html#about",
  experience: "index.html#experience",
  oracle: "index.html#experience",
  projects: "index.html#projects",
  devserver: "projects/devserver/",
  devenv: "projects/devserver/",
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
  "devserver     DevServer project details",
  "devenv        alias for DevServer",
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
    "devserver.md",
    "socketscout.md",
    "thermo-database.md",
    "multi-modal-sensor-captioning.md"
  ]
};

const fileContents = {
  "~/profile/about.txt":
    "Joel Beauregard\n\nComputer Science / Software Engineering student at the University of Texas at Arlington focused on systems, networking, cloud infrastructure, cybersecurity, containers, and practical developer tooling. I’m building toward software engineering roles where infrastructure awareness, technical depth, communication, and real-world execution all matter.\n\nMy strongest work sits close to production-minded engineering: network visibility, containerized infrastructure, remote Linux workflows, automation, and developer-facing systems that solve concrete problems. I’m especially interested in software that is reliable, inspectable, and useful in real environments, whether that means networking analytics, DevServer, or other platform-oriented tooling.\n\nAcross internships, research, and personal projects, a consistent theme in my work is building systems that expose hidden behavior clearly and make workflows easier to trust: network analytics at Oracle, platform design for student Linux workspaces, containerized validation pipelines, and practical inspection tooling in projects like SocketScout. I care a lot about taking work through the full lifecycle too: shaping the design, writing the implementation, testing it well, maintaining it thoughtfully, and communicating clearly enough that the people around me can move faster.",
  "~/profile/oracle.log":
    "Oracle | Software Engineering Intern | Summer 2025 | Returning Summer 2026\n\nWorked on networking-focused infrastructure for Oracle Private Cloud Appliance, centered on a new Network Traffic Analytics feature for SR-IOV Virtual Cloud Network visibility and observability. The work combined feature research, systems reasoning, architecture support, CI/CD-aware tooling, and production-like test validation.\n\nHighlights:\n- Researched, designed, and documented the feature while analyzing network traffic flows and system constraints that shaped the architecture.\n- Collaborated with senior engineers to prototype the feature and lay the groundwork for a future customer-facing networking capability.\n- Built and validated feature infrastructure using Python and Bash, containerized with Podman, orchestrated in Kubernetes, and integrated into existing CI/CD pipelines.\n- Tested against Cisco switches and Oracle PCA hardware to confirm correctness under realistic network traffic and production-like conditions.\n- Ported 180+ Network Controller tests into a MySQL-backed containerized framework for stronger validation and repeatable CI execution.\n- Improved test performance by about 80% and refactored over half of the ported tests to strengthen diagnostics, edge-case coverage, and error handling.\n\nKey stack:\nPython, Bash, Podman, Kubernetes, MySQL, Cisco networking hardware, Oracle PCA, VCN-focused infrastructure work.",
  "~/profile/experience.log":
    "Experience Overview\n\n1. Oracle - Software Engineering Intern\nNetworking-focused infrastructure work for Oracle PCA, spanning feature research and design, CI/CD-aware test infrastructure, containerization, hardware validation, and large-scale unit test modernization. The work strengthened my interest in software that sits between systems internals, network visibility, and real production constraints.\n\n2. Tacit Captions / The Hybrid Atelier - Research Assistant\nWorked with a six-person multidisciplinary team on a multi-modal caption rendering system for sensor-based feedback. Built Python + pandas data pipelines, implemented caption-generation logic, generated synchronized WebVTT captions, contributed to research writing, and connected implementation choices back to the literature on assistive and multi-modal captioning.\n\nAcross both experiences, the pattern is consistent: take complex technical inputs, validate them carefully, and turn them into systems that are easier for people to reason about and use.",
  "~/profile/skills.json":
    '{\n  "programming": ["Python", "Bash", "Java", "MySQL", "C", "C++"],\n  "technical": ["Ubuntu", "Computer Virtualization", "Podman", "Docker", "VCNs", "Git", "OCI", "Oracle PCA", "Kubernetes", "Helm Charts", "pandas", "PyTest", "SQLAlchemy"],\n  "focus": ["Systems", "Networking", "Cloud Infrastructure", "Containers", "Developer Platforms", "Security", "Automation"]\n}',
  "~/profile/contact.vcf":
    "GitHub: https://github.com/JoelBeau\nLinkedIn: https://www.linkedin.com/in/joel-beauregard-b74b54315\nEmail: available on request",
  "~/profile/resume.pdf":
    "Binary file preview unavailable here. Run 'resume' to open the PDF.",
  "~/profile/github.link":
    "GitHub profile -> https://github.com/JoelBeau",
  "~/profile/linkedin.link":
    "LinkedIn profile -> https://www.linkedin.com/in/joel-beauregard-b74b54315",
  "~/profile/projects/devserver.md":
    "DevServer\nsubtitle -> Student Dev Environment Platform\nstatus -> ongoing active build\npage -> /projects/devserver/\n\nDevServer is a managed student developer environment platform I am designing to provide isolated remote Linux workspaces for coursework, projects, and shell-based workflows. The project is centered on practical developer infrastructure for academic use cases and reflects my interest in systems design, containers, Linux environments, security boundaries, and platform engineering.\n\nHighlights:\n- Designing per-student remote Linux environments with isolated shell access, personal home directories, and platform-managed developer workflows.\n- Exploring class-specific containers and environment orchestration so course tooling can be provisioned in a controlled, repeatable way.\n- Thinking through security boundaries, resource tiering, networking, testing surfaces, and operational simplicity so the platform is useful for real academic workflows rather than just a concept.\n- Treating it as a lifecycle problem, not just an implementation problem: architecture, maintainability, supportability, and how the platform could make students and course teams more productive.\n\nWhy it matters:\nThis is one of the clearest examples of where I want to keep growing as an engineer: developer infrastructure, remote environments, Linux systems, and platform-oriented tooling that solves practical problems for real users.",
  "~/profile/projects/student-dev-environment-platform.md":
    "DevServer\nalias -> devserver.md\npage -> /projects/devserver/",
  "~/profile/projects/socketscout.md":
    "SocketScout\nrepo -> https://github.com/JoelBeau/socketscout\n\nA high-performance concurrent port scanner built in Python around asyncio-driven orchestration, per-host state isolation, and modular service interrogation. The project reflects my interest in network visibility, low-level behavior, and practical security tooling that is useful beyond a classroom context.\n\nHighlights:\n- Scans multiple hosts and large port ranges concurrently using non-blocking I/O.\n- Supports TCP connect scanning by default, optional SYN-based scanning, and modular banner grabbing.\n- Separates orchestration, networking primitives, validation, and output formatting cleanly.\n- Emphasizes predictable behavior across multi-target scans through explicit per-host state handling.\n\nWhy it matters:\nSocketScout is one of the clearest examples of the kind of work I enjoy: technically grounded tooling that helps surface hidden network behavior in a way that is practical for debugging, inspection, and security-oriented workflows.",
  "~/profile/projects/thermo-database.md":
    "Thermodynamics Database\nrepo -> https://github.com/JoelBeau/thermo-database\n\nA practical database and scripting project centered on storing and querying thermodynamic table values in a Linux-first workflow. It combines relational data modeling, repeatable setup automation, and command-line tooling to make technical data easier to load, validate, and retrieve.\n\nHighlights:\n- Built a MySQL-backed database with SQL scripts and repeatable setup logic.\n- Used CSV ingestion, parsing, Bash automation, and Python lookup tooling to support efficient retrieval.\n- Structured the workflow so setup, population, and querying were easy to reproduce in a Linux environment.\n- Demonstrates applied data organization, scripting, automation, and systems-oriented workflow design.\n\nWhy it matters:\nEven though it is not networking-focused like SocketScout, it shows the same engineering pattern: take something tedious or fragmented, organize it carefully, automate the pipeline, and make it reliably usable.",
  "~/profile/projects/multi-modal-sensor-captioning.md":
    "Multi-Modal Sensor Captioning System\n\nResearch-driven caption rendering system developed through Tacit Captions / The Hybrid Atelier.\n\nPaper context:\n- Associated with the paper 'TacitCaptions: Externalizing Tacit Skills within Neon Glass Bending Practices through Sensor-Video Synchronized Cues'.\n- Framed around externalizing tacit skill cues through synchronized sensor-video feedback in a craft-based environment.\n\nHighlights:\n- Built Python + pandas pipelines to extract, clean, analyze, and validate time-series sensor data.\n- Implemented caption-generation logic to detect state changes and map sensor behavior into synchronized WebVTT caption events.\n- Validated data pipelines against live sensor input and helped connect implementation details back to the paper's methodology and design goals.\n- Supported a multi-modal assistive captioning environment rather than a purely academic proof-of-concept.\n\nWhy it matters:\nThis project broadened my experience beyond infrastructure and networking into research systems work, but it still fits the same engineering pattern I care about: interpret technical inputs carefully, build reliable pipelines around them, and surface useful information in a form that people can actually use."
};

const commandHistory = [];
let historyIndex = -1;
let currentDirectory = "~/profile";
const isIndexPage =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/" ||
  window.location.pathname.endsWith("/joelbeauregard.github.io/");

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

if (navDropdowns.length) {
  navDropdowns.forEach((dropdown) => {
    const dropdownLinks = dropdown.querySelectorAll("a");

    dropdownLinks.forEach((link) => {
      link.addEventListener("click", () => {
        dropdown.removeAttribute("open");
      });
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    navDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(target)) {
        dropdown.removeAttribute("open");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    navDropdowns.forEach((dropdown) => {
      dropdown.removeAttribute("open");
    });
  });
}

const updateActiveNav = () => {
  if (!sections.length || !isIndexPage) {
    return;
  }

  const homeLink = document.querySelector('.nav-menu a[href="index.html"], .nav-menu a[href="#top"], .nav-menu a[href="index.html#top"]');
  const offset = window.scrollY + 180;
  const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  const sectionNavMap = {
    about: "about",
    education: "education",
    experience: "experience",
    projects: "projects",
    skills: "skills",
    contact: "contact"
  };

  let activeKey = null;

  sections.forEach((section) => {
    if (atPageEnd && section.id === "contact") {
      activeKey = sectionNavMap[section.id];
    } else if (offset >= section.offsetTop) {
      activeKey = sectionNavMap[section.id] || activeKey;
    }
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => link.classList.remove("active"));

  if (!activeKey) {
    homeLink?.classList.add("active");
    return;
  }

  const activeLink = document.querySelector(`.nav-menu a[href$="#${activeKey}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
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

const clearTerminalOutput = () => {
  if (terminalOutput) {
    terminalOutput.innerHTML = "";
    terminalOutput.classList.add("is-empty");
  }

  terminalShell?.classList.remove("has-output");
};

const showTerminalOutput = () => {
  if (terminalOutput) {
    terminalOutput.classList.remove("is-empty");
  }

  terminalShell?.classList.add("has-output");
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const appendPromptLine = (command) => {
  if (!terminalOutput) {
    return;
  }

  showTerminalOutput();
  const block = document.createElement("div");
  block.className = "terminal-entry";
  block.innerHTML = `
    <p class="terminal-line">
      <span class="prompt-user">jbeau@jbeau-dev</span>
      <span class="prompt-divider">:</span>
      <span class="prompt-path">${escapeHtml(currentDirectory.replace("~/profile", "~"))}</span>
      <span class="prompt-symbol">$</span>
      <span class="terminal-command">${escapeHtml(command)}</span>
    </p>
  `;
  terminalOutput.appendChild(block);
  scrollTerminalToBottom();
};

const appendResponse = (content, className = "terminal-response") => {
  if (!terminalOutput) {
    return;
  }

  showTerminalOutput();
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

  showTerminalOutput();
  const block = document.createElement("div");
  block.className = className;
  block.innerHTML = content;
  terminalOutput.appendChild(block);
  scrollTerminalToBottom();
};

const formatLsResponse = (entries) => {
  const items = entries
    .map((entry) => {
      const itemClass = entry.endsWith("/") ? "terminal-list-item" : "terminal-list-item is-file";
      return `<span class="${itemClass}">${escapeHtml(entry)}</span>`;
    })
    .join("");

  return `<div class="terminal-list-grid">${items}</div>`;
};

const setTerminalPromptPath = () => {
  if (terminalPromptPath) {
    terminalPromptPath.textContent = currentDirectory;
  }
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

const getDirectoryEntries = () => virtualDirectories[currentDirectory] || [];

const getCommandMatches = (fragment) =>
  Object.keys(commandHandlers)
    .concat(["open", "cd", "cat"])
    .filter((item, index, array) => array.indexOf(item) === index && item.startsWith(fragment));

const getPathMatches = (command, fragment) => {
  if (command === "cd") {
    return ["projects", "..", "~", "~/profile", "~/profile/projects"].filter((item) => item.startsWith(fragment));
  }

  if (command === "cat") {
    return getDirectoryEntries()
      .filter((item) => !item.endsWith("/"))
      .filter((item) => item.startsWith(fragment));
  }

  if (command === "open") {
    return Object.keys(sectionSelectors)
      .concat(Object.keys(links))
      .filter((item, index, array) => array.indexOf(item) === index && item.startsWith(fragment));
  }

  return [];
};

const commandHandlers = {
  help: () => appendResponse(commandDocs.join("\n")),
  whoami: () =>
    appendResponse(
      "Joel Beauregard | Software engineering student focused on systems, networking, cloud infrastructure, containers, and security-minded tooling.\n\nI’m especially interested in practical engineering work that sits close to infrastructure, developer platforms, containerized applications, and network-aware software rather than purely classroom-scale builds. The projects and experiences on this site are strong examples of that pattern: network analytics at Oracle, DevServer, and developer-facing tooling like SocketScout.\n\nThe common thread is that I like building software that is inspectable, repeatable, and useful in realistic environments, whether that means containerized validation, remote Linux workspaces, networking visibility, or automation that makes engineering workflows easier to trust. I also care about the full lifecycle around that software: design, implementation, testing, maintenance, and clear communication that helps a team be more productive."
    ),
  about: () =>
    appendResponse(fileContents["~/profile/about.txt"]),
  focus: () =>
    appendResponse(
      "Current focus areas:\n- Systems and networking\n- Cloud infrastructure and platform-minded software\n- Containers and containerized application workflows\n- Developer platforms and remote Linux environments\n- Security-aware tooling\n- Developer experience, testing, and automation\n\nRight now I’m especially interested in software that sits one layer beneath the user-facing surface: observability, diagnostics, workflow automation, validation infrastructure, containerized workflows, remote development environments, CI/CD pipelines, and tooling that makes complex behavior easier to reason about. I’m also trying to keep the bigger engineering lifecycle in view, not just the build step: design choices, maintainability, testing depth, and communication that helps other engineers move faster."
    ),
  experience: () =>
    appendResponse(fileContents["~/profile/experience.log"]),
  oracle: () =>
    appendResponse(fileContents["~/profile/oracle.log"]),
  devserver: () =>
    appendResponse(fileContents["~/profile/projects/devserver.md"]),
  devenv: () =>
    appendResponse(fileContents["~/profile/projects/devserver.md"]),
  captions: () =>
    appendResponse(fileContents["~/profile/projects/multi-modal-sensor-captioning.md"]),
  projects: () =>
    appendResponse(
      "Featured projects\n\n1. DevServer\nStudent Dev Environment Platform.\nActive build focused on isolated remote Linux workspaces for students, with platform-managed shell access, container-aware environment design, and academic developer infrastructure workflows.\npage -> /projects/devserver/\nWhy it matters: shows where my interests are heading most directly right now: Linux systems, remote environments, containers, resource management, platform engineering, and the broader lifecycle thinking needed to make developer platforms useful and maintainable.\n\n2. SocketScout\nConcurrent Python port scanner with asyncio-based orchestration, optional SYN scanning, banner grabbing, and clean per-host state isolation.\nrepo -> https://github.com/JoelBeau/socketscout\nWhy it matters: shows my interest in networking internals, low-level behavior, and practical tooling.\n\n3. Thermodynamics Database\nMySQL-backed lookup and automation project using SQL, Bash, CSV ingestion, and Python tooling.\nrepo -> https://github.com/JoelBeau/thermo-database\nWhy it matters: shows structured data modeling, reproducible automation, and systems-minded workflow design.\n\n4. Multi-Modal Sensor Captioning System\nResearch-driven caption rendering system that transformed live sensor data into synchronized WebVTT captions for a multi-modal feedback environment.\nWhy it matters: shows data validation, caption-generation workflows, and research-backed implementation work.\n\nUse 'devserver' for the dedicated project page summary, or 'cd projects' and 'cat <file>' for full project dossiers."
    ),
  socketscout: () =>
    appendResponse(fileContents["~/profile/projects/socketscout.md"]),
  thermo: () =>
    appendResponse(fileContents["~/profile/projects/thermo-database.md"]),
  skills: () =>
    appendResponse(
      "Technical toolkit\n\nProgramming:\n- Python, Bash, Java, C, C++, SQL, MySQL\n\nContainers and platforms:\n- Docker, Podman, Kubernetes, Helm Charts, OCI, Oracle PCA, Ubuntu, Linux, computer virtualization\n\nData and testing:\n- pandas, SQLAlchemy, PyTest, relational modeling, query design, MySQL-backed validation workflows\n\nSystems and networking:\n- VCNs, networking fundamentals, cloud / infrastructure concepts, developer tooling, remote environments, automation scripts\n\nWorking style:\n- Practical software engineering, debugging, automation, containerized validation, remote Linux workflows, system-aware implementation, and communication that supports team velocity\n\nI tend to use these tools in combinations that support repeatability and observability: containerized testing, scriptable setup, reproducible validation, managed development environments, and workflows that make underlying system behavior easier to inspect. The bigger goal is not just getting code written, but taking it through a cleaner lifecycle from design and implementation to testing, iteration, and long-term maintainability."
    ),
  education: () =>
    appendResponse(
      "University of Texas at Arlington\nComputer Science / Software Engineering student\nExpected Graduation: May 2027\nGPA: 4.0\nCoursework: Secure Programming, Operating Systems, Databases, Computer Organization, Data Structures and Algorithms, Object-Oriented Programming"
    ),
  contact: () =>
    appendHtmlResponse(
      `Reach out via <a href="${links.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>, <a href="${links.github}" target="_blank" rel="noreferrer">GitHub</a>, or email once contact details are finalized.`
    ),
  ls: () => appendHtmlResponse(formatLsResponse(virtualDirectories[currentDirectory]), "terminal-response terminal-listing"),
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
    clearTerminalOutput();
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
      appendResponse("usage: open <about|experience|oracle|devserver|devenv|projects|captions|skills|education|contact|github|linkedin|resume>");
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
    setTerminalPromptPath();
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
  clearTerminalOutput();
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
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const value = terminalInput.value;
      const parts = value.split(/\s+/);

      if (parts.length <= 1 && !value.includes(" ")) {
        const fragment = value.trim().toLowerCase();
        const matches = getCommandMatches(fragment);

        if (matches.length === 1) {
          terminalInput.value = matches[0];
        } else if (matches.length > 1) {
          appendResponse(`autocomplete: ${matches.join("  ")}`, "terminal-hint");
        }
        return;
      }

      const command = parts[0].toLowerCase();
      const argumentFragment = value.slice(command.length).trimStart();
      const matches = getPathMatches(command, argumentFragment);

      if (matches.length === 1) {
        terminalInput.value = `${command} ${matches[0]}`;
      } else if (matches.length > 1) {
        appendResponse(`autocomplete: ${matches.join("  ")}`, "terminal-hint");
      }
    }
  });

  setTerminalPromptPath();
  bootstrapTerminal();
}

const updateSkillsCarousel = () => {
  if (!skillsTrack || !skillsCards.length) {
    return;
  }

  const trackRect = skillsTrack.getBoundingClientRect();
  const trackCenter = trackRect.left + trackRect.width / 2;
  let closestCard = skillsCards[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  skillsCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(trackCenter - cardCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  skillsCards.forEach((card) => {
    card.classList.toggle("is-active", card === closestCard);
  });

  if (skillsPrevButton) {
    skillsPrevButton.disabled = skillsTrack.scrollLeft <= 8;
  }

  if (skillsNextButton) {
    const maxScrollLeft = skillsTrack.scrollWidth - skillsTrack.clientWidth;
    skillsNextButton.disabled = skillsTrack.scrollLeft >= maxScrollLeft - 8;
  }
};

const getActiveSkillsIndex = () => {
  const activeIndex = skillsCards.findIndex((card) => card.classList.contains("is-active"));
  return activeIndex >= 0 ? activeIndex : 0;
};

const focusSkillsCard = (index) => {
  if (!skillsTrack || !skillsCards.length) {
    return;
  }

  const clampedIndex = Math.max(0, Math.min(skillsCards.length - 1, index));
  const targetCard = skillsCards[clampedIndex];

  targetCard.scrollIntoView({
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    block: "nearest",
    inline: "center"
  });
};

const scrollSkillsByCard = (direction) => {
  if (!skillsTrack || !skillsCards.length) {
    return;
  }

  focusSkillsCard(getActiveSkillsIndex() + direction);
};

const updateProjectCarousel = () => {
  if (!projectTrack || !projectCards.length) {
    return;
  }

  const trackRect = projectTrack.getBoundingClientRect();
  const trackCenter = trackRect.left + trackRect.width / 2;
  let closestCard = projectCards[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  projectCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const distance = Math.abs(trackCenter - cardCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  projectCards.forEach((card) => {
    card.classList.toggle("is-active", card === closestCard);
  });

  const activeIndex = projectCards.findIndex((card) => card === closestCard);

  if (projectPrevButton) {
    projectPrevButton.disabled = activeIndex <= 0;
  }

  if (projectNextButton) {
    projectNextButton.disabled = activeIndex >= projectCards.length - 1;
  }
};

const getActiveProjectIndex = () => {
  const activeIndex = projectCards.findIndex((card) => card.classList.contains("is-active"));
  return activeIndex >= 0 ? activeIndex : 0;
};

const focusProjectCard = (index) => {
  if (!projectTrack || !projectCards.length) {
    return;
  }

  const clampedIndex = Math.max(0, Math.min(projectCards.length - 1, index));
  const targetCard = projectCards[clampedIndex];

  targetCard.scrollIntoView({
    behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    block: "nearest",
    inline: "center"
  });
};

const scrollProjectsByCard = (direction) => {
  if (!projectTrack || !projectCards.length) {
    return;
  }

  focusProjectCard(getActiveProjectIndex() + direction);
};

if (skillsTrack && skillsCards.length) {
  skillsPrevButton?.addEventListener("click", () => scrollSkillsByCard(-1));
  skillsNextButton?.addEventListener("click", () => scrollSkillsByCard(1));
  skillsTrack.addEventListener("scroll", updateSkillsCarousel, { passive: true });
  updateSkillsCarousel();
  window.addEventListener("load", updateSkillsCarousel);
  window.addEventListener("resize", updateSkillsCarousel);
}

if (projectTrack && projectCards.length) {
  projectPrevButton?.addEventListener("click", () => scrollProjectsByCard(-1));
  projectNextButton?.addEventListener("click", () => scrollProjectsByCard(1));
  projectTrack.addEventListener("scroll", updateProjectCarousel, { passive: true });
  updateProjectCarousel();
  window.addEventListener("load", updateProjectCarousel);
  window.addEventListener("resize", updateProjectCarousel);
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
