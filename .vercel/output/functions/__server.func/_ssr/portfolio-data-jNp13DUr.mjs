import { t as supabase } from "./client-1Nu-Nt_u.mjs";
import { t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-data-jNp13DUr.js
var defaultSettings = {
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
	active_projects: 9
};
function useSiteSettings() {
	return useQuery({
		queryKey: ["site_settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
			if (error) throw error;
			return data ?? defaultSettings;
		}
	});
}
function useProjects() {
	return useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const { data, error } = await supabase.from("projects").select("*").order("status", { ascending: true }).order("display_order", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
}
//#endregion
export { useProjects as n, useSiteSettings as r, defaultSettings as t };
