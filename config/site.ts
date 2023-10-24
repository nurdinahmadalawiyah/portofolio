export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Nurdin A. Alawiyah",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/docs",
		},
		{
			label: "Work",
			href: "/pricing",
		},
		{
			label: "Project",
			href: "/blog",
		},
		{
			label: "Skill",
			href: "/about",
		},
		{
			label: "Contact",
			href: "/about",
		}
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/profile",
		},
		{
			label: "About",
			href: "/dashboard",
		},
		{
			label: "Work",
			href: "/projects",
		},
		{
			label: "Project",
			href: "/team",
		},
		{
			label: "Skill",
			href: "/calendar",
		},
		{
			label: "Contact",
			href: "/settings",
		},
	],
	links: {
		github: "https://github.com/nurdinahmadalawiyah",
		docs: "https://nextui.org",
		cv: "https://patreon.com/jrgarciadev"
	},
};
