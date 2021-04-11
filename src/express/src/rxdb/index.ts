import {
  addRxPlugin,
  createRxDatabase,

  /* ... */
} from "rxdb";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { employee } from "./employee/collection";
import { performance } from "./performance/collection";
import { EmployeeDatabaseCollection } from "./employee/model";
import { PerformanceDatabaseCollection } from "./performance/model";

addRxPlugin(require("pouchdb-adapter-leveldb")); // leveldown adapters need the leveldb plugin to work
const leveldown = require("leveldown");

const db = (async () => {
  const db = await createRxDatabase<
    EmployeeDatabaseCollection & PerformanceDatabaseCollection
  >({
    name: "performance", // <- name
    adapter: leveldown, // <- storage-adapter
    multiInstance: true, // <- multiInstance (optional, default: true)
    eventReduce: false, // <- eventReduce (optional, default: true)
  });

  await db.addCollections({
    employee,
    performance,
  });

  return db;
})();

export const employeeCollection = from(db).pipe(map((db) => db.employee));

export const performanceCollection = from(db).pipe(map((db) => db.performance));
