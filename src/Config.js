export const https = "http://127.0.0.1:8000";

export const img_url = (endpoint) => {
  return `${https}/storage/${endpoint}`;
};