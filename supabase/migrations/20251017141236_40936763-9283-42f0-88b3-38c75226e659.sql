-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  service_type TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view published testimonials
CREATE POLICY "Published testimonials are viewable by everyone"
ON public.testimonials
FOR SELECT
USING (is_published = true);

-- Policy: Admins can view all testimonials
CREATE POLICY "Admins can view all testimonials"
ON public.testimonials
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Admins can insert testimonials
CREATE POLICY "Admins can insert testimonials"
ON public.testimonials
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Admins can update testimonials
CREATE POLICY "Admins can update testimonials"
ON public.testimonials
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Admins can delete testimonials
CREATE POLICY "Admins can delete testimonials"
ON public.testimonials
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();