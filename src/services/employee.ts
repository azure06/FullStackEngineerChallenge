import { Employee } from "../types";

const baseURL = "http://localhost:8080";

export const findEmployees = (): Promise<Employee[]> =>
  fetch(`${baseURL}/employees`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });

export const upsertEmployee = (
  employee: Omit<Employee, "pictureURI" | "id"> & {
    id?: string;
    pictureURI?: string;
  }
): Promise<Employee | null> =>
  fetch(`${baseURL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(employee),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return null;
    });

export const removeEmployee = (employeeId: string): Promise<Employee | null> =>
  fetch(`${baseURL}/employees/${employeeId}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return null;
    });

// export const removeEmployee = (employeeId: string): Promise<Employee[]> =>
//   fetch(`${baseURL}/employees`, {
//     method: "GET",
//   })
//     .then((res) => res.json())
//     .catch((error) => {
//       console.log(error);
//       return [];
//     });
