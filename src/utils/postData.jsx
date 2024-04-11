import { BASE_URL } from "../data/data";
export const getData = async (url) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const postData = async (url, data) => {
  try {
    await fetch(`${BASE_URL}${url}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const postProduct = async (url, data) => {
  try {
    await fetch(`${BASE_URL}${url}`, {
      method: "post",
      body: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateProduct = async (url, data, id, token) => {
  try {
    await fetch(`${BASE_URL}${url}/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }).then(() => {
      console.log(data, id, token);
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteData = async (url, data) => {
  try {
    await fetch(`${BASE_URL}${url}/${data}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateData = async (url, data, id, token) => {
  try {
    await fetch(`${BASE_URL}${url}/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then(() => {
      console.log(data, id, token);
    });
  } catch (error) {
    console.log(error.message);
  }
};
