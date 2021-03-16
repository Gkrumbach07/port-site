import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
    CardMedia,
    Chip,
    Button,
    Typography,
    CardContent,
    CardActions,
    Card,
    Box, Zoom
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";


const Projects = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            height: "100%",
            alignItems: "stretch",
            flexWrap: "wrap",
            justifyContent: "space-between",
        },
        card: {
            margin:"10px",

            [theme.breakpoints.up('xs')]: {
                width: "100%",
            },
            [theme.breakpoints.up('md')]: {
                width: "45%",
            },
            [theme.breakpoints.up('lg')]: {
                width: "30%",
            },
            position: "relative"
        },
        title: {
            margin: theme.spacing(1, 0, 1),
        },
        date: {
            margin: theme.spacing(0, 0, 1),
        },
        description: {
            margin: theme.spacing(2, 0, 2),
        },
        divider: {
            margin: theme.spacing(2, 0, 2),
        },
        chip: {
            margin: 5,
            marginLeft: 0
        },
        navigation: {
            display: 'flex',
            justifyContent: "center"
        },
        navButtons: {
            margin: 10
        },
        button: {
            position: "absolute",
            bottom: 0,
        }
    }));

    const classes = useStyles();

    const { allMarkdownRemark } = useStaticQuery(graphql`
    query Project {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(markdown)/(projects)/"}}, sort: {order: DESC, fields: frontmatter___date}) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          description
          featuredImage {
            relativePath
          }
          githubUrl
          projectUrl
          technologies
          title
          slug
          date
        }
      }
    }
  }
}
    `)

    return(
        <Box className={classes.root}>
            {allMarkdownRemark.edges.map((item, i) => {
                return (
                    <Zoom in={true} style={{ transitionDelay: `${50 * i}ms`}}>
                        <Card className={classes.card} variant={"elevation"} key={item.node.frontmatter.id}>
                            <CardMedia
                                component="img"
                                alt={item.node.frontmatter.title}
                                height="140"
                                image={item.node.frontmatter.featuredImage.relativePath}
                                title={item.node.frontmatter.title}
                                id={item.node.frontmatter.slug}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h5" className={classes.title}>
                                    {item.node.frontmatter.title}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" className={classes.date}>
                                    {item.node.frontmatter.date}
                                </Typography>
                                <Typography variant="body1" component="p" className={classes.description}>
                                    {item.node.frontmatter.description}
                                </Typography>
                                <Divider variant="middle" className={classes.divider}/>
                                {item.node.frontmatter.technologies.map(tech => {
                                    return (
                                        <Chip label={tech} key={item.node.frontmatter.id} className={classes.chip}/>
                                    )
                                })}
                                <div style={{marginTop:30}}/>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                        className={classes.button}
                                        href={item.node.frontmatter.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                >
                                    GitHub
                                </Button>
                            </CardActions>
                        </Card>
                    </Zoom>
                )
            })}
        </Box>
    )
}

export default Projects