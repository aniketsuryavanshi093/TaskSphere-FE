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