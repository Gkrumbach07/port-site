import * as React from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import {navigate} from "@reach/router";

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
                slug: '/about',
                title: 'About Me',
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-90,40]
            },
            properties: {
                slug: '/contact',
                title: 'Contact Me',
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-89,42]
            },
            properties: {
                slug: '/projects',
                title: 'Projects',
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [-85,40]
            },
            properties: {
                slug: '/work',
                title: 'Work Experience',
            }
        },

    ]
};

class Map extends React.Component {
    map = null;

    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2,
            isSidebarVisible: false
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
            // add markers to map
            markers.features.forEach((marker) => {
                // Set options
                const m = new mapboxgl.Marker({
                    anchor:'right',
                    color: "#7c8e7c"
                }).setLngLat(marker.geometry.coordinates).addTo(this.map);

                // add text
                const text = document.createElement("div");
                text.innerText = marker.properties.title;
                text.className = "marker-text"
                m.getElement().insertBefore(text, m.getElement().firstChild)
                m.getElement().classList.add("marker")

                // add on click action
                m.getElement().addEventListener('click', () => {
                    navigate(marker.properties.slug)
                    this.drawRouteTo(marker.geometry.coordinates)
                    this.navigateTo(marker.geometry.coordinates)
                    this.toggleSidebar(true);
                });
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

            this.fitPoints();

        });
    }

    toggleSidebar = (state) => {
        this.setState(prevState => ({
            isSidebarVisible: state
        }));
    }

    drawRouteTo = (to) => {
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
    }

    navigateTo = (to) => {
        this.map.flyTo({center: [to[0], to[1]], zoom: 16});
        this.setState({
            "lat": to[0],
            "lng": to[1]
        });
    }

    fitPoints = () => {
        let bounds = new mapboxgl.LngLatBounds();

        markers.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });

        this.map.fitBounds(bounds, { padding: 150 });

        // close the sidebar
        this.toggleSidebar(true)
        navigate("/")
    }


    render() {
        return (
            <div ref={el => this.mapContainer = el} className='mapContainer' />
        )
    }
}

export default Map