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

                let _atts = el.attributes;
                for ( let i = 0; i < _atts.length; i++ ) {
                    _img.setAttribute( _replaceAttr(_atts[i].nodeName), _atts[i].nodeValue );
                }

                // _parent.insertBefore(_img, el);
                // _parent.removeChild(el);
                _parent.replaceChild(_img, el);

                window.setTimeout(function() { _img.classList.add("gandul-active") }, 500);
            }

            // Observer callback
            const gandulCallback = function(entries) {

                [].forEach.call(entries, (entry) => {

                    if (entry.isIntersecting) {

                        // Stop observing element
                        gandulObserver.unobserve(entry.target);

                        // Action here...
                        if ( !!action && typeof(action) === "function" ) { action(entry.target); }
                        else { gandulDefaultAction(entry.target); }
                    }
                });
            }

            // Observer itself
            const gandulObserver = new IntersectionObserver(gandulCallback, gandulOptions );

            // Get all elements to observe
            const gandulTarget = document.querySelectorAll(target);
            [].forEach.call(
                gandulTarget,
                function(_target) { gandulObserver.observe(_target); }
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
