/*! accessible-image-lazy-load v1.3.3 (c) 2024 Jorge Moreno, moro.es (@alterebro) https://moro.es/projects/gandul-accessible-image-lazy-loading/ */
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
                        "data-href": "src",
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
                _img.addEventListener("load", function(e) {
                    var _this = this;
                    window.setTimeout(function() {
                        _this.classList.add("gandul-active");
                    }, 50);
                    if (!!action && typeof action === "function") {
                        action(_img);
                    }
                });
                var _atts = el.attributes;
                for (var i = 0; i < _atts.length; i++) {
                    _img.setAttribute(_replaceAttr(_atts[i].nodeName), _atts[i].nodeValue);
                }
                _parent.replaceChild(_img, el);
            };
            var gandulCallback = function gandulCallback(entries) {
                [].forEach.call(entries, function(entry) {
                    if (entry.isIntersecting) {
                        gandulObserver.unobserve(entry.target);
                        gandulDefaultAction(entry.target);
                    }
                });
            };
            var gandulTarget = document.querySelectorAll(target);
            var _io = "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype && "isIntersecting" in window.IntersectionObserverEntry.prototype;
            var gandulObserver = _io ? new IntersectionObserver(gandulCallback, gandulOptions) : false;
            [].forEach.call(gandulTarget, function(_target) {
                _io ? gandulObserver.observe(_target) : gandulDefaultAction(_target);
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