import { useEffect, useState } from "react";
import { BASE_URL } from "../data/data";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callback, setCallback] = useState(false);
  const [error, setError] = useState(null);
  const recall = () => {
    setCallback(!callback);
  };
  const getData = async () => {
    fetch(`${BASE_URL}${url}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, [url, callback]);
  return { data, loading, recall };
};

export default useFetch;
