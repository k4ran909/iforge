"use client";

import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Presentation, Code2, MessageSquareText } from 'lucide-react';
import CommunityOrbit, { type OrbitItem, type OrbitStat, type OrbitTag } from '@/components/ui/builders-community-hero';

const engineerAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80"
];

function ThreadAvatar() {
  return (
    <span className="flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
      <img
        src={engineerAvatars[3]}
        alt="Lead Architect"
        draggable={false}
        className="h-full w-full object-cover object-center"
      />
    </span>
  );
}

const items: OrbitItem[] = [
  { kind: 'status', ring: 'outer', angle: 132, label: 'Release v2.4 shipped' },
  { kind: 'card', ring: 'outer', angle: 112.6, emoji: 'CI/CD', badge: 12 },
  { kind: 'pill', ring: 'outer', angle: 90, icon: <ThreadAvatar />, label: 'Architecture Threads' },
  { kind: 'pill', ring: 'outer', angle: 67.6, label: '240+ PRs Merged' },
  { kind: 'avatar', ring: 'outer', angle: 50.9, src: engineerAvatars[0], alt: 'Principal Architect', color: '#161616' },
  { kind: 'pill', ring: 'outer', angle: 35.2, label: '36 Active Repos' },
  { kind: 'avatar', ring: 'inner', angle: 137.2, src: engineerAvatars[1], alt: 'Cloud Architect', color: '#161616' },
  { kind: 'pill', ring: 'inner', angle: 116.6, label: '18 Sprint Reviews' },
  { kind: 'avatar', ring: 'inner', angle: 90, src: engineerAvatars[2], alt: 'Systems Engineer', color: '#161616', size: 48 },
  { kind: 'card', ring: 'inner', angle: 63.3, emoji: 'Cloud' },
  { kind: 'check', ring: 'inner', angle: 41.8 },
];

const stats: OrbitStat[] = [
  { value: '12K+', label: 'Members' },
  { value: '340+', label: 'Projects' },
  { value: '2.5M+', label: 'Downloads' },
];

const tags: OrbitTag[] = [
  { icon: <Code2 strokeWidth={2} />, label: 'Open source', href: '#tracks' },
  { icon: <Presentation strokeWidth={2} />, label: 'Weekly demos', href: '#tracks' },
  { icon: <GraduationCap strokeWidth={2} />, label: 'Mentorship', href: '#tracks' },
  { icon: <Briefcase strokeWidth={2} />, label: 'Job board', href: '#tracks' },
];

export default function CommunityOrbitDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[490px] w-full items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#E61E32] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <CommunityOrbit
        items={items}
        stats={stats}
        headline={
          <>
            Where Builders Ship
            <br className="hidden sm:block" /> Together
          </>
        }
        tags={tags}
      />
    </div>
  );
}
