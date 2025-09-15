"use server";

// Initialize Schematic SDK
import { SchematicClient } from "@schematichq/schematic-typescript-node";

import { currentUser } from "@clerk/nextjs/server";
const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

// Get temporary access token
export async function getTemporaryAccessToken() {
  console.log("getting temporary access token");
  const user = await currentUser();

  if (!user) {
    console.log("No user found. Returning null");
    return null;
  }

  console.log(`Issuing token for user: ${user.id}`);
  const resp = await client.accesstokens.issueTemporaryAccessToken({
    resource_type: "company",
    lookup: { id: user.id }, // The lookup will vary depending on how you have configured your company keys
  });

  console.log(
    "Token response recieved:",
    resp.data ? "Token Recieved" : "No token in response",
  );

  const accessToken = resp.data?.token;

  return accessToken;
}
