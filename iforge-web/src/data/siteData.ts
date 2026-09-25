export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  heroImage?: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
  metrics: ServiceMetric[];
  offerings: {
    title: string;
    description: string;
    points?: string[];
  }[];
  benefits: string[];
  faqs: ServiceFaq[];
}

export const siteConfig = {
  name: "iForge Technologies",
  tagline: "IT Services & Consulting",
  headline: "Accelerating Success With IT Services",
  subheadline: "Transform your business with cutting-edge technology and expert consultancy services tailored to your needs.",
  contactEmail: "info@iforge.in",
  phone: "+91 99718 66720",
  address: "Plot No. 12, Sector 62, Noida, Uttar Pradesh, India",
  founded: "2024",
};

export const partnerLogos = [
  { name: "Amazon Web Services", src: "/images/png-transparent-aws-60small-1.png", alt: "AWS Partner" },
  { name: "Google Cloud", src: "/images/logo_google_cloud-1-300x78.png", alt: "Google Cloud Partner" },
  { name: "VMware", src: "/images/logo_vmware-1-300x90.png", alt: "VMware Partner" },
  { name: "Palo Alto Networks", src: "/images/PaloAltoNetworks-300x55.png", alt: "Palo Alto Networks" },
  { name: "Trend Micro", src: "/images/trend-micro-300x103.png", alt: "Trend Micro Partner" },
];

export const clientLogos = [
  { name: "Bizrate", src: "/images/bizrate-1.png" },
  { name: "Enpass", src: "/images/Enpass.png-300x150.webp" },
  { name: "EazyDiner", src: "/images/eazydiner-client-logo.png" },
  { name: "Everpure Blaze", src: "/images/everpure-blaze-logo-300x150.png" },
  { name: "Siddha", src: "/images/logo-siddha.jpg" },
];

