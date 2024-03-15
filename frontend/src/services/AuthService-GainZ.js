export function doLogin(email, password) {
  return new Promise((response, reject) => {
    if (email === "brunnobenites@gmail.com" && password === "badweiser05") {
      response(true);
    }
    reject(`Usuário e/ou senha inválidos!`);
  });
}

export function doLogout() {}
