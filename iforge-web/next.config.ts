import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/it-infrastructure", destination: "/services/it-infrastructure" },
      { source: "/cloud-services", destination: "/services/cloud-services" },
      { source: "/data-ai", destination: "/services/data-ai" },
      { source: "/cybersecurity-services", destination: "/services/cybersecurity-services" },
      { source: "/web-development", destination: "/services/web-development" },
      { source: "/digital-marketing", destination: "/services/digital-marketing" },
      { source: "/staffing-solutions", destination: "/services/staffing-solutions" },
    ];
  },
};

export default nextConfig;
