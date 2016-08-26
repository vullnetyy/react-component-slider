import React from 'react';
import {render} from 'react-dom';

import Slider from './Slider';

let sliderProps = {

};



render((
    <div style={{marginTop: '50px'}}>
        <Slider childWidth={200}>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
            <img src="http://placehold.it/200x300" style={{outline: '2px solid cyan'}} alt=""/>
        </Slider>
    </div>
), document.getElementById('react-app'));
