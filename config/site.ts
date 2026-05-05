export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Nurdin A. Alawiyah",
	home: {
		greatings: "Hi, my name is Nurdin",
		role: ["I'm a Frontend Developer", "I'm a Mobile Developer", "I'm a Backend Developer", "I'm a Fullstack Developer"],
		description: "I'm passionate about creating innovative and user-friendly web applications, and my enthusiasm extends to crafting intuitive and seamless mobile applications as well.I believe in delivering exceptional digital experiences across all platforms.",
	},
	about: {
		desc: "I am Nurdin A. Alawiyah, and I possess a deep passion for the realm of programming. Leveraging my accumulated experience in web and mobile application development, I remain highly enthusiastic and fully committed to the continuous expansion of my skills and knowledge within the dynamic landscape of technology and programming. Beyond my working hours, I diligently engage in online courses to further enrich my expertise in this ever-evolving field.",
		highlights: [
			{
				label: "Experience",
				value: "2+ Years",
				icon: "Briefcase"
			},
			{
				label: "Education",
				value: "Politeknik TEDC",
				icon: "GraduationCap"
			},
			{
				label: "Focus",
				value: "Web & Mobile",
				icon: "Code2"
			}
		]
	},
	work: [
		{
			image: "/images/padepokan.png",
			company: "Padepokan Tujuh Sembilan",
			alamat: "Bandung, West Java, Indonesia",
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
						duration: "3 Months"
					},
					{
						position: "Frontend Web Developer",
						type: "Intership",
						date: "March 2023 - May 2023",
						duration: "3 Months"
					}
				]
		},
		{
			image: "/images/victoria.png",
			company: "PT. Victoria Investama, Tbk",
			alamat: "South Jakarta, Jakarta, Indonesia",
			experience:
				[
					{
						position: "Full Stack Developer",
						type: "Contract",
						date: "June 2024 - May 2025",
						duration: "1 Year"
					}
				]
		},
		{
			image: "/images/crop.png",
			company: "Crop Inspirasi Digital",
			alamat: "Bandung, West Java, Indonesia",
			experience:
				[
					{
						position: "Mobile Developer",
						type: "Intership",
						date: "July 2022 - December 2022",
						duration: "6 Months"
					}
				]
		}
	],
	project: [
		{
			name: "Aplikasi Praktik Kerja Lapangan Berbasis Mobile",
			desc: "A mobile application developed as my final project during my university studies. This application was created to facilitate students in reporting their internship activities and monitoring progress.",
			image: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
			link: "https://github.com/nurdinahmadalawiyah/pkl-app",
			customer: "Politeknik TEDC Bandung",
			role: "Fullstack Developer",
			date: "March 2023 - August 2023",
			jobDesc: [
				"Planning and designing frontend interface using Next.js",
				"Implementing secure authentication system with JWT",
				"Integrating real-time notifications through OneSignal API",
				"Designing and developing backend RESTful API using Laravel"
			],
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
					name: "PHP",
					image: "/icons/php-icon.svg"
				},
				{
					name: "MySql",
					image: "/icons/mysql-icon.svg"
				}
			]
		},
		{
			name: "E-Recruitment",
			desc: "A website application for talent recruitment that can be used by users who will apply for jobs and human resources who select prospective employee.",
			image: "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg",
			link: "#",
			isPrivate: true,
			date: "March 2023 - June 2023",
			customer: "PT. Padepokan Tujuh Sembilan",
			role: "Frontend Developer",
			jobDesc: [
				"Designing the user interface according to the pre-existing design",
				"Create Screen Daftar Candidate & Detail Candidate",
				"Create Screen Dashboard - List Contract Candidate",
				"Integrating REST API provided by the backend"
			],
			tech: [
				{
					name: "React",
					image: "/icons/react-icon.svg"
				},
				{
					name: "Java",
					image: "/icons/java-icon.svg"
				},
				{
					name: "Spring Boot",
					image: "/icons/spring-icon.svg"
				},
				{
					name: "PostgreSQL",
					image: "/icons/postgresql-icon.svg"
				}
			]
		},
		{
			name: "Internal Management Web Application Office",
			desc: "A mobile application that can manage various websites owned by the office. This application can manage login activities for each of its web applications.",
			image: "https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg",
			link: "#",
			isPrivate: true,
			date: "July 2022 - December 2022",
			customer: "PT. Crop Inspirasi Digital",
			role: "Mobile Developer",
			jobDesc: [
				"Implement login feature",
				"Implement screen manage web internal office"
			],
			tech: [
				{
					name: "Flutter",
					image: "/icons/flutter-icon.svg"
				},
				{
					name: "Dart",
					image: "/icons/dart-icon.svg"
				},
				{
					name: "Laravel",
					image: "/icons/laravel-icon.svg"
				},
				{
					name: "MySQL",
					image: "/icons/mysql-icon.svg"
				}
			]
		},
	],
	skill: [
		{
			name: "HTML",
			image: "/icons/html-icon.svg",
		},
		{
			name: "CSS",
			image: "/icons/css-icon.svg",
		},
		{
			name: "JavaScript",
			image: "/icons/javascript-icon.svg",
		},
		{
			name: "Java",
			image: "/icons/java-icon.svg",
		},
		{
			name: "Dart",
			image: "/icons/dart-icon.svg",
		},
		{
			name: "PHP",
			image: "/icons/php-icon.svg",
		},
		{
			name: "Kotlin",
			image: "/icons/kotlin-icon.svg",
		},
		{
			name: "TypeScript",
			image: "/icons/typescript-icon.svg",
		},
		{
			name: "React",
			image: "/icons/react-icon.svg",
		},
		{
			name: "Next.js",
			image: "/icons/next-icon.svg",
		},
		{
			name: "Angular",
			image: "/icons/angular-icon.svg",
		},
		{
			name: "Spring Boot",
			image: "/icons/spring-icon.svg",
		},
		{
			name: "Flutter",
			image: "/icons/flutter-icon.svg",
		},
		{
			name: "Jetpack Compose",
			image: "/icons/jetpack-compose-icon.svg",
		},
		{
			name: "React Native",
			image: "/icons/react-native-icon.svg",
		},
		{
			name: "Expo",
			image: "/icons/expo-icon.svg",
		},
		{
			name: "Laravel",
			image: "/icons/laravel-icon.svg",
		},
		{
			name: "Express.js",
			image: "/icons/express-icon.svg",
		},
		{
			name: "NestJS",
			image: "/icons/nestjs-icon.svg",
		},
		{
			name: "Node JS",
			image: "/icons/node-icon.svg",
		},
		{
			name: "MySQL",
			image: "/icons/mysql-icon.svg",
		},
		{
			name: "MongoDB",
			image: "/icons/mongodb-icon.svg",
		},
		{
			name: "PostgreSQL",
			image: "/icons/postgresql-icon.svg",
		},
		{
			name: "Figma",
			image: "/icons/figma-icon.svg",
		}
	],
	contact: {
		email: "nurdinahmada@gmail.com",
		linkedin: "https://www.linkedin.com/in/nurdin-ahmad-alawiyah/",
		instagram: "https://www.instagram.com/nurdin_ahmad_alawiyah/",
		github: "https://github.com/nurdinahmadalawiyah",
		whatsapp: "https://wa.me/628977612607",
		location: "Bandung",
		maps: "https://www.google.com/maps/search/?api=1&query=Bandung",
	},
	navItems: [
		{
			label: "Home",
			href: "#home",
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
			label: "Work",
			href: "#work",
		},
		{
			label: "About",
			href: "#about",
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
			label: "Project",
			href: "/project",
		},
		{
			label: "Skill",
			href: "/skill",
		},
		{
			label: "Work",
			href: "/work",
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Contact",
			href: "/contact",
		},
	],
	links: {
		github: "https://github.com/nurdinahmadalawiyah",
		cv: "CV - Nurdin A. Alawiyah.pdf"
	},
};
