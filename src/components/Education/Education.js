import React from "react"
import {
    Box,
    Card,
    Chip,
    Fade, FormControl, InputLabel,
    ListItem, ListItemIcon, ListItemText, MenuItem,
    Paper, Select,
    Tab,
    Tabs, Tooltip,
    Typography, useMediaQuery, useTheme, Zoom
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";

import data from "./classes.json"
import {HeaderSource} from "../Header";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";


const Education = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& div': {
                margin: theme.spacing(1),
            },
        },
        listElement: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
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
        },
        formControl: {
            marginLeft: "auto"
        }
    }));

    const theme = useTheme();

    const classes = useStyles();

    const [value, setValue] = React.useState('type');

    const handleChange = (event, newValue) => {
        setValue(newValue.props.value);
    };



    return(
        <Box className={classes.root}>
            <Paper style={{display:"flex", justifyContent: "center"}}>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Group by</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={value}
                        onChange={handleChange}
                    >
                        <MenuItem value="type">Type</MenuItem>
                        <MenuItem value="level">Level</MenuItem>
                        <MenuItem value="year">Year</MenuItem>
                    </Select>
                </FormControl>
            </Paper>


            {[...new Set(data.map(item => { return item[value] }))].map(category => {
                return(
                    <Card id={category}>
                        <CardContent>
                            <Typography variant="h4" component="h4" className={classes.title}>
                                {category}
                            </Typography>
                            {data.filter(e => category === e[value]).map(c => {
                                return(
                                    <Tooltip title={c["code"]}>
                                        <Chip
                                            label={c["title"]}
                                            className={classes.chip}/>
                                    </Tooltip>
                                )
                            })}
                        </CardContent>
                    </Card>
                )
            })}
        </Box>
    )
}

export default Education