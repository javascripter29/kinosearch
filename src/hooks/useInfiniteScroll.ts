/**
 * ��������� ��� ��� infinite scroll
 */

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  initialLoad?: boolean;
}

/**
 * ��� ��� infinite scroll � �������������� IntersectionObserver
 */
export const useInfiniteScroll = (
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 0.1, initialLoad = true } = options;
  const observerTarget = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(initialLoad);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        callback();
      }
    },
    [callback, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [handleIntersection, threshold]);

  return { observerTarget, setHasMore, hasMore };
};

/**
 * ��� ��� ������������ �������� �������� �� ��������
 */
export const useVisible = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
};
