import React, {PropTypes, Component} from 'react';
import {SliderSide} from './resources';

const rootStyle = {
    width:'100%',
    position: 'relative',
    overflow: 'hidden'
};

const sideNav = {
    position: 'absolute',
    zIndex: 2,
    background: 'rgba(255,255,255,0.7)',
    width: '100px',
    height: '100%'
};

const navButton = {
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
    textAlign: 'center',
    fontSize: '40px' //only during development debug
};

const ChildCopies = () => {
    
};

class Slider extends Component {
    constructor(props){
        super(props);

        this.onNavClick = this.onNavClick.bind(this);
        this.state = {
            left: 0,
            slideCount: 0
        };
    }

    render() {
        let {childWidth} = this.props;

        let resetCondition = Math.abs(this.state.slideCount) % this.props.children.length === 0;

        let transform = `translateX(${this.state.left}px)`;
        let transition = resetCondition && 'none' || 'all .3s ease-in-out';

        return (
            <div style={rootStyle}>
                <div style={{...sideNav, top: 0, left: 0, width: childWidth}}>
                    <a style={navButton} onClick={this.onNavClick(SliderSide.LEFT)}>+</a>
                </div>

                <div style={{
                    width: (this.props.children.length * childWidth) + 'px',
                    transform,
                    transition
                }}>
                    {this.props.children}
                </div>

                <div style={{...sideNav, top: 0, right: 0, width: childWidth}}>
                    <a style={navButton} onClick={this.onNavClick(SliderSide.RIGHT)}>+</a>
                </div>
            </div>
        );
    }

    onNavClick(side){
        return () => {
            switch(side){
                case SliderSide.LEFT:
                    this.setState({
                        left: this.state.left - this.props.childWidth,
                        slideCount: this.state.slideCount - 1
                    });

                    if(Math.abs(this.state.slideCount) % this.props.children.length === 1){
                        this.setState({left: 0})
                    }
                    break;
                case SliderSide.RIGHT:
                    this.setState({
                        left: this.state.left + this.props.childWidth,
                        slideCount: this.state.slideCount + 1
                    });

                    if(Math.abs(this.state.slideCount) % this.props.children.length === this.props.children.length - 1){
                        this.setState({left: 0})
                    }
                    break;
            }
        }
    }
}

/**
 *
 * @type {{childWidth}} - the width of a single child that will be housed within the slider in pixels
 */
Slider.propTypes = {
    childWidth: PropTypes.number
};

export default Slider;