export const servicesData: ServiceItem[] = [
  {
    id: "data-ai",
    slug: "data-ai",
    title: "Data & AI",
    subtitle: "Reimagine enterprise intelligence with customized AI solutions",
    shortDesc: "Enterprise AI consulting, LLM adoption, predictive analytics, and automated decision engineering.",
    longDesc: "iForge AI Advisory is an enterprise AI consulting service that helps organizations move from AI strategy to production reality. From strategy through to implementation and operations, we help organizations accelerate and sustain trusted outcomes through responsible application of AI.",
    iconName: "BrainCircuit",
    features: [
      "AI Strategy & Readiness Assessment",
      "Custom Generative AI & Enterprise LLM Integration",
      "Predictive Analytics & Machine Learning Pipelines",
      "Enterprise Data Warehousing & Real-Time ETL",
      "Responsible AI & Algorithmic Governance"
    ],
    technologies: ["Python", "PyTorch", "OpenAI", "LangChain", "Snowflake", "Databricks", "Apache Spark", "Hugging Face"],
    deliverables: [
      "Enterprise AI Architecture Blueprint",
      "Production-ready RAG / LLM application pipeline",
      "Automated ML training and inference pipelines",
      "Model governance and safety evaluation framework"
    ],
    metrics: [
      { value: "3.5x", label: "Faster Insights Delivery" },
      { value: "45%", label: "Manual Workflow Reduction" },
      { value: "99.8%", label: "Pipeline Reliability" }
    ],
    offerings: [
      {
        title: "AI Advisory & Strategic Roadmap",
        description: "Identify high-ROI AI use cases, assess technological readiness, and build an executable roadmap for enterprise artificial intelligence.",
        points: ["Use-case prioritization", "Technology gap analysis", "Total cost of ownership modeling"]
      },
      {
        title: "Predictive & Prescriptive Analytics",
        description: "Transform historical enterprise data into foresight with custom statistical learning, anomaly detection, and operational optimization.",
        points: ["Demand forecasting", "Customer churn prediction", "Automated anomaly alerts"]
      },
      {
        title: "Responsible AI Governance & Security",
        description: "Ensure ethical deployment, transparency, bias mitigation, and strict compliance with global AI governance regulations.",
        points: ["Guardrails & hallucination prevention", "Privacy-preserving data masking", "Regulatory compliance audits"]
      }
    ],
    benefits: [
      "Accelerated time-to-market for enterprise AI products",
      "Automated repetitive manual operational workflows",
      "High data confidence and centralized real-time intelligence",
      "Secure on-premise or VPC-isolated model deployments"
    ],
    faqs: [
      {
        question: "How does iForge ensure enterprise data privacy when using LLMs?",
        answer: "We deploy models strictly within your private cloud (VPC) or dedicated on-premise infrastructure with zero training on customer data and strict role-based access control."
      },
      {
        question: "What is the typical timeline for an AI proof-of-concept (PoC)?",
        answer: "Our structured agile AI sprint delivers a working, benchmarked PoC integrated with your sample data within 3 to 4 weeks."
      },
      {
        question: "Can iForge work with our existing data warehouse?",
        answer: "Yes, our engineers seamlessly integrate with Snowflake, BigQuery, AWS Redshift, PostgreSQL, and Databricks lakehouses."
      }
    ]
  },
  {
    id: "cloud-services",
    slug: "cloud-services",
    title: "Cloud Services",
    subtitle: "Trust a managed public cloud partner delivering end-to-end multi-cloud excellence",
    shortDesc: "CloudSMART strategy delivering complete cloud consultancy, architecture, and multi-cloud management.",
    longDesc: "Our CloudSMART strategy gives enterprises a complete cloud consultancy and delivery platform that adapts to your needs. Through strategic partnerships with leading providers (AWS, Google Cloud, Azure), we help you unlock the full potential of modern cloud technologies to build scalable, resilient environments.",
    iconName: "Cloud",
    features: [
      "Multi-Cloud Architecture & Zero-Downtime Migration",
      "Cloud Cost Optimization (FinOps & Waste Reduction)",
      "DevOps, CI/CD & Kubernetes Orchestration",
      "Serverless & Microservices Modernization",
      "Cloud Security & Compliance Hardening"
    ],
    technologies: ["AWS", "Google Cloud", "Microsoft Azure", "Kubernetes", "Docker", "Terraform", "ArgoCD", "Prometheus"],
    deliverables: [
      "Production multi-region cloud architecture",
      "Automated Infrastructure as Code (IaC) repository",
      "Comprehensive FinOps cost reduction report",
      "24/7 automated cloud monitoring dashboard"
    ],
    metrics: [
      { value: "40%", label: "Average FinOps Savings" },
      { value: "99.99%", label: "Uptime SLA Guarantee" },
      { value: "Zero", label: "Downtime Migrations" }
    ],
    offerings: [
      {
        title: "Cloud Migration & Modernization",
        description: "Zero-downtime workload migration from legacy on-premise infrastructure to high-performance cloud environments.",
        points: ["Phased lift-and-shift & refactor", "Database zero-loss synchronization", "Cutover dry-runs & failover testing"]
      },
      {
        title: "Managed Cloud Infrastructure & 24/7 SRE",
        description: "Around-the-clock monitoring, auto-scaling, backup redundancy, and SLA-backed management for your core cloud footprint.",
        points: ["Continuous health telemetry", "Automated incident remediation", "Kernel & vulnerability patching"]
      },
      {
        title: "DevOps & Cloud Automation",
        description: "Infrastructure as Code (Terraform), continuous integration pipelines, and containerized deployments with Kubernetes.",
        points: ["GitOps deployment workflows", "Self-healing Kubernetes clusters", "Multi-stage automated testing"]
      }
    ],
    benefits: [
      "Up to 40% reduction in cloud infrastructure expenses through FinOps",
      "99.99% high availability and automated disaster recovery across availability zones",
      "Instant resource scalability during traffic spikes and peak enterprise loads",
      "Multi-cloud vendor lock-in prevention"
    ],
    faqs: [
      {
        question: "Which cloud providers does iForge officially support?",
        answer: "We are certified partners for Amazon Web Services (AWS) and Google Cloud Platform (GCP), and also provide full enterprise architecture for Microsoft Azure."
      },
      {
        question: "How do you prevent downtime during database migrations?",
        answer: "We utilize continuous replication tools (e.g. AWS DMS, Google Datastream) with parallel dry-run validations until the final sub-minute cutover window."
      }
    ]
  },
  {
    id: "it-infrastructure",
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    subtitle: "Deliver resilient experiences with agile infrastructure ensuring business continuity",
    shortDesc: "Robust enterprise networking, system architecture, AMC services, and hardware engineering.",
    longDesc: "iForge Technologies delivers secure, scalable, and reliable IT infrastructure services designed to support evolving enterprise demands. We ensure your foundational hardware, network architecture, and operational systems run without interruption.",
    iconName: "Server",
    features: [
      "Enterprise Network Architecture & SD-WAN",
      "Server Virtualization & High-Throughput Storage",
      "Annual Maintenance Contracts (AMC Services)",
      "Disaster Recovery & Redundant Power Architecture",
      "Data Center Setup & Remote Hands Operations"
    ],
    technologies: ["VMware vSphere", "Cisco", "Fortinet", "HPE", "Dell EMC", "Hyper-V", "Ubiquiti", "SAN/NAS"],
    deliverables: [
      "High-availability network topology blueprint",
      "Hardware health diagnostics & capacity plan",
      "Comprehensive AMC service contract & SLA guide",
      "Disaster recovery runbook with RPO/RTO specifications"
    ],
    metrics: [
      { value: "15 min", label: "Critical Incident Response" },
      { value: "99.9%", label: "Network Uptime" },
      { value: "5+ Yrs", label: "Extended Hardware Lifespan" }
    ],
    offerings: [
      {
        title: "Network & Systems Engineering",
        description: "High-throughput, redundant routing and switching setups with strict zero-trust boundary segmentation.",
        points: ["SD-WAN deployment", "VLAN & firewall zoning", "Bandwidth traffic shaping"]
      },
      {
        title: "Comprehensive AMC Support",
        description: "Proactive annual maintenance, scheduled hardware diagnostics, and priority on-site technician dispatch.",
        points: ["Preventive hardware maintenance", "Firmware updates & thermal tuning", "Spare parts replacement reserve"]
      },
      {
        title: "Virtualization & Storage Clustering",
        description: "VMware, Hyper-V, and enterprise SAN/NAS configurations optimized for latency-critical workloads.",
        points: ["Live VM migration setups", "Deduplication & tiered caching", "Automated off-site tape/cloud backups"]
      }
    ],
    benefits: [
      "Elimination of single points of hardware failure across critical nodes",
      "24/7 uptime monitoring with fast SLA response commitments",
      "Prolonged hardware lifecycle and predictable operational budgeting",
      "Complete physical and logical network security"
    ],
    faqs: [
      {
        question: "What is covered in an iForge IT AMC (Annual Maintenance Contract)?",
        answer: "Our AMC covers quarterly preventive maintenance, emergency on-site engineer visits, hardware repairs, OS/firmware patching, network health checks, and 24/7 helpdesk support."
      },
      {
        question: "Can iForge manage hybrid infrastructure (on-premise + cloud)?",
        answer: "Yes, our team specializes in interconnecting on-premise server rooms and data centers with public clouds using VPNs and direct cloud interconnects."
      }
    ]
  },
  {
    id: "cybersecurity-services",
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    subtitle: "End-to-end cybersecurity services ensuring safety, compliance, and continuous resilience",
    shortDesc: "Vulnerability assessment, penetration testing, endpoint protection, and proactive defense.",
    longDesc: "Today's threat landscape is highly dynamic, driven by the rapid adoption of disruptive technologies. iForge brings deep expertise in Defense, Protection, and Risk Management to ensure your mission-critical digital assets remain fortified.",
    iconName: "ShieldCheck",
    features: [
      "Vulnerability Assessment & Pen Testing (VAPT)",
      "Next-Gen Firewall & Endpoint Detection (EDR/XDR)",
      "Security Operations Center (SOC) 24/7 Monitoring",
      "Compliance Audits (ISO 27001, SOC 2, HIPAA, GDPR)",
      "Zero Trust Identity & Access Management (IAM)"
    ],
    technologies: ["Palo Alto Networks", "Trend Micro", "CrowdStrike", "Splunk", "Wireshark", "Burp Suite", "Tenable Nessus", "Okta"],
    deliverables: [
      "Executive VAPT Audit Report with CVSS scoring",
      "Step-by-step remediation guide for developer teams",
      "ISO 27001 / SOC 2 readiness gap assessment",
      "Incident response and breach containment protocol"
    ],
    metrics: [
      { value: "100%", label: "Audit Compliance Readiness" },
      { value: "<5 min", label: "Threat Detection Latency" },
      { value: "0", label: "Uncontained Breaches" }
    ],
    offerings: [
      {
        title: "VAPT & Penetration Testing",
        description: "Rigorous ethical hacking targeting web apps, cloud accounts, APIs, mobile apps, and internal network perimeters.",
        points: ["OWASP Top 10 vulnerabilities", "Privilege escalation simulations", "Social engineering & phishing assessments"]
      },
      {
        title: "Perimeter & Endpoint Fortification",
        description: "Partnering with industry leaders like Palo Alto Networks and Trend Micro for automated threat quarantine.",
        points: ["Next-Gen firewall policies", "Ransomware behavioral blocking", "Strict USB and endpoint lockouts"]
      },
      {
        title: "Regulatory Compliance & Audit Preparation",
        description: "Comprehensive security policy authoring and gap remediation to achieve ISO 27001, SOC 2 Type II, and GDPR compliance.",
        points: ["Audit defense representation", "Data classification protocols", "Mandatory staff security training"]
      }
    ],
    benefits: [
      "Complete proactive protection against ransomware and data exfiltration",
      "Guaranteed compliance with regulatory and enterprise client security mandates",
      "Minimization of security incident impact, loss, and operational downtime",
      "Strengthened client trust through verifiable security certifications"
    ],
    faqs: [
      {
        question: "How frequently should an enterprise conduct VAPT?",
        answer: "We recommend comprehensive VAPT testing bi-annually, as well as immediately following any major production feature release or infrastructure change."
      },
      {
        question: "Do you assist our developers with fixing the vulnerabilities discovered?",
        answer: "Yes, our security engineers provide exact code snippets, configuration patches, and re-test all remediated issues free of charge."
      }
    ]
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    subtitle: "Optimize your software portfolio with our technically driven digital engineering",
    shortDesc: "Custom web applications, enterprise portals, responsive platforms, and API engineering.",
    longDesc: "Whether you're a startup launching a transformative product or an established enterprise modernizing legacy portals, iForge delivers technically superior, high-performing, and secure web solutions that scale seamlessly.",
    iconName: "Code2",
    features: [
      "Modern React / Next.js Full-Stack Web Applications",
      "Custom Enterprise Portals & High-Throughput Dashboards",
      "RESTful & GraphQL Scalable API Architectures",
      "High-Performance Database Design (SQL & NoSQL)",
      "Core Web Vitals & Technical SEO Perfection"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    deliverables: [
      "Fully responsive, production-ready web application",
      "Comprehensive TypeScript codebase with CI/CD pipeline",
      "API documentation with OpenAPI / Swagger specifications",
      "100/100 Google Lighthouse Core Web Vitals optimization"
    ],
    metrics: [
      { value: "<0.8s", label: "Average Page Load Time" },
      { value: "98+", label: "Lighthouse Performance Score" },
      { value: "100%", label: "Mobile-First Responsive" }
    ],
    offerings: [
      {
        title: "Custom Full-Stack Web Applications",
        description: "Tailored frontend interfaces paired with resilient backends designed for performance, reliability, and security.",
        points: ["Server-Side Rendering (SSR)", "Role-based user authentication", "Real-time WebSockets & events"]
      },
      {
        title: "Enterprise Corporate Platforms",
        description: "Brand-defining web experiences engineered to convert visitors, showcase services, and integrate with CRM systems.",
        points: ["Custom headless CMS integrations", "Multi-language localization", "Analytics & conversion attribution"]
      },
      {
        title: "API Engineering & Systems Integration",
        description: "Secure, documented, and high-concurrency APIs connecting disparate enterprise software and third-party gateways.",
        points: ["Payment gateways & webhooks", "OAuth2 & JWT authentication", "Rate limiting & Redis caching"]
      }
    ],
    benefits: [
      "Sub-second load times and flawless mobile responsiveness",
      "Intuitive UX designed to maximize conversion rates and user engagement",
      "Clean, modular codebase ready for long-term scale and easy maintainability",
      "Built-in accessibility (WCAG AA) and technical SEO dominance"
    ],
    faqs: [
      {
        question: "What technology stack do you recommend for modern web applications?",
        answer: "We primarily build with Next.js, React 19, TypeScript, and Tailwind CSS on the frontend, paired with Node.js/Go and PostgreSQL/Redis for lightning-fast serverless or containerized backends."
      },
      {
        question: "Do we retain full ownership of the source code?",
        answer: "Yes, 100% of the code, intellectual property, repositories, and deployment configurations are transferred directly to your organization upon project completion."
      }
    ]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Launch, grow, and reinvent your brand with targeted data-driven campaigns",
    shortDesc: "Organic SEO, performance paid marketing, conversion rate optimization, and brand scaling.",
    longDesc: "iForge is an agile digital growth partner that excels in launching, growing, and reinventing brands. We blend data-driven audience targeting with compelling creative execution to consistently drive qualified leads and revenue.",
    iconName: "TrendingUp",
    features: [
      "Search Engine Optimization (Technical, Content & On-Page)",
      "Performance Marketing (Google Ads, Meta, LinkedIn Campaigns)",
      "Content Strategy & High-Authority Copywriting",
      "Conversion Rate Optimization (CRO & A/B Testing)",
      "Full-Funnel Analytics, Attribution & Growth Tracking"
    ],
    technologies: ["Google Analytics 4", "Search Console", "Google Tag Manager", "Semrush", "Ahrefs", "Meta Ads", "LinkedIn Campaign Manager"],
    deliverables: [
      "Comprehensive Technical SEO Audit & Action Plan",
      "Paid acquisition campaigns with negative keyword protection",
      "Conversion-optimized landing page templates",
      "Real-time Looker Studio executive ROI dashboard"
    ],
    metrics: [
      { value: "4.2x", label: "Average Return on Ad Spend (ROAS)" },
      { value: "+180%", label: "Organic Search Growth" },
      { value: "-35%", label: "Customer Acquisition Cost" }
    ],
    offerings: [
      {
        title: "Organic Technical SEO Growth",
        description: "Comprehensive keyword dominance, technical site health optimization, and authority-building content that ranks.",
        points: ["Backlink acquisition", "Schema structured data markup", "Search intent topic clusters"]
      },
      {
        title: "High-ROI Performance Marketing",
        description: "Data-driven PPC and social ad campaigns optimized for customer acquisition cost (CAC) and customer lifetime value.",
        points: ["Audience segmentation & lookalikes", "Ad creative iteration & testing", "Bid strategy algorithm tuning"]
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description: "Scientific user journey analysis, heatmap telemetry, and multivariate testing to turn traffic into qualified leads.",
        points: ["Heatmap & scroll recording analysis", "Frictionless form redesigns", "High-urgency copy adjustments"]
      }
    ],
    benefits: [
      "Predictable pipeline of qualified, high-intent enterprise inbound leads",
      "Measurable return on ad spend with transparent revenue attribution",
      "Sustainable organic search traffic growth that outlasts ad budgets",
      "Omnichannel consistency across search, social, and email"
    ],
    faqs: [
      {
        question: "How long does it take to see results from SEO?",
        answer: "Technical fixes often generate indexation improvements within 2 to 4 weeks, while substantial organic rankings and high-intent inbound lead growth typically accelerate within 3 to 6 months."
      },
      {
        question: "Do you handle both B2B and B2C digital campaigns?",
        answer: "Yes, our strategies are customized—specializing in high-ticket B2B enterprise lead generation via LinkedIn and Google Search, as well as high-volume consumer growth campaigns."
      }
    ]
  },
  {
    id: "staffing-solutions",
    slug: "staffing-solutions",
    title: "Staffing Solutions",
    subtitle: "Empower your business with smart, scalable tech staffing solutions in India",
    shortDesc: "Permanent IT recruitment, contract talent, executive search, and staff augmentation in India.",
    longDesc: "Create a passionate, high-impact team with iForge Staffing Solutions. We connect visionary organizations with India's finest technical talent across software engineering, cloud architecture, cybersecurity, and data science.",
    iconName: "Users",
    features: [
      "Permanent IT Recruitment & Technical Executive Search",
      "Contract & Project-Based Talent Augmentation",
      "Technical Screening & Rigorous Coding Evaluations",
      "Rapid Turnaround Hiring Cycles (Candidates in 48 Hours)",
      "Complete Payroll, Benefits & Compliance Management"
    ],
    technologies: ["Full-Stack Engineers", "Cloud Architects", "DevOps & SRE", "Data Scientists", "Cybersecurity Analysts", "QA Automation"],
    deliverables: [
      "Curated shortlist of pre-screened technical candidates",
      "Standardized coding assessment & cultural fit scorecard",
      "SLA-backed replacement guarantee contract",
      "Seamless onboarding & compliant Indian payroll handling"
    ],
    metrics: [
      { value: "48 hrs", label: "Candidate Shortlist Turnaround" },
      { value: "94%", label: "Offer Acceptance Rate" },
      { value: "90 Days", label: "Replacement Warranty" }
    ],
    offerings: [
      {
        title: "Permanent Placement & Executive Search",
        description: "Finding long-term cultural fits and technical leaders who align with your company's core mission.",
        points: ["CTO & VP Engineering sourcing", "Deep background verification", "Salary benchmarking & offer negotiation"]
      },
      {
        title: "Contract Staffing & Agile Augmentation",
        description: "Scale your engineering velocity quickly with vetted specialists for crunch periods and project milestones.",
        points: ["Immediate availability developers", "Flexible month-to-month contracts", "Direct Slack/Git team integration"]
      },
      {
        title: "Specialized Tech Recruitment",
        description: "Targeted sourcing in hard-to-hire niches: AI/ML engineers, Cloud architects, DevOps, and SecOps experts.",
        points: ["Live coding interview screenings", "Architecture design challenges", "Soft skills and communication vetting"]
      }
    ],
    benefits: [
      "Reduced time-to-hire from months down to a few business days",
      "Rigorous technical vetting by experienced engineers, minimizing hiring risk",
      "Flexible engagement models that adapt to your financial cycles and project sprints",
      "Zero compliance, taxation, or cross-border overhead for international clients"
    ],
    faqs: [
      {
        question: "How does iForge vet technical candidates?",
        answer: "Candidates undergo a 3-stage vetting process: 1) Background and portfolio audit, 2) Live coding and problem-solving assessment with a Senior Tech Lead, and 3) Communication and culture alignment interview."
      },
      {
        question: "What happens if a placed candidate does not meet expectations?",
        answer: "We provide an unconditional 90-day replacement guarantee—if a candidate does not work out, we provide a replacement candidate immediately at zero extra cost."
      }
    ]
  }
];

export const companyStats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "250+", label: "Delivered Solutions" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Enterprise Alliances" },
];

