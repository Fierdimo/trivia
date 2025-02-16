import useCategories from "@/hooks/useCategories";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid2,
  Typography,
} from "@mui/material";
import Question from "./question";
import { useState } from "react";
import useQuestions from "@/hooks/useQuestions";
import NewQuestion from "./newQuestion";

export default function Questions({ admin }: { admin: boolean }) {
  const [question, setQuestion] = useState();
  const { categories, getCategories } = useCategories();
  const [open, setOpen] = useState(false);
  const { getRandomQuestion, setScore } = useQuestions();

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }

  async function updateQuestion(category: string) {
    const newQuestion = await getRandomQuestion(category);
    setQuestion(newQuestion);
  }

  return (
    <Box
      display={"flex"}
      gap={2}
      margin={1}
      padding={1}
      borderRadius={"10px"}
      height={"95%"}
      bgcolor={"cornflowerblue"}
    >
      <Grid2 size={4} sx={{ overflow: "scroll" }} padding={1}>
        <Typography variant="h4" textAlign={"center"}>
          Categorias
        </Typography>
        {admin && (
          <Button
            variant="contained"
            color="warning"
            onClick={openDialog}
            sx={{ marginTop: "1rem" }}
          >
            Agregar pregunta
          </Button>
        )}
        {categories.length == 0 && (
          <Typography>No hay preguntas disponibles</Typography>
        )}
        {categories.map((category) => (
          <Button
            key={category}
            variant="contained"
            color="error"
            fullWidth
            sx={{ marginTop: "1rem" }}
            onClick={() => updateQuestion(category)}
            disabled={question}
          >
            {category}
          </Button>
        ))}
      </Grid2>
      <Grid2
        size={8}
        justifyContent={"center"}
        alignItems={"center"}
        display="flex"
        width={"100%"}
      >
        <Question
          question={question}
          setQuestion={setQuestion}
          setScore={setScore}
        />
      </Grid2>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Nueva pregunta</DialogTitle>
        <NewQuestion closeDialog={closeDialog} getCategories={getCategories} />
      </Dialog>
    </Box>
  );
}
