-- Fix page_views: Remove public read access, allow only admins
DROP POLICY IF EXISTS "Allow public to insert page views" ON public.page_views;
DROP POLICY IF EXISTS "Allow public to read page views" ON public.page_views;
DROP POLICY IF EXISTS "Anyone can insert page views" ON public.page_views;
DROP POLICY IF EXISTS "Anyone can view page views" ON public.page_views;

-- Allow anyone to insert page views (for analytics tracking)
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- Only admins can view page views
CREATE POLICY "Only admins can view page views"
ON public.page_views
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Fix user_roles: Users can only view their OWN roles, not all roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);