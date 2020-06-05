import React, { useState } from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Button from './components/Button/button';
import Input from './components/Input/input';
var App = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    var _b = useState(''), value = _b[0], setValue = _b[1];
    return (React.createElement("div", { className: "App" },
        React.createElement(Icon, { theme: "primary", icon: "arrow-down", size: "10x" }),
        React.createElement("header", { className: "App-header" },
            React.createElement(Menu, { defaultIndex: '0', mode: "horizontal" },
                React.createElement(MenuItem, null, "meow-menu-item-1"),
                React.createElement(MenuItem, { disabled: true }, "meow-menu-item-2"),
                React.createElement(SubMenu, { title: "dropdown" },
                    React.createElement(MenuItem, null, "meow-submenu-item-1"),
                    React.createElement(MenuItem, null, "meow-submenu-item-2")),
                React.createElement(MenuItem, null, "meow-menu-item-3")),
            React.createElement(Button, { size: "lg", onClick: function () { setShow(!show); } }, "Toggle"),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-top", wrapper: true },
                React.createElement(Button, { size: 'lg', btnType: 'primary' }, "\u54C8\u54C8")),
            React.createElement(Input, { type: "text", value: value, icon: "calendar", onChange: function (e) { return setValue(e.target.value); } }))));
};
export default App;
