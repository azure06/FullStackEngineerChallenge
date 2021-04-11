import express from "express";
import { concatMap, concatMapTo, tap } from "rxjs/operators";
import {
  employeeCollection as empCollection,
  performanceCollection,
} from "./rxdb";
import cors from "cors";
import { PerformanceDoc } from "./rxdb/performance/model";

const port = 8080;
export const app = express();
app.use(cors());
app.use(express.json());

const getPictureURI = () => {
  switch (Math.round(Math.random() * 10)) {
    case 0:
      return "https://images.unsplash.com/photo-1595501894686-4e258c802d66?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";
    case 1:
      return "https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1649&q=80";
    case 2:
      return "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
    case 3:
      return "https://images.unsplash.com/photo-1551434678-e076c223a692?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
    case 4:
      return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80";
    case 5:
      return "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80";
    case 6:
      return "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80";
    case 7:
      return "https://images.unsplash.com/photo-1437623889155-075d40e2e59f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";
    case 8:
      return "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80";
    case 9:
      return "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80";
    default:
      return "https://images.unsplash.com/photo-1489779162738-f81aed9b0a25?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1682&q=80";
  }
};

const employees = [
  {
    id: "c778639d-d2bf-484d-acfa-3f4f60cffc03",
    email: "alex@gmail.com",
    firstName: "Alex",
    lastName: "Magno",
    birthday: "1999/01/01",
    role: "admin" as const,
    description:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    pictureURI: getPictureURI(),
  },
  {
    id: "3a3ca27d-cf4c-4550-812f-f9a6942af117",
    email: "adam@gmail.com",
    firstName: "Adam",
    lastName: "Zapel",
    birthday: "2005/01/03",
    role: "admin" as const,
    description:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    pictureURI: getPictureURI(),
  },
  {
    id: "a51e6f53-038a-44ee-86b6-5a38edbea356",
    email: "oscar@gmail.com",
    firstName: "Oscar",
    lastName: "Ferrero",
    birthday: "2001/11/05",
    role: "employee" as const,
    description:
      "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
    pictureURI: getPictureURI(),
  },
];

const performaces: PerformanceDoc[] = [
  {
    id: "c778639d-d2bf-484d-acfa-3f4f60cffc03",
    revieweeId: "c778639d-d2bf-484d-acfa-3f4f60cffc03",
    reviewers: ["3a3ca27d-cf4c-4550-812f-f9a6942af117"],
    feedbacks: {
      "c778639d-d2bf-484d-acfa-3f4f60cffc03": {
        description:
          "Attendance and reliability are important factors in evaluating individual performance because consistent attendance and punctuality are requirements at most workplaces. While considering your employee’s attendance and punctuality performance, you may write down these sample phrases",
        value: 100,
      },
      "3a3ca27d-cf4c-4550-812f-f9a6942af117": {
        description:
          "It is essential that employees remain productive during work hours to contribute to the goals of the company while producing high-quality work. Productivity is also a good indicator of an employee’s engagement. Here are some phrases that you may consider when you give a performance review",
        value: 70,
      },
    },
  },
  {
    id: "3a3ca27d-cf4c-4550-812f-f9a6942af117",
    revieweeId: "3a3ca27d-cf4c-4550-812f-f9a6942af117",
    reviewers: ["a51e6f53-038a-44ee-86b6-5a38edbea356"],
    feedbacks: {
      "3a3ca27d-cf4c-4550-812f-f9a6942af117": {
        description:
          "Providing effective feedback on performance reviews includes mentioning employee achievements. Here are some phrases that may help you recognize your employee’s achievements as during their performance reviews:",
        value: 90,
      },
      "a51e6f53-038a-44ee-86b6-5a38edbea356": {
        description:
          "Coaching is the process of assisting employees in improving performance that focuses on closing the gap from where one is to where they want to be. Employees should be coachable so that they can perform at an appropriate level for their job role. Here are phrases that assess coaching and training ability:",
        value: 40,
      },
    },
  },
  {
    id: "a51e6f53-038a-44ee-86b6-5a38edbea356",
    revieweeId: "a51e6f53-038a-44ee-86b6-5a38edbea356",
    reviewers: ["c778639d-d2bf-484d-acfa-3f4f60cffc03"],
    feedbacks: {
      "a51e6f53-038a-44ee-86b6-5a38edbea356": {
        description:
          "Each employee will likely have a few areas that they can improve in. It is important to give them specific feedback on areas they may struggle in. This way they can develop a plan to improve their performance. These phrases identify common areas of improvement:",
        value: 50,
      },
      "c778639d-d2bf-484d-acfa-3f4f60cffc03": {
        description:
          "Good interpersonal skills combine multiple skills that are often prerequisites for many jobs. Here are some effective phrases tо assist you when you give a performance review оn interpersonal skills",
        value: 100,
      },
    },
  },
];

// On Start pre-fill the database with some sample data
empCollection
  .pipe(
    concatMap(async (coll) =>
      Promise.all(employees.map((emp) => coll.upsertEmployee(emp)))
    ),
    tap((employees) => console.log("Added new employees: ", employees)),
    concatMapTo(performanceCollection),
    concatMap((coll) =>
      Promise.all(performaces.map((per) => coll.upsertPerformance(per)))
    ),
    tap((perf) => console.log("Added new performances: ", perf))
  )
  .toPromise();

// Get All Employees
app.get("/employees", (req, res) => {
  return empCollection
    .pipe(concatMap((coll) => coll.findEmployees()))
    .pipe(tap((employees) => res.json(employees)))
    .toPromise();
});

// Get performance reviews by employeeId or reviewerId
app.get("/performance/:uid", (req, res) => {
  return performanceCollection
    .pipe(tap((_) => console.info(req.query.by, req.params.uid)))
    .pipe(
      concatMap((coll) =>
        coll.findPerformance((req.query.by as any) ?? "revieweeId", [
          req.params.uid,
        ])
      )
    )
    .pipe(tap((employees) => res.json(employees)))
    .pipe(tap((emp) => console.info(emp)))
    .toPromise();
});

// Add new Employee
app.post("/employees", (req, res) => {
  return empCollection
    .pipe(
      concatMap((coll) =>
        coll.upsertEmployee({
          ...req.body,
          pictureURI: req.body.pictureURI || getPictureURI(),
        })
      )
    )
    .pipe(tap((emp) => res.json(emp)))
    .toPromise();
});

// Add new performance
app.post("/performance", (req, res) => {
  return performanceCollection
    .pipe(
      tap((_) => console.info("New performance sheet", req.body)),
      concatMap((coll) =>
        coll.upsertPerformance({
          feedbacks: [],
          reviewers: [],
          ...req.body,
        })
      )
    )
    .pipe(tap((emp) => res.json(emp)))
    .toPromise();
});

// Delete employee by id
app.delete("/employees/:uid", (req, res) => {
  return empCollection
    .pipe(concatMap((coll) => coll.removeEmployee([req.params.uid])))
    .pipe(tap((emp) => res.json(emp)))
    .toPromise();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
