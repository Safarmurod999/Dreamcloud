import { BASE_URL } from "../const/const";
export const postData = async (url, data) => {
  try {
    fetch(`${BASE_URL}${url}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        data),
    });
  } catch (error) {
    console.log(error.message);
  }
};