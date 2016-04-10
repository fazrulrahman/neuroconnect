/*
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
(function(d) {
    function f(h) {
        return new RegExp("(^|\\s+)" + h + "(\\s+|$)")
    }
    var g, e, b;
    if ("classList" in document.documentElement) {
        g = function(i, h) {
            return i.classList.contains(h)
        };
        e = function(i, h) {
            i.classList.add(h)
        };
        b = function(i, h) {
            i.classList.remove(h)
        }
    } else {
        g = function(i, h) {
            return f(h).test(i.className)
        };
        e = function(i, h) {
            if (!g(i, h)) {
                i.className = i.className + " " + h
            }
        };
        b = function(i, h) {
            i.className = i.className.replace(f(h), " ")
        }
    }

    function a(h, i) {
        var j = g(h, i) ? b : e;
        j(h, i)
    }
    var c = {
        hasClass: g,
        addClass: e,
        removeClass: b,
        toggleClass: a,
        has: g,
        add: e,
        remove: b,
        toggle: a
    };
    if (typeof define === "function" && define.amd) {
        define(c)
    } else {
        d.classie = c
    }
})(window);
