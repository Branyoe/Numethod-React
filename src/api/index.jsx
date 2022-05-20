export default async function ApiCall({
  url,
  method = "get",
  body,
  headers
}) {
  try {
    const response = await fetch(
      url,
      {
        method,
        body: JSON.stringify(body),
        headers
      }
    )
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}