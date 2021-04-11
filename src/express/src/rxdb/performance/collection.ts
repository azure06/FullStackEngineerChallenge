import {
  PerformanceCollection,
  PerformanceCollectionMethods,
  PerformanceDoc,
  PerformanceDocMethods,
  schema,
} from "./model";
import { v4 as uuidv4 } from "uuid";

const performanceDocMethods: PerformanceDocMethods = {};

const performanceCollectionsMethods: PerformanceCollectionMethods = {
  async countAllDocuments() {
    const allDocs = await this.find().exec();
    return allDocs.length;
  },
  async upsertPerformance(
    this: PerformanceCollection,
    performance
  ): Promise<PerformanceDoc> {
    return this.atomicUpsert({
      ...performance,
      id: performance.id ?? uuidv4(),
      updatedAt: Date.now(),
      createdAt: performance.createdAt || Date.now(),
    }).then((user) => user.toJSON());
  },
  async findPerformance(
    this: PerformanceCollection,
    by: "revieweeId" | "reviewers",
    employeeIds
  ): Promise<PerformanceDoc[]> {
    return this.find()
      .where(by)
      .in(employeeIds)
      .exec()
      .then((performance) =>
        performance.map((performance) => performance.toJSON())
      );
  },
  async removePerformance(
    this: PerformanceCollection,
    employeeId: string[]
  ): Promise<PerformanceDoc[]> {
    return this.find()
      .where("id")
      .in(employeeId)
      .remove()
      .then((removedUsers) => removedUsers.map((user) => user.toJSON()));
  },
};

export const performance = {
  name: "performance",
  schema,
  methods: performanceDocMethods,
  statics: performanceCollectionsMethods,
};
