import * as React from "react";
import {Router} from "@reach/router";

import '../stylesheet/App.css';

import Menu from "./Menu";
import CircularProgress from "@material-ui/core/CircularProgress";
import Footer from "./Footer";
import {Box} from "@material-ui/core";
import Header from "./Header";
import makeStyles from "@material-ui/core/styles/makeStyles";


const Projects = React.lazy(() => import("./Projects/Projects"))
const Contact = React.lazy(() => import("./Contact/Contact"))
const About = React.lazy(() => import("./About/About"))
const Skills = React.lazy(() => import("./Skills/Skills"))
const Education = React.lazy(() => import("./Education/Education"))



const LazyComponent = ({ Component, ...props }) => (
    <React.Suspense fallback={<CircularProgress />}>
        <Component {...props} />
    </React.Suspense>
)



const Sidebar = ({location}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            margin: 10,
        },
        sidebar: {
            position: 'absolute',
            zIndex: 1,
            height: '100%',
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 400,
            maxWidth: "75%",
            width:"auto",
        },
        collapsed: {
            left: "-100%"
        },
        sidebarContent: {
            height: '95%',
            fontFamily: 'Arial, Helvetica, sans-serif',
            color: 'gray',
            display: 'flex',
            flexDirection: 'column',

            marginTop: 'auto',
            marginBottom: 'auto',

            // rounded rect
            background: '#fafafabf',
            borderRadius: '10px',
            boxShadow: '0 0 50px -25px black',
        },
    }));

    const classes = useStyles();

    return(
        <Box className={classes.sidebar}>
            <Box className={`${classes.sidebarContent}`}>
                <Header location={location}/>
                <Box style={{height: 'auto', overflow: "scroll", marginBottom: 10}}>
                    <Router>
                        <Menu path="/" />
                        <LazyComponent Component={Projects} path='/projects' />
                        <LazyComponent Component={Contact} path='/contact' />
                        <LazyComponent Component={About} path='/about' />
                        <LazyComponent Component={Skills} path='/skills' />
                        <LazyComponent Component={Education} path='/education' />
                    </Router>
                </Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default Sidebar