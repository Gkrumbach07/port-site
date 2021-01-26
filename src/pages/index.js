import * as React from "react"
import { Helmet } from 'react-helmet'
import {navigate} from "@reach/router";

// components
import Map from '../components/Map';
import Sidebar from "../components/Sidebar";

// style
import '../stylesheet/App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";


const Home = ({location}) => {
    return (
        <div>
            <CssBaseline />
            <Helmet title="Gage Krumbach" defer={false}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' />
                <script src='https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js'></script>
            </Helmet>
            <div className="home-button" >
                <Fab variant="extended"
                     color="primary"
                     onClick={() => {
                         //this.fitPoints();
                         navigate("/")
                     }} >
                    <ZoomOutMapIcon style={{marginRight: "10px"}}/>
                    Home
                </Fab>
            </div>
            <Sidebar location={location}/>
            <Map />
        </div>
    );
}

export default Home
