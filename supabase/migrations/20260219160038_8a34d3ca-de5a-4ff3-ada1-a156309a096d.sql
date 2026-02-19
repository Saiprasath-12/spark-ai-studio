
-- Create a table for page views counter
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL DEFAULT '/',
  view_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial row for homepage
INSERT INTO public.page_views (page, view_count) VALUES ('/', 0);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read view counts
CREATE POLICY "Anyone can read page views"
ON public.page_views
FOR SELECT
USING (true);

-- Create a function to increment views atomically
CREATE OR REPLACE FUNCTION public.increment_page_view(page_path TEXT DEFAULT '/')
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.page_views
  SET view_count = view_count + 1, updated_at = now()
  WHERE page = page_path
  RETURNING view_count INTO new_count;
  
  IF new_count IS NULL THEN
    INSERT INTO public.page_views (page, view_count)
    VALUES (page_path, 1)
    RETURNING view_count INTO new_count;
  END IF;
  
  RETURN new_count;
END;
$$;
