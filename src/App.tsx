import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import getTheme from "./theme";
import { AccountCircle, Games, Home, People } from "@material-ui/icons";
import Signin from "./components/Signin";
import HomeComponent from "./components/Home";
import Employees from "./components/Employees";
import Performance from "./components/Performance";
import { Employee } from "./types";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentView, setView] = React.useState<
    "signin" | "home" | "employees" | "performance"
  >("signin");
  const theme = useTheme();
  const [employee, setEmployee] = React.useState<Employee | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const onEmployeeClick = (employee: Employee) => {
    setEmployee(employee);
    setView("home");
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setView("signin");
          }}
          selected={currentView === "signin"}
        >
          <ListItemIcon color={theme.palette?.primary.main}>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={"Account"} />
        </ListItem>
      </List>
      <Divider />
      {employee !== null ? (
        <React.Fragment>
          <List>
            <ListItem
              button
              onClick={() => {
                setView("home");
              }}
              selected={currentView === "home"}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            {employee.role === "admin" ? (
              <ListItem
                button
                onClick={() => {
                  setView("employees");
                }}
                selected={currentView === "employees"}
              >
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary={"Employees"} />
              </ListItem>
            ) : null}
          </List>
          <Divider />
          <List>
            {["Performance"].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  setView("performance");
                }}
                selected={currentView === "performance"}
              >
                <ListItemIcon>
                  <Games />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>{" "}
        </React.Fragment>
      ) : null}
    </div>
  );

  const container = window.document.body;
  // window !== undefined ? () => window().document.body : undefined;

  return (
    <React.StrictMode>
      <ThemeProvider theme={getTheme(false)}>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                PERFORMANCE
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {currentView === "signin" ? (
              <Signin onEmployeeClick={onEmployeeClick} />
            ) : currentView === "home" ? (
              employee !== null ? (
                <HomeComponent employee={employee} />
              ) : null
            ) : currentView === "employees" ? (
              <Employees />
            ) : employee !== null ? (
              <Performance employee={employee} />
            ) : null}
          </main>
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
}
