(function(a, d, c) {
    var b = d.Modernizr;
    a.CBPQTRotator = function(f, g) {
        this.$el = a(g);
        this._init(f)
    };
    a.CBPQTRotator.defaults = {
        speed: 700,
        easing: "ease",
        interval: 8000
    };
    a.CBPQTRotator.prototype = {
        _init: function(f) {
            this.options = a.extend(true, {}, a.CBPQTRotator.defaults, f);
            this._config();
            this.$items.eq(this.current).addClass("quote-current");
            if (this.support) {
                this._setTransition()
            }
            this._startRotator()
        },
        _config: function() {
            this.$items = this.$el.children("div.quote-content");
            this.itemsCount = this.$items.length;
            this.current = 0;
            this.support = b.csstransitions;
            if (this.support) {
                this.$progress = a('<span class="quote-progress"></span>').appendTo(this.$el)
            }
        },
        _setTransition: function() {
            setTimeout(a.proxy(function() {
                this.$items.css("transition", "opacity " + this.options.speed + "ms " + this.options.easing)
            }, this), 25)
        },
        _startRotator: function() {
            if (this.support) {
                this._startProgress()
            }
            setTimeout(a.proxy(function() {
                if (this.support) {
                    this._resetProgress()
                }
                this._next();
                this._startRotator()
            }, this), this.options.interval)
        },
        _next: function() {
            this.$items.eq(this.current).removeClass("quote-current");
            this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
            this.$items.eq(this.current).addClass("quote-current")
        },
        _startProgress: function() {
            setTimeout(a.proxy(function() {
                this.$progress.css({
                    transition: "width " + this.options.interval + "ms linear",
                    width: "100%"
                })
            }, this), 25)
        },
        _resetProgress: function() {
            this.$progress.css({
                transition: "none",
                width: "0%"
            })
        },
        destroy: function() {
            if (this.support) {
                this.$items.css("transition", "none");
                this.$progress.remove()
            }
            this.$items.removeClass("quote-current").css({
                position: "relative",
                "z-index": 100,
                "pointer-events": "auto",
                opacity: 1
            })
        }
    };
    var e = function(f) {
        if (d.console) {
            d.console.error(f)
        }
    };
    a.fn.cbpQTRotator = function(f) {
        if (typeof f === "string") {
            var g = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var h = a.data(this, "cbpQTRotator");
                if (!h) {
                    e("cannot call methods on cbpQTRotator prior to initialization; attempted to call method '" + f + "'");
                    return
                }
                if (!a.isFunction(h[f]) || f.charAt(0) === "_") {
                    e("no such method '" + f + "' for cbpQTRotator instance");
                    return
                }
                h[f].apply(h, g)
            })
        } else {
            this.each(function() {
                var h = a.data(this, "cbpQTRotator");
                if (h) {
                    h._init()
                } else {
                    h = a.data(this, "cbpQTRotator", new a.CBPQTRotator(f, this))
                }
            })
        }
        return this
    }
})(jQuery, window);