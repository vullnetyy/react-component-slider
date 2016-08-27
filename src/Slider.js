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
    height: '100%',
    cursor: 'pointer',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
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

const ChildCopies = (props) => {
    return (
        <div style={{display: 'inline-block'}}>
            {props.children}
            {props.children}
        </div>
    );
};

class Slider extends Component {
    constructor(props){
        super(props);

        this.onNavClick = this.onNavClick.bind(this);
        this.state = {
            initialLeft: -(this.props.childWidth * this.props.children.length * 2),
            slideCount: 0
        };

        this.state.left = this.state.initialLeft;
        this.state.animationFlag = true;
        this.clickWait = false;
    }

    render() {
        let {childWidth, children, animationDelay} = this.props;

        let transform = `translateX(${this.state.left}px)`;
        let transition = this.state.animationFlag && `all .${animationDelay}s ease-in-out` || 'none';

        return (
            <div style={rootStyle}>
                <div style={{...sideNav, top: 0, left: 0, width: childWidth}} onClick={this.onNavClick(SliderSide.LEFT)}>
                    <a style={navButton}>+</a>
                </div>

                <div style={{
                    width: (this.props.children.length * 5 * childWidth) + 'px',
                    transform,
                    transition
                }}>
                    <ChildCopies children={children}/>
                    {children}
                    <ChildCopies children={children}/>
                </div>

                <div style={{...sideNav, top: 0, right: 0, width: childWidth}} onClick={this.onNavClick(SliderSide.RIGHT)}>
                    <a style={navButton}>+</a>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        if(!this.state.animationFlag){
            setTimeout(() => {
                this.setState({
                    animationFlag: true
                });
            }, this.props.animationDelay);
            return;
        }

        if(Math.abs(this.state.slideCount) === this.props.children.length){
            setTimeout(() => {

                this.setState({
                    left: this.state.initialLeft,
                    slideCount: 0,
                    animationFlag: false
                });

            }, this.props.animationDelay);
        }
    }

    /**
     * Partial application (curry) function. Also it does not allow consecutive execution before a delay expires
     * @param side
     * @returns {Function}
     */
    onNavClick(side){
        return () => {
            if(this.state.animationFlag){
                if(!this.clickWait){
                    setTimeout(() => {
                        this.clickWait = false;
                    }, this.props.animationDelay);

                    this.navClick(side);
                }

                this.clickWait = true;
            }
        }
    }

    navClick(side){
        switch(side){
            case SliderSide.LEFT:
                this.setState({
                    left: this.state.left - this.props.childWidth,
                    slideCount: this.state.slideCount - 1
                });

                break;
            case SliderSide.RIGHT:
                this.setState({
                    left: this.state.left + this.props.childWidth,
                    slideCount: this.state.slideCount + 1
                });

                break;
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

Slider.defaultProps = {
    animationDelay: 300
};

export default Slider;