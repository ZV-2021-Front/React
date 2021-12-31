import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapData from '../data/MapValues.json'
import json from '../data/geo.json'
import Legend from '../components/Legend'
import MapboxLanguage from '@mapbox/mapbox-gl-language';

mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsdGhlYXJjaGlrIiwiYSI6ImNrdjBxZWo1dzA4eDcydnA3djF3N2Q2Zm8ifQ.kVlHsV6U8Y9tOeDfeQ2Csg';
 
export default function Map({props}) {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(60);
    const [lat, setLat] = useState(60);
    const [zoom, setZoom] = useState(3);
    const [map, setMap] = useState(null);
    let hoveredStateId = null;

    // const stops= [
    //     [0, '#f8d5cc'],
    //     [1000, '#f4bfb6'],
    //     [5000, '#f1a8a5'],
    //     [10000, '#ee8f9a'],
    //     [50000, '#ec739b'],
    //     [100000, '#dd5ca8'],
    //     [250000, '#c44cc0'],
    //     [500000, '#9f43d7'],
    //     [1000000, '#6e40e6']
    // ]

    useEffect(() => {
        props.mapConfig.regionName && props.mapConfig.regionValue &&
        json['features'].map((feature)=>{
            try{
                feature.properties.VALUE=props.data.find((element)=>
                    element[props.mapConfig.regionName]==feature.properties.NAME_RU
                )[props.mapConfig.regionValue]
                // feature.properties.VALUE=0
            }
            catch{
                feature.properties.VALUE==0
            }
        })
    }, [props.mapConfig])
    
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: props.mapConfig.mapBackground=='Улицы' ? 'mapbox://styles/mapbox/streets-v11' : 'mapbox://styles/mapbox/satellite-streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
        map.addControl(new MapboxLanguage({
            defaultLanguage: 'ru'
          }));
        if(props.mapConfig?.mapType=='Регионы России'){
            map.on('load', () => {
                map.addSource('regions', {
                  type: 'geojson',
                  data: json
                });
                map.addLayer(
                    {
                      id: 'regions',
                      type: 'fill',
                      source: 'regions',
                      paint: {
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            1,
                            0.8
                        ],
                        'fill-color': {
                            property: 'VALUE',
                            stops: props.mapConfig.colorStops
                        }
                    }
                    },
                    'settlement-label'
                  );
                map.addLayer(
                    {
                        id: 'regionsLine',
                        type: 'line',
                        source: 'regions',
                        paint: {
                        "line-color": "#000",
                        "line-width": 0.2
                        }
                    },
                    'settlement-label'
                    );
                // map.addLayer(
                //     {
                //         id: 'regionsLabel',
                //         type: 'symbol',
                //         source: 'regions',
                //         layout: {
                //             'text-field':
                //             [
                //                 "format",
                //                 ["get", "NAME_RU"],
                //                 { 'font-scale': 0.8 }
                //             ],
                //             "text-justify": 'center'
                //         }
                //     },
                //     'country-label'
                //     );

                // map.setPaintProperty('regions', 'fill-color', {
                //     property: 'VALUE',
                //     stops: props.mapConfig.colorStops
                // });
                
                map.on('mousemove', 'regions', (e) => {
                    if (e.features.length > 0) {
                        if (hoveredStateId !== null) {
                            map.setFeatureState(
                                { source: 'regions', id: hoveredStateId },
                                { hover: false }
                            );
                        }
                        hoveredStateId = e.features[0].id;
                        map.setFeatureState(
                            { source: 'regions', id: hoveredStateId },
                            { hover: true }
                        );
                    }
                    });
                     
                map.on('mouseleave', 'regions', () => {
                    if (hoveredStateId !== null) {
                        map.setFeatureState(
                            { source: 'regions', id: hoveredStateId },
                            { hover: false }
                        );
                    }
                    hoveredStateId = null;
                });
            });
        }
        if(props.mapConfig?.mapType=='Отдельные маркеры'){
            map.on('load', () => {
                // Add an image to use as a custom marker
                map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',(error, image) => {
                    if (error) throw error;
                    map.addImage('custom-marker', image);
                    // Add a GeoJSON source with 2 points
                    map.addSource('points', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: props.data.map((item)=>{
                                return {
                                    id: item['id'],
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: item['coordinates'],
                                    },
                                    properties: {
                                        markerName: item[props.mapConfig.markerName],
                                        description: item[props.mapConfig.markerDescription],
                                    }
                                }
                            })
                        }
                    });
                    
                    // Add a symbol layer
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'points',
                        'layout': {
                            'icon-image': 'custom-marker',
                            'icon-allow-overlap': true,
                            // get the title name from the source's "markerName" property
                            'text-field': ['get', 'markerName'],
                            'text-font': [
                                'Open Sans Semibold',
                                'Arial Unicode MS Bold'
                            ],
                            'text-offset': [0, 1.25],
                            'text-anchor': 'top'
                        }
                    });
                });
            });
            map.on('click', 'points', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'points', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
                
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'points', () => {
                map.getCanvas().style.cursor = '';
            });
        }
        if(props.mapConfig?.mapType=='Скопление маркеров'){
            map.on('load', () => {
                // Add a GeoJSON source with 2 points
                map.addSource('points', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: props.data.map((item)=>{
                            return {
                                id: item['id'],
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: item['coordinates'],
                                },
                                properties: {
                                    markerName: item[props.mapConfig.markerName],
                                    description: item[props.mapConfig.markerDescription],
                                }
                            }
                        })
                    },
                    cluster: true,
                    clusterMaxZoom: 14, // Max zoom to cluster points on
                    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                });
                
                // Add a symbol layer
                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'points',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#51bbd6',
                            100,
                            '#f1f075',
                            750,
                            '#f28cb1'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40
                        ]
                    }
                });
                map.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'points',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                    });
                map.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'points',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 15,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff'
                    },
                });
            });
            map.on('click', 'unclustered-point', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                 
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });
            // inspect a cluster on click
            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('points').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
                        
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom
                        });
                    }
                );
            });
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'unclustered-point', () => {
                map.getCanvas().style.cursor = 'pointer';
            });   
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'unclustered-point', () => {
                map.getCanvas().style.cursor = '';
            });
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });   
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
        }

        setMap(map)
    },[props.mapConfig])
    
    // useEffect(() => {
    //     paint();
    //   }, [active]);
    
    // const paint = () => {
    //     if (map && props.mapConfig?.mapType=='Регионы России') {
    //         map.setPaintProperty('countries', 'fill-color', {
    //         property: active.property,
    //         stops: active.stops
    //         });
    //     }
    // };

    useEffect(() => {
        if (!map) return; // wait for map to initialize
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
    });
    
    return (
        <div>
            <div style={{
                position: 'relative',
                width: 0,
                height: 0
            }}>
                <div className='sidebarStyle' style={{
                    width: 370,
                    display: 'inline-block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    margin: '12px',
                    backgroundColor: '#404040',
                    color: '#ffffff',
                    zIndex: 1,
                    padding: '6px',
                    fontWeight: 'bold',
                }}>
                    <div>
                    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    </div>
                </div>
            </div>
            <div ref={mapContainer} className="map-container" style={{
                height: document.documentElement.scrollHeight
            }} />
            {props.mapConfig?.mapType=='Регионы России' ? <Legend stops={props.mapConfig.colorStops} /> : null}
        </div>
    );
}