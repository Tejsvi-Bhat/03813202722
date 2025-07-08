// src/utils/logger.js
import axios from 'axios';

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0ZWpzdmliaGF0QGdtYWlsLmNvbSIsImV4cCI6MTc1MTk1MzA2NSwiaWF0IjoxNzUxOTUyMTY1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYTU2ODMwOTQtN2E3OS00YThkLTkyOTctNTJhZjA2NzJlMjY4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidGVqc3ZpIGJoYXQiLCJzdWIiOiI5ZWRlODQzMi1lNTcxLTQyODktOGI4Yi1hYmM2YzQxZTFjYWEifSwiZW1haWwiOiJ0ZWpzdmliaGF0QGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZWpzdmkgYmhhdCIsInJvbGxObyI6IjAzODEzMjAyNzIyIiwiYWNjZXNzQ29kZSI6IlZQcHNtVCIsImNsaWVudElEIjoiOWVkZTg0MzItZTU3MS00Mjg5LThiOGItYWJjNmM0MWUxY2FhIiwiY2xpZW50U2VjcmV0IjoieUVaVnJ6cWZNU0JWWFduZyJ9.e5iHJdDRWReJXky1U5qnevZECD40-L7WLF9KdXsKN_0";


const LOGGING_URL = "http://20.244.56.144/evaluation-service/logs";

/**
 * @param {string} stack - "frontend"
 * @param {string} level - one of: "debug", "info", "warn", "error", "fatal"
 * @param {string} logPackage - one of the allowed packages (e.g., "page", "api", "component")
 * @param {string} message - description of what's happening
 */
export const logEvent = async (stack, level, logPackage, message) => {
  try {
    const response = await axios.post(
      LOGGING_URL,
      {
        stack,
        level,
        package: logPackage,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(" Log created:", response.data.message);
  } catch (error) {
    console.error(" Failed to send log:", error?.response?.data || error.message);
  }
};
