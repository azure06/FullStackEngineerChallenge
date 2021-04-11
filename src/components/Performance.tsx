import React, { useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import {
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Employee, Performance as PerformanceType } from "../types";
import Divider from "@material-ui/core/Divider";
import { findPerformance } from "../services/performance";
import { findEmployees } from "../services/employee";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 320,
    },
    performance: {
      width: "calc(100% - 400px)",
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

export default function Performance(props: {
  employee: Employee;
}): JSX.Element {
  const classes = useStyles();
  const [employees, setEmployees] = React.useState<Array<Employee>>([]);
  const [performance, setPerformance] = React.useState<
    Omit<PerformanceType, "id"> & { id?: string }
  >({
    feedbacks: { [props.employee.id]: { description: "", value: 0 } },
    revieweeId: "",
    reviewers: [],
  });
  const [performances, setPerformances] = React.useState<
    Array<PerformanceType>
  >([]);
  const [reload, setReload] = React.useState<number>(0);

  useEffect(() => {
    findEmployees().then(setEmployees);
    findPerformance(props.employee.id, "reviewers").then(setPerformances);
    findPerformance(props.employee.id, "revieweeId").then(([head]) => {
      if (head)
        setPerformance({
          ...head,
          feedbacks: head.feedbacks[props.employee.id]
            ? head.feedbacks
            : (() => ({
                ...head.feedbacks,
                [props.employee.id]: { description: "", value: 0 },
              }))(),
        });
    });
  }, [reload]);

  return (
    <React.Fragment>
      <Typography variant="h3" style={{ margin: "20px 0", fontWeight: 700 }}>
        <span style={{ fontWeight: 200 }}>Your</span> Performance
      </Typography>
      <div className={classes.container}>
        <Card style={{ margin: "10px" }} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {props.employee.firstName.charAt(0)}
              </Avatar>
            }
            title={props.employee.firstName + " " + props.employee.lastName}
            subheader={props.employee.birthday}
          />
          <CardMedia
            className={classes.media}
            image={props.employee.pictureURI}
            title="Person"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.employee.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing></CardActions>
        </Card>
        {/* Performance */}
        <Card style={{ margin: "10px" }} className={classes.performance}>
          <CardHeader title="YOUR REVIEW" />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {performance.feedbacks[props.employee.id].description}
            </Typography>
            <Typography style={{ marginTop: 50 }} variant="h5" component="p">
              BOSS REVIEW
            </Typography>
            {Object.entries(performance.feedbacks)
              .filter(([key]) => key !== props.employee.id)
              .map(([_, feedback]) => (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  key={`${_}-feedback`}
                >
                  {feedback.description}
                </Typography>
              ))}
          </CardContent>
        </Card>
      </div>
      <Divider style={{ marginTop: 50 }} />
      <Typography variant="h3" style={{ margin: "20px 0", fontWeight: 700 }}>
        <span style={{ fontWeight: 200 }}>Your</span> Reviewees
      </Typography>
      <div className={classes.container}>
        {performances.map((performance, index) => {
          const employee = employees.find(
            (emp) => emp.id === performance.revieweeId
          );
          return employee ? (
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
                title={employee.firstName + " " + employee.lastName}
                subheader={employee.birthday}
              />
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
              {/* <CardActions disableSpacing>
                <IconButton aria-label="Review">
                  <BarChart />
                </IconButton>
              </CardActions> */}
            </Card>
          ) : null;
        })}
      </div>
    </React.Fragment>
  );
}
