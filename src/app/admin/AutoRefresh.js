'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AutoRefresh({ intervalMs = 7000, hiddenIntervalMs = 20000 }) {
  const router = useRouter();

  useEffect(() => {
    let id;

    const schedule = () => {
      if (id) clearInterval(id);
      const activeInterval = document.hidden ? hiddenIntervalMs : intervalMs;
      id = setInterval(() => {
        router.refresh();
      }, activeInterval);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        router.refresh();
      }
      schedule();
    };

    const handleWindowFocus = () => {
      router.refresh();
    };

    schedule();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      if (id) clearInterval(id);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [router, intervalMs, hiddenIntervalMs]);

  return null;
}
