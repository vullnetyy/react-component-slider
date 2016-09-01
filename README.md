# react-image-slider
React carousel or slider designed with images in mind but can be used with any other react component.

We wrote this slider because we wanted to have an extremely simple and easy to integrate slider/carousel for one of our commercial projects.

To use this slider simply import it and give it an array of children components all of which have the same width. The consistent width is required because the slider decides how much to move left or right depending on he width first child. This will be more advanced in the upcoming version.

Below is a simple use case for react-component-slider:

````
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
````

You can run the example app by running npm install, and then calling the following two commands in your terminal:

````
grunt browserify
node app
````
