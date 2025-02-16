import { Grid2, Typography } from "@mui/material";
import LoginBox from "@/components/loginBox";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <Grid2 container>
      <Head ><title>Trivia - login</title></Head>
      <Grid2
        size={{ md: 6 }}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="gradientBg"
      >
        <Image
          alt=""
          height={200}
          width={200}
          className="heartbeat"
          src={"/question.png"}
        />
        <Typography fontSize={'10rem'} color="#fafafa" className="tracking-in-expand ">
          Trivia
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }} className="centeredBox">
        <LoginBox />
      </Grid2>
    </Grid2>
  );
}
