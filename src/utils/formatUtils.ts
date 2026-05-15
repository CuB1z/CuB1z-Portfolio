
export function formatDate(date: Date, locale: string): string {
    return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
}

export function formatDateParts(date: Date, locale: string): { line1: string; line2: string } {
    const code = locale === "es" ? "es-ES" : "en-US";
    const month = date.toLocaleDateString(code, { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return { line1: `${month} ${day},`, line2: `${year}` };
}