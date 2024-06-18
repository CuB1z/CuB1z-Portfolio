
// Constants ==================================================
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/121297520?v=4"
export const NAME = "Diego Sánchez"
export const NICK = "CuB1z"
export const LOCATION = "Madrid, Spain"
export const OCCUPATION = "Software Engineering Student"

// Calculated constants =======================================

// Age in years
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25
const BIRTH_DATE = new Date("2004-06-05")
export const AGE = Math.floor((new Date() - BIRTH_DATE.getTime()) / MS_PER_YEAR)

// Social media links =========================================
export const GITHUB_URL = "https://github.com/CuB1z"
export const LINKEDIN_URL = "https://www.linkedin.com/in/cub1z/"
export const EMAIL = "cub1zdev@gmail.com"

export const SOCIAL_MEDIA = [
    {
        title: "GitHub",
        description: "Check out my projects!",
        url: GITHUB_URL,
        tags: [],
        target: "_blank",
        image: "/assets/github.svg"
    },
    { 
        title: "LinkedIn",
        description: "Let's connect!",
        url: "https://www.linkedin.com/in/cub1z/", 
        tags: [],
        target: "_blank",
        image: "/assets/linkedin.svg"
    },
    { 
        title: "Email",
        description: `Send me an email to ${EMAIL}`,
        url: `mailto:${EMAIL}`,
        tags: [],
        target: "",
        image: "/assets/email.svg"
    }
]

// Projects ===================================================
export const PROJECTS = [
    {
        title: "Notion Lovers",
        description: "A student-led platform for sharing and accessing university notes. Join us in revolutionizing study habits!",
        url: "https://notionlovers.vercel.app/",
        tags: ["React", "Next.js", "Notion"],
        target: "_blank",
        image: "/assets/notion-lovers.png"
    },
    {
        title: "Bits Of Battle",
        description: "Bits Of Battle (BOB) is a 1vs1 game to play in local with a friend using the same keyboard.",
        url: "https://bits-of-battle.vercel.app/",
        tags: ["React", "Canvas", "JavaScript"],
        target: "_blank",
        image: "/assets/bits-of-battle.png"
    },
    {
        title: "The 8 Ball Brand",
        description: "Auction site developed for a University project where users can bid on items and sell their own.",
        url: "https://the-8-ball-brand.vercel.app/",
        tags: ["Express", "HTML", "JavaScript"],
        target: "_blank",
        image: "/assets/the-8-ball-brand.png"
    }
]


// Icons ======================================================
export const ICONS = {
    react: {
        dark: "devicon-react-original",
        light: "devicon-react-original colored"
    },
    next_js: {
        dark: "devicon-nextjs-plain",
        light: "devicon-nextjs-plain colored"
    },
    notion: {
        dark: "devicon-notion-plain",
        light: "devicon-notion-plain colored"
    },
    canvas: {
        dark: "devicon-html5-plain",
        light: "devicon-html5-plain colored"
    },
    javascript: {
        dark: "devicon-javascript-plain",
        light: "devicon-javascript-plain colored"
    },
    html: {
        dark: "devicon-html5-plain",
        light: "devicon-html5-plain colored"
    },
    express: {
        dark: "devicon-express-original",
        light: "devicon-express-original colored"
    }
}