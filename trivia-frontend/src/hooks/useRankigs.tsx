import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useConnection from "./useConnection";

export type RankingProps = {
  email: string;
  points: number;
};
export default function useRankings() {
  const [ranking, setRanking] = useState<RankingProps[]>([]);
  const { ADDRESS, getData } = useConnection();

  const backendHost = process.env.BK_HOST || ADDRESS.default_backend;
  const socket = io(backendHost);

  async function getGlobalRankings() {
    const data = await getData(ADDRESS.globalRanking);
    setRanking(data);
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
