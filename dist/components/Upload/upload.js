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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Dragger from './dragger';
import UploadList from './uploadList';
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, onSuccess = props.onSuccess, onError = props.onError, onProgress = props.onProgress, beforeUpload = props.beforeUpload, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var inputRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var UploadFileStatus = function (_file, updateObj) {
        setFileList(function (prevFileList) { return prevFileList.map(function (file) {
            if (file.uid === _file.uid) {
                return __assign(__assign({}, _file), updateObj);
            }
            else {
                return file;
            }
        }); });
    };
    var handleChange = function (e) {
        console.log('handleChange');
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var fileArr = Array.from(files);
        fileArr.forEach(function (file) {
            if (beforeUpload) {
                var results = beforeUpload(file);
                if (results && results instanceof Promise) {
                    results.then(function (file) { return postFile(file); });
                }
                else if (results === true) {
                    postFile(file);
                }
            }
            else {
                postFile(file);
            }
        });
    };
    var postFile = function (file) {
        var _file = {
            uid: Date.now() + " - " + Math.random(),
            size: file.size,
            filename: file.name,
            percent: 0,
            status: 'ready',
            raw: file
        };
        // setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArrays([_file], prevList);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (progress) {
                var percent = Math.round(progress.loaded / progress.total * 100);
                console.log(percent);
                // if (percent === 100) return
                UploadFileStatus(_file, {
                    percent: percent,
                    status: 'progress'
                });
                if (onProgress) {
                    onProgress(percent, file);
                }
            }
        })
            .then(function (res) {
            UploadFileStatus(_file, {
                status: 'success',
                response: res
            });
            if (onSuccess)
                onSuccess(res.data, file);
            if (onChange)
                onChange(file);
        })
            .catch(function (err) {
            UploadFileStatus(_file, {
                status: 'error',
                error: err
            });
            if (onError)
                onError(err, file);
            if (onChange)
                onChange(file);
        });
    };
    var handleClick = function (e) {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    return (React.createElement("div", { className: "meow-upload-component" },
        React.createElement("div", { className: "meow-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ?
                React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) :
                children,
            React.createElement("input", { className: "meow-file-input", style: { display: 'none' }, ref: inputRef, onChange: handleChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
