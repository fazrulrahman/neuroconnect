(function() {
    var t, K, A, I, H, C, D, x = true;
    L();
    B();
    y();

    function L() {
        t = window.innerWidth;
        K = window.innerHeight;
        D = {
            x: t / 2,
            y: K / 2
        };
        A = document.getElementById("header");
        A.style.height = K + "px";
        I = document.getElementById("canvas");
        I.width = t;
        I.height = K;
        H = I.getContext("2d");
        C = [];
        for (var h = 0; h < t; h = h + t / 20) {
            for (var g = 0; g < K; g = g + K / 20) {
                var k = h + Math.random() * t / 20;
                var c = g + Math.random() * K / 20;
                var b = {
                    x: k,
                    originX: k,
                    y: c,
                    originY: c
                };
                C.push(b)
            }
        }
        for (var m = 0; m < C.length; m++) {
            var i = [];
            var a = C[m];
            for (var d = 0; d < C.length; d++) {
                var f = C[d];
                if (!(a == f)) {
                    var j = false;
                    for (var e = 0; e < 5; e++) {
                        if (!j) {
                            if (i[e] == undefined) {
                                i[e] = f;
                                j = true
                            }
                        }
                    }
                    for (var e = 0; e < 5; e++) {
                        if (!j) {
                            if (G(a, f) < G(a, i[e])) {
                                i[e] = f;
                                j = true
                            }
                        }
                    }
                }
            }
            a.closest = i
        }
        for (var m in C) {
            var l = new w(C[m], 2 + Math.random() * 2, "rgba(255,255,255,0.3)");
            C[m].circle = l
        }
    }

    function y() {
        if (!("ontouchstart" in window)) {
            window.addEventListener("mousemove", E)
        }
        window.addEventListener("scroll", F);
        window.addEventListener("resize", u)
    }

    function E(a) {
        var b = posy = 0;
        if (a.pageX || a.pageY) {
            b = a.pageX;
            posy = a.pageY
        } else {
            if (a.clientX || a.clientY) {
                b = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = a.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
        }
        D.x = b;
        D.y = posy
    }

    function F() {
        if (document.body.scrollTop > K) {
            x = false
        } else {
            x = true
        }
    }

    function u() {
        t = window.innerWidth;
        K = window.innerHeight;
        A.style.height = K + "px";
        I.width = t;
        I.height = K
    }

    function B() {
        z();
        for (var a in C) {
            J(C[a])
        }
    }

    function z() {
        if (x) {
            H.clearRect(0, 0, t, K);
            for (var a in C) {
                if (Math.abs(G(D, C[a])) < 4000) {
                    C[a].active = 0.3;
                    C[a].circle.active = 0.6
                } else {
                    if (Math.abs(G(D, C[a])) < 20000) {
                        C[a].active = 0.1;
                        C[a].circle.active = 0.3
                    } else {
                        if (Math.abs(G(D, C[a])) < 40000) {
                            C[a].active = 0.02;
                            C[a].circle.active = 0.1
                        } else {
                            C[a].active = 0;
                            C[a].circle.active = 0
                        }
                    }
                }
                v(C[a]);
                C[a].circle.draw()
            }
        }
        requestAnimationFrame(z)
    }

    function J(a) {
        TweenLite.to(a, 1 + 1 * Math.random(), {
            x: a.originX - 50 + Math.random() * 100,
            y: a.originY - 50 + Math.random() * 100,
            ease: Circ.easeInOut,
            onComplete: function() {
                J(a)
            }
        })
    }

    function v(a) {
        if (!a.active) {
            return
        }
        for (var b in a.closest) {
            H.beginPath();
            H.moveTo(a.x, a.y);
            H.lineTo(a.closest[b].x, a.closest[b].y);
            H.strokeStyle = "rgba(156,217,249," + a.active + ")";
            H.stroke()
        }
    }

    function w(a, c, b) {
        var d = this;
        (function() {
            d.pos = a || null;
            d.radius = c || null;
            d.color = b || null
        })();
        this.draw = function() {
            if (!d.active) {
                return
            }
            H.beginPath();
            H.arc(d.pos.x, d.pos.y, d.radius, 0, 2 * Math.PI, false);
            H.fillStyle = "rgba(156,217,249," + d.active + ")";
            H.fill()
        }
    }

    function G(b, a) {
        return Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)
    }
})();
(function() {
    var c = document.getElementById("page"),
        d = document.getElementById("home-page"),
        e = [].slice.call(c.querySelectorAll("a.new-page")),
        b = new SVGLoader(document.getElementById("loader"), {
            speedIn: 100
        });

    function a() {
        e.forEach(function(f) {
            f.addEventListener("click", function(h) {
                h.preventDefault();
                var g = document.getElementById(this.getAttribute("rel"));
                b.show();
                setTimeout(function() {
                    b.hide();
                    classie.removeClass(d, "show");
                    d = g;
                    classie.addClass(d, "show")
                }, 2000)
            })
        })
    }
    a()
})();

