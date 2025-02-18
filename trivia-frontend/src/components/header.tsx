import { Box, Button, Typography } from "@mui/material";
import { User } from "@/types/user";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
type HeaderProps = {
  user: User;
  logout: ()=> void
};
export default function Header({ user, logout }: HeaderProps) {
  return (
    <Box
      flexDirection={"row"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={"cornflowerblue"}
      padding={1}
      margin={1}
      borderRadius={"10px"}
    >
      <Box display={"flex"} gap={1}>
        <AccountCircleIcon sx={{ fontSize: "3rem", color: "white" }} />
        <Box
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"start"}
          display={"flex"}
        >
          <Typography sx={{ fontWeight: "bold" }}>{user?.email}</Typography>
          <Typography sx={{ fontStyle: "oblique" }}>[{user?.role}]</Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Button onClick={logout}>
          <PowerSettingsNewIcon sx={{ color: "whitesmoke" }} />
        </Button>
        <Typography sx={{ fontSize: "11px", color: "whitesmoke" }}>
          logout
        </Typography>
      </Box>
    </Box>
  );
}
