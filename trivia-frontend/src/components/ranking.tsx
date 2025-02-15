import useRankings from "@/hooks/useRankigs";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function Ranking() {
  const { ranking } = useRankings();
  return (
    <Container>
      <Typography variant="h4">Ranking en Tiempo Real</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Puntaje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking?.map((rank, index) => (
              <TableRow key={index}>
                {/* {JSON.stringify(rank.user)} */}
                <TableCell>{rank.email}</TableCell>
                <TableCell>{rank.points || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
