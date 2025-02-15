import { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Container, CircularProgress } from '@mui/material';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();

  const { getUser } = useAuth();
  useLayoutEffect(() => {
    getUser();
  },[]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const { data } = await axios.get('/api/questions?category=react');
//         setQuestions(data);
//       } catch (error) {
//         alert('Error al cargar preguntas');
//       }
//     };
//     fetchQuestions();
//   }, []);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       handleAnswer(null); // Tiempo agotado
//     }
//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

  const handleAnswer = async (answer: string | null) => {
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) setScore((s) => s + 10);

    try {
      await axios.post('/api/scores', { points: isCorrect ? 10 : 0 });
    } catch (error) {
      console.error('Error al enviar puntaje:', error);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setTimeLeft(10);
    } else {
      router.push('/ranking');
    }
  };

//   if (!questions.length) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4">Pregunta {currentQuestion + 1}</Typography>
      {/* <Typography>{questions[currentQuestion].text}</Typography>
      <Typography>Tiempo restante: {timeLeft} segundos</Typography>
      {questions[currentQuestion].options.map((option, index) => (
        <Button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </Button>
      ))} */}
    </Container>
  );
}