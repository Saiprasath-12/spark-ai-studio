
REVOKE EXECUTE ON FUNCTION public.increment_page_view(text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.increment_page_view(page_path text DEFAULT '/'::text)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  new_count BIGINT;
  safe_path TEXT;
BEGIN
  -- Validate input: limit length and restrict allowed chars to reduce abuse surface
  IF page_path IS NULL OR length(page_path) = 0 OR length(page_path) > 256 THEN
    RAISE EXCEPTION 'Invalid page path';
  END IF;

  IF page_path !~ '^/[A-Za-z0-9/_\-]*$' THEN
    RAISE EXCEPTION 'Invalid page path format';
  END IF;

  safe_path := page_path;

  UPDATE public.page_views
  SET view_count = view_count + 1, updated_at = now()
  WHERE page = safe_path
  RETURNING view_count INTO new_count;

  IF new_count IS NULL THEN
    INSERT INTO public.page_views (page, view_count)
    VALUES (safe_path, 1)
    RETURNING view_count INTO new_count;
  END IF;

  RETURN new_count;
END;
$function$;

-- Grant execute only to the roles that actually need it (site visitors + signed-in users)
GRANT EXECUTE ON FUNCTION public.increment_page_view(text) TO anon, authenticated;
