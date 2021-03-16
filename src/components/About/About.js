import React from "react"
import {Box, Button, Card, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GetAppIcon from '@material-ui/icons/GetApp';
import {HeaderSource} from "../Header";


const About = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center"
        },
        bodyHead: {
            margin: theme.spacing(1,4,0)
        },
        card: {
            margin: 10,
            marginTop:"auto",
            overflow: 'visible',
        },
        body: {
            margin: theme.spacing(0,2,0)
        },
        button: {
            margin: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing.unit,
        },
    }))

    const classes = useStyles()

    return(
        <div>
            <HeaderSource>
                <Box>
                    <Typography variant="body1" className={classes.bodyHead}>
                        Student at <b>University of Wisconsin - Madison</b>
                    </Typography>
                    <Typography variant="body1" className={classes.bodyHead}>
                        Anticipated graduation: <b>December 2021</b>
                    </Typography>
                    <Typography variant="body1" className={classes.bodyHead}>
                        <b>Computer Science BS</b> and <b>Entrepreneurship Minor</b>
                    </Typography>
                </Box>
            </HeaderSource>
            <Box className={classes.root}>
                <Card variant={"elevation"} className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h5">
                            About Me
                        </Typography>
                        <Typography variant="body1" className={classes.body}>
                            I am a student at UW Madison studying computer science and entrepreneurship.
                            I enjoy working with machine learning models, both producing and integrating them. I also have
                            experience with many aspects of web development and love learning whats new in that realm.
                            I spend my time expanding my knowledge in what interests me the most.
                        </Typography>
                    </CardContent>
                </Card>
                <Button variant="contained"
                        color="primary"
                        href="../documents/GageKrumbachResume.pdf"
                        className={classes.button}
                        download
                >
                    Resume
                    <GetAppIcon className={classes.rightIcon} />
                </Button>
            </Box>
        </div>

    )
}

export default About