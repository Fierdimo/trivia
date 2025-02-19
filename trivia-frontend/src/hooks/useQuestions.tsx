import useConnection from "./useConnection";

export default function useQuestions() {


  const { ADDRESS, getData, postData } = useConnection();

  async function getRandomQuestion(category: string) {
    return await getData(ADDRESS.randomQuestion + category);
  }

  async function setScore() {
    await postData(ADDRESS.scores, { points: 100 });
  }

  async function setNewQuestion(
    text: string,
    category: string,
    options: string[],
    correctAnswer: number
  ) {
    const { data: isSave } = await postData(ADDRESS.questions, {
      text,
      category: category.toLowerCase(),
      options,
      correctAnswer,
    });
    if (isSave) alert("pregunta guardada con éxito");
  }
  return { getRandomQuestion, setScore, setNewQuestion };
}
