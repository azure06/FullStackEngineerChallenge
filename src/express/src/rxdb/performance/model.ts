import { RxCollection, RxDocument, RxJsonSchema } from "rxdb";

export interface PerformanceDatabaseCollection {
  performance: PerformanceCollection;
}

export interface PerformanceDoc {
  id: string;
  revieweeId: string;
  reviewers: string[];
  feedbacks: {
    [employeeId: string]: { description: string; value: number };
  };
  updatedAt?: number;
  createdAt?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type PerformanceDocMethods = {};

export type PerformanceCollectionMethods = {
  upsertPerformance(
    this: PerformanceCollection,
    performance: Omit<PerformanceDoc, "id" | "updatedAt" | "createdAt"> & {
      id?: string;
      updatedAt?: number;
      createdAt?: number;
    }
  ): Promise<PerformanceDoc>;
  findPerformance(
    this: PerformanceCollection,
    by: "revieweeId" | "reviewers",
    employeeId: string[]
  ): Promise<PerformanceDoc[]>;
  removePerformance(
    this: PerformanceCollection,
    performanceId: string[]
  ): Promise<PerformanceDoc[]>;
  countAllDocuments(this: PerformanceCollection): Promise<number>;
};

export type PerformanceCollection = RxCollection<
  PerformanceDoc,
  PerformanceDocMethods,
  PerformanceCollectionMethods
>;

export type PerformanceDocument = RxDocument<
  PerformanceDoc,
  PerformanceDocMethods
>;

export const schema: RxJsonSchema<PerformanceDoc> = {
  title: "performance",
  description: "Performance collection",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
      final: true,
    },
    revieweeId: {
      type: "string",
    },
    reviewers: {
      type: "array",
      items: {
        type: "string",
      },
    },
    feedbacks: {
      type: "object",
    },
    updatedAt: {
      type: "number",
    },
    createdAt: {
      type: "number",
    },
  },
  indexes: ["id", "revieweeId", "reviewers.[]"],
  required: [
    "id",
    "revieweeId",
    "reviewers",
    "feedbacks",
    "updatedAt",
    "createdAt",
  ],
};
