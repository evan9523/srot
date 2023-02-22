import React from "react";
import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import { Profile } from "components";
import { ProfileProps } from "interfaces/common";
import { Typography } from "@pankod/refine-mui";

const AgentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });
  const myProfile = data?.data ?? [];

  console.log("Profile", data);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error....</Typography>;
  }
  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;
