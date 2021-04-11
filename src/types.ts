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
  revieweeId: string;
  reviewers: string[];
  feedbacks: {
    [employeeId: string]: { description: string; value: number };
  };
  updatedAt?: number;
  createdAt?: number;
}
