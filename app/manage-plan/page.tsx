import React from "react";
import SchematicComponent from "@/components/schematic/SchematicComponent";
import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken";

const ManagePlan = async () => {
  const accessToken = await getTemporaryAccessToken();

  if (!accessToken) {
    throw new Error("No access token found for user!");
  }

  return (
    <div className="container xl:max-w-5xl mx-auto p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-4 my-8">Manage Your Plan</h1>
      <p className="text-gray-600 mb-8">
        Manage your subscription and billing details here
      </p>
      <SchematicComponent accessToken={accessToken} />
    </div>
  );
};

export default ManagePlan;
