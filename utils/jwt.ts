/* eslint-disable @typescript-eslint/no-explicit-any */
function toggleLocalStorage(token: any) {
  if (typeof localStorage !== "undefined") {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }
}

export { toggleLocalStorage };
