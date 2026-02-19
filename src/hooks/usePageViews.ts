import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePageViews = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const increment = async () => {
      const { data, error } = await supabase.rpc('increment_page_view', { page_path: '/' });
      if (!error && data) {
        setViewCount(data as number);
      } else {
        // Fallback: just read
        const { data: rows } = await supabase
          .from('page_views')
          .select('view_count')
          .eq('page', '/')
          .single();
        if (rows) setViewCount(rows.view_count as number);
      }
    };
    increment();
  }, []);

  return viewCount;
};
