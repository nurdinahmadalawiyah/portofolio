import type { Dictionary } from "@/i18n/dictionaries";

const startDate = new Date("2022-07-01"); // Awal magang di Crop Inspirasi Digital

export function getYearsOfExperience(today = new Date()): number {
	let years = today.getFullYear() - startDate.getFullYear();
	const notYetAnniversary =
		today.getMonth() < startDate.getMonth() ||
		(today.getMonth() === startDate.getMonth() && today.getDate() < startDate.getDate());
	return notYetAnniversary ? years - 1 : years;
}

export type NavItemKey = keyof Dictionary["nav"];
export type SkillCategoryKey = keyof Dictionary["skills"]["categories"];
export type ProjectRoleKey = "mobile" | "frontend" | "backend" | "fullstack";

// The id fields are keyed by the English dictionary, so a typo or a missing
// translation entry fails the build instead of rendering "undefined" on the page.
type ExperienceCopy = Dictionary["experience"]["work"];
type ProjectCopy = Dictionary["projects"]["items"];
type EducationCopy = Dictionary["about"]["education"];

type WorkEntry<K extends keyof ExperienceCopy> = {
	id: K;
	company: string;
	image: string;
	via?: string;
	roles: { id: keyof ExperienceCopy[K]["roles"]; start: string; end: string | null }[];
	gallery: { id: keyof ExperienceCopy[K]["gallery"]; gradient: string; image?: string }[];
};

type ProjectEntry<K extends keyof ProjectCopy> = {
	id: K;
	image: string;
	link?: string;
	web?: string;
	appStore?: string;
	playStore?: string;
	isPrivate?: boolean;
	isOngoing?: boolean;
	roleKey: ProjectRoleKey;
	tech: { name: string; image: string }[];
};

type EducationEntry<K extends keyof EducationCopy> = {
	id: K;
	school: string;
	logo: string;
	gpa: string;
};

const defineWork = <K extends keyof ExperienceCopy>(entry: WorkEntry<K>): WorkEntry<K> => entry;
const defineProject = <K extends keyof ProjectCopy>(entry: ProjectEntry<K>): ProjectEntry<K> => entry;
const defineEducation = <K extends keyof EducationCopy>(entry: EducationEntry<K>): EducationEntry<K> => entry;

