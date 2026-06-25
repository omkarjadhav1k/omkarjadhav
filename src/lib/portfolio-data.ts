import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteSettings = {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  brand: string;
  brand_url: string;
  github_url: string;
  linkedin_url: string;
  instagram_url: string;
  resume_url: string;
  availability: string;
  projects_completed: number;
  active_projects: number;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tags: string[];
  status: "featured" | "ongoing" | "future" | string;
  link: string;
  display_order: number;
};

export const defaultSettings: SiteSettings = {
  id: "default",
  full_name: "Omkar Jadhav",
  title: "Full-Stack Developer · Flutter · AI",
  bio: "I am a Computer Science student passionate about building scalable software, modern web applications, mobile apps, AI-powered systems, and digital products that solve real-world problems.",
  email: "omkarjadhav1k@gmail.com",
  phone: "9699779276",
  location: "Maharashtra, India",
  brand: "ByTech Softwares",
  brand_url: "https://bytechsoftware.vercel.app/",
  github_url: "https://github.com/omkarjadhav1k",
  linkedin_url: "https://linkedin.com/in/omkarjadhav1k",
  instagram_url: "https://instagram.com/bytechworld",
  resume_url: "",
  availability: "Open for Freelance & Collaboration",
  projects_completed: 34,
  active_projects: 9,
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return (data as SiteSettings) ?? defaultSettings;
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("status", { ascending: true })
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}
