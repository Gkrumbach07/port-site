import * as React from "react"
import '../App.css';
import {useEffect, useState} from "react";
import mapboxgl from 'mapbox-gl';
import { Helmet } from 'react-helmet'
import axios from 'axios';
import { TextField } from '@material-ui/core';
import {navigateTo} from "../../.cache/gatsby-browser-entry";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2tydW1iYWNoIiwiYSI6ImNrajIyZGFocTNqeXoydGxyeW1saW11NzUifQ.ISlQzJT8CJ12Qjf7NhlU9w';


const markers = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-90,39]
            },
            properties: {
                title: 'About Me',
                description: 'This is about me',
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-90,40]
            },
            properties: {
                title: 'Contact Me',
                description: 'My email',
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-89,42]
            },
            properties: {
                title: 'Projects',
                description: 'big data, flask',
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-85,40]
            },
            properties: {
                title: 'Work Experience',
                description: 'This is about me',
            }
        },

    ]
};

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSidebarVisible: false };
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarVisible: !prevState.isSidebarVisible
        }));
    }

    render() {
        const { isSidebarVisible } = this.state;

        return(
            <div className={`sidebar flex-center ${isSidebarVisible ? "" : "collapsed"}`}>
                <div className="sidebar-content rounded-rect flex-center">
                    Left Sidebar
                    <div
                        className="sidebar-toggle rounded-rect"
                        onClick={() => this.toggleSidebar()}
                    >
                        &rarr;
                    </div>
                </div>
            </div>
        );
    }
}

class Map extends React.Component {
    map = null;

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/gkrumbach/ckj23a9bj2f3u19o1r4k5dgf1',
            center: [this.state.lat, this.state.lng],
            zoom: this.state.zoom,
            //pitch: 45,
            antialias: true

        });

        this.map.on('load', () => {
            // Define a source before using it to create a new layer
            this.map.addSource('tab-data', {
                type: 'geojson',
                data: markers
            });

            this.map.addLayer({
                id: 'markers',
                source: 'tab-data',
                type: 'circle',
                "Paint": {
                    "circle-radius": 5,
                    "circle-color": "#b6de78"
                }
            });


            // Insert the layer beneath any symbol layer.
            var layers = this.map.getStyle().layers;

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }



            this.map.addLayer(
                {
                    'id': '3d-buildings',
                    'source': 'composite',
                    'source-layer': 'building',
                    'filter': ['==', 'extrude', 'true'],
                    'type': 'fill-extrusion',
                    'minzoom': 15,
                    'paint': {
                        'fill-extrusion-color': '#aaa',

                        // use an 'interpolate' expression to add a smooth transition effect to the
                        // buildings as the user zooms in
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );


        });



        this.map.on('click', 'markers', (e) => {
            this.navigateTo(e.features[0].geometry.coordinates)
        });
    }

    navigateTo(to) {
        const params = {
            alternatives: false,
            geometries: 'geojson',
            steps: false,
            access_token: mapboxgl.accessToken
        };


        axios.get('https://api.mapbox.com/directions/v5/mapbox/driving/' +
            this.state.lat + ',' + this.state.lng + ';' +
            to[0] + ',' + to[1],
            { params })
        .then( (res) => {
            var data = res.data.routes[0];
            var route = data.geometry.coordinates;
            var geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };
            // if the route already exists on the map, reset it using setData
            if (this.map.getSource('route')) {
                this.map.getSource('route').setData(geojson);
            }
            else { // otherwise, make a new request
                this.map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: geojson
                            }
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                });
            }
        })
        this.map.flyTo({center: [to[0], to[1]]});
        this.setState({
            "lat": to[0],
            "lng": to[1]
        });
    }


    handleCordChange = (e) => {
        if(!(e.target.name === "lat" && Math.abs(e.target.value) > 90)) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
        this.map.flyTo({center: [this.state.lat, this.state.lng]});
    }


    render() {
        return (
            <div>
                <div className='sidebarStyle' >
                    <TextField
                        id="outlined-basic"
                        name="lng"
                        value={this.state.lng}
                        label="Longitude"
                        variant="filled"
                        type="number"
                        style={{marginRight:"10px"}}
                        onChange={(e) => this.handleCordChange(e)} />
                    <TextField
                        id="outlined-basic"
                        name="lat"
                        value={this.state.lat}
                        label="Latitude"
                        variant="filled"
                        type="number"
                        onChange={(e) => this.handleCordChange(e)}
                    />
                </div>
                <Sidebar />
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

const Home = () => {
    return (
        <div>
            <Helmet title="Gage Krumbach" defer={false}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' />
            </Helmet>
            <Map />
        </div>
    );
}

export default Home
