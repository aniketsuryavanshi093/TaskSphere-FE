export function clearCookies() {
    // Get all cookies associated with the current domain
    var cookies = document.cookie.split(";");

    // Loop through all cookies and expire them by setting the expiration date in the past
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}
export function generateInitials(input: string): string {
    let str = ""
    if (input.split(" ").length > 0) {
        input.split(" ").forEach(element => {
            str += element[0]
        });
    }
    return str.toUpperCase()
}

export const concatString = (characters, string) => {
    if (string?.length >= characters) {
        return `${string.substring(0, characters)}...`;
    }
    return string
}

export function generateslugs(input: string): string {
    let str = input.split(" ").join("-")
    return str
}

