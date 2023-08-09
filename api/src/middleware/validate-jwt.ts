import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

dotenv.config();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

async function getKey(header, callback) {
  const key = await client.getSigningKey(header.kid);
  const signingKey = key.getPublicKey();
  callback(null, signingKey);
}

export async function isTokenValid(token) {
  if (token) {
    const bearerToken = token.split(" ");

    console.log('process.env.API_IDENTIFIER', process.env.API_IDENTIFIER)

    const result = new Promise((resolve, reject) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          audience: process.env.API_IDENTIFIER,
          issuer: `https://${process.env.AUTH0_DOMAIN}/`,
          algorithms: ["RS256"],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ decoded });
          }
        }
      );
    });

    return result;
  }

  return { error: "No token provided" };
}
