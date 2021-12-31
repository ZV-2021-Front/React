import React, { useState, useEffect } from 'react';
import {ChromePicker} from 'react-color'


export const ColorPicker = ({props}) => {
    const [isColorPickerVisible, setisColorPickerVisible] = useState(false);
    const [color, setcolor] = useState('#000');
    useEffect(() => {
        let newlocalColorStops=[...props.localColorStops]
        newlocalColorStops[props.index][1]=color
        props.setlocalColorStops([...newlocalColorStops])        
    }, [color]);
    useEffect(() => {
        setcolor(props.localColorStops[props.index][1])
    }, [props.localColorStops]);
    const size = 44
    return (
        <div>
            <div style={{
                backgroundColor: color,
                width: size,
                height: size,
                borderRadius: size/2,
                marginLeft: 10,
            }} onClick={()=>{setisColorPickerVisible(true)}} />
            {isColorPickerVisible ?
                <div style={{
                    position: 'absolute',
                    zIndex: '2',
                }} >
                    <div style={{
                        position: 'fixed',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    }} onClick={()=>{setisColorPickerVisible(false)}}/>
                    <div style={{transform: 'translate(60px, -50px)',}}>
                        <ChromePicker color={color} onChangeComplete={(color)=>{setcolor(color.hex)}} />
                    </div>
                </div> : null
            }
        </div>
    )
}
