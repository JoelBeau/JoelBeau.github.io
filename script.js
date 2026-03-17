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
  skills: "index.html#skills",
  education: "index.html#education",
  contact: "index.html#contact"
};

const commandDocs = [
  "help          list available commands",
  "whoami        quick professional summary",
  "about         summary of background and focus",
  "focus         current technical interests",
  "experience    summary of experience trajectory",
  "oracle        Oracle internship details",
  "projects      featured project overview",
  "socketscout   networking project details",
  "thermo        thermodynamics database details",
  "skills        technical toolkit snapshot",
  "education     academic background",
  "contact       ways to reach me",
  "ls            show terminal topics",
  "pwd           show current terminal path",
  "cat <file>    read portfolio topic files",
  "open <item>   jump to a section on the site",
  "github        open GitHub profile",
  "linkedin      open LinkedIn profile",
  "resume        open resume PDF",
  "clear         clear terminal output"
];

const fileContents = {
  "about.txt":
    "Joel Beauregard\nUTA Computer Science / Software Engineering student building systems, networking, cloud, and security-oriented software with a practical engineering mindset.",
  "oracle.log":
    "Oracle Private Cloud Appliance internship focused on SR-IOV VCN Network Traffic Analytics, network visibility, Kubernetes + Podman test infrastructure, and MySQL-backed CI-friendly validation.",
  "skills.json":
    '{\n  "languages": ["Python", "Java", "C", "SQL", "Bash"],\n  "platforms": ["Linux", "Docker", "Kubernetes", "MySQL"],\n  "focus": ["Systems", "Networking", "Cloud Infrastructure", "Security", "Automation"]\n}',
  "contact.vcf":
    "GitHub: https://github.com/JoelBeau\nLinkedIn: https://www.linkedin.com/in/joel-beauregard-b74b54315\nEmail: available on request",
  "resume.pdf":
    "Binary file preview unavailable here. Run 'resume' to open the PDF.",
  "github.link":
    "GitHub profile -> https://github.com/JoelBeau",
  "linkedin.link":
    "LinkedIn profile -> https://www.linkedin.com/in/joel-beauregard-b74b54315"
};

const commandHistory = [];
let historyIndex = -1;

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

  const offset = window.scrollY + 140;

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
  });
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
    <span class="prompt-path">~/profile</span>
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
      "Joel Beauregard | Software engineering student focused on systems, networking, cloud infrastructure, and security-minded tooling."
    ),
  about: () =>
    appendResponse(
      "UTA Computer Science / Software Engineering student focused on systems, networking, cloud infrastructure, cybersecurity, and practical developer tooling."
    ),
  focus: () =>
    appendResponse(
      "Current focus areas:\n- Systems and networking\n- Cloud infrastructure\n- Security-minded engineering\n- Developer platforms and automation"
    ),
  experience: () =>
    appendResponse(
      "Experience trajectory:\n- Oracle Software Engineering Intern, Summer 2025\n- Returning Oracle OCI intern, Summer 2026\n- Building practical systems and networking projects outside class"
    ),
  oracle: () =>
    appendResponse(
      "Researched and documented Oracle PCA Network Traffic Analytics for SR-IOV VCN observability, built Kubernetes + Podman test infrastructure, validated against Cisco switches and PCA hardware, and improved a MySQL-backed test framework."
    ),
  projects: () =>
    appendResponse(
      "Featured builds:\n- SocketScout: asyncio-based concurrent port scanning, banner grabbing, and network visibility tooling\n  repo -> https://github.com/JoelBeau/socketscout\n- Thermodynamics Database: MySQL, Python, Bash, CSV ingestion, Linux automation\n  repo -> https://github.com/JoelBeau/thermo-database"
    ),
  socketscout: () =>
    appendResponse(
      "SocketScout is a concurrent Python port scanner with asyncio-driven orchestration, optional SYN scanning, banner grabbing, and per-host state isolation for clean multi-target network analysis.\nrepo -> https://github.com/JoelBeau/socketscout"
    ),
  thermo: () =>
    appendResponse(
      "Thermodynamics Database combines MySQL, SQL scripting, CSV ingestion, Bash automation, and Python lookup tooling in a Linux-first workflow.\nrepo -> https://github.com/JoelBeau/thermo-database"
    ),
  skills: () =>
    appendResponse(
      "Core stack:\n- Languages: Python, Java, C, SQL, Bash\n- Platforms: Linux, Docker, Kubernetes, MySQL\n- Focus: systems, networking, cloud infrastructure, security, automation"
    ),
  education: () =>
    appendResponse(
      "University of Texas at Arlington\nComputer Science / Software Engineering student"
    ),
  contact: () =>
    appendHtmlResponse(
      `Reach out via <a href="${links.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>, <a href="${links.github}" target="_blank" rel="noreferrer">GitHub</a>, or email once contact details are finalized.`
    ),
  ls: () =>
    appendResponse(
      "about.txt\noracle.log\nprojects/\nskills.json\ncontact.vcf\nresume.pdf\ngithub.link\nlinkedin.link"
    ),
  pwd: () => appendResponse("~/profile"),
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
      appendResponse("usage: open <about|experience|oracle|projects|skills|education|contact|github|linkedin|resume>");
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

  if (normalizedCommand === "cat") {
    const target = (args[0] || "").toLowerCase();

    if (!target) {
      appendResponse("usage: cat <about.txt|oracle.log|skills.json|contact.vcf|resume.pdf|github.link|linkedin.link>");
      return;
    }

    if (!(target in fileContents)) {
      appendResponse(`cat: ${target}: No such file`);
      return;
    }

    appendResponse(fileContents[target]);
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
  appendResponse("Type 'help' to explore Joel's background, experience, and projects.", "terminal-hint");
  appendResponse("Good starter commands: help, whoami, oracle, socketscout, cat about.txt, open projects", "terminal-hint");
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
