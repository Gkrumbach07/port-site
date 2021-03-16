import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {createTeleporter} from "react-teleporter";

const HeaderData = createTeleporter()

export function HeaderSource({ children }) {
    return <HeaderData.Source>{children}</HeaderData.Source>
}

const HeaderTarget = ({location}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            margin: 10,
            overflow: 'visible',
        },
        content: {
            display: 'flex',
            alignItems: 'center',
            paddingBottom:10,
            [theme.breakpoints.down('xs')]: {
                flexDirection: "column",
                textAlign: "center"
            }
        },
        name: {
            [theme.breakpoints.up('xs')]: {
                marginLeft: 20,
            }
        },
        photoSmall: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            transition: 'height .2s, width .2s'
        },
        photoSquare: {
            width: theme.spacing(20),
            height: theme.spacing(20),
            transition: 'height .2s, width .2s'
        },
        photoBig: {
            width: theme.spacing(7),
            height: theme.spacing(7),
            transition: 'height .2s, width .2s'
        },
        cardcontent: {
            "&:last-child": {
                paddingBottom: 16
            },
            transition: 'padding .2s'
        },
    }));

    const classes = useStyles();

    const getHeaderStyle = (type) => {
        if(location.pathname === "/") {
            if(type === "photo"){
                return classes.photoBig
            }
            else {
                return ""
            }
        }
        if(location.pathname === "/about") {
            if(type === "photo"){
                return classes.photoSquare
            }
            else {
                return ""
            }
        }
        else {
            if(type === "photo"){
                return classes.photoSmall
            }
            else {
                return classes.cardcontent
            }
        }
    }

    return(
        <Card variant={"elevation"} className={classes.root}>
            <CardContent className={`${classes.content} ${getHeaderStyle()}`}>
                <Avatar alt="Gage Krumbach"
                        src={require("../images/avatar.jpg")}
                        variant={location.pathname === "/about" ? "rounded" : "circular"}
                        className={getHeaderStyle("photo")} />
                <div>
                    <Typography variant="h5" component="h2" className={classes.name}>
                        Gage Krumbach
                    </Typography>
                </div>
                <div style={{marginLeft: "auto"}}>
                    <HeaderData.Target />
                </div>
            </CardContent>
        </Card>
    )
}

export default HeaderTarget
