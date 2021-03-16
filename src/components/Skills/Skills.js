import React from "react"
import {
    Box,
    Card,
    Chip,
    Fade,
    ListItem, ListItemIcon, ListItemText, Paper,
    Tab,
    Tabs,
    Typography, useMediaQuery, useTheme, Zoom
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";

import data from "./skills.json"
import Divider from "@material-ui/core/Divider";
import {graphql, useStaticQuery} from "gatsby";
import ComputerIcon from '@material-ui/icons/Computer';
import List from "@material-ui/core/List";
import {navigate} from "@reach/router";

import class_list from '../Education/classes.json'

const HighlightedSkill = ({title}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: "30%"
        },
        header: {
            padding: theme.spacing(2, 1, 0),
        },
        icon:{
            minWidth: 'unset'
        }
    }));

    const { allMarkdownRemark } = useStaticQuery(graphql`
    query Chips {
      allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
        edges {
          node {
            frontmatter {
              title
              technologies
              date
              projectUrl
            }
          }
        }
      }
    }
    `)

    const classes = useStyles();

    const chips = allMarkdownRemark.edges.filter(e => e.node.frontmatter.technologies.includes(title)).concat(class_list)

    return(
        <Card className={classes.root}>

            <CardContent>
                <Typography variant="h5" component="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" className={classes.header}>
                    {chips.length > 0 ? "Recent Experience": ""}
                </Typography>
                <List dense={true}>
                    {chips.slice(0,2).map((chip, i) => {
                        const text = !chip.node ? chip.title : chip.node.frontmatter.title
                        const url = !chip.node ? '/skills' : chip.node.frontmatter.projectUrl
                        return(
                            <ListItem button onClick={() => navigate(url)}>
                                <ListItemIcon className={classes.icon}>
                                    <ComputerIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        )
                    })}
                </List>
            </CardContent>
        </Card>
    )
}


const Skills = () => {
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const useStyles = makeStyles((theme) => ({
        root: {
            '& div': {
                margin: theme.spacing(1),
            },
        },
        selected: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            overflow: 'hidden',
            maxHeight: "70%"
        },
        title: {
            margin: theme.spacing(0, 1, 2),
        }
    }));

    const classes = useStyles();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const getMobileView = () => {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h4" className={classes.title}>
                        Skills
                    </Typography>
                    {data.map(category => {
                        return(
                            <>{category.values.map(chip => {
                                return(
                                    <Fade in={true}>
                                        <Chip label={chip} className={classes.chip}/>
                                    </Fade>
                                )
                            })}</>
                        )
                    })}
                </CardContent>
            </Card>
        )
    }


    const getDesktopView = () => {
        return (
            <div>
                <Paper>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        {data.map(category => {
                            return(<Tab label={category.title} />)
                        })}
                    </Tabs>
                </Paper>

                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h4" className={classes.title}>
                            {data[value].title}
                        </Typography>
                        <Box className={classes.selected}>
                            {data[value].values.map((title, i) => {
                                return (
                                    <HighlightedSkill title={title}/>
                                )
                            })}
                        </Box>
                        <Divider style={{marginBottom: 20}}/>
                        <Typography variant="h4" component="h4" className={classes.title}>
                            Other Skills
                        </Typography>
                        {data.filter(e => e.title !== data[value].title).map(category => {
                            return(
                                <>{category.values.map(chip => {
                                    return(
                                        <Zoom in={true}>
                                            <Chip label={chip} className={classes.chip}/>
                                        </Zoom>
                                    )
                                })}</>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>
        )
    }


    return(
        <Box className={classes.root}>
            {isMobile ? getMobileView() : getDesktopView()}
        </Box>
    )
}

export default Skills