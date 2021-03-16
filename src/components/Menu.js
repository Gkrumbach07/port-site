import React from "react"
import {navigate} from "@reach/router"
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px"
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
},
}));

const Menu = () => {
    const classes = useStyles();
    return(
        <Card variant={"elevation"} className={classes.root}>
            <CardContent className={classes.content}>
                <List component="nav" className={classes.list} aria-label="mailbox folders">
                    <ListItem button divider onClick={() => navigate("/projects")}>
                        <ListItemText primary="Projects"/>
                    </ListItem>
                    <ListItem button divider onClick={() => navigate("/about")}>
                        <ListItemText primary="About Me" />
                    </ListItem>
                    <ListItem button divider onClick={() => navigate("/contact")}>
                        <ListItemText primary="Contact Me" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/skills")}>
                        <ListItemText primary="Skills" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/education")}>
                        <ListItemText primary="Education" />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

export default Menu