(function() {
    var tbody = document.getElementById("technotainmentbody");
    var ttriggerBttn = tbody.getElementsByTagName('figure'),
        toverlay = document.querySelector('div.technotainment-lay'),
        tcloseBttn = toverlay.querySelector('button.technotainment-close');
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    }, transEndEventName = transEndEventNames[Modernizr.prefixed('transition')], support = {
        transitions: Modernizr.csstransitions
    };

    function technotainmentToggleOverlay() {
		if (classie.has(toverlay, 'open')) {
            classie.remove(toverlay, 'open');
            classie.add(toverlay, 'close');
            var onEndTransitionFn = function(ev) {
                classie.remove(toverlay, 'close');
            };
            setTimeout(onEndTransitionFn(), 600);
        } else if (!classie.has(toverlay, 'close')) {
            classie.add(toverlay, 'open');
        }
    }
    for (i = 0, len = ttriggerBttn.length; i < len; i++) {
        ttriggerBttn[i].addEventListener('click', technotainmentToggleOverlay);
    }
    tcloseBttn.addEventListener('click', technotainmentToggleOverlay);
})();

//For Workshops

(function() {
    var wbody = document.getElementById("workshopbody");
    var wtriggerBttn = wbody.getElementsByTagName('figure'),
        woverlay = document.querySelector('div.workshop-lay'),
        wcloseBttn = woverlay.querySelector('button.workshop-close');
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    }, transEndEventName = transEndEventNames[Modernizr.prefixed('transition')], support = {
        transitions: Modernizr.csstransitions
    };

    function workshopToggleOverlay() {
		if (classie.has(woverlay, 'open')) {
            classie.remove(woverlay, 'open');
            classie.add(woverlay, 'close');
            var onEndTransitionFn = function(ev) {
                classie.remove(woverlay, 'close');
            };
            setTimeout(onEndTransitionFn(), 600);
        } else if (!classie.has(woverlay, 'close')) {
            classie.add(woverlay, 'open');
        }
    }
    for (i = 0, len = wtriggerBttn.length; i < len; i++) {
        wtriggerBttn[i].addEventListener('click', workshopToggleOverlay);
    }
    wcloseBttn.addEventListener('click', workshopToggleOverlay);
})();

//For Events

(function() {
    var ebody = document.getElementById("eventbody");
    var triggerBttn = ebody.getElementsByTagName('figure'),
        overlay = document.querySelector('div.event-lay'),
        closeBttn = overlay.querySelector('button.event-close');
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    }, transEndEventName = transEndEventNames[Modernizr.prefixed('transition')], support = {
        transitions: Modernizr.csstransitions
    };

    function eventToggleOverlay() {
		if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.add(overlay, 'close');
            var onEndTransitionFn = function(ev) {
                classie.remove(overlay, 'close');
            };
            setTimeout(onEndTransitionFn(), 600);
        } else if (!classie.has(overlay, 'close')) {
            classie.add(overlay, 'open');
        }
    }
    for (i = 0, len = triggerBttn.length; i < len; i++) {
        triggerBttn[i].addEventListener('click', eventToggleOverlay);
    }
    closeBttn.addEventListener('click', eventToggleOverlay);
})();

//For Powertalks

(function() {
    var pbody = document.getElementById("powertalkbody");
    var ptriggerBttn = pbody.getElementsByTagName('figure'),
        poverlay = document.querySelector('div.powertalk-lay'),
        pcloseBttn = poverlay.querySelector('button.powertalk-close');
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    }, transEndEventName = transEndEventNames[Modernizr.prefixed('transition')], support = {
        transitions: Modernizr.csstransitions
    };

    function powertalkToggleOverlay() {
		if (classie.has(poverlay, 'open')) {
            classie.remove(poverlay, 'open');
            classie.add(poverlay, 'close');
            var onEndTransitionFn = function(ev) {
                classie.remove(poverlay, 'close');
            };
            setTimeout(onEndTransitionFn(), 600);
        } else if (!classie.has(poverlay, 'close')) {
            classie.add(poverlay, 'open');
        }
    }
    for (i = 0, len = ptriggerBttn.length; i < len; i++) {
        ptriggerBttn[i].addEventListener('click', powertalkToggleOverlay);
    }
    pcloseBttn.addEventListener('click', powertalkToggleOverlay);
})();