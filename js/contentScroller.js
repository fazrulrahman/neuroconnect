(function(d) {
    var h = d.document.documentElement;

    function c() {
        var j = h.clientHeight,
            i = d.innerHeight;
        if (j < i) {
            return i
        } else {
            return j
        }
    }

    function e() {
        return d.pageYOffset || h.scrollTop
    }

    function f(j) {
        var k = 0,
            i = 0;
        do {
            if (!isNaN(j.offsetTop)) {
                k += j.offsetTop
            }
            if (!isNaN(j.offsetLeft)) {
                i += j.offsetLeft
            }
        } while (j = j.offsetParent);
        return {
            top: k,
            left: i
        }
    }

    function b(k, o) {
        var n = k.offsetHeight,
            i = e(),
            j = i + c(),
            m = f(k).top,
            l = m + n,
            o = o || 0;
        return (m + n * o) <= j && (l) >= i
    }

    function g(j, i) {
        for (var k in i) {
            if (i.hasOwnProperty(k)) {
                j[k] = i[k]
            }
        }
        return j
    }

    function a(j, i) {
        this.el = j;
        this.options = g(this.defaults, i);
        this._init()
    }
    a.prototype = {
        defaults: {
            viewportFactor: 0.2
        },
        _init: function() {
            if (Modernizr.touch) {
                return
            }
            this.sections = Array.prototype.slice.call(this.el.querySelectorAll(".content-section"));
            this.didScroll = false;
            var j = this;
            this.sections.forEach(function(m, l) {
                if (!b(m)) {
                    classie.add(m, "slider-init")
                }
            });
            var k = function() {
                if (!j.didScroll) {
                    j.didScroll = true;
                    setTimeout(function() {
                        j._scrollPage()
                    }, 60)
                }
            }, i = function() {
                    function l() {
                        j._scrollPage();
                        j.resizeTimeout = null
                    }
                    if (j.resizeTimeout) {
                        clearTimeout(j.resizeTimeout)
                    }
                    j.resizeTimeout = setTimeout(l, 200)
                };
            d.addEventListener("scroll", k, false);
            d.addEventListener("resize", i, false)
        },
        _scrollPage: function() {
            var i = this;
            this.sections.forEach(function(k, j) {
                if (b(k, i.options.viewportFactor)) {
                    classie.add(k, "animate")
                } else {
                    classie.add(k, "slider-init");
                    classie.remove(k, "animate")
                }
            });
            this.didScroll = false
        }
    };
    d.cbpScroller = a
})(window);
