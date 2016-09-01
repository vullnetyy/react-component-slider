import React, {PropTypes, Component} from 'react';
import keymirror from 'keymirror';

const arrowImg = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 477.175 477.175\" style=\"enable-background:new 0 0 477.175 477.175;\" xml:space=\"preserve\" width=\"512px\" height=\"512px\">\n<g>\n\t<path d=\"M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   \" fill=\"#006DF0\"/>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>";

const SliderSide = keymirror({
    LEFT: null,
    RIGHT: null
});

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
    backgroundSize: '90%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
};

const navButtonLeft = {
    ...navButton,
    transform: 'translate(-50%, -50%) rotate(180deg)'
};

const navButtonRight = {
    ...navButton
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
            slideCount: 0,
            childWidth: 150,
            childHeight: 1
        };

        this.state.initialLeft = 0;
        this.state.left = this.state.initialLeft;
        this.state.animationFlag = true;
        this.clickWait = false;
    }

    render() {
        let {children, animationDelay} = this.props;
        let {childWidth, childHeight} = this.state;

        let transform = `translateX(${this.state.left}px)`;
        let transition = this.state.animationFlag && `all .${animationDelay}s ease-in-out` || 'none';

        return (
            <div style={{...rootStyle, height: childHeight}} ref="slider">
                <div style={{...sideNav, top: 0, left: 0, width: childWidth}} onClick={this.onNavClick(SliderSide.LEFT)}>
                    <img src={`data:image/svg+xml;utf-8,${arrowImg}`} style={navButtonLeft} />
                </div>

                <div style={{
                    width: (this.props.children.length * 5 * childWidth) + 'px',
                    transform,
                    transition
                }}>
                    <ChildCopies children={children}/>
                    <div className="children-container" style={{display: 'inline-block'}}>
                        {children}
                    </div>
                    <ChildCopies children={children}/>
                </div>

                <div style={{...sideNav, top: 0, right: 0, width: childWidth}} onClick={this.onNavClick(SliderSide.RIGHT)}>
                    <img src={`data:image/svg+xml;utf-8,${arrowImg}`} style={navButtonRight} />
                </div>
            </div>
        );
    }

    componentDidMount(){
        let childWidth = this.refs.slider.querySelector(".children-container > div").offsetWidth;
        let childHeight = this.refs.slider.querySelector(".children-container > div").offsetHeight;
        let initialLeft = -(childWidth * this.props.children.length * 2);

        this.setState({
            initialLeft,
            left: initialLeft,
            childWidth,
            childHeight,
            animationFlag: false
        });
    };

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
                    left: this.state.left - this.state.childWidth,
                    slideCount: this.state.slideCount - 1
                });

                break;
            case SliderSide.RIGHT:
                this.setState({
                    left: this.state.left + this.state.childWidth,
                    slideCount: this.state.slideCount + 1
                });

                break;
        }
    }
}

Slider.propTypes = {

};

Slider.defaultProps = {
    animationDelay: 200
};

export default Slider;