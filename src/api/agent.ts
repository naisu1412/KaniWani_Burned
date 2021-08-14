import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_WK_URL;
axios.defaults.headers.Authorization = `Bearer ${process.env.REACT_APP_TOKEN_WK}`;

const responseBody = (response: any) => response.data;
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),
  put: (url: string, body: any) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const wanikani = {
  getSubjects: () => requests.get("/subjects/"),
  getSubject: (id: string) => requests.get(`/subjects/${id}`),
  getAssignments: (subjectType: string, isBurned: boolean) => requests.get(`/assignments?subject_types=${subjectType}&burned=${isBurned}`)
};

const agent = { wanikani };
export default agent;
