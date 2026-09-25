"use client";

import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Presentation, Code2, MessageSquareText } from 'lucide-react';
import CommunityOrbit, { type OrbitItem, type OrbitStat, type OrbitTag } from '@/components/ui/builders-community-hero';

const memoji = (n: number) => `https://raw.githubusercontent.com/alohe/memojis/main/png/memo_${n}.png`;

// High-reliability Unsplash stock avatars as fallbacks
const unsplashAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
];

function ThreadAvatar() {
  return (
    <span className="flex h-[22px] w-[22px] items-center justify-center overflow-hidden rounded-full bg-[#dfe6f5]">
      <img
        src={memoji(33)}
        onError={(e) => {
          (e.target as HTMLImageElement).src = unsplashAvatars[0];
        }}
        alt=""
        draggable={false}
        className="h-full w-full translate-y-[8%] scale-[1.1] object-cover object-top"
      />
    </span>
  );
}

const items: OrbitItem[] = [
  // Anneau extérieur, de gauche à droite.
  { kind: 'status', ring: 'outer', angle: 132, label: 'Release shipped' },
  { kind: 'card', ring: 'outer', angle: 112.6, emoji: '🚀', badge: 12 },
  { kind: 'pill', ring: 'outer', angle: 90, icon: <ThreadAvatar />, label: '8 New Threads' },
  { kind: 'pill', ring: 'outer', angle: 67.6, icon: '⭐', label: '240' },
  { kind: 'avatar', ring: 'outer', angle: 50.9, src: memoji(9), alt: 'Community member', color: '#c4bceb' },
  { kind: 'pill', ring: 'outer', angle: 35.2, icon: <MessageSquareText size={13} strokeWidth={2} />, label: '36' },
  // Anneau intérieur, de gauche à droite.
  { kind: 'avatar', ring: 'inner', angle: 137.2, src: memoji(19), alt: 'Community member', color: '#ffdcb6' },
  { kind: 'pill', ring: 'inner', angle: 116.6, icon: '🔥', label: '18' },
  { kind: 'avatar', ring: 'inner', angle: 90, src: memoji(35), alt: 'Community member', color: '#c0cef3', size: 48 },
  { kind: 'card', ring: 'inner', angle: 63.3, emoji: '📦' },
  { kind: 'check', ring: 'inner', angle: 41.8 },
];

const stats: OrbitStat[] = [
  { value: '12K+', label: 'Members' },
  { value: '340+', label: 'Projects' },
  { value: '2.5M+', label: 'Downloads' },
];

const tags: OrbitTag[] = [
  { icon: <Code2 strokeWidth={2} />, label: 'Open source', href: '#' },
  { icon: <Presentation strokeWidth={2} />, label: 'Weekly demos', href: '#' },
  { icon: <GraduationCap strokeWidth={2} />, label: 'Mentorship', href: '#' },
  { icon: <Briefcase strokeWidth={2} />, label: 'Job board', href: '#' },
];

export default function CommunityOrbitDemo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[490px] w-full items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#0284c7] border-t-transparent" />
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
