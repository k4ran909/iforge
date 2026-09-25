import React from 'react';
import type { Metadata } from 'next';
import CommunityOrbitDemo from '@/components/ui/demo';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Builders Community | iForge Technologies',
  description: 'Where builders, engineers, and creators ship cutting-edge technology together.',
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 dark:bg-[#0a0a0a]">
      {/* Top Banner Badge */}
      <div className="mx-auto max-w-[1200px] px-4 pt-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3.5 py-1 text-xs font-semibold text-sky-700 shadow-sm dark:border-sky-950 dark:bg-sky-950/40 dark:text-sky-300">
          <Users className="h-3.5 w-3.5" />
          <span>Global Ecosystem & Talent Network</span>
        </div>
      </div>

      {/* Orbit Hero Component */}
      <CommunityOrbitDemo />

      {/* CTA Button Section ("add this button") */}
      <div className="mx-auto mt-8 max-w-[600px] px-4 text-center">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0284c7] px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0369a1] hover:shadow-lg active:scale-[0.98]"
          >
            <span>Join Builders Community</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-6 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900"
          >
            <span>Contact Organizers</span>
          </Link>
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Over 12,000+ engineers, founders, and creators shipping daily.
        </p>
      </div>
    </main>
  );
}
