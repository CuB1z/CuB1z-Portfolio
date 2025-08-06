interface Context {
    request: Request;
}

type NextFunction = () => Response | Promise<Response>;

export function onRequest(
    context: Context,
    next: NextFunction
): Response | Promise<Response> {
    const url = new URL(context.request.url);

    // If the URL starts with "/en/", redirect to the same path without "/en"
    if (url.pathname.startsWith("/en/")) {
        const newPath = url.pathname.replace("/en", "");
        return Response.redirect(
            new URL(newPath + url.search, url.origin),
            301
        );
    }

    // If the URL is exactly "/en", redirect to "/"
    if (url.pathname === "/en") {
        return Response.redirect(new URL("/" + url.search, url.origin), 301);
    }

    return next();
}
