# Getting Started

If you it's your first time run this project, run the following command from the route directory to install the dependencies

```sh
npm run prestart
```

It will perform `npm install` in the route directory and in `./src/express` .

Once the installation is done make sure that the ports `3000` and `8080` and available and start the development servers with

```sh
npm run dev
```

The app should now run on `http://localhost:3000` (It might take a while to start the servers)

## High level description of design and technologies used

### Frontend

- React (Typescript)
- React Material (UI Framework)

### Backend

- Express (Typescript)
- RxDB (DB Interface)
- RxJS (Library for Reactive Programming)
- leveldown (C++ Database)

### Assumptions and Highlevel Description

- When the app starts it will automatically fill few samples in the Database, thanks to this
  the user will be able to "sign-in" from the main page of the app by choosing between 2 different kinds of users: "Admin" and "Employee"

- The sign-in step doesn't require any kind of real authentication for sake of simplicity

- Employees will be able to see the Home page and the Performance page, meanwhile Admins will have access also to the Employees page.

- What you can do with this app is:

  - Add new Employees
  - Edit the Employees profile
  - Remove employees
  - Add Reviewer to each employee
  - Access to the performance review page

- What you can't do:
  - Modify your performance review (Can be done only via the test utility)
  - Write feedback to other employees (Can be done only via the test utility)

### Database structure

Because RxDB is document based, we fundamentally have 2 main collections:

- Employee
- Performance Review

Each document will be one of the belows:

```ts
export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  description: string;
  pictureURI: string;
  role: "admin" | "employee";
}

export interface Performance {
  id: string;
  revieweeId: string; // employeeId
  reviewers: string[]; // employeeIds
  feedbacks: {
    [employeeId: string]: { description: string; value: number };
  };
  updatedAt?: number;
  createdAt?: number;
}
```

# How to run the API tests

Make sure that the application is running in localhost. If not type the following command from the console:

```sh
npm run dev
```

and then

```sh
npm run test
```
