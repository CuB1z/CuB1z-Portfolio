
// Constants ==================================================
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/121297520?v=4"
export const NAME = "Diego Sánchez"
export const NICK = "CuB1z"
export const LOCATION = "Madrid, España"
export const OCCUPATION = "Software Engineer Student"

// Social media links =========================================
export const GITHUB_URL = "https://github.com/CuB1z"
export const LINKEDIN_URL = "https://www.linkedin.com/in/cub1z/"
export const EMAIL = "cub1zdev@gmail.com"

// Calculated constants =======================================

// Age in years
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25
const BIRTH_DATE = new Date("2004-06-05")
export const AGE = Math.floor((new Date() - BIRTH_DATE.getTime()) / MS_PER_YEAR)