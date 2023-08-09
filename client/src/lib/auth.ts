import { WebAuth } from "auth0-js";

class Auth {
  auth0: WebAuth;
  expiresAt = 0;

  constructor() {
    this.auth0 = new WebAuth({
      domain: "dev-yxr6bsjav225w5py.us.auth0.com",
      clientID: "iZZ0PEjfyHnWWufxQ9qg0a4FTyK7HmCy",
      redirectUri: "http://localhost:8081/callback",
      audience: "https://dev-yxr6bsjav225w5py.us.auth0.com/api/v2/",
      responseType: "token id_token",
      scope: "openid profile email",
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    localStorage.setItem('zucchini-redirectUrl', window.location.pathname);
    this.auth0.authorize();
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise<void>((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
      });
    });
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    console.log(this.idToken);
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout() {
    this.auth0.logout({
      returnTo: "http://localhost:8081",
      clientID: "iZZ0PEjfyHnWWufxQ9qg0a4FTyK7HmCy",
    });
  }

  silentAuth() {
    return new Promise<void>((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}

export const auth = new Auth();
