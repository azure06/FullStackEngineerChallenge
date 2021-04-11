import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Employee } from "../types";
import {
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@material-ui/core";

type EmployeeUpsert = Omit<Employee, "pictureURI" | "id"> & { id?: string };

interface Props {
  open: boolean;
  profile: EmployeeUpsert;
  reviewer: Employee | null;
  employees: Employee[];
  setOpen: (value: boolean) => any;
  setProfile: (value: EmployeeUpsert) => any;
  setReviewer: (value: Employee | null) => any;
  submit: (profile: EmployeeUpsert, reviewer: Employee | null) => any;
}

export default function ProfileDialog(props: Props) {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="firstname"
            label="First Name"
            type="text"
            fullWidth
            value={props.profile.firstName}
            onChange={(event) =>
              props.setProfile({
                ...props.profile,
                firstName: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastname"
            label="Last Name"
            type="text"
            fullWidth
            value={props.profile.lastName}
            onChange={(event) =>
              props.setProfile({
                ...props.profile,
                lastName: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={props.profile.email}
            onChange={(event) =>
              props.setProfile({
                ...props.profile,
                email: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="birthday"
            label="Birthday"
            type="text"
            fullWidth
            value={props.profile.birthday}
            onChange={(event) =>
              props.setProfile({
                ...props.profile,
                birthday: event.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={props.profile.description}
            onChange={(event) =>
              props.setProfile({
                ...props.profile,
                description: event.target.value,
              })
            }
          />
          <Typography variant="body2" style={{ marginTop: 20 }}>
            Reviewer{" "}
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={props.reviewer?.id || ""}
            onChange={(e) => {
              const emp = props.employees.find(
                (emp) => emp.id === e.target.value
              );
              props.setReviewer(emp || null);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {props.employees.map((emp) => (
              <MenuItem
                value={emp.id}
                key={emp.id}
              >{`${emp.firstName} ${emp.lastName} `}</MenuItem>
            ))}
          </Select>
          <RadioGroup
            style={{ marginTop: 20 }}
            aria-label="role"
            name="role"
            value={props.profile.role}
            onChange={(event) =>
              props.setProfile({
                ...props.profile,
                role: event.target.value as "admin" | "employee",
              })
            }
          >
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label="Employee"
            />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => props.submit(props.profile, props.reviewer)}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
