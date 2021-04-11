import React, { useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import { findEmployees } from "../services/employee";
import { Employee } from "../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      minWidth: "360px",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
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

interface Props {
  onEmployeeClick: (employee: Employee) => any;
}

export default function Signin(props: Props) {
  const classes = useStyles();

  const [employees, setEmployees] = React.useState<Array<Employee>>([]);
  const [reload, setReload] = React.useState<number>(0);
  useEffect(() => {
    findEmployees().then(setEmployees);
  }, [reload]);

  return (
    <div className={classes.container}>
      <Typography variant="h3" style={{ margin: "25px 0", fontWeight: 700 }}>
        <span style={{ fontWeight: 200 }}>Sign in with your</span>
        {" Account"}
      </Typography>
      <Card style={{ margin: "25px 0", padding: "10px 20px" }} elevation={24}>
        <List dense className={classes.root}>
          {employees.map((employee, index) => (
            <React.Fragment key={`${employee.id}-list`}>
              <ListItem
                button
                alignItems="flex-start"
                onClick={() => props.onEmployeeClick(employee)}
              >
                <ListItemAvatar>
                  <Avatar alt={employee.firstName} src={employee.pictureURI} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${employee.firstName} ${employee.lastName}`}
                  secondary={
                    <React.Fragment>
                      <Typography variant="caption" style={{ fontWeight: 400 }}>
                        {employee.role.charAt(0).toUpperCase() +
                          employee.role.slice(1)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Card>
    </div>
  );
}
