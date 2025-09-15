"use client";

import {
  EmbedProvider,
  SchematicEmbed as SchematicEmbedComponent,
} from "@schematichq/schematic-components";

function SchematicEmbed({
  accessToken,
  //   id = componentId
  id,
}: {
  accessToken: string;
  //   id=componentId
  id: string;
}) {
  return <SchematicEmbedComponent accessToken={accessToken} id={id} />;
}

export default SchematicEmbed;
