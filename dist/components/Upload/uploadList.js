import React from 'react';
import Icon from '../Icon/icon';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "meow-upload-list" }, fileList.map(function (item) { return (React.createElement("li", { className: "meow-upload-list-item", key: item.uid },
        React.createElement("span", { className: "meow-file-name meow-file-name-" + item.status },
            React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
            item.filename),
        React.createElement("span", { className: "meow-file-status" },
            (item.status === 'progress' || item.status === 'ready') && React.createElement(Icon, { icon: "spinner", spin: true, theme: "primary" }),
            item.status === 'success' && React.createElement(Icon, { icon: "check-circle", theme: "success" }),
            item.status === 'error' && React.createElement(Icon, { icon: "times-circle", theme: "danger" })),
        React.createElement("span", { className: "meow-file-actions" },
            React.createElement(Icon, { icon: "times", onClick: function () { onRemove(item); } })),
        item.status === 'progress' &&
            React.createElement("progress", { style: { width: '100%' }, value: item.percent || 0, max: "100" }))); })));
};
export default UploadList;
