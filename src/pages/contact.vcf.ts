import type { APIRoute } from "astro";
import { socialData } from "@/constants/socialData";

export const GET: APIRoute = ({ site }) => {
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Sánchez Rincón;Diego;;;",
        "FN:Diego Sánchez Rincón",
        `EMAIL;TYPE=INTERNET:${socialData.email.slice("mailto:".length)}`,
        `URL:${new URL("/", site).href}`,
        "END:VCARD",
        "",
    ].join("\r\n");

    return new Response(vcard, { headers: { "Content-Type": "text/vcard; charset=utf-8" } });
};
