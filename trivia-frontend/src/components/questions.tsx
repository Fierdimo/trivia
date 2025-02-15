import useCategories from "@/hooks/useCategories";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Tooltip,
  Typography,
} from "@mui/material";
import Question from "./question";
import { useState } from "react";
import useQuestions from "@/hooks/useQuestions";
import NewQuestion from "./newQuestion";

export default function Questions({ admin }) {
  const [question, setQuestion] = useState();
  const { categories } = useCategories();
  const [open, setOpen] = useState(false);
  const { getRandomQuestion, setScore } = useQuestions();

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }

  async function updateQuestion(category) {
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
      height={"100%"}
      flexGrow={1}
      bgcolor={"cornflowerblue"}
    >
      <Box>
        <Typography textAlign={"center"}>Categorias</Typography>
        {admin && <Button onClick={openDialog}>Agregar pregunta</Button>}
        {categories.length == 0 && (
          <Typography>No hay preguntas disponibles</Typography>
        )}
        {categories.map((category) => (
          <Tooltip title={"Dame una pregunta de " + category} key={category}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ marginTop: "1rem" }}
              onClick={() => updateQuestion(category)}
            >
              {category}
            </Button>
          </Tooltip>
        ))}
      </Box>
      <Box
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
      </Box>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Nueva pregunta</DialogTitle>
        <NewQuestion closeDialog={closeDialog} />
      </Dialog>
    </Box>
  );
}
