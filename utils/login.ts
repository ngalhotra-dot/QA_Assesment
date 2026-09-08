import { expect, request } from "@playwright/test";


//let apiURL;

// hardcoding the url
let apiURL = "https://api.oemsalesaftersalesorg--scaletest.sandbox.my.salesforce.com/";

// using env variables directly
//apiURL = process.env.API_URL;

// using a dedicated class to access variables
//apiURL = StaticVariables.staticApiURL;

export async function getLoginToken(email: string, password: string) {
  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(apiURL + "/users/login", {
    data: {
      email: email,
      password: password,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  return body.access_token;
}
