export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.mydd.crabdance.com"
    : "http://localhost:3001";