export const valueProps = [
  {
    title: "Outcome-Driven ROI",
    description: "We align technology architectures directly with concrete business metrics: revenue, operational velocity, and cloud efficiency.",
    icon: "Target"
  },
  {
    title: "Certified Global Alliances",
    description: "Official partnership certifications with cloud and security titans: AWS, Google Cloud, VMware, Trend Micro, and Palo Alto Networks.",
    icon: "ShieldCheck"
  },
  {
    title: "Zero-Trust Engineering",
    description: "Every line of code and infrastructure component is architected with defense-in-depth, encrypted pipelines, and resilience.",
    icon: "Lock"
  },
  {
    title: "Agile Speed & Transparency",
    description: "Rapid sprints, bi-weekly milestone demonstrations, dedicated Slack channels, and crystal-clear project accounting.",
    icon: "Zap"
  }
];

export const techCapabilities = [
  {
    category: "Cloud & DevOps",
    items: ["Amazon Web Services (AWS)", "Google Cloud Platform", "Kubernetes & Docker", "Terraform & OpenTofu", "CI/CD GitOps", "FinOps Architecture"]
  },
  {
    category: "Data & Enterprise AI",
    items: ["PyTorch & TensorFlow", "Large Language Models (LLMs)", "LangChain & RAG Systems", "Snowflake & Databricks", "Apache Spark & Kafka", "Predictive Analytics"]
  },
  {
    category: "Cybersecurity & Governance",
    items: ["Palo Alto Networks", "Trend Micro Cloud One", "VAPT & Pen Testing", "ISO 27001 Audits", "SOC 2 Type II Prep", "Zero Trust IAM"]
  },
  {
    category: "Modern Web & Mobile",
    items: ["Next.js (App Router)", "React 19 & TypeScript", "Tailwind CSS v4", "Node.js & Go Backends", "PostgreSQL & Redis", "High-Throughput APIs"]
  }
];

