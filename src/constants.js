
// Constants ==================================================
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/121297520?v=4"
export const NAME = "Diego Sánchez"
export const NICK = "CuB1z"
export const LOCATION = "Madrid, Spain"
export const OCCUPATION = "Software Engineering Student"

// Social media links =========================================
export const GITHUB_URL = "https://github.com/CuB1z"
export const LINKEDIN_URL = "https://www.linkedin.com/in/cub1z/"
export const EMAIL = "cub1zdev@gmail.com"

// Projects ===================================================
export const PROJECTS = [
    {
        title: "Notion Lovers",
        description: "A student-led platform for sharing and accessing university notes. Join us in revolutionizing study habits!",
        url: "https://notionlovers.vercel.app/",
        tech: ["React", "Next.js", "Notion"],
        image: "/assets/notion-lovers.png"
    },
    {
        title: "Bits Of Battle",
        description: "Bits Of Battle (BOB) is a 1vs1 game to play in local with a friend using the same keyboard.",
        url: "https://bits-of-battle.vercel.app/",
        tech: ["React", "Canvas", "JavaScript"],
        image: "/assets/bits-of-battle.png"
    },
    {
        title: "The 8 Ball Brand",
        description: "Auction site developed for a University project where users can bid on items and sell their own.",
        url: "https://github.com/PortiESP/The8BallBrand",
        tech: ["Node.js", "Express", "JavaScript"],
        image: "/assets/the-8-ball-brand.png"
    }
]

// Calculated constants =======================================

// Age in years
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25
const BIRTH_DATE = new Date("2004-06-05")
export const AGE = Math.floor((new Date() - BIRTH_DATE.getTime()) / MS_PER_YEAR)