(function(d){function c(a){this.el=a;this.el.style.strokeDasharray=this.el.style.strokeDashoffset=this.el.getTotalLength()}c.prototype._draw=function(a){this.el.style.strokeDashoffset=this.el.getTotalLength()*(1-a)};c.prototype.setProgress=function(a,b){this._draw(a);if(b&&typeof b==="function"){setTimeout(b,200)}};c.prototype.setProgressFn=function(a){if(typeof a==="function"){a(this)}};d.PathLoader=c})(window);