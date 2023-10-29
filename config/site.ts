export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Nurdin A. Alawiyah",
	home: {
		greatings: "Hi, my name is Nurdin",
		role: "I'm a Fullstack Developer",
		description: "I'm passionate about creating innovative and user-friendly web applications, and my enthusiasm extends to crafting intuitive and seamless mobile applications as well.I believe in delivering exceptional digital experiences across all platforms.",
	},
	about: {
		desc: "I am Nurdin A. Alawiyah, and I possess a deep passion for the realm of programming. Leveraging my accumulated experience in web and mobile application development, I remain highly enthusiastic and fully committed to the continuous expansion of my skills and knowledge within the dynamic landscape of technology and programming. Beyond my working hours, I diligently engage in online courses to further enrich my expertise in this ever-evolving field.",
	},
	work: [
		{
			image: "/images/padepokan.png",
			company: "Padepokan Tujuh Sembilan",
			alamat: "Bandung, Jawa Barat, Indonesia",
			experience:
				[
					{
						position: "Software Developer",
						type: "Contract",
						date: "September 2023 - Present",
						duration: ""
					},
					{
						position: "Backend Developer",
						type: "On Job Training",
						date: "June 2023 - September 2023",
						duration: "3 Month"
					},
					{
						position: "Frontend Web Developer",
						type: "Intership",
						date: "March 2023 - May 2023",
						duration: "3 Month"
					}
				]
		},
		{
			image: "/images/crop.png",
			company: "Crop Inspirasi Digital",
			alamat: "Bandung, Jawa Barat, Indonesia",
			experience:
				[
					{
						position: "Mobile Developer",
						type: "Intership",
						date: "July 2022 - December 2022",
						duration: "6 Month"
					}
				]
		}
	],
	project: [
		{
			name: "Aplikasi Praktik Kerja Lapangan Berbasis Mobile (Studi Kasus: Politeknik TEDC Bandung)",
			desc: "PKL APP is a cutting-edge mobile application designed to streamline and simplify the process of managing internships and student placements.",
			image: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
			link: "https://github.com/nurdinahmadalawiyah/pkl-app",
			tech: [
				{
					name: "Flutter",
					image: "/icons/flutter-icon.svg"
				},
				{
					name: "Next.js",
					image: "/icons/next-icon.svg"
				},
				{
					name: "Laravel",
					image: "/icons/laravel-icon.svg"
				},
				{
					name: "MySql",
					image: "/icons/mysql-icon.svg"
				},
			]
		},
		{
			name: "Futoboru",
			desc: "Futoboru is the ultimate mobile application designed exclusively for football enthusiasts. With Futoboru, you'll experience the thrill of football at your fingertips.",
			image: "https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg",
			link: "https://github.com/nurdinahmadalawiyah/Futoboru",
			tech: [
				{
					name: "Flutter",
					image: "/icons/flutter-icon.svg"
				}
			]
		},
	],
	skill: [
		{
			name: "HTML",
			image: "",
		},
		{
			name: "CSS",
			image: "",
		},
		{
			name: "JavaScript",
			image: "",
		},
		{
			name: "Java",
			image: "",
		},
		{
			name: "Dart",
			image: "",
		},
		{
			name: "PHP",
			image: "",
		},
		{
			name: "React",
			image: "",
		},
		{
			name: "Next.js",
			image: "",
		},
		{
			name: "Spring Boot",
			image: "",
		},
		{
			name: "Flutter",
			image: "",
		},
		{
			name: "Laravel",
			image: "",
		},
		{
			name: "Node JS",
			image: "",
		},
		{
			name: "MySQL",
			image: "",
		},
		{
			name: "PostgreSQL",
			image: "",
		},
		{
			name: "Figma",
			image: "",
		}
	],
	contact: {

	},
	navItems: [
		{
			label: "Home",
			href: "#home",
		},
		{
			label: "About",
			href: "#about",
		},
		{
			label: "Work",
			href: "#work",
		},
		{
			label: "Project",
			href: "#project",
		},
		{
			label: "Skill",
			href: "#skill",
		},
		{
			label: "Contact",
			href: "#contact",
		}
	],
	navMenuItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Work",
			href: "/work",
		},
		{
			label: "Project",
			href: "/project",
		},
		{
			label: "Skill",
			href: "/skill",
		},
		{
			label: "Contact",
			href: "/contact",
		},
	],
	links: {
		github: "https://github.com/nurdinahmadalawiyah",
		cv: "https://patreon.com/jrgarciadev"
	},
};
