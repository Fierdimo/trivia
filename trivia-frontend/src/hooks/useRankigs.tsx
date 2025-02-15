import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export type RankingProps = {
  email: string;
  points: number;
};
export default function useRankings() {
  const [ranking, setRanking] = useState<RankingProps[]>([]);

  const backendHost = process.env.BK_HOST || "http://localhost:3000";
  const socket = io(backendHost);

  async function getGlobalRankings() {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(backendHost + "/scores/globalRanking", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setRanking(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    socket.connect();
    socket.on("rankingUpdated", (data) => {
      setRanking(data);
    });

    getGlobalRankings();

    return () => {
      socket.disconnect();
    };
  }, []);

  return { ranking };
}
