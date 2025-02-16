import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Question({ question, setQuestion, setScore }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (question) setTimeLeft(10);
  }, [question]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setQuestion(null);
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!question)
    return (
      <Box
        justifyContent={"center"}
        alignItems={"end"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Image
          alt="Selecciona una categoria"
          src={"/thinking.png"}
          height={200}
          width={150}
        />
        <Typography>
          Selecciona una categoria para obtener una pregunta
        </Typography>
      </Box>
    );
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display="flex"
      flexDirection={"column"}
      bgcolor={"whitesmoke"}
      width={"100%"}
      height={"50%"}
      borderRadius={"15px"}
      padding={3}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" value={timeLeft * 10} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>{timeLeft}</Typography>
        </Box>
      </Box>
      <Box display={"flex"}>
        <Typography>{question.text}</Typography>
      </Box>
      <Box width={"100%"}>
        {question?.options?.map((option, inx) => (
          <Button
            key={inx}
            sx={{ marginTop: "1rem" }}
            fullWidth
            variant="outlined"
            onClick={() => {
              if (question.correctAnswer == inx) {
                setScore();
                alert("Correcto!");
              } else alert("Respuesta incorrecta");
              setQuestion();
            }}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
