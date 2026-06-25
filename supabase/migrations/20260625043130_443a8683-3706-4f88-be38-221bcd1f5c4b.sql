
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Site settings (single-row config)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Omkar Jadhav',
  title TEXT NOT NULL DEFAULT 'Full-Stack Developer | Flutter Developer | AI Enthusiast',
  bio TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT 'omkarjadhav1k@gmail.com',
  phone TEXT NOT NULL DEFAULT '9699779276',
  location TEXT NOT NULL DEFAULT 'Maharashtra, India',
  brand TEXT NOT NULL DEFAULT 'ByTech Softwares',
  brand_url TEXT NOT NULL DEFAULT 'https://bytechsoftware.vercel.app/',
  github_url TEXT NOT NULL DEFAULT 'https://github.com/omkarjadhav1k',
  linkedin_url TEXT NOT NULL DEFAULT 'https://linkedin.com/in/omkarjadhav1k',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/bytechworld',
  resume_url TEXT NOT NULL DEFAULT '',
  availability TEXT NOT NULL DEFAULT 'Open for Freelance & Collaboration',
  projects_completed INT NOT NULL DEFAULT 34,
  active_projects INT NOT NULL DEFAULT 9,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert site settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (bio) VALUES (
  'I am a Computer Science student passionate about building scalable software, modern web applications, mobile apps, AI-powered systems, and digital products that solve real-world problems.'
);

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'featured', -- featured | ongoing | future
  link TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read projects" ON public.projects
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_projects_updated BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed featured projects
INSERT INTO public.projects (title, subtitle, description, features, tags, status, display_order) VALUES
('MiniMart', 'Farmer-to-customer marketplace', 'A modern marketplace application connecting farmers directly with customers.',
  ARRAY['Farmer Dashboard','Customer Dashboard','Product Management','Order Tracking','Smart Search','Secure Authentication','Responsive UI','AI Recommendations'],
  ARRAY['Flutter','Firebase','Dart'], 'featured', 1),
('AI Exam Platform', 'Intelligent examination system', 'An intelligent examination system powered by AI with question generation and analytics.',
  ARRAY['Admin Dashboard','Student Dashboard','AI Question Generation','MCQ Exams','Automatic Results','Performance Analytics','Exam Scheduling'],
  ARRAY['PHP','MySQL','AI','JavaScript'], 'featured', 2),
('ATS Resume Checker', 'AI resume analysis platform', 'An AI-powered resume analysis platform that scores resumes against ATS criteria.',
  ARRAY['Resume Upload','ATS Compatibility Score','Keyword Analysis','Improvement Suggestions','Downloadable Report'],
  ARRAY['Python','AI','React'], 'featured', 3),
('Startup Ideas Platform', 'Discover & validate ideas', 'A platform to discover, validate, and share startup ideas with AI suggestions.',
  ARRAY['Startup Listings','Category Filters','User Accounts','AI Suggestions','Idea Validation'],
  ARRAY['Next.js','PostgreSQL','AI'], 'featured', 4),
('Bike Showroom Management', 'College mini project', 'A complete showroom management system handling inventory, sales and billing.',
  ARRAY['Customer Management','Inventory','Sales','Billing','Reports'],
  ARRAY['Java','JSP','MySQL'], 'featured', 5),
('AI Agents', 'Multi-agent intelligent systems', 'Building intelligent AI agent systems using modern frameworks.',
  ARRAY['Multi-agent orchestration','Tool use','Memory'], ARRAY['Python','LangChain','AI'], 'ongoing', 1),
('Hackathon Management Platform', 'Organize & manage hackathons', 'Online platform for organizing and managing hackathons end-to-end.',
  ARRAY['Team registration','Submissions','Judging','Leaderboard'], ARRAY['React','Node.js','Postgres'], 'ongoing', 2),
('Vaultfy', 'Smart Document Access System', 'Secure digital locker with face authentication, QR verification and access expiry.',
  ARRAY['Secure Digital Locker','Face Authentication','QR Verification','OTP Security','Document Sharing','Access Expiry','Premium Storage'],
  ARRAY['Flutter','Firebase','AI'], 'future', 1);
