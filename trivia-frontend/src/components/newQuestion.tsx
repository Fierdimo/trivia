import { Box, TextField } from "@mui/material";
import { useState } from "react";

export default function NewQuestion() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [answ, setAnsw] = useState(["", "", "", ""]);

  function handleAnsw(text, position) {
    answ[position] = text;
    setAnsw(answ);
  }
  function submit() {}
  return (
    <Box bgcolor={"white"} display={"flex"} padding={2}>
      <form onSubmit={submit}>
        <TextField
          label="Texto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        />

        {answ.map((ans, ind) => (
          <TextField
            key={ind}
            label={"Respuesta " + ind}
            value={ans[ind]}
            onChange={(e) => handleAnsw(e.target.value, ind)}
            fullWidth
            margin="normal"
          />
        ))}
      </form>
    </Box>
  );
}
