import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest({ url, config }) {
  console.log("📡 Sending request to:", url);
  console.log("🛠 Config:", config);

  const response = await fetch(url, config);
  console.log("📥 Raw response:", response);

  const resData = await response.json().catch((err) => {
    console.error("❌ Failed to parse JSON", err);
    throw new Error("Invalid JSON response");
  });

  if (!response.ok) {
    console.error("❌ Server Error Response:", resData);
    throw new Error(resData.message || "Something went wrong, failed to send request");
  }

  return resData;
}


export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(dataToSend) {
      setIsLoading(true);
      setError(null);

      try {
        const fullConfig = {
          ...config,
          ...(dataToSend && { body: dataToSend }),
        };
        const responseData = await sendHttpRequest({ url, config: fullConfig });
        setData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }

      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
