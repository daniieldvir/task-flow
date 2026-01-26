import { useEffect, useState } from "react";

/**
 * Hook that calculates how many items can fit on the screen
 * based on viewport height and estimated card dimensions
 */
export function useDynamicItemsPerPage({
  containerRef,
  estimatedCardHeight = 180,
  estimatedCardWidth = 300,
  gap = 10,
  headerHeight = 80,
  paginationHeight = 50,
  minItems = 6,
  maxItems = 50, // Reduced from 100 to ensure pagination shows
}) {
  const [itemsPerPage, setItemsPerPage] = useState(minItems);

  useEffect(() => {
    const calculateItemsPerPage = () => {
      let availableHeight, availableWidth;

      if (containerRef?.current) {
        // Use actual container dimensions if available
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        availableHeight = containerRect.height - headerHeight - paginationHeight - 40; // extra padding
        availableWidth = containerRect.width - 40; // padding
      } else {
        // Fallback to window dimensions, but account for sidebar (260px) and padding
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const sidebarWidth = 260;
        const appPadding = 32; // 1.6rem * 2 = ~32px
        
        availableHeight = windowHeight - headerHeight - paginationHeight - 150; // account for header, padding, etc
        availableWidth = windowWidth - sidebarWidth - appPadding - 40; // subtract sidebar and padding
      }

      // Calculate how many rows fit
      const rowsPerPage = Math.max(1, Math.floor(availableHeight / (estimatedCardHeight + gap)));

      // Calculate how many columns fit
      const columnsPerPage = Math.max(1, Math.floor(availableWidth / (estimatedCardWidth + gap)));

      // Calculate total items that fit
      const calculatedItems = Math.max(
        minItems,
        Math.min(maxItems, rowsPerPage * columnsPerPage)
      );

      setItemsPerPage(calculatedItems);
    };

    // Calculate on mount with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(calculateItemsPerPage, 100);

    // Recalculate on window resize with debounce
    let resizeTimeoutId;
    const handleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(calculateItemsPerPage, 150);
    };

    window.addEventListener("resize", handleResize);

    // Use ResizeObserver if available for more accurate calculations
    let resizeObserver;
    if (containerRef?.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        calculateItemsPerPage();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeoutId);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [containerRef, estimatedCardHeight, estimatedCardWidth, gap, headerHeight, paginationHeight, minItems, maxItems]);

  return itemsPerPage;
}