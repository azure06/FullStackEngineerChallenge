import React, { useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Add, MoreVert } from "@material-ui/icons";
import ProfileDialog from "./ProfileDialog";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Employee } from "../types";
import {
  upsertEmployee,
  findEmployees,
  removeEmployee,
} from "../services/employee";
import { findPerformance, upsertPerformance } from "../services/performance";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 320,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    container: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
    },
  })
);

export default function Employees(): JSX.Element {
  const classes = useStyles();
  const [anchorEls, setAnchorEls] = React.useState<Array<null | HTMLElement>>(
    []
  );
  const [dialog, setDialogData] = React.useState<{
    open: boolean;
    employee: Omit<Employee, "id" | "pictureURI">;
    reviewer: Employee | null;
  }>({
    open: false,
    employee: {
      email: "",
      birthday: "",
      description: "",
      firstName: "",
      lastName: "",
      role: "employee",
    },
    reviewer: null,
  });
  const [employees, setEmployees] = React.useState<Array<Employee>>([]);
  const [reload, setReload] = React.useState<number>(0);

  useEffect(() => {
    findEmployees().then((emp) => {
      setAnchorEls(emp.map((emp) => null));
      setEmployees(emp);
    });
  }, [reload]);

  const handleClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const array = [...anchorEls];
    array[index] = event.currentTarget;
    setAnchorEls(array);
  };

  const handleClose = () => {
    setAnchorEls(anchorEls.map((_) => null));
  };

  const submit = async (employee: any, reviewer: Employee | null) => {
    setDialogOpen();
    const emp = await upsertEmployee(employee);
    const [last] = emp?.id
      ? (((await findPerformance(emp.id, "revieweeId")) as unknown) as Array<
          Performance | undefined
        >)
      : [];
    if (emp && reviewer) {
      upsertPerformance({
        feedbacks: {},
        ...last,
        revieweeId: emp.id,
        reviewers: [reviewer.id],
      });
    }
    setReload(reload + 1);
  };

  const submitRemoveEmployee = async (employeeId: string) => {
    removeEmployee(employeeId);
    setReload(reload + 1);
  };

  const setDialogOpen = () => {
    setDialogData({
      open: !dialog.open,
      employee: {
        email: "",
        birthday: "",
        description: "",
        firstName: "",
        lastName: "",
        role: "employee",
      },
      reviewer: null,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h3" style={{ margin: "20px 0", fontWeight: 700 }}>
        <span style={{ fontWeight: 200 }}>All </span> Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        style={{ margin: "0 0 20px 0" }}
        onClick={setDialogOpen}
      >
        Add Employee
      </Button>
      <ProfileDialog
        profile={dialog.employee}
        open={dialog.open}
        reviewer={dialog.reviewer || null}
        employees={employees}
        setReviewer={(reviewer) => {
          setDialogData({ ...dialog, reviewer });
        }}
        setOpen={setDialogOpen}
        setProfile={(profile) =>
          setDialogData({ ...dialog, employee: profile })
        }
        submit={submit}
      />
      <div className={classes.container}>
        {employees.map((employee, index) => {
          return (
            <Card
              style={{ margin: "10px" }}
              className={classes.root}
              key={`${employee.email}-${index}`}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {employee.firstName.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={(e) => handleClick(index, e)}
                  >
                    <MoreVert />
                  </IconButton>
                }
                title={employee.firstName + " " + employee.lastName}
                subheader={employee.birthday}
              />
              <Menu
                id={`${employee.email}-${index}-menu`}
                anchorEl={anchorEls[index]}
                keepMounted
                open={Boolean(anchorEls[index])}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={async () => {
                    handleClose();
                    const [performance] = await findPerformance(
                      employee.id,
                      "revieweeId"
                    );
                    const reviewer = performance
                      ? employees.find(
                          (emp) => emp.id === performance.reviewers[0]
                        ) || null
                      : null;
                    setDialogData({
                      open: true,
                      employee,
                      reviewer,
                    });
                  }}
                >
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={() => submitRemoveEmployee(employee.id)}>
                  Remove
                </MenuItem>
              </Menu>
              <CardMedia
                className={classes.media}
                image={employee.pictureURI}
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {employee.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </React.Fragment>
  );
}
