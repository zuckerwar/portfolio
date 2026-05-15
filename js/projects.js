/* ═══════════════════════════════════════════════════════════════
   HOW TO UPDATE THIS PORTFOLIO
   ═══════════════════════════════════════════════════════════════

   COVER IMAGES
   ─────────────
   Each project has a coverImage field pointing to a file in /images/.
   To replace a placeholder:
     1. Export your screenshot/mockup as JPG or PNG
        → recommended size: 1200 × 800px
     2. Name it exactly as shown in the coverImage field below
        e.g. "amicable-solutions-cover.jpg"
     3. Drop it into the /images/ folder
     4. That's it — the site picks it up automatically

   CASE STUDY IMAGES
   ──────────────────
   Inside each project's sections[], text sections can have:
     image: "filename.jpg"       ← shown below the text
     imageAlt: "Description"     ← alt text for accessibility
   Or use a standalone image section:
     { type: "image", src: "filename.jpg", alt: "...", caption: "..." }
   Drop those files into /images/ too.

   TEXT CONTENT
   ─────────────
   Edit the fields directly:
     title            — project name (shown on card and case study)
     client           — shown on card and in the case study header
     year             — shown on card and in the case study header
     role             — shown in the case study header
     platforms        — shown in the case study header
     shortDescription — one sentence shown on the card
     sections[]       — the full case study content (see types below)

   SECTION TYPES
   ──────────────
     { type: "intro",   title: "...", body: "..." }
     { type: "text",    title: "...", body: "...", image: "file.jpg", imageAlt: "..." }
     { type: "image",   src: "file.jpg", alt: "...", caption: "..." }
     { type: "keywork", items: [{ label: "...", description: "..." }] }
     { type: "stats",   items: [{ value: "44%", label: "..." }] }

   ADD A NEW PROJECT
   ──────────────────
   Copy any existing project object, give it a new unique id (used in URLs),
   and add it to the array. It appears on the site in the order listed.

   REORDER PROJECTS
   ─────────────────
   Cut and paste the project objects within the PROJECTS array.
   The order here = the order on the page.

═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id: "amicable-solutions",
    title: "Amicable Solutions in C2C Transactions",
    client: "Kleinanzeigen",
    year: "2025",
    role: "Senior Product Designer",
    platforms: "Android, iOS, Web",
    tags: ["Product Design"],
    coverColor: "#1a2e2c",
    coverAccent: "#00DDC7",
    coverImage: "drc-thumb.jpg",
    subtitle: "Self-Serve Dispute Resolution",
    shortDescription: "Designing a self-serve system that removed human agents from routine dispute scenarios without removing user trust.",
    cardStats: [
      { value: "44%", label: "Self-serve resolution" },
      { value: "€440K", label: "Annual savings" },
      { value: "~0", label: "Wait time" }
    ],
    sections: [
      {
        type: "intro",
        title: "The Problem",
        body: "Kleinanzeigen users experiencing transaction disputes had limited recourse: contacting support via phone or email. The same recurring scenarios generated thousands of monthly support tickets, each requiring human agent triage and follow-up — creating delays and a poor user experience for both buyers and sellers."
      },
      {
        type: "text",
        title: "Approach",
        body: "I led end-to-end design work starting from support data analysis. By mapping dispute taxonomy from real ticket data, I identified the most common recurring scenarios: item not as described, non-receipt, refund disagreements, and no contact. This gave us a clear surface area to automate without oversimplifying edge cases.",
        image: "amicable-solutions-01.svg",
        imageAlt: "Dispute taxonomy mapping from support data"
      },
      {
        type: "text",
        title: "Design Strategy",
        body: "The core tension was between automation and user agency. Removing human agents from common cases saves time and cost, but users in stressful dispute situations need to feel heard and in control. The solution balanced guided self-serve flows with clear escalation pathways to human support — removing wait times while preserving human oversight for complex cases.",
        image: "amicable-solutions-02.svg",
        imageAlt: "Resolution flow mapping for buyer and seller journeys"
      },
      {
        type: "keywork",
        items: [
          { label: "Dispute taxonomy", description: "Developed from support data analysis to identify automatable scenarios" },
          { label: "Resolution flow mapping", description: "Mapped buyer and seller journeys for each dispute type" },
          { label: "Dispute center UI", description: "Centralized hub for tracking and managing open disputes" },
          { label: "Communication layer", description: "Structured in-app thread between buyer and seller" },
          { label: "Escalation pathways", description: "Clear handoff to human support for complex cases" }
        ]
      },
      {
        type: "image",
        src: "amicable-solutions-03.svg",
        alt: "Dispute center UI — tracking hub",
        caption: "Dispute center: centralized hub for tracking and managing open disputes"
      },
      {
        type: "text",
        title: "Outcome",
        body: "44% of disputes resolved through self-serve in early rollout — a number that continued to grow. The system projected €440K in annual support cost savings and reduced first-response time from days to immediate guided action."
      },
      {
        type: "stats",
        items: [
          { value: "44%", label: "Self-serve resolution rate (early rollout)" },
          { value: "€440K", label: "Projected annual support cost savings" },
          { value: "~0", label: "Wait time for first response" }
        ]
      }
    ]
  },
  {
    id: "kleinanzeigen-design-system",
    title: "Kleinanzeigen Design System",
    client: "Kleinanzeigen",
    year: "2024",
    role: "Senior Design Ops",
    platforms: "Android, iOS, Web",
    tags: ["Design System"],
    coverColor: "#0d2020",
    coverAccent: "#00DDC7",
    coverImage: "thumb-kds.jpg",
    subtitle: "Multi-Platform Design System",
    shortDescription: "Token architecture, component specs, and contribution model for a system serving millions of users.",
    cardStats: [
      { value: "3", label: "Platforms unified" },
      { value: "100+", label: "Components specified" },
      { value: "∞", label: "Source of truth" }
    ],
    sections: [
      {
        type: "intro",
        title: "The Problem",
        body: "The design system served Android, iOS, and web — but each platform had evolved independently. The result: inconsistent component versions across platforms, ambiguous token naming, incomplete dark mode coverage, and unclear contribution guidelines. Teams were duplicating work and making divergent decisions without a shared framework."
      },
      {
        type: "text",
        title: "Token Architecture",
        body: "I restructured naming into a semantic, tier-based system that aligned Figma variables directly with code. This wasn't just a naming exercise — it was a negotiation between design intention and engineering implementation, requiring alignment with developers on what the tokens actually meant and how they mapped to platform constraints.",
        image: "kleinanzeigen-ds-01.svg",
        imageAlt: "Token architecture — semantic tier-based naming structure"
      },
      {
        type: "text",
        title: "Component Specifications",
        body: "Full documentation for each component: anatomy, states, dark mode, accessibility requirements, and usage guidance. The goal was to make specifications useful enough that engineers could implement without a follow-up call — reducing ambiguity at the point where most design intent gets lost.",
        image: "kleinanzeigen-ds-02.svg",
        imageAlt: "Component specification showing anatomy, states, and dark mode"
      },
      {
        type: "text",
        title: "Dark Mode & Accessibility",
        body: "Built as first-class requirements, not afterthoughts. Dark mode coverage was audited across all components and tokens. Accessibility requirements — contrast ratios, touch targets, focus states — were specified inline with component documentation rather than as a separate concern."
      },
      {
        type: "text",
        title: "Contribution Model",
        body: "A lightweight process for product teams to propose and graduate components. The hardest part was designing the system around the system — the naming conventions, governance processes, and documentation culture that make a design system actually usable by teams who didn't build it.",
        image: "kleinanzeigen-ds-03.svg",
        imageAlt: "Contribution model — proposal to graduation process"
      },
      {
        type: "keywork",
        items: [
          { label: "Token architecture", description: "Semantic, tier-based naming aligned between Figma and code" },
          { label: "Component specs", description: "Anatomy, states, dark mode, a11y, and usage guidance" },
          { label: "Dark mode", description: "First-class coverage across all components and tokens" },
          { label: "Contribution model", description: "Lightweight process for teams to propose and graduate components" },
          { label: "Design-Eng alignment", description: "Regular syncs and shared decision logs" }
        ]
      },
      {
        type: "text",
        title: "Key Insight",
        body: "The most challenging aspect was designing the infrastructure around the system itself — not the components. Naming conventions, governance processes, and documentation culture require as much careful design thinking as any UI pattern."
      }
    ]
  },
  {
    id: "transactions-overview",
    title: "Transactions Overview",
    client: "Kleinanzeigen",
    year: "2024",
    role: "Senior Product Designer",
    platforms: "Android, iOS, Web",
    tags: ["Product Design"],
    coverColor: "#141c2e",
    coverAccent: "#00DDC7",
    coverImage: "trx-overview.jpg",
    subtitle: "C2C Transaction Center",
    shortDescription: "A centralized hub giving buyers and sellers full visibility across all their active and completed transactions.",
    cardStats: [
      { value: "DAC7", label: "Compliance built-in" },
      { value: "2", label: "User modes" },
      { value: "1 hub", label: "All transactions" }
    ],
    sections: [
      {
        type: "intro",
        title: "The Problem",
        body: "Users had no dedicated space to track transactions. To check the status of a sale or purchase, they had to navigate into individual chats — a manageable task for occasional users, but a real problem for high-volume sellers managing dozens of simultaneous transactions. There was also a compliance gap: DAC7 EU regulations require platforms to report seller income, and sellers had no visibility into their own thresholds."
      },
      {
        type: "text",
        title: "Design Approach",
        body: "The interface needed to serve two distinct user types: casual buyers and sellers who just want quick status visibility, and professional high-volume sellers who needed detailed, organized records. The solution was a centralized hub with a clear separation between active and completed deals, a structured table view with pricing and dates, and DAC7 compliance tracking integrated naturally rather than bolted on.",
        image: "transactions-01.svg",
        imageAlt: "Transaction hub interface showing active and completed deals"
      },
      {
        type: "keywork",
        items: [
          { label: "Transaction hub", description: "Centralized view separating active and completed deals" },
          { label: "Status indicators", description: "Clear hierarchy of transaction states across the timeline" },
          { label: "DAC7 compliance", description: "Inline tracking of seller income thresholds" },
          { label: "Scalable architecture", description: "Foundation for future wallet and payment features" },
          { label: "Table view", description: "Structured layout with pricing, dates, and transaction details" }
        ]
      },
      {
        type: "image",
        src: "transactions-02.svg",
        alt: "Structured table view with pricing, dates, and transaction details",
        caption: "Table view: pricing, dates, status, and DAC7 threshold tracking"
      },
      {
        type: "text",
        title: "Research Finding",
        body: "A notable tension emerged from research: users expected to see their complete sales history, not just in-app payment transactions. This revealed a gap between what the platform could technically surface and what users mentally modeled as 'their transactions.' The design had to acknowledge this boundary clearly rather than pretend it didn't exist."
      },
      {
        type: "text",
        title: "Outcome",
        body: "The design improved transaction navigation and transparency, gave sellers compliance visibility they didn't previously have, and established the architectural foundation for connected payment features."
      }
    ]
  },
  {
    id: "xing-design-system",
    title: "XING Design System",
    client: "XING",
    year: "2019",
    role: "Senior UX Designer",
    platforms: "Web, iOS, Android",
    tags: ["Design System"],
    coverColor: "#1a1a2e",
    coverAccent: "#00DDC7",
    coverImage: "xds-thumb.png",
    subtitle: "Unified Cross-Platform Foundation",
    shortDescription: "Consolidating three fragmented design systems into one unified, scalable foundation across web, iOS, and Android.",
    cardStats: [
      { value: "3→1", label: "Systems unified" },
      { value: "6", label: "Foundation layers" },
      { value: "∞", label: "Scalable across offices" }
    ],
    sections: [
      {
        type: "intro",
        title: "The Problem",
        body: "XING had three separate design systems — web, iOS, and Android — that had each evolved internally consistent but mutually incompatible. As the company expanded across European offices, this fragmentation created visual inconsistency, duplicated effort, and constant misalignment between design handoffs and engineering implementation."
      },
      {
        type: "text",
        title: "Foundation-Up Methodology",
        body: "Rather than retrofitting components, I worked from the ground up: full interface inventory first, token definition before component design, component definition before pattern assembly. This sequencing ensured that every decision at the component level was grounded in a shared foundation rather than ad hoc choices.",
        image: "xing-ds-01.svg",
        imageAlt: "Interface inventory audit across web, iOS, and Android"
      },
      {
        type: "keywork",
        items: [
          { label: "Interface inventory", description: "Full audit across all three platform systems" },
          { label: "Typography system", description: "Unified scale with semantic roles: display, body, label, caption" },
          { label: "Color system", description: "Role-based tokens: surface, content, interactive, feedback" },
          { label: "Iconography", description: "Consolidated library with consistent sizing and alignment" },
          { label: "Spacing scale", description: "4px base grid with named steps" },
          { label: "Motion foundations", description: "Easing curves, durations, and transition principles" }
        ]
      },
      {
        type: "image",
        src: "xing-ds-02.svg",
        alt: "Unified token system covering color, typography, spacing, and motion",
        caption: "Token foundations: color, typography, spacing, iconography, motion"
      },
      {
        type: "text",
        title: "Key Insight",
        body: "A design system is primarily a negotiation product. The goal isn't to deliver superior components — it's to create transparency about trade-offs and build the trust that makes cross-team alignment possible. The work that happens in conversations and decision logs is as important as the work in Figma."
      }
    ]
  },
  {
    hidden: true,
    id: "xing-settings",
    title: "Re-Designing Settings for XING",
    client: "XING",
    year: "2017",
    role: "Senior Interaction Designer",
    platforms: "Web, Mobile",
    tags: ["Product Design"],
    coverColor: "#1e1a2e",
    coverAccent: "#00DDC7",
    coverImage: "xing-settings-cover.svg",
    shortDescription: "Bringing intentional information architecture to a fragmented settings experience.",
    sections: [
      {
        type: "intro",
        title: "The Problem",
        body: "XING's settings were scattered across different areas of the platform. Users who wanted to change basic account information had to hunt through irrelevant content, enter full edit mode for entire sections to change a single field, and navigate without any clear mental model of where things lived."
      },
      {
        type: "text",
        title: "Information Architecture",
        body: "The redesign started with a simple question: what do users actually need to find and change in settings? The answer mapped cleanly into four buckets — account, privacy, notifications, and purchases. This structure was validated against user research and allowed for a mobile-first implementation that scaled cleanly to desktop.",
        image: "xing-settings-01.svg",
        imageAlt: "Settings information architecture — four-bucket structure"
      },
      {
        type: "keywork",
        items: [
          { label: "User account", description: "Personal information, login credentials, active devices" },
          { label: "Privacy", description: "Profile visibility and activity privacy controls" },
          { label: "Notifications", description: "Email, tips, recommendations, and alerts" },
          { label: "Purchases", description: "Transaction history and invoices" }
        ]
      },
      {
        type: "text",
        title: "Design Approach",
        body: "Mobile-first, with inline editing replacing full-section edit mode. Users could change a single field without entering an edit state for the surrounding content. Prototyping and user testing validated the IA before visual design, ensuring the structure was correct before the surface was polished.",
        image: "xing-settings-02.svg",
        imageAlt: "Mobile-first settings design with inline editing"
      }
    ]
  },
  {
    id: "google-snapseed",
    title: "Google Snapseed — UX Re-Design",
    client: "Google",
    year: "2016",
    role: "User Experience Designer",
    platforms: "iOS, Android",
    tags: ["Product Design"],
    coverColor: "#1c2010",
    coverAccent: "#00DDC7",
    coverImage: "snapseed-thumb.jpg",
    subtitle: "Mobile Photo Editor Redesign",
    shortDescription: "Redesigning Google's mobile photo editor to balance newcomer accessibility with pro-level depth.",
    cardStats: [
      { value: "iOS + Android", label: "Cross-platform" },
      { value: "Material", label: "Design system" },
      { value: "Motion", label: "Launch animation" }
    ],
    sections: [
      {
        type: "intro",
        title: "The Challenge",
        body: "Snapseed serves two very different users: casual photographers who want quick, intuitive edits, and experienced photographers who want fine-grained control. The existing interface struggled to serve both — discoverability was poor, gesture controls were opaque, and the visual language didn't align with Google's evolving Material Design system."
      },
      {
        type: "text",
        title: "Core Redesign Focus",
        body: "I started with the editor itself — the core interaction loop that everything else layers on top of. Swipe-to-adjust was a powerful interaction but had no visual affordance. I added visual indicators (directional arrows) to make the gesture discoverable, introduced tap as an alternative to swipe for fine adjustments, and added an edit button to reduce accidental changes.",
        image: "snapseed-01.svg",
        imageAlt: "Editor redesign showing gesture indicators and parameter selector"
      },
      {
        type: "keywork",
        items: [
          { label: "Launch animation", description: "Animated logo created in After Effects, exported for iOS and Android" },
          { label: "Parameter selector", description: "Tap added alongside swipe, with visual gesture indicators" },
          { label: "Filter icons", description: "Redesigned to align with Material Design standards" },
          { label: "Double exposure filter", description: "Designed in collaboration with engineers" },
          { label: "Cross-platform", description: "Wireframes and mockups for both iOS and Android" }
        ]
      },
      {
        type: "image",
        src: "snapseed-02.svg",
        alt: "Redesigned filter icons aligned with Material Design",
        caption: "Filter icon system: redesigned to align with Material Design standards"
      },
      {
        type: "text",
        title: "Motion as Communication",
        body: "The launch screen animation wasn't decorative — it was the first signal about what kind of app this was. A static launch screen is a missed opportunity to set tone and expectation. The animation was built in After Effects and optimized separately for iOS and Android performance characteristics."
      }
    ]
  },
  {
    id: "deutsche-bank",
    title: "Deutsche Bank Advisors Platform",
    client: "Deutsche Bank / HCL Technologies",
    year: "2016",
    role: "Product Designer",
    platforms: "Web",
    tags: ["Product Design"],
    coverColor: "#1a1a18",
    coverAccent: "#00DDC7",
    coverImage: "db-thumb.jpg",
    subtitle: "Internal Advisor Platform",
    shortDescription: "Creating an internal digital platform for advisors in a traditionally undigitised bank.",
    cardStats: [
      { value: "0→1", label: "Platform built from scratch" },
      { value: "Data-heavy", label: "Tables & charts" },
      { value: "DB brand", label: "Enterprise-aligned" }
    ],
    sections: [
      {
        type: "intro",
        title: "The Brief",
        body: "Deutsche Bank needed an internal digital platform for financial advisors — a domain that had historically operated through physical documents and manual processes. The design challenge was creating data-heavy interfaces that balanced accuracy with clarity, while working within Deutsche Bank's brand constraints."
      },
      {
        type: "text",
        title: "Design Focus",
        body: "The core of the work was tables, charts, and diagrams. Financial data has a precision requirement that design often flattens — every number, label, and visual encoding carries meaning that advisors rely on to make decisions. The goal was interfaces that were genuinely readable under cognitive load, not just visually clean.",
        image: "deutsche-bank-01.svg",
        imageAlt: "Dense financial data table layout for advisor workflows"
      },
      {
        type: "image",
        src: "deutsche-bank-02.svg",
        alt: "Charts and diagrams for financial data visualisation",
        caption: "Data visualisation: charts and diagrams balancing accuracy with clarity"
      },
      {
        type: "keywork",
        items: [
          { label: "Data tables", description: "Dense, accurate, scannable layouts for financial data" },
          { label: "Charts & diagrams", description: "Visual encodings that preserved data precision" },
          { label: "Brand alignment", description: "Interface language consistent with Deutsche Bank identity" },
          { label: "Internal tooling", description: "Designed for advisor workflows, not consumer UX patterns" }
        ]
      }
    ]
  },
  {
    id: "motion",
    title: "Motion — My Past as an Animator",
    client: "Personal / Various",
    year: "2010–2016",
    role: "Animator & Motion Designer",
    platforms: "Broadcast, Digital",
    tags: ["Motion"],
    coverColor: "#0d0d1a",
    coverAccent: "#00DDC7",
    coverImage: "monster.gif",
    subtitle: "Broadcast Animation & Motion Design",
    shortDescription: "Before product design: years in broadcast animation, character work, title sequences, and motion graphics.",
    cardStats: [
      { value: "6 yrs", label: "In broadcast animation" },
      { value: "XING + Google", label: "Motion in product" },
      { value: "After Effects", label: "Primary tool" }
    ],
    sections: [
      {
        type: "intro",
        title: "Before Product Design",
        body: "Before I was a product designer, I was an animator. I spent several years working in broadcast — character animation, title sequences, motion graphics. That background didn't go away when I moved into product; it became foundational to how I think about interaction."
      },
      {
        type: "text",
        title: "Motion as Design Language",
        body: "The timing of a state change tells the user what kind of change it was. The easing curve on a panel expansion tells them whether it's appearing from somewhere or appearing from nothing. These aren't aesthetic choices — they're semantic ones. Motion that's designed well is motion that communicates clearly without calling attention to itself.",
        image: "motion-01.svg",
        imageAlt: "Motion principles — easing curves and timing guidelines"
      },
      {
        type: "text",
        title: "Applied to Product Work",
        body: "At XING, I defined the motion foundations layer for the design system: easing curves, duration guidelines, and transition principles that could be implemented consistently across the platform. At Google, I designed and produced the Snapseed launch animation in After Effects, optimized for both iOS and Android.",
        image: "motion-02.svg",
        imageAlt: "Snapseed launch animation storyboard for iOS and Android"
      },
      {
        type: "keywork",
        items: [
          { label: "Broadcast animation", description: "Character animation, title sequences, motion graphics" },
          { label: "XING motion system", description: "Easing curves and duration guidelines for the design system" },
          { label: "Snapseed launch animation", description: "Designed and produced in After Effects for iOS and Android" }
        ]
      }
    ]
  }
];
