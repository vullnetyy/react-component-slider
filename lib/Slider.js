'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keymirror = require('keymirror');

var _keymirror2 = _interopRequireDefault(_keymirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderSide = (0, _keymirror2.default)({
    LEFT: null,
    RIGHT: null
});

var rootStyle = {
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
};

var sideNav = {
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

var navButton = {
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

var navButtonLeft = _extends({}, navButton, {
    backgroundImage: 'url(/assets/img/next.svg)',
    transform: 'translate(-50%, -50%) rotate(180deg)'
});

var navButtonRight = _extends({}, navButton, {
    backgroundImage: 'url(/assets/img/next.svg)'
});

var ChildCopies = function ChildCopies(props) {
    return _react2.default.createElement(
        'div',
        { style: { display: 'inline-block' } },
        props.children,
        props.children
    );
};

var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

        _this.onNavClick = _this.onNavClick.bind(_this);
        _this.state = {
            slideCount: 0,
            childWidth: 150,
            childHeight: 1
        };

        _this.state.initialLeft = 0;
        _this.state.left = _this.state.initialLeft;
        _this.state.animationFlag = true;
        _this.clickWait = false;
        return _this;
    }

    _createClass(Slider, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var animationDelay = _props.animationDelay;
            var _state = this.state;
            var childWidth = _state.childWidth;
            var childHeight = _state.childHeight;


            var transform = 'translateX(' + this.state.left + 'px)';
            var transition = this.state.animationFlag && 'all .' + animationDelay + 's ease-in-out' || 'none';

            return _react2.default.createElement(
                'div',
                { style: _extends({}, rootStyle, { height: childHeight }), ref: 'slider' },
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, sideNav, { top: 0, left: 0, width: childWidth }), onClick: this.onNavClick(SliderSide.LEFT) },
                    _react2.default.createElement('a', { style: navButtonLeft })
                ),
                _react2.default.createElement(
                    'div',
                    { style: {
                            width: this.props.children.length * 5 * childWidth + 'px',
                            transform: transform,
                            transition: transition
                        } },
                    _react2.default.createElement(ChildCopies, { children: children }),
                    _react2.default.createElement(
                        'div',
                        { className: 'children-container', style: { display: 'inline-block' } },
                        children
                    ),
                    _react2.default.createElement(ChildCopies, { children: children })
                ),
                _react2.default.createElement(
                    'div',
                    { style: _extends({}, sideNav, { top: 0, right: 0, width: childWidth }), onClick: this.onNavClick(SliderSide.RIGHT) },
                    _react2.default.createElement('a', { style: navButtonRight })
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var childWidth = this.refs.slider.querySelector(".children-container > div").offsetWidth;
            var childHeight = this.refs.slider.querySelector(".children-container > div").offsetHeight;
            var initialLeft = -(childWidth * this.props.children.length * 2);

            this.setState({
                initialLeft: initialLeft,
                left: initialLeft,
                childWidth: childWidth,
                childHeight: childHeight,
                animationFlag: false
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (!this.state.animationFlag) {
                setTimeout(function () {
                    _this2.setState({
                        animationFlag: true
                    });
                }, this.props.animationDelay);
                return;
            }

            if (Math.abs(this.state.slideCount) === this.props.children.length) {
                setTimeout(function () {

                    _this2.setState({
                        left: _this2.state.initialLeft,
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

    }, {
        key: 'onNavClick',
        value: function onNavClick(side) {
            var _this3 = this;

            return function () {
                if (_this3.state.animationFlag) {
                    if (!_this3.clickWait) {
                        setTimeout(function () {
                            _this3.clickWait = false;
                        }, _this3.props.animationDelay);

                        _this3.navClick(side);
                    }

                    _this3.clickWait = true;
                }
            };
        }
    }, {
        key: 'navClick',
        value: function navClick(side) {
            switch (side) {
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
    }]);

    return Slider;
}(_react.Component);

Slider.propTypes = {};

Slider.defaultProps = {
    animationDelay: 200
};

exports.default = Slider;
module.exports = exports['default'];