export const testimonials = [
  {
    quote: "iForge transformed our cloud infrastructure and automated our deployment pipelines with zero downtime. Exceptional technical acumen, clear communication, and responsiveness.",
    client: "Technology Director",
    company: "Bizrate",
    rating: 5
  },
  {
    quote: "The cybersecurity audit and compliance roadmap delivered by iForge gave our enterprise leadership total confidence. A trusted strategic partner.",
    client: "Head of Information Security",
    company: "Enpass",
    rating: 5
  },
  {
    quote: "Their staffing solutions helped us rapidly scale our engineering team with top-tier developers in India. High quality code and rapid turnaround.",
    client: "VP of Engineering",
    company: "EazyDiner",
    rating: 5
  }
];

export const companyTimeline = [
  {
    year: "2014",
    title: "Foundation & Infrastructure Advisory",
    description: "Established core engineering practice specializing in enterprise networking, server virtualization, and IT systems support."
  },
  {
    year: "2018",
    title: "Cloud Migration & Managed SRE Expansion",
    description: "Secured key enterprise alliances with AWS and VMware, guiding over 100+ organizations through cloud-first modernization."
  },
  {
    year: "2021",
    title: "Cybersecurity & SOC Operations Launch",
    description: "Expanded into comprehensive security consulting, VAPT ethical hacking, and partnerships with Palo Alto Networks & Trend Micro."
  },
  {
    year: "2024+",
    title: "Generative AI Advisory & Global Scale",
    description: "Pioneering enterprise LLM adoption, specialized tech staffing in India, and building a 12,000+ member Builders Community."
  }
];
