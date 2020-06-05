var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { MenuContext } from './menu';
import Transition from '../Transition/transition';
var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setMenuOpen = _a[1];
    var classes = classNames('meow-menu-item meow-submenu-item', className, {
        'is-active': context.index === index
    });
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    var handleClick = function (e) {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) {
            handleMouse(e, true);
        },
        onMouseLeave: function (e) {
            handleMouse(e, false);
        }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('meow-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, childIndex) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + childIndex
                });
            }
            else {
                console.error('Wraning: subMenu has a child which is not a MenuItem component');
            }
            return child;
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 200, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "meow-submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon", style: { transform: menuOpen ? 'rotate(0.5turn)' : 'rotate(0)' } })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
