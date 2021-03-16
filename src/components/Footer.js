import React from "react"
import Fab from "@material-ui/core/Fab";

//icons
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import ExternalLink from "./ExternalLink";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

const Footer = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            margin: 10,
            marginTop:"auto",
            overflow: 'visible'
        },
        cardcontent: {
            padding: 0,
            "&:last-child": {
                paddingBottom: 10
            }
        },
        content: {
            display:'flex',
            alignItems: 'center',
            padding: 10,
            justifyContent: "space-evenly",
        },
    }));

    const classes = useStyles();

    return(
        <Card variant={"elevation"} className={classes.root}>
            <CardContent className={`${classes.content} ${classes.cardcontent}`}>
                    <ExternalLink href="https://github.com/Gkrumbach07">
                        <Fab color="primary" aria-label="git" >
                            <GitHubIcon />
                        </Fab>
                    </ExternalLink>
                    <ExternalLink href="https://www.linkedin.com/in/gage-krumbach-aab4b7175/">
                        <Fab color="primary" aria-label="linkdin" >
                            <LinkedInIcon />
                        </Fab>
                    </ExternalLink>
                    <ExternalLink href="mailto:gkrumbach@gmail.com">
                        <Fab color="primary" aria-label="email" >
                            <EmailIcon />
                        </Fab>
                    </ExternalLink>
            </ CardContent>
        </Card>
    )
}

export default Footer