import { wedding as defaultWedding } from "./wedding.js";

const STORAGE_KEY = "undangan-digital:wedding:v1";

export function loadWedding() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultWedding;
  } catch {
    return defaultWedding;
  }
}

export function saveWedding(data) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetWedding() {
  window.localStorage.removeItem(STORAGE_KEY);
}
