import React from 'react';
import {render} from 'react-dom';

import Slider from './src/Slider';

const sampleDivStyle = {
    width: '200px',
    height: '350px',
    display: 'inline-block',
    position: 'relative'
};

function SampleDiv(props) {
    return (
        <div style={{...sampleDivStyle, backgroundColor: `rgb(200,${props.num * 15},${props.num * 20})`}}>
            <div style={{position: 'absolute', top: '47%', left: '47%', fontSize: '30px'}}>
                {props.num}
            </div>
        </div>
    );
}


let children = [];
for(let i=1; i<=10; i++){
    children.push(<SampleDiv num={i} key={i} />);
}

render((
    <div style={{marginTop: '50px'}}>
        <Slider>
            {children}
        </Slider>
    </div>
), document.getElementById('react-app'));
