import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePageViews = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const increment = async () => {
      const { data, error } = await supabase.functions.invoke('track-page-view', {
        body: { page_path: '/' },
      });
      if (!error && data && typeof data.view_count === 'number') {
        setViewCount(data.view_count);
        return;
      }
      const { data: rows } = await supabase
        .from('page_views')
        .select('view_count')
        .eq('page', '/')
        .single();
      if (rows) setViewCount(rows.view_count as number);
    };
    increment();
  }, []);

  return viewCount;
};
