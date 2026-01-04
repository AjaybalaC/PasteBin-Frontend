import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const createPaste = (data) =>
  API.post("/api/pastes", data);

export const getPaste = (id) =>
  API.get(`/api/pastes/${id}`);
