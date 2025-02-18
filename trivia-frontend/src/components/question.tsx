import { Box, Button, CircularProgress, Grow, Typography } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QuestionType } from "@/types/question";

type QuestionProps = {
  setScore: () => Promise<null | undefined>
  setQuestion: Dispatch<SetStateAction<QuestionType|undefined>>,
  question: QuestionType|undefined
}

export default function Question({ question, setQuestion, setScore }:QuestionProps) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (question) setTimeLeft(10);
  }, [question]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setQuestion(undefined);
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
    <Grow in>
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
                setQuestion(undefined);
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      </Box>
    </Grow>
  );
}
