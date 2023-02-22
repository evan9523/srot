import React from "react";
import { Box, Typography, Stack } from "@pankod/refine-mui";
import { AgentCardProp, InfoBarProps } from "interfaces/agent";
import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { useGetIdentity } from "@pankod/refine-core";
import { Link } from "@pankod/refine-react-router-v6";

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

const AgentCard = (props: AgentCardProp) => {
  const { id, name, email, noOfProperties, avatar } = props;

  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    if (currentUser.email === email) return "/my-profile";
    return `/agents/show/${id}`;
  };

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176, 176, 176,0.1)",
        },
      }}
    >
      <img
        src={avatar}
        width={90}
        alt={name}
        height={90}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />
      <Stack
        direction="column"
        justifyContent="space-between"
        flex={1}
        gap={{ xs: 4, sm: 2 }}
      >
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography fontSize={20} fontWeight={600} color="#11142d">
            {name}
          </Typography>
          <Typography fontSize={12} color="#808191 ">
            Real Estate Agent
          </Typography>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: "#808191" }} />}
            name={email}
          />
          <InfoBar
            icon={<Phone sx={{ color: "#808191" }} />}
            name="6291891639"
          />
          <InfoBar icon={<Place sx={{ color: "#808191" }} />} name="India" />
          <InfoBar
            icon={<LocationCity sx={{ color: "#808191" }} />}
            name={`${noOfProperties} Properties`}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;
