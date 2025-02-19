import axios, { AxiosError } from "axios";

type LoginData = {
  email: string;
  password: string;
};
type ScoreData = {
  points: number;
};
type QuestionData = {
  text: string;
  category: string;
  options: string[];
  correctAnswer: number;
};
type SendData = LoginData | ScoreData | QuestionData;
export default function useConnection() {
  enum ADDRESS {
    default_backend = "http://localhost:3000/",
    randomQuestion = "/questions/random?category=",
    scores = "/scores/",
    questions = "/questions/",
    categories = "/questions/categories/",
    login = "/auth/login/",
    register = "/auth/register/",
    users = "/users/",
    globalRanking = "/scores/globalRanking",
  }

  axios.defaults.baseURL = process.env.BK_HOST || ADDRESS.default_backend;

  async function getData(address: string) {
    try {
      console.log(axios.defaults.headers);
      const { data } = await axios.get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function postData(address: string, sendData: SendData) {
    try {
      const { data } = await axios.post(address, sendData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      return { data };
    } catch (error) {
      console.log(error);
      const myError = error as AxiosError;
      //   const data = myError.response?.data as { message: string };
      //   const message = data?.message;
      //   alert("Error: " + message);
      switch (myError?.status) {
        case 401:
          alert("Tu sesion ha vencido, reloguea inmediatamente");
          break;
        case 403:
          alert("credenciales inválidas");
          break;
        default:
          alert("Error al enviar datos");
      }

      return { data: null };
    }
  }

  return { ADDRESS, getData, postData };
}
