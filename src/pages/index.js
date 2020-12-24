import * as React from "react"
import '../App.css';
import {useEffect, useState} from "react";
import mapboxgl from 'mapbox-gl';
import { Helmet } from 'react-helmet'

import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


mapboxgl.accessToken = 'pk.eyJ1IjoiZ2tydW1iYWNoIiwiYSI6ImNrajIyZGFocTNqeXoydGxyeW1saW11NzUifQ.ISlQzJT8CJ12Qjf7NhlU9w';

const NumericInputBox = ({label}) => {
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id={label}>{label}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-describedby="basic-addon1" />
            </InputGroup>
        </div>
    )
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/gkrumbach/ckj23a9bj2f3u19o1r4k5dgf1',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        return (
            <div>
                <div
                    className='sidebarStyle'
                    style={{
                        display: "flex",
                        justifyContent: "flex-start"
                    }}
                >
                    <NumericInputBox
                        label="Longitude"
                    />
                    <NumericInputBox label="Latitude" />
                </div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}


const Home = () => {
    return (
        <div>
            <Helmet title="Gage Krumbach" defer={false}>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                    crossOrigin="anonymous"
                />
                <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' />
            </Helmet>
            <Map />
        </div>
    );
}



function getPoints(x, y) {

}

export default Home
