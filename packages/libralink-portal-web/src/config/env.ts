// @ts-ignore
import { makeGetDynamicVariables } from "libralink-portal-shared/lib/dynamic-variables";

/**
 * Typesafe way of reading env variables.
 * If some variable is missing, then the app wouldn't start
 */

const getEnvVariables = makeGetDynamicVariables({
  dictionary: process.env,
  debugName: "Environment variables",
  prefix: "REACT_APP_",
  defaults: {},
});

export const { clientId } = getEnvVariables({
  CLIENT_ID: "clientId",
});
