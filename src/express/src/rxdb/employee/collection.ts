import {
  EmployeeCollection,
  EmployeeCollectionMethods,
  EmployeeDoc,
  EmployeeDocMethods,
  schema,
} from "./model";
import { v4 as uuidv4 } from "uuid";

const employeeDocMethods: EmployeeDocMethods = {};

const employeeCollectionsMethods: EmployeeCollectionMethods = {
  async countAllDocuments() {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
  async upsertEmployee(
    this: EmployeeCollection,
    employee
  ): Promise<EmployeeDoc> {
    return this.atomicUpsert({
      ...employee,
      id: employee.id ?? uuidv4(),
      updatedAt: Date.now(),
      createdAt: employee.createdAt || Date.now(),
    }).then((user) => user.toJSON());
  },
  async findEmployees(this: EmployeeCollection): Promise<EmployeeDoc[]> {
    return this.find()
      .exec()
      .then((users) => users.map((user) => user.toJSON()));
  },
  async removeEmployee(
    this: EmployeeCollection,
    employeeId: string[]
  ): Promise<EmployeeDoc[]> {
    return this.find()
      .where("id")
      .in(employeeId)
      .remove()
      .then((removedUsers) => removedUsers.map((user) => user.toJSON()));
  },
};

export const employee = {
  name: "employee",
  schema,
  methods: employeeDocMethods,
  statics: employeeCollectionsMethods,
};
