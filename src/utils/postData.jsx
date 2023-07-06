import { BASE_URL } from "../const/const";
export const postData = async (url, data) => {
    try {
      fetch(`${BASE_URL}api/${url}`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(`${BASE_URL}${url}`);
    } catch (error) {
      console.log(error.message);
    }
  };