export const siteConfig = {
	name: "Nurdin A. Alawiyah",
	about: {
		education: [
			defineEducation({
				id: "tedc",
				school: "Politeknik TEDC Bandung",
				logo: "/images/tedc.png",
				gpa: "3.87 / 4.00",
			}),
		],
	},
	work: [
		defineWork({
			id: "padepokan",
			company: "Padepokan Tujuh Sembilan",
			image: "/images/padepokan.png",
			roles: [
				{ id: "software-developer", start: "2023-09", end: null },
				{ id: "backend-ojt", start: "2023-06", end: "2023-09" },
				{ id: "frontend-intern", start: "2023-03", end: "2023-05" },
			],
			gallery: [],
		}),
		defineWork({
			id: "prudential",
			company: "PT. Prudential Life Assurance (Prudential Indonesia)",
			image: "/images/prudential.jpg",
			via: "NTT DATA Indonesia",
			roles: [{ id: "mobile-developer", start: "2026-06", end: null }],
			gallery: [],
		}),
		defineWork({
			id: "victoria",
			company: "PT. Victoria Investama, Tbk",
			image: "/images/victoria.png",
			roles: [{ id: "fullstack-developer", start: "2024-06", end: "2025-05" }],
			gallery: [
				{
					id: "padepokan-visit",
					gradient: "linear-gradient(135deg, #3f1d0b 0%, #c2410c 48%, #fdba74 100%)",
					image: "/images/experience/victoria-onsite-visit.jpg",
				},
				{
					id: "national-batik-day",
					gradient: "linear-gradient(135deg, #431407 0%, #ea580c 48%, #fed7aa 100%)",
					image: "/images/experience/victoria-batik-day.jpg",
				},
				{
					id: "last-day",
					gradient: "linear-gradient(135deg, #422006 0%, #d97706 48%, #fde68a 100%)",
					image: "/images/experience/victoria-last-day.jpg",
				},
			],
		}),
		defineWork({
			id: "crop",
			company: "Crop Inspirasi Digital",
			image: "/images/crop.png",
			roles: [{ id: "mobile-intern", start: "2022-07", end: "2022-12" }],
			gallery: [
				{
					id: "full-team",
					gradient: "linear-gradient(135deg, #0c4a6e 0%, #0891b2 48%, #a5f3fc 100%)",
					image: "/images/experience/crop-full-team.jpg",
				},
			],
		}),
	],
	project: [
		defineProject({
			id: "civiku",
			image: "/images/project/civiku/SCR-20260830-rxro.png",
			web: "https://www.civiku.web.id/",
			isPrivate: true,
			roleKey: "fullstack",
			tech: [
				{ name: "Next.js", image: "/icons/next-icon.svg" },
				{ name: "TypeScript", image: "/icons/typescript-icon.svg" },
			],
		}),
		defineProject({
			id: "deep-link",
			image: "/images/project/deep_link/Screenshot 2026-05-24 162132.png",
			link: "https://github.com/nurdinahmadalawiyah/deep-link-diagnostics-tool",
			web: "https://deep-link-diagnostics-tool.vercel.app",
			roleKey: "fullstack",
			tech: [
				{ name: "Next.js", image: "/icons/next-icon.svg" },
				{ name: "TypeScript", image: "/icons/typescript-icon.svg" },
			],
		}),
		defineProject({
			id: "ardan",
			image: "/images/project/ardan/Gemini_Generated_Image_3jolgw3jolgw3jol.png",
			link: "#",
			isPrivate: true,
			appStore: "https://apps.apple.com/id/app/ardan-super-apps/id6755988577",
			playStore: "https://play.google.com/store/apps/details?id=com.mobile.ardan",
			roleKey: "mobile",
			tech: [
				{ name: "Flutter", image: "/icons/flutter-icon.svg" },
				{ name: "Dart", image: "/icons/dart-icon.svg" },
				{ name: "Next.js", image: "/icons/next-icon.svg" },
				{ name: "Spring Boot", image: "/icons/spring-icon.svg" },
				{ name: "Firebase", image: "/icons/firebase-icon.svg" },
				{ name: "MongoDB", image: "/icons/mongodb-icon.svg" },
			],
		}),
		defineProject({
			id: "itch-mme",
			image: "/images/project/ksei/Screenshot 2026-08-30 at 20.16.45.png",
			link: "#",
			isPrivate: true,
			roleKey: "backend",
			tech: [
				{ name: "C++", image: "/icons/cpp-icon.svg" },
				{ name: "MongoDB", image: "/icons/mongodb-icon.svg" },
				{ name: "MariaDB", image: "/icons/mysql-icon.svg" },
			],
		}),
		defineProject({
			id: "zendo",
			image: "/images/project/zendo/Gemini_Generated_Image_mly7xjmly7xjmly7.png",
			link: "https://github.com/nurdinahmadalawiyah/ZenDo",
			isOngoing: true,
			roleKey: "mobile",
			tech: [
				{ name: "Kotlin", image: "/icons/kotlin-icon.svg" },
				{ name: "Jetpack Compose", image: "/icons/jetpack-compose-icon.svg" },
				{ name: "Firebase", image: "/icons/firebase-icon.svg" },
			],
		}),
		defineProject({
			id: "victoria-core",
			image: "/images/project/victoria/Gemini_Generated_Image_7o4eyx7o4eyx7o4e.png",
			link: "#",
			isPrivate: true,
			roleKey: "fullstack",
			tech: [
				{ name: "NestJS", image: "/icons/nestjs-icon.svg" },
				{ name: "Angular", image: "/icons/angular-icon.svg" },
				{ name: "MongoDB", image: "/icons/mongodb-icon.svg" },
				{ name: "MySQL", image: "/icons/mysql-icon.svg" },
				{ name: "Redis", image: "/icons/redis-icon.svg" },
			],
		}),
		defineProject({
			id: "wms",
			image: "/images/project/wms/Gemini_Generated_Image_61srkt61srkt61sr.png",
			link: "#",
			isPrivate: true,
			roleKey: "fullstack",
			tech: [
				{ name: "Next.js", image: "/icons/next-icon.svg" },
				{ name: "Spring Boot", image: "/icons/spring-icon.svg" },
				{ name: "Java", image: "/icons/java-icon.svg" },
				{ name: "PostgreSQL", image: "/icons/postgresql-icon.svg" },
			],
		}),
		defineProject({
			id: "pkl",
			image: "/images/project/magang/Gemini_Generated_Image_cz6726cz6726cz67.png",
			link: "https://github.com/nurdinahmadalawiyah/pkl-app",
			roleKey: "fullstack",
			tech: [
				{ name: "Flutter", image: "/icons/flutter-icon.svg" },
				{ name: "Next.js", image: "/icons/next-icon.svg" },
				{ name: "Laravel", image: "/icons/laravel-icon.svg" },
				{ name: "PHP", image: "/icons/php-icon.svg" },
				{ name: "MySql", image: "/icons/mysql-icon.svg" },
			],
		}),
		defineProject({
			id: "e-recruitment",
			image: "/images/project/e-recruitment/Gemini_Generated_Image_s1agm4s1agm4s1ag.png",
			link: "#",
			isPrivate: true,
			roleKey: "frontend",
			tech: [
				{ name: "React", image: "/icons/react-icon.svg" },
				{ name: "Java", image: "/icons/java-icon.svg" },
				{ name: "Spring Boot", image: "/icons/spring-icon.svg" },
				{ name: "PostgreSQL", image: "/icons/postgresql-icon.svg" },
			],
		}),
		defineProject({
			id: "internal-management",
			image: "/images/project/crop/Gemini_Generated_Image_qk6nexqk6nexqk6n.png",
			link: "#",
			isPrivate: true,
			roleKey: "mobile",
			tech: [
				{ name: "Flutter", image: "/icons/flutter-icon.svg" },
				{ name: "Dart", image: "/icons/dart-icon.svg" },
				{ name: "Laravel", image: "/icons/laravel-icon.svg" },
				{ name: "MySQL", image: "/icons/mysql-icon.svg" },
			],
		}),
	],
	skill: [
		{ name: "JavaScript", image: "/icons/javascript-icon.svg" },
		{ name: "Java", image: "/icons/java-icon.svg" },
		{ name: "Dart", image: "/icons/dart-icon.svg" },
		{ name: "PHP", image: "/icons/php-icon.svg" },
		{ name: "Kotlin", image: "/icons/kotlin-icon.svg" },
		{ name: "TypeScript", image: "/icons/typescript-icon.svg" },
		{ name: "React", image: "/icons/react-icon.svg" },
		{ name: "Next.js", image: "/icons/next-icon.svg" },
		{ name: "Angular", image: "/icons/angular-icon.svg" },
		{ name: "Spring Boot", image: "/icons/spring-icon.svg" },
		{
			name: "Flutter",
			image: "/icons/flutter-icon.svg",
			highlights: ["BLoC", "Clean Arch", "GoRouter", "Dio", "Sqflite", "FCM/Crashlytics"],
			details: [
				{
					title: "State Management",
					items: ["BLoC / Cubit"],
				},
				{
					title: "Architecture",
					items: ["Clean Architecture", "Feature-first modular structure"],
				},
				{
					title: "Navigation",
					items: ["go_router (nested routes)", "Deep links (app_links)"],
				},
				{
					title: "Networking",
					items: ["Dio (interceptors, error handling)", "REST API integration"],
				},
				{
					title: "Local Persistence",
					items: ["Sqflite", "flutter_secure_storage (tokens)"],
				},
				{
					title: "Firebase",
					items: ["FCM (firebase_messaging)", "Crashlytics"],
				},
			],
		},
		{ name: "Jetpack Compose", image: "/icons/jetpack-compose-icon.svg" },
		{ name: "React Native", image: "/icons/react-native-icon.svg" },
		{ name: "Expo", image: "/icons/expo-icon.svg" },
		{ name: "Laravel", image: "/icons/laravel-icon.svg" },
		{ name: "Express.js", image: "/icons/express-icon.svg" },
		{ name: "NestJS", image: "/icons/nestjs-icon.svg" },
		{ name: "Node JS", image: "/icons/node-icon.svg" },
		{ name: "MySQL", image: "/icons/mysql-icon.svg" },
		{ name: "MongoDB", image: "/icons/mongodb-icon.svg" },
		{ name: "PostgreSQL", image: "/icons/postgresql-icon.svg" },
		{ name: "Redis", image: "/icons/redis-icon.svg" },
		{ name: "Firebase", image: "/icons/firebase-icon.svg" },
		{ name: "Figma", image: "/icons/figma-icon.svg" },
		{ name: "Crashlytics", image: "/icons/crashlytics-icon.svg" },
		{ name: "Remote Config", image: "/icons/remoteconfig-icon.svg" },
		{ name: "Cloud Messaging", image: "/icons/cloudmessaging-icon.svg" },
		{ name: "App Store Connect", image: "/icons/appstore-icon.svg" },
		{ name: "Google Play Console", image: "/icons/playconsole-icon.svg" },
		{ name: "Codemagic", image: "/icons/codemagic-icon.svg" },
		{ name: "Git", image: "/icons/git-icon.svg" },
	],
	contact: {
		email: "nurdinahmada@gmail.com",
		linkedin: "https://www.linkedin.com/in/nurdin-ahmad-alawiyah/",
		linkedinName: "Nurdin Ahmad Alawiyah",
		instagram: "https://www.instagram.com/nurdin_ahmad_alawiyah/",
		github: "https://github.com/nurdinahmadalawiyah",
		whatsapp: "https://wa.me/628977612607",
		location: "Bandung, Indonesia",
		maps: "https://www.google.com/maps/search/?api=1&query=Bandung",
	},
	navItems: [
		{ key: "home" as NavItemKey, href: "#home" },
		{ key: "project" as NavItemKey, href: "#project" },
		{ key: "skill" as NavItemKey, href: "#skill" },
		{ key: "experience" as NavItemKey, href: "#experience" },
		{ key: "about" as NavItemKey, href: "#about" },
		{ key: "contact" as NavItemKey, href: "#contact" },
	],
	navMenuItems: [
		{ key: "home" as NavItemKey, href: "#home" },
		{ key: "project" as NavItemKey, href: "#project" },
		{ key: "skill" as NavItemKey, href: "#skill" },
		{ key: "experience" as NavItemKey, href: "#experience" },
		{ key: "about" as NavItemKey, href: "#about" },
		{ key: "contact" as NavItemKey, href: "#contact" },
	],
	links: {
		github: "https://github.com/nurdinahmadalawiyah",
		cv: "CV - Nurdin A. Alawiyah.pdf",
	},
};

export type SiteConfig = typeof siteConfig;
export type WorkId = SiteConfig["work"][number]["id"];
export type ProjectId = SiteConfig["project"][number]["id"];
export type EducationId = SiteConfig["about"]["education"][number]["id"];
