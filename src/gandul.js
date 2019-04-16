;(function(global){

    "use strict";
    const module_name = "gandul";
    const factory = function(){

        const gandul = function(target = "a.gandul", opts = {}, action = null) {

            // Options
            const defaults = {
                root: null,
                rootMargin: "50px 0px 50px 0px",
                threshold: 0
            };
            const gandulOptions = Object.assign({}, defaults, opts);

            // Default Action
            const gandulDefaultAction = function(el) {

                let _replaceAttr = function(input) {
                    let _attr = {
                        "href" : "src",
                        "data-href" : "src",
                        "data-srcset" : "srcset",
                        "data-sizes" : "sizes",
                        "data-width" : "width"
                    }
                    return !(input in _attr) ? input : _attr[input];
                }

                let _truncateStr = function(str, size=100, end="...") {
                    return (str.length > size) ?  str.substring(0, size - end.length) + end : str;
                };

                // Default Action
                let _parent = el.parentNode;
                let _img = document.createElement("img");
                    _img.alt = _truncateStr(el.innerText);
                    _img.addEventListener("load", function(e) {

                        window.setTimeout(() => {
                            this.classList.add("gandul-active");
                        }, 50);

                        // Callback time
                        if ( !!action && typeof(action) === "function" ) { action(_img); }
                    });

                let _atts = el.attributes;
                for ( let i = 0; i < _atts.length; i++ ) {
                    _img.setAttribute( _replaceAttr(_atts[i].nodeName), _atts[i].nodeValue );
                }

                _parent.replaceChild(_img, el);

            }

            // Observer callback
            const gandulCallback = function(entries) {

                [].forEach.call(entries, (entry) => {

                    if (entry.isIntersecting) {

                        // Stop observing element and execute the action
                        gandulObserver.unobserve(entry.target);
                        gandulDefaultAction(entry.target);
                    }
                });
            }

            // Get all elements to observe
            const gandulTarget = document.querySelectorAll(target);

                // Filter out non IntersectionObesrver browsers
                const _io = ('IntersectionObserver' in window &&
                    'IntersectionObserverEntry' in window &&
                    'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
                    'isIntersecting' in window.IntersectionObserverEntry.prototype
                );

                // Observer itself
                const gandulObserver = (_io) ? new IntersectionObserver(gandulCallback, gandulOptions ) : false;

                // Iterate over the items
                [].forEach.call(
                    gandulTarget,
                    function(_target) {
                        (_io) ? gandulObserver.observe(_target) : gandulDefaultAction(_target);
                    }
                );

            return !!gandulTarget.length;
        };

        return gandul;
    };


    // --------------------------------


    if (typeof exports === "function") {
        return module.exports = factory();
    }
    else if (typeof define === "function" && define.amd) {
        return define([], factory);
    }
    else {
        return global[module_name] = factory();
    }

})(typeof self !== 'undefined' ? self : this);
