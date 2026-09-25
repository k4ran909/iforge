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
  offerings: {
    title: string;
    description: string;
    points?: string[];
  }[];
  benefits: string[];
}

export const siteConfig = {
  name: "iForge Technologies",
  tagline: "IT Services & Consulting",
  headline: "Accelerating Success With IT Services",
  subheadline: "Transform your business with cutting-edge technology and expert consultancy services tailored to your needs.",
  contactEmail: "info@iforge.in",
  phone: "+91 98765 43210", // Standard placeholder if not specified
  address: "India",
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
    title: "Data and AI",
    subtitle: "Reimagine your business with AI",
    shortDesc: "Enterprise AI consulting, LLM adoption, predictive analytics, and automated decision engineering.",
    longDesc: "iForge AI Advisory is an enterprise AI consulting service that helps organizations move from AI strategy to production reality. From strategy through to implementation and operations, we help organizations accelerate and sustain trusted outcomes through responsible application of AI.",
    iconName: "BrainCircuit",
    features: [
      "AI Strategy & Readiness Assessment",
      "Custom Generative AI & LLM Integration",
      "Predictive Analytics & Machine Learning",
      "Enterprise Data Warehousing & Pipelines",
      "Responsible AI & Algorithmic Governance"
    ],
    offerings: [
      {
        title: "AI Advisory & Roadmap",
        description: "Identify high-ROI AI use cases, assess technological readiness, and build an executable roadmap for enterprise artificial intelligence."
      },
      {
        title: "Predictive & Prescriptive Analytics",
        description: "Transform historical enterprise data into foresight with custom statistical learning, anomaly detection, and operational optimization."
      },
      {
        title: "Responsible AI Governance",
        description: "Ensure ethical deployment, transparency, bias mitigation, and strict compliance with global AI governance regulations."
      }
    ],
    benefits: [
      "Accelerated time-to-market for AI products",
      "Automated manual operational workflows",
      "High data confidence and centralized intelligence"
    ]
  },
  {
    id: "cloud-services",
    slug: "cloud-services",
    title: "Cloud Services",
    subtitle: "Trust a managed public cloud provider that delivers end-to-end solutions",
    shortDesc: "CloudSMART strategy delivering complete cloud consultancy, architecture, and multi-cloud management.",
    longDesc: "Our CloudSMART strategy gives enterprises a complete cloud consultancy and delivery platform that adapts to your needs. Through strategic partnerships with leading providers (AWS, Google Cloud, Azure), we help you unlock the full potential of modern cloud technologies to build scalable, resilient environments.",
    iconName: "Cloud",
    features: [
      "Multi-Cloud Architecture & Migration",
      "Cloud Cost Optimization (FinOps)",
      "DevOps, CI/CD & Kubernetes Orchestration",
      "Serverless & Microservices Modernization",
      "Cloud Security & Compliance Hardening"
    ],
    offerings: [
      {
        title: "Cloud Migration & Modernization",
        description: "Zero-downtime workload migration from legacy on-premise infrastructure to high-performance cloud environments."
      },
      {
        title: "Managed Cloud Infrastructure",
        description: "24/7 monitoring, auto-scaling, backup redundancy, and SLA-backed management for your core cloud footprint."
      },
      {
        title: "DevOps & Cloud Automation",
        description: "Infrastructure as Code (Terraform), continuous integration pipelines, and containerized deployments with Kubernetes."
      }
    ],
    benefits: [
      "Up to 40% reduction in cloud infrastructure expenses",
      "99.99% high availability and automated disaster recovery",
      "Instant resource scalability on enterprise demand"
    ]
  },
  {
    id: "it-infrastructure",
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    subtitle: "Deliver personalized experiences with an agile infrastructure that ensures business continuity",
    shortDesc: "Robust enterprise networking, system architecture, AMC services, and hardware engineering.",
    longDesc: "iForge Technologies delivers secure, scalable, and reliable IT infrastructure services designed to support evolving enterprise demands. We ensure your foundational hardware, network architecture, and operational systems run without interruption.",
    iconName: "Server",
    features: [
      "Enterprise Network Architecture & SD-WAN",
      "Server Virtualization & Storage Clusters",
      "Annual Maintenance Contracts (AMC Services)",
      "Disaster Recovery & Business Continuity",
      "Data Center Setup & Remote Hands"
    ],
    offerings: [
      {
        title: "Network & Systems Engineering",
        description: "High-throughput, redundant routing and switching setups with strict zero-trust boundary segmentation."
      },
      {
        title: "AMC & Infrastructure Support",
        description: "Comprehensive annual maintenance, proactive telemetry monitoring, and rapid on-site troubleshooting."
      },
      {
        title: "Storage & Virtualization",
        description: "VMware, Hyper-V, and enterprise SAN/NAS configurations optimized for latency-critical workloads."
      }
    ],
    benefits: [
      "Elimination of single points of hardware failure",
      "24/7 uptime monitoring with fast SLA response",
      "Prolonged hardware lifecycle and cost predictability"
    ]
  },
  {
    id: "cybersecurity-services",
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    subtitle: "End-to-end cybersecurity services ensuring safety, compliance, and business continuity",
    shortDesc: "Vulnerability assessment, penetration testing, endpoint protection, and proactive defense.",
    longDesc: "Today's threat landscape is highly dynamic, driven by the rapid adoption of disruptive technologies. iForge brings deep expertise in Defense, Protection, and Risk Management to ensure your mission-critical digital assets remain fortified.",
    iconName: "ShieldCheck",
    features: [
      "Vulnerability Assessment & Pen Testing (VAPT)",
      "Next-Gen Firewall & Endpoint Protection",
      "Security Operations Center (SOC) Support",
      "Compliance Audits (ISO 27001, SOC 2, HIPAA)",
      "Zero Trust Identity & Access Management (IAM)"
    ],
    offerings: [
      {
        title: "Cyber Defense & Threat Detection",
        description: "Continuous surveillance and automated threat intelligence to mitigate zero-day vulnerabilities."
      },
      {
        title: "Risk & Compliance Consulting",
        description: "Comprehensive gap analyses and audit preparation to satisfy stringent enterprise and regulatory standards."
      },
      {
        title: "Endpoint & Perimeter Fortification",
        description: "Partnering with industry leaders like Palo Alto Networks and Trend Micro for bulletproof defense."
      }
    ],
    benefits: [
      "Complete protection against ransomware and data breaches",
      "Guaranteed compliance with regulatory security mandates",
      "Minimization of security incident impact and downtime"
    ]
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    subtitle: "Optimise your software portfolio with our technically driven digital strategy",
    shortDesc: "Custom web applications, enterprise portals, responsive platforms, and API engineering.",
    longDesc: "Whether you're a startup launching a transformative product or an established enterprise modernizing legacy portals, iForge delivers technically superior, high-performing, and secure web solutions that scale seamlessly.",
    iconName: "Code2",
    features: [
      "Modern React / Next.js Web Applications",
      "Custom Enterprise Portals & Dashboards",
      "RESTful & GraphQL API Architecture",
      "Database Design & Cloud Native Architecture",
      "SEO, Core Web Vitals & Performance Optimization"
    ],
    offerings: [
      {
        title: "Custom Full-Stack Web Apps",
        description: "Tailored frontend interfaces paired with resilient backends designed for performance, reliability, and security."
      },
      {
        title: "Corporate & Business Platforms",
        description: "Brand-defining web experiences engineered to convert visitors, showcase services, and integrate with CRM systems."
      },
      {
        title: "API & Microservice Development",
        description: "Secure, documented, and high-concurrency APIs connecting disparate systems and mobile backends."
      }
    ],
    benefits: [
      "Sub-second load times and flawless mobile responsiveness",
      "Intuitive UX designed to maximize conversion rates",
      "Clean, modular codebase ready for long-term scale"
    ]
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Launch, grow, and reinvent your brand with targeted digital campaigns",
    shortDesc: "Organic SEO, performance paid marketing, conversion rate optimization, and brand scaling.",
    longDesc: "iForge is an agile digital growth partner that excels in launching, growing, and reinventing brands. We blend data-driven audience targeting with compelling creative execution to consistently drive qualified leads and revenue.",
    iconName: "TrendingUp",
    features: [
      "Search Engine Optimization (Technical & On-Page)",
      "Performance Marketing (Google Ads, Meta, LinkedIn)",
      "Content Strategy & Copywriting",
      "Conversion Rate Optimization (CRO)",
      "Analytics, Attribution & Growth Tracking"
    ],
    offerings: [
      {
        title: "Organic SEO Growth",
        description: "Comprehensive keyword dominance, technical site health optimization, and authority-building content."
      },
      {
        title: "Paid Acquisition Campaigns",
        description: "High-ROI PPC and social ad campaigns optimized for customer acquisition cost (CAC) and lifetime value."
      },
      {
        title: "Brand Strategy & Positioning",
        description: "Elevate market perception with consistent brand messaging, positioning, and omnichannel presence."
      }
    ],
    benefits: [
      "Predictable pipeline of qualified inbound leads",
      "Measurable return on ad spend (ROAS)",
      "Sustainable organic search traffic growth"
    ]
  },
  {
    id: "staffing-solutions",
    slug: "staffing-solutions",
    title: "Staffing Solutions",
    subtitle: "Empowering businesses with smart, scalable staffing solutions",
    shortDesc: "Permanent IT recruitment, contract talent, executive search, and staff augmentation in India.",
    longDesc: "Create a passionate, high-impact team with iForge Staffing Solutions. We connect visionary organizations with India's finest technical talent across software engineering, cloud architecture, cybersecurity, and data science.",
    iconName: "Users",
    features: [
      "Permanent IT Recruitment & Executive Search",
      "Contract & Project-Based Talent Augmentation",
      "Technical Screening & Rigorous Vetting",
      "Fast Turnaround Hiring Cycles",
      "Payroll & Compliance Management"
    ],
    offerings: [
      {
        title: "Permanent Placement",
        description: "Finding long-term culture fits and technical leaders who align with your company's core mission."
      },
      {
        title: "Contract Staffing & Augmentation",
        description: "Scale your engineering velocity quickly with vetted specialists for crunch periods and project milestones."
      },
      {
        title: "Specialized Tech Recruitment",
        description: "Targeted sourcing in hard-to-hire niches: AI/ML engineers, Cloud architects, DevOps, and SecOps experts."
      }
    ],
    benefits: [
      "Reduced time-to-hire from weeks to days",
      "Rigorous technical vetting minimizing hiring risk",
      "Flexible hiring models adapted to budget cycles"
    ]
  }
];

export const companyStats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "250+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Enterprise Alliances" },
];

export const valueProps = [
  {
    title: "Deep Industry Experience",
    description: "Decades of collective domain expertise across enterprise IT, cloud infrastructure, AI advisory, and cybersecurity.",
    icon: "Award"
  },
  {
    title: "Outcome-Focused Approach",
    description: "We align technology architectures directly with concrete business metrics: ROI, security posture, and market speed.",
    icon: "Target"
  },
  {
    title: "Advanced Tech, Quality Commitment",
    description: "Every solution is built on modern frameworks, verified best practices, and continuous engineering excellence.",
    icon: "CheckCircle2"
  },
  {
    title: "Strategic Global Alliances",
    description: "Official partnership certifications with cloud titans: AWS, Google Cloud, VMware, Trend Micro, and Palo Alto Networks.",
    icon: "Handshake"
  }
];

export const testimonials = [
  {
    quote: "iForge transformed our cloud infrastructure and automated our deployment pipelines with zero downtime. Exceptional technical acumen and responsiveness.",
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
    quote: "Their staffing solutions helped us rapidly scale our engineering team with top-tier developers in India. Highly recommended.",
    client: "VP of Engineering",
    company: "EazyDiner",
    rating: 5
  }
];
