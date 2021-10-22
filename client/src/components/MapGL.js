import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import mapData from '../data/MapValues.json'
import json from '../data/geo.json'
import Legend from './Legend'
// @ts-ignore
//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = 'pk.eyJ1Ijoia2lyaWxsdGhlYXJjaGlrIiwiYSI6ImNrdjBxZWo1dzA4eDcydnA3djF3N2Q2Zm8ifQ.kVlHsV6U8Y9tOeDfeQ2Csg';
 
export default function MapGL() {
    const mapContainer = useRef(null);
    const [lng, setLng] = useState(60);
    const [lat, setLat] = useState(60);
    const [zoom, setZoom] = useState(3);
    const [map, setMap] = useState(null);
    let hoveredStateId = null;

    const options = [
        {
            name: 'Value',
            description: 'Общее количество заболевших коронавирусом',
            property: 'VALUE',
            stops: [
                [0, '#f8d5cc'],
                [1000, '#f4bfb6'],
                [5000, '#f1a8a5'],
                [10000, '#ee8f9a'],
                [50000, '#ec739b'],
                [100000, '#dd5ca8'],
                [250000, '#c44cc0'],
                [500000, '#9f43d7'],
                [1000000, '#6e40e6']
            ]
        }
    ];
    const [active, setActive] = useState(options[0]);

    useEffect(() => {
        json['features'].map((feature)=>{
            feature.properties.VALUE=mapData.find((element)=>
                element["regionName"]==feature.properties.NAME_RU
            ).value
        })
    }, [])
    
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
        });
        map.on('load', () => {
            map.addSource('regions', {
              type: 'geojson',
              data: json
            });
            map.setLayoutProperty('country-label', 'text-field', [
                'get',
                `name_ru`
                ]);
            map.setLayoutProperty('settlement-label', 'text-field', [
                'get',
                `name_ru`
                ]);
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
                    ]
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
            map.setPaintProperty('regions', 'fill-color', {
                property: active.property,
                stops: active.stops
            });
            
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

            setMap(map)
        });
        // return () => map.remove();
    },[])
    
    useEffect(() => {
        paint();
      }, [active]);
    
      const paint = () => {
        if (map) {
          map.setPaintProperty('countries', 'fill-color', {
            property: active.property,
            stops: active.stops
          });
        }
      };

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
                height: '100vh'
            }} />
            <Legend active={active} stops={active.stops} />
        </div>
    );
}