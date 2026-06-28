export function formatDate(date: Date, locale: string): string {
    return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}

export function formatMonthYear(date: Date, locale: string): string {
    return new Date(date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
        month: "short",
        year: "numeric",
    });
}