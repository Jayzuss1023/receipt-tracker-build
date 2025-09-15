"use client";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";
import {
  EmbedProvider,
  SchematicEmbed,
} from "@schematichq/schematic-components";

function SchematicComponent({ accessToken }: { accessToken?: string }) {
  const componentId =
    process.env.NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID;

  return (
    <EmbedProvider>
      <SchematicEmbed accessToken={accessToken} id={componentId} />;
    </EmbedProvider>
  );
}

export default SchematicComponent;
