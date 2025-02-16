import axios from "axios";

export default function useQuestions() {
  const backendHost = process.env.BK_HOST || "http://localhost:3000";
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  async function getRandomQuestion(category: string) {
    try {
      const { data } = await axios.get(
        backendHost + "/questions/random?category=" + category,
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function setScore() {
    try {
      await axios.post(backendHost + "/scores", { points: 100 }, { headers });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function setNewQuestion(
    text: string,
    category: string,
    options: string[],
    correctAnswer: number
  ) {
    try {
      await axios.post(
        backendHost + "/questions",
        { text, category: category.toLowerCase(), options, correctAnswer },
        { headers }
      );
      alert("pregunta guardada con éxito");
    } catch (error) {
      console.log(error);
      alert("Error: " + error.response?.data?.message);
      return null;
    }
  }
  return { getRandomQuestion, setScore, setNewQuestion };
}
