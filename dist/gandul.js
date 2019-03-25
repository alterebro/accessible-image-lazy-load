/*! accessible-image-lazy-load v1.1.4 (c) 2019 Jorge Moreno, moro.es (@alterebro) https://github.com/alterebro/accessible-image-lazy-load#readme */
"use strict";

(function(global) {
    "use strict";
    var module_name = "gandul";
    var factory = function factory() {
        var gandul = function gandul() {
            var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "a.gandul";
            var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var defaults = {
                root: null,
                rootMargin: "50px 0px 50px 0px",
                threshold: 0
            };
            var gandulOptions = Object.assign({}, defaults, opts);
            var gandulDefaultAction = function gandulDefaultAction(el) {
                var _replaceAttr = function _replaceAttr(input) {
                    var _attr = {
                        href: "src",
                        "data-srcset": "srcset",
                        "data-sizes": "sizes",
                        "data-width": "width"
                    };
                    return !(input in _attr) ? input : _attr[input];
                };
                var _truncateStr = function _truncateStr(str) {
                    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
                    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";
                    return str.length > size ? str.substring(0, size - end.length) + end : str;
                };
                var _parent = el.parentNode;
                var _img = document.createElement("img");
                _img.alt = _truncateStr(el.innerText);
                var _atts = el.attributes;
                for (var i = 0; i < _atts.length; i++) {
                    _img.setAttribute(_replaceAttr(_atts[i].nodeName), _atts[i].nodeValue);
                }
                _parent.replaceChild(_img, el);
                console.log(_img);
                _img.addEventListener("load", function(e) {
                    console.log(e, this);
                });
            };
            var gandulCallback = function gandulCallback(entries) {
                [].forEach.call(entries, function(entry) {
                    if (entry.isIntersecting) {
                        gandulObserver.unobserve(entry.target);
                        if (!!action && typeof action === "function") {
                            action(entry.target);
                        } else {
                            gandulDefaultAction(entry.target);
                        }
                    }
                });
            };
            var gandulObserver = new IntersectionObserver(gandulCallback, gandulOptions);
            var gandulTarget = document.querySelectorAll(target);
            [].forEach.call(gandulTarget, function(_target) {
                gandulObserver.observe(_target);
            });
            return !!gandulTarget.length;
        };
        return gandul;
    };
    if (typeof exports === "function") {
        return module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        return define([], factory);
    } else {
        return global[module_name] = factory();
    }
})(typeof self !== "undefined" ? self : void 0);