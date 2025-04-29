export class AuthApi {
  static createToken({ username, password, headers = { 'Content-Type': 'application/json' } }) {
    const isJson = headers['Content-Type'] === 'application/json';
    let body;

    if (isJson) {
      body = {};
      if (username !== undefined) body.username = username;
      if (password !== undefined) body.password = password;
    } else {
      body = `username=${username}&password=${password}`;
    }

    return cy.request({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/auth',
      headers,
      body,
      failOnStatusCode: false
    });
  }
}
