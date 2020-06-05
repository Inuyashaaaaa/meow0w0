import React, { useState, createContext } from 'react';
import classNames from 'classnames';
export var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultIndex = props.defaultIndex, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), active = _a[0], setActive = _a[1];
    var classes = classNames('meow-menu', className, {
        'meow-menu-vertical': mode === 'vertical',
        'meow-menu-horizontal': mode === 'horizontal'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: active ? active : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error('Wraning: Menu has a child which is not a MenuItem component');
            }
            return child;
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "meow-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    defaultIndex: '0',
    defaultOpenSubMenus: []
};
export default Menu;
