import { Performance } from "../types";

const baseURL = "http://localhost:8080";

export const findPerformance = (
  employeeId: string,
  by: "revieweeId" | "reviewers"
): Promise<Performance[]> =>
  fetch(`${baseURL}/performance/${employeeId}?by=${by}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });

export const upsertPerformance = (
  performance: Omit<Performance, "id"> & {
    id?: string;
  }
): Promise<Performance | null> =>
  fetch(`${baseURL}/performance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(performance),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return null;
    });

export const removePerformance = (
  performanceId: string
): Promise<Performance | null> =>
  fetch(`${baseURL}/performance/${performanceId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return null;
    });
