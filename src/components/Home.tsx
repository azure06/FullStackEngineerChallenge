import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import { Employee } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 545,
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
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

export default function Home(props: { employee: Employee }): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3" style={{ margin: "20px 0", fontWeight: 700 }}>
        <span style={{ fontWeight: 200 }}>Welcome back </span>{" "}
        {props.employee.firstName + " " + props.employee.lastName}
      </Typography>
      <Chip
        style={{ margin: "20px 0 40px 0" }}
        size="small"
        label={props.employee.role}
      />
      <Card className={classes.root} elevation={24}>
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
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.employee.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
