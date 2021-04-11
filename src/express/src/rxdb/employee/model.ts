import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";

export interface EmployeeDatabaseCollection {
  employee: EmployeeCollection;
}

export interface EmployeeDoc {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  description: string;
  pictureURI: string;
  role: "admin" | "employee";
  updatedAt?: number;
  createdAt?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmployeeDocMethods = {};

export type EmployeeCollectionMethods = {
  upsertEmployee(
    this: EmployeeCollection,
    employee: Omit<EmployeeDoc, "id" | "updatedAt" | "createdAt"> & {
      id?: string;
      updatedAt?: number;
      createdAt?: number;
    }
  ): Promise<EmployeeDoc>;
  findEmployees(this: EmployeeCollection): Promise<EmployeeDoc[]>;
  removeEmployee(
    this: EmployeeCollection,
    employeeId: string[]
  ): Promise<EmployeeDoc[]>;
  countAllDocuments(this: EmployeeCollection): Promise<number>;
};

export type EmployeeCollection = RxCollection<
  EmployeeDoc,
  EmployeeDocMethods,
  EmployeeCollectionMethods
>;

export type EmployeeDocument = RxDocument<EmployeeDoc, EmployeeDocMethods>;

export const schema: RxJsonSchema<EmployeeDoc> = {
  title: "employee",
  description: "Employee collection",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
      final: true,
    },
    email: {
      type: "string",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    birthday: {
      type: "string",
    },
    description: {
      type: "string",
    },
    pictureURI: {
      type: "string",
    },
    role: {
      type: "string",
    },
    updatedAt: {
      type: "number",
    },
    createdAt: {
      type: "number",
    },
  },
  indexes: ["id", "email", "birthday", "role", "updatedAt", "createdAt"],
  required: [
    "id",
    "email",
    "firstName",
    "lastName",
    "description",
    "birthday",
    "pictureURI",
    "role",
    "updatedAt",
    "createdAt",
  ],
};
