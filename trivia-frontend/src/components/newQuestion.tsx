import useQuestions from "@/hooks/useQuestions";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useState } from "react";

type NewQuestion = {
  closeDialog: () => void;
  getCategories: () => void;
};
export default function NewQuestion({
  closeDialog,
  getCategories,
}: NewQuestion) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const { setNewQuestion } = useQuestions();

  function handleOptions(text: string, position: number) {
    const myOptions = [...options];
    myOptions[position] = text;
    setOptions(myOptions);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await setNewQuestion(text, category, options, correctAnswer);
    await getCategories();
    closeDialog();
  }

  return (
    <Box bgcolor={"white"} display={"flex"} padding={"1rem 2rem"}>
      <form onSubmit={submit}>
        <TextField
          label="Pregunta"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="dense"
        />

        {options.map((option, ind) => (
          <Box display="flex" alignItems={"center"} gap={1} key={ind}>
            <TextField
              label={"Respuesta " + ind}
              value={option}
              onChange={(e) => handleOptions(e.target.value, ind)}
              fullWidth
              margin="dense"
            />
            <Checkbox
              onClick={() => setCorrectAnswer(ind)}
              checked={correctAnswer === ind}
            />
          </Box>
        ))}
        <Button type="submit">Guardar</Button>
      </form>
    </Box>
  );
}
