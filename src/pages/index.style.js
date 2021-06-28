import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const theme = createMuiTheme({
  palette: {
    default: {
      main: "#96FADA",
    },
    primary: {
      main: "#A0CAF5",
    },
    secondary: {
      main: "#85D5DE",
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "#fff",
    borderBottom: "3px solid transparent",
    borderImage: "linear-gradient(to right, #0785bf 14.39%, #ec0a0a  100%)",
    borderImageSlice: 1,
    boxShadow: 0,
    color: "rgba(0, 0, 0, 0.87)",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    background: "#fff",
    borderBottom: "3px solid transparent",
    borderImage: "linear-gradient(to right, #0785bf 14.39%, #ec0a0a  100%)",
    borderImageSlice: 1,
    boxShadow: 0,
    color: "rgba(0, 0, 0, 0.87)",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menu: {
    color: "#fff",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  username: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#3D5069",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  addDoc: {
    marginBottom: theme.spacing(3),
  },
  inputUpload: {
    display: "none",
  },
  tableBackgroud: {
    backgroundColor: "#fff",
  },
  draftRoot: {
    display: "flex",
    flexWrap: "wrap",
  },
  draftTextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  draftEditorCustom: {
    border: "1px solid",
    borderColor: "#c0c0c0",
    borderRadius: 4,
    background: "#fff",
  },
  draftToolbarCustom: {
    borderColor: "#c0c0c0",
  },
  draftWrapperCustom: {
    paddingLeft: "8px",
    paddingRight: "8px",
    width: "100%",
  },
  cardViewSearch: {
    marginBottom: 30,
  },
  cardViewLoad: {
    marginTop: 100,
  },
  cardViewContainer: {
    flexGrow: 1,
  },
  cardViewContainerItem: {
    width: 350,
    maxWidth: 350,
  },
  cardViewItens: {
    marginBottom: 10,
  },
  cardViewPaginator: {
    marginTop: 25,
  },
}));
