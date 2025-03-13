/**
 * Easing functions define the mathematical curve for animation
 */
type EasingFunction = (t: number) => number;

/**
 * Common easing patterns
 */
export const Easing = {
  // Linear (no easing)
  linear: (t: number): number => t,
  
  // Quadratic easing
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic easing
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => (--t) * t * t + 1,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Exponential easing
  easeInExpo: (t: number): number => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t: number): number => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: (t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if ((t *= 2) < 1) return 0.5 * Math.pow(2, 10 * (t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
  },
  
  // Sine easing
  easeInSine: (t: number): number => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: (t: number): number => Math.sin(t * Math.PI / 2),
  easeInOutSine: (t: number): number => -0.5 * (Math.cos(Math.PI * t) - 1)
};

/**
 * Options for smooth scrolling
 */
export interface SmoothScrollOptions {
  axis?: 'x' | 'y';      // Scroll axis
  duration?: number;     // Duration in milliseconds
  easing?: EasingFunction; // Easing function
  container?: HTMLElement | null; // Optional container element (defaults to window)
}

/**
 * Smoothly scrolls an element by a specified distance with customizable easing
 * 
 * @param element - The element to scroll
 * @param distance - Distance to scroll in pixels (positive = right/down, negative = left/up)
 * @param options - Customization options
 * @returns Promise that resolves when the animation is complete
 */
export const smoothScroll = (
  element: React.RefObject<HTMLElement | HTMLDivElement | null> | HTMLElement | null,
  distance: number,
  options: SmoothScrollOptions = {}
): Promise<void> => {
  return new Promise((resolve) => {
    // Extract options with defaults
    const {
      axis = 'x',
      duration = 500,
      easing = Easing.easeInOutCubic,
      container = null
    } = options;
    
    // Get the actual DOM element from the React ref if needed
    const targetElement = element && 'current' in element ? element.current : element;
    
    // If no valid element, resolve immediately
    if (!targetElement) {
      resolve();
      return;
    }
    
    // Determine which element to actually perform the scroll on
    const scrollElement = container || targetElement;
    
    // Get current scroll position
    const startPosition = axis === 'x' ? scrollElement.scrollLeft : scrollElement.scrollTop;
    
    // Animation variables
    let startTime: number | null = null;
    let requestId: number | null = null;
    
    // Animation step function
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easing(progress);
      
      const currentPosition = startPosition + distance * easeProgress;
      
      if (axis === 'x') {
        scrollElement.scrollLeft = currentPosition;
      } else {
        scrollElement.scrollTop = currentPosition;
      }
      
      // Continue animation if not complete
      if (progress < 1) {
        requestId = window.requestAnimationFrame(step);
      } else {
        // Animation complete
        resolve();
      }
    };
    
    // Start animation
    requestId = window.requestAnimationFrame(step);
    
    // Clean up function (for potential future use)
    const cancelScroll = () => {
      if (requestId) {
        window.cancelAnimationFrame(requestId);
        resolve();
      }
    };
    
    // Attach cancel method to returned promise (useful for potential cancellation)
    return Object.assign(Promise.resolve(), { cancel: cancelScroll });
  });
};

/**
 * Scrolls an element to a specific position with easing
 * 
 * @param element - The element to scroll
 * @param position - Target scroll position in pixels
 * @param options - Customization options
 * @returns Promise that resolves when the animation is complete
 */
export const scrollToPosition = (
  element: React.RefObject<HTMLElement> | HTMLElement | null,
  position: number,
  options: SmoothScrollOptions = {}
): Promise<void> => {
  // Extract options
  const { axis = 'x', ...restOptions } = options;
  
  // Get the actual DOM element from the React ref if needed
  const targetElement = element && 'current' in element ? element.current : element;
  
  // If no valid element, resolve immediately
  if (!targetElement) {
    return Promise.resolve();
  }
  
  // Determine current position and calculate distance
  const currentPosition = axis === 'x' ? targetElement.scrollLeft : targetElement.scrollTop;
  const distance = position - currentPosition;
  
  // Use smoothScroll with calculated distance
  return smoothScroll(targetElement, distance, { axis, ...restOptions });
};