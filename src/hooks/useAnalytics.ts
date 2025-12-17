import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const trackPageView = useCallback(async () => {
    try {
      await supabase.from('page_views').insert({
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, []);

  const trackClick = useCallback(async (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    // Get meaningful element info
    const elementId = target.id || target.closest('[id]')?.id || null;
    const elementClass = target.className?.toString().slice(0, 200) || null;
    const elementText = target.textContent?.slice(0, 100) || null;
    const elementTag = target.tagName?.toLowerCase() || null;

    try {
      await supabase.from('click_events').insert({
        element_id: elementId,
        element_class: elementClass,
        element_text: elementText,
        element_tag: elementTag,
        page_path: window.location.pathname,
        x_position: event.clientX,
        y_position: event.clientY,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  }, []);

  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Add click listener
    document.addEventListener('click', trackClick);

    return () => {
      document.removeEventListener('click', trackClick);
    };
  }, [trackPageView, trackClick]);
};
