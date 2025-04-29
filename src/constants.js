
// Constants ==================================================
export const AVATAR_URL = "https://avatars.githubusercontent.com/u/121297520?v=4"
export const NAME = "Diego Sánchez"
export const NICK = "CuB1z"
export const LOCATION = {
    en: "Madrid, Spain",
    es: "Madrid, España"
}

export const DESCRIPTION = {
    en: "Software Engineering Student at Rey Juan Carlos University in Madrid.",
    es: "Estudiante de Ingeniería Software en la Universidad Rey Juan Carlos de Madrid."
}

export const OCCUPATION = {
    en: "Software Engineering Student",
    es: "Estudiante de Ingeniería Software"
}

export const LINKEDIN_STATUS = {
    status: {
        en: "Available",
        es: "Disponible"
    },
    button: {
        en: "Let's connect!",
        es: "Conectemos!"
    }
}

export const NAVIGATION = {
    about: {
        en: "About",
        es: "Sobre mí"
    },
    projects: {
        en: "Projects",
        es: "Proyectos"
    },
    contact: {
        en: "Contact",
        es: "Contacto"
    }
}

export const ABOUT = {
    p1: {
        en: "Hi! I'm Diego,",
        es: "¡Hola! Soy Diego,"
    },
    p2: {
        en: "I am currently finishing my third year in Software Engineering at Rey Juan Carlos University in Madrid.",
        es: "Actualmente estoy finalizando mi tercer año de Ingeniería Software en la Universidad Rey Juan Carlos de Madrid."
    },
    p3: {
        en: "Through my studies, I have gained a strong foundation in web development, algorithms, and system design.",
        es: "A través de mis estudios, he adquirido una sólida base en desarrollo web, algoritmos y diseño de sistemas."
    },
    p4: {
        en: "In addition to my degree, I enjoy self-learning and experimenting with new technologies such as Astro, React, and Next.js.",
        es: "Además de mi carrera, disfruto aprendiendo de forma autodidacta y experimentando con nuevas tecnologías como Astro, React y Next.js."
    }
}

// Calculated constants =======================================

// Age in years
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25
const BIRTH_DATE = new Date("2004-06-05")
export const AGE = Math.floor((new Date() - BIRTH_DATE.getTime()) / MS_PER_YEAR)

// Social media links =========================================
export const GITHUB_URL = "https://github.com/CuB1z"
export const LINKEDIN_URL = "https://www.linkedin.com/in/cub1z/"
export const EMAIL = "cub1zdev@gmail.com"
export const CV_URL = "/Diego_Sanchez_EN.pdf"

export const SOCIAL_MEDIA = [
    {
        title: "GitHub",
        description: {
            en: "Check out my projects!",
            es: "¡Echa un vistazo a mis proyectos!"
        },
        url: GITHUB_URL,
        tags: [],
        target: "_blank",
        image: "/assets/github.svg"
    },
    { 
        title: "LinkedIn",
        description: {
            en: "Let's connect!",
            es: "¡Conectemos!"
        },
        url: "https://www.linkedin.com/in/cub1z/", 
        tags: [],
        target: "_blank",
        image: "/assets/linkedin.svg"
    },
    { 
        title: "Email",
        description: {
            en: `Send me an email to ${EMAIL}`,
            es: `Envíame un email a ${EMAIL}`
        },
        url: `mailto:${EMAIL}`,
        tags: [],
        target: "",
        image: "/assets/email.svg"
    }
]

// Projects ===================================================
export const PROJECTS = [
    {
        title: "NoteHub",
        description: {
            en: "A simple and intuitive platform that lets you easily view your Markdown notes stored in GitHub repositories.",
            es: "Una plataforma simple e intuitiva que te permite ver fácilmente tus notas en Markdown almacenadas en repositorios de GitHub."
        },
        url: "https://n0tehub.vercel.app/",
        tags: ["React", "Next.js", "Markdown"],
        target: "_blank",
        image: "/assets/notehub.png"
    },
    {
        title: "Notion Lovers",
        description: {
            en: "A student-led platform for sharing and accessing university notes. Join us in revolutionizing study habits!",
            es: "Una plataforma para compartir y acceder a apuntes universitarios. ¡Únete a la revolución de los hábitos de estudio!"
        },
        url: "https://notionlovers.vercel.app/",
        tags: ["React", "Next.js", "Notion"],
        target: "_blank",
        image: "/assets/notion-lovers.png"
    },
    {
        title: "Bits Of Battle",
        description: {
            en: "Bits Of Battle (BOB) is a 1vs1 game to play in local with a friend using the same keyboard.",
            es: "Bits Of Battle (BOB) es un juego 1vs1 para jugar en local con un amigo utilizando el mismo teclado."
        },
        url: "https://bits-of-battle.vercel.app/",
        tags: ["React", "Canvas", "JavaScript"],
        target: "_blank",
        image: "/assets/bits-of-battle.png"
    },
    {
        title: "The 8 Ball Brand",
        description: {
            en: "Auction site developed for a University project where users can bid on items and sell their own.",
            es: "Sitio de subastas desarrollado para un proyecto universitario donde los usuarios pueden pujar por artículos y vender los suyos."
        },
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
    },
    markdown: {
        dark: "devicon-markdown-original",
        light: "devicon-markdown-original colored"
    }
}