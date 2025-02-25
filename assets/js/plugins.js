/*!
 * backgroundVideo.js v2.0.3
 * https://github.com/linnett/backgroundVideo
 */
!(function (a, b, c, d) {
  "use strict";
  function e(b, c) {
    function d() {
      (e.options.originalVideoW = e.options.$video[0].videoWidth), (e.options.originalVideoH = e.options.$video[0].videoHeight), e.initialised || e.init();
    }
    var e = this;
    (this.element = b), (this.options = a.extend({}, g, c)), (this._defaults = g), (this._name = f), (this.options.$video = a(b)), this.detectBrowser(), this.shimRequestAnimationFrame(), (this.options.has3d = this.detect3d()), this.options.$videoWrap.css({ position: "relative", overflow: "hidden", "z-index": "10" }), this.options.$video.css({ position: "absolute", "z-index": "1" }), this.options.$video.on("canplay canplaythrough", d), this.options.$video[0].readyState > 3 && d();
  }
  var f = "backgroundVideo",
    g = { $videoWrap: a(".video-wrapper-inner"), $outerWrap: a(b), $window: a(b), minimumVideoWidth: 400, preventContextMenu: !1, parallax: !0, parallaxOptions: { effect: 1.5 }, pauseVideoOnViewLoss: !1 };
  (e.prototype = {
    init: function () {
      var a = this;
      (this.initialised = !0),
        (this.lastPosition = -1),
        (this.ticking = !1),
        this.options.$window.resize(function () {
          a.positionObject();
        }),
        this.options.parallax &&
          this.options.$window.on("scroll", function () {
            a.update();
          }),
        this.options.pauseVideoOnViewLoss && this.playPauseVideo(),
        this.options.preventContextMenu &&
          this.options.$video.on("contextmenu", function () {
            return !1;
          }),
        this.options.$window.trigger("resize");
    },
    requestTick: function () {
      var a = this;
      this.ticking || (b.requestAnimationFrame(a.positionObject.bind(a)), (this.ticking = !0));
    },
    update: function () {
      (this.lastPosition = b.pageYOffset), this.requestTick();
    },
    detect3d: function () {
      var a,
        e,
        f = c.createElement("p"),
        g = { WebkitTransform: "-webkit-transform", OTransform: "-o-transform", MSTransform: "-ms-transform", MozTransform: "-moz-transform", transform: "transform" };
      c.body.insertBefore(f, c.body.lastChild);
      for (a in g) f.style[a] !== d && ((f.style[a] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"), (e = b.getComputedStyle(f).getPropertyValue(g[a])));
      return f.parentNode.removeChild(f), e !== d && "none" !== e;
    },
    detectBrowser: function () {
      var a = navigator.userAgent.toLowerCase();
      a.indexOf("chrome") > -1 || a.indexOf("safari") > -1 ? ((this.options.browser = "webkit"), (this.options.browserPrexix = "-webkit-")) : a.indexOf("firefox") > -1 ? ((this.options.browser = "firefox"), (this.options.browserPrexix = "-moz-")) : -1 !== a.indexOf("MSIE") || a.indexOf("Trident/") > 0 ? ((this.options.browser = "ie"), (this.options.browserPrexix = "-ms-")) : a.indexOf("Opera") > -1 && ((this.options.browser = "opera"), (this.options.browserPrexix = "-o-"));
    },
    scaleObject: function () {
      var a, b, c;
      return (
        this.options.$videoWrap.width(this.options.$outerWrap.width()),
        this.options.$videoWrap.height(this.options.$outerWrap.height()),
        (a = this.options.$window.width() / this.options.originalVideoW),
        (b = this.options.$window.height() / this.options.originalVideoH),
        (c = a > b ? a : b),
        c * this.options.originalVideoW < this.options.minimumVideoWidth && (c = this.options.minimumVideoWidth / this.options.originalVideoW),
        this.options.$video.width(c * this.options.originalVideoW),
        this.options.$video.height(c * this.options.originalVideoH),
        { xPos: -parseInt(this.options.$video.width() - this.options.$window.width()) / 2, yPos: parseInt(this.options.$video.height() - this.options.$window.height()) / 2 }
      );
    },
    positionObject: function () {
      var a = this,
        c = b.pageYOffset,
        d = this.scaleObject(this.options.$video, a.options.$videoWrap),
        e = d.xPos,
        f = d.yPos;
      (f = this.options.parallax ? (c >= 0 ? this.calculateYPos(f, c) : this.calculateYPos(f, 0)) : -f), a.options.has3d ? (this.options.$video.css(a.options.browserPrexix + "transform3d", "translate3d(-" + e + "px, " + f + "px, 0)"), this.options.$video.css("transform", "translate3d(" + e + "px, " + f + "px, 0)")) : (this.options.$video.css(a.options.browserPrexix + "transform", "translate(-" + e + "px, " + f + "px)"), this.options.$video.css("transform", "translate(" + e + "px, " + f + "px)")), (this.ticking = !1);
    },
    calculateYPos: function (a, b) {
      var c, d;
      return (c = parseInt(this.options.$videoWrap.offset().top)), (d = c - b), (a = -(d / this.options.parallaxOptions.effect + a));
    },
    disableParallax: function () {
      this.options.$window.unbind(".backgroundVideoParallax");
    },
    playPauseVideo: function () {
      var a = this;
      this.options.$window.on("scroll.backgroundVideoPlayPause", function () {
        a.options.$window.scrollTop() < a.options.$videoWrap.height() ? a.options.$video.get(0).play() : a.options.$video.get(0).pause();
      });
    },
    shimRequestAnimationFrame: function () {
      for (var a = 0, c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !b.requestAnimationFrame; ++d) (b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"]), (b.cancelAnimationFrame = b[c[d] + "CancelAnimationFrame"] || b[c[d] + "CancelRequestAnimationFrame"]);
      b.requestAnimationFrame ||
        (b.requestAnimationFrame = function (c) {
          var d = new Date().getTime(),
            e = Math.max(0, 16 - (d - a)),
            f = b.setTimeout(function () {
              c(d + e);
            }, e);
          return (a = d + e), f;
        }),
        b.cancelAnimationFrame ||
          (b.cancelAnimationFrame = function (a) {
            clearTimeout(a);
          });
    },
  }),
    (a.fn[f] = function (b) {
      return this.each(function () {
        a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b));
      });
    });
})(jQuery, window, document);

/*!
 * Easing.js
 */
!(function (n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (e) {
        return n(e);
      })
    : "object" == typeof module && "object" == typeof module.exports
    ? (exports = n(require("jquery")))
    : n(jQuery);
})(function (n) {
  function e(n) {
    var e = 7.5625,
      t = 2.75;
    return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + 0.75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + 0.9375 : e * (n -= 2.625 / t) * n + 0.984375;
  }
  n.easing.jswing = n.easing.swing;
  var t = Math.pow,
    u = Math.sqrt,
    r = Math.sin,
    i = Math.cos,
    a = Math.PI,
    c = 1.70158,
    o = 1.525 * c,
    s = (2 * a) / 3,
    f = (2 * a) / 4.5;
  n.extend(n.easing, {
    def: "easeOutQuad",
    swing: function (e) {
      return n.easing[n.easing.def](e);
    },
    easeInQuad: function (n) {
      return n * n;
    },
    easeOutQuad: function (n) {
      return 1 - (1 - n) * (1 - n);
    },
    easeInOutQuad: function (n) {
      return n < 0.5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2;
    },
    easeInCubic: function (n) {
      return n * n * n;
    },
    easeOutCubic: function (n) {
      return 1 - t(1 - n, 3);
    },
    easeInOutCubic: function (n) {
      return n < 0.5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2;
    },
    easeInQuart: function (n) {
      return n * n * n * n;
    },
    easeOutQuart: function (n) {
      return 1 - t(1 - n, 4);
    },
    easeInOutQuart: function (n) {
      return n < 0.5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2;
    },
    easeInQuint: function (n) {
      return n * n * n * n * n;
    },
    easeOutQuint: function (n) {
      return 1 - t(1 - n, 5);
    },
    easeInOutQuint: function (n) {
      return n < 0.5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2;
    },
    easeInSine: function (n) {
      return 1 - i((n * a) / 2);
    },
    easeOutSine: function (n) {
      return r((n * a) / 2);
    },
    easeInOutSine: function (n) {
      return -(i(a * n) - 1) / 2;
    },
    easeInExpo: function (n) {
      return 0 === n ? 0 : t(2, 10 * n - 10);
    },
    easeOutExpo: function (n) {
      return 1 === n ? 1 : 1 - t(2, -10 * n);
    },
    easeInOutExpo: function (n) {
      return 0 === n ? 0 : 1 === n ? 1 : n < 0.5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2;
    },
    easeInCirc: function (n) {
      return 1 - u(1 - t(n, 2));
    },
    easeOutCirc: function (n) {
      return u(1 - t(n - 1, 2));
    },
    easeInOutCirc: function (n) {
      return n < 0.5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (n) {
      return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s);
    },
    easeOutElastic: function (n) {
      return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - 0.75) * s) + 1;
    },
    easeInOutElastic: function (n) {
      return 0 === n ? 0 : 1 === n ? 1 : n < 0.5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : (t(2, -20 * n + 10) * r((20 * n - 11.125) * f)) / 2 + 1;
    },
    easeInBack: function (n) {
      return (c + 1) * n * n * n - c * n * n;
    },
    easeOutBack: function (n) {
      return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2);
    },
    easeInOutBack: function (n) {
      return n < 0.5 ? (t(2 * n, 2) * (7.189819 * n - o)) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2;
    },
    easeInBounce: function (n) {
      return 1 - e(1 - n);
    },
    easeOutBounce: e,
    easeInOutBounce: function (n) {
      return n < 0.5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2;
    },
  });
});
/*!
 * Headhesive.js v1.2.3 - An on-demand sticky header
 * Author: Copyright (c) Mark Goodyear <@markgdyr> <http://markgoodyear.com>
 * Url: http://markgoodyear.com/labs/headhesive
 * License: MIT
 */
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], function () {
        return e();
      })
    : "object" == typeof exports
    ? (module.exports = e())
    : (t.Headhesive = e());
})(this, function () {
  "use strict";
  var t = function (e, s) {
      for (var o in s) s.hasOwnProperty(o) && (e[o] = "object" == typeof s[o] ? t(e[o], s[o]) : s[o]);
      return e;
    },
    e = function (t, e) {
      var s,
        o,
        i,
        n =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        l = null,
        c = 0,
        r = function () {
          (c = n()), (l = null), (i = t.apply(s, o)), (s = o = null);
        };
      return function () {
        var f = n(),
          h = e - (f - c);
        return (s = this), (o = arguments), 0 >= h ? (clearTimeout(l), (l = null), (c = f), (i = t.apply(s, o)), (s = o = null)) : l || (l = setTimeout(r, h)), i;
      };
    },
    s = function () {
      return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
    o = function (t, e) {
      for (var s = 0, o = t.offsetHeight; t; ) (s += t.offsetTop), (t = t.offsetParent);
      return "bottom" === e && (s += o), s;
    },
    i = function (e, s) {
      "querySelector" in document && "addEventListener" in window && ((this.visible = !1), (this.options = { offset: 300, offsetSide: "top", classes: { clone: "headhesive", stick: "headhesive--stick", unstick: "headhesive--unstick" }, throttle: 250, onInit: function () {}, onStick: function () {}, onUnstick: function () {}, onDestroy: function () {} }), (this.elem = "string" == typeof e ? document.querySelector(e) : e), (this.options = t(this.options, s)), this.init());
    };
  return (
    (i.prototype = {
      constructor: i,
      init: function () {
        if (((this.clonedElem = this.elem.cloneNode(!0)), (this.clonedElem.className += " " + this.options.classes.clone), document.body.insertBefore(this.clonedElem, document.body.firstChild), "number" == typeof this.options.offset)) this.scrollOffset = this.options.offset;
        else {
          if ("string" != typeof this.options.offset) throw new Error("Invalid offset: " + this.options.offset);
          this._setScrollOffset();
        }
        (this._throttleUpdate = e(this.update.bind(this), this.options.throttle)), (this._throttleScrollOffset = e(this._setScrollOffset.bind(this), this.options.throttle)), window.addEventListener("scroll", this._throttleUpdate, !1), window.addEventListener("resize", this._throttleScrollOffset, !1), this.options.onInit.call(this);
      },
      _setScrollOffset: function () {
        "string" == typeof this.options.offset && (this.scrollOffset = o(document.querySelector(this.options.offset), this.options.offsetSide));
      },
      destroy: function () {
        document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this._throttleUpdate), window.removeEventListener("resize", this._throttleScrollOffset), this.options.onDestroy.call(this);
      },
      stick: function () {
        this.visible || ((this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), "")), (this.clonedElem.className += " " + this.options.classes.stick), (this.visible = !0), this.options.onStick.call(this));
      },
      unstick: function () {
        this.visible && ((this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), "")), (this.clonedElem.className += " " + this.options.classes.unstick), (this.visible = !1), this.options.onUnstick.call(this));
      },
      update: function () {
        s() > this.scrollOffset ? this.stick() : this.unstick();
      },
    }),
    i
  );
});

/*! SmartMenus jQuery Plugin - v1.1.1 - July 23, 2020
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */
(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && "object" == typeof module.exports ? (module.exports = t(require("jquery"))) : t(jQuery);
})(function ($) {
  function initMouseDetection(t) {
    var e = ".smartmenus_mouse";
    if (mouseDetectionEnabled || t) mouseDetectionEnabled && t && ($(document).off(e), (mouseDetectionEnabled = !1));
    else {
      var i = !0,
        s = null,
        o = {
          mousemove: function (t) {
            var e = { x: t.pageX, y: t.pageY, timeStamp: new Date().getTime() };
            if (s) {
              var o = Math.abs(s.x - e.x),
                a = Math.abs(s.y - e.y);
              if ((o > 0 || a > 0) && 4 >= o && 4 >= a && 300 >= e.timeStamp - s.timeStamp && ((mouse = !0), i)) {
                var n = $(t.target).closest("a");
                n.is("a") &&
                  $.each(menuTrees, function () {
                    return $.contains(this.$root[0], n[0]) ? (this.itemEnter({ currentTarget: n[0] }), !1) : void 0;
                  }),
                  (i = !1);
              }
            }
            s = e;
          },
        };
      (o[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"] = function (t) {
        isTouchEvent(t.originalEvent) && (mouse = !1);
      }),
        $(document).on(getEventsNS(o, e)),
        (mouseDetectionEnabled = !0);
    }
  }
  function isTouchEvent(t) {
    return !/^(4|mouse)$/.test(t.pointerType);
  }
  function getEventsNS(t, e) {
    e || (e = "");
    var i = {};
    for (var s in t) i[s.split(" ").join(e + " ") + e] = t[s];
    return i;
  }
  var menuTrees = [],
    mouse = !1,
    touchEvents = "ontouchstart" in window,
    mouseDetectionEnabled = !1,
    requestAnimationFrame =
      window.requestAnimationFrame ||
      function (t) {
        return setTimeout(t, 1e3 / 60);
      },
    cancelAnimationFrame =
      window.cancelAnimationFrame ||
      function (t) {
        clearTimeout(t);
      },
    canAnimate = !!$.fn.animate;
  return (
    ($.SmartMenus = function (t, e) {
      (this.$root = $(t)),
        (this.opts = e),
        (this.rootId = ""),
        (this.accessIdPrefix = ""),
        (this.$subArrow = null),
        (this.activatedItems = []),
        (this.visibleSubMenus = []),
        (this.showTimeout = 0),
        (this.hideTimeout = 0),
        (this.scrollTimeout = 0),
        (this.clickActivated = !1),
        (this.focusActivated = !1),
        (this.zIndexInc = 0),
        (this.idInc = 0),
        (this.$firstLink = null),
        (this.$firstSub = null),
        (this.disabled = !1),
        (this.$disableOverlay = null),
        (this.$touchScrollingSub = null),
        (this.cssTransforms3d = "perspective" in t.style || "webkitPerspective" in t.style),
        (this.wasCollapsible = !1),
        this.init();
    }),
    $.extend($.SmartMenus, {
      hideAll: function () {
        $.each(menuTrees, function () {
          this.menuHideAll();
        });
      },
      destroy: function () {
        for (; menuTrees.length; ) menuTrees[0].destroy();
        initMouseDetection(!0);
      },
      prototype: {
        init: function (t) {
          var e = this;
          if (!t) {
            menuTrees.push(this), (this.rootId = (new Date().getTime() + Math.random() + "").replace(/\D/g, "")), (this.accessIdPrefix = "sm-" + this.rootId + "-"), this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
            var i = ".smartmenus";
            this.$root
              .data("smartmenus", this)
              .attr("data-smartmenus-id", this.rootId)
              .dataSM("level", 1)
              .on(getEventsNS({ "mouseover focusin": $.proxy(this.rootOver, this), "mouseout focusout": $.proxy(this.rootOut, this), keydown: $.proxy(this.rootKeyDown, this) }, i))
              .on(getEventsNS({ mouseenter: $.proxy(this.itemEnter, this), mouseleave: $.proxy(this.itemLeave, this), mousedown: $.proxy(this.itemDown, this), focus: $.proxy(this.itemFocus, this), blur: $.proxy(this.itemBlur, this), click: $.proxy(this.itemClick, this) }, i), "a"),
              (i += this.rootId),
              this.opts.hideOnClick && $(document).on(getEventsNS({ touchstart: $.proxy(this.docTouchStart, this), touchmove: $.proxy(this.docTouchMove, this), touchend: $.proxy(this.docTouchEnd, this), click: $.proxy(this.docClick, this) }, i)),
              $(window).on(getEventsNS({ "resize orientationchange": $.proxy(this.winResize, this) }, i)),
              this.opts.subIndicators && ((this.$subArrow = $("<span/>").addClass("sub-arrow")), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)),
              initMouseDetection();
          }
          if (
            ((this.$firstSub = this.$root
              .find("ul")
              .each(function () {
                e.menuInit($(this));
              })
              .eq(0)),
            (this.$firstLink = this.$root.find("a").eq(0)),
            this.opts.markCurrentItem)
          ) {
            var s = /(index|default)\.[^#\?\/]*/i,
              o = /#.*/,
              a = window.location.href.replace(s, ""),
              n = a.replace(o, "");
            this.$root.find("a:not(.mega-menu a)").each(function () {
              var t = this.href.replace(s, ""),
                i = $(this);
              (t == a || t == n) &&
                (i.addClass("current"),
                e.opts.markCurrentTree &&
                  i.parentsUntil("[data-smartmenus-id]", "ul").each(function () {
                    $(this).dataSM("parent-a").addClass("current");
                  }));
            });
          }
          this.wasCollapsible = this.isCollapsible();
        },
        destroy: function (t) {
          if (!t) {
            var e = ".smartmenus";
            this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").off(e), (e += this.rootId), $(document).off(e), $(window).off(e), this.opts.subIndicators && (this.$subArrow = null);
          }
          this.menuHideAll();
          var i = this;
          this.$root
            .find("ul")
            .each(function () {
              var t = $(this);
              t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.dataSM("shown-before") && ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) && t.css({ width: "", minWidth: "", maxWidth: "" }).removeClass("sm-nowrap"), t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.css({ zIndex: "", top: "", left: "", marginLeft: "", marginTop: "", display: "" })), 0 == (t.attr("id") || "").indexOf(i.accessIdPrefix) && t.removeAttr("id");
            })
            .removeDataSM("in-mega")
            .removeDataSM("shown-before")
            .removeDataSM("scroll-arrows")
            .removeDataSM("parent-a")
            .removeDataSM("level")
            .removeDataSM("beforefirstshowfired")
            .removeAttr("role")
            .removeAttr("aria-hidden")
            .removeAttr("aria-labelledby")
            .removeAttr("aria-expanded"),
            this.$root
              .find("a.has-submenu")
              .each(function () {
                var t = $(this);
                0 == t.attr("id").indexOf(i.accessIdPrefix) && t.removeAttr("id");
              })
              .removeClass("has-submenu")
              .removeDataSM("sub")
              .removeAttr("aria-haspopup")
              .removeAttr("aria-controls")
              .removeAttr("aria-expanded")
              .closest("li")
              .removeDataSM("sub"),
            this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(),
            this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"),
            t || ((this.$root = null), (this.$firstLink = null), (this.$firstSub = null), this.$disableOverlay && (this.$disableOverlay.remove(), (this.$disableOverlay = null)), menuTrees.splice($.inArray(this, menuTrees), 1));
        },
        disable: function (t) {
          if (!this.disabled) {
            if ((this.menuHideAll(), !t && !this.opts.isPopup && this.$root.is(":visible"))) {
              var e = this.$root.offset();
              this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>')
                .css({ position: "absolute", top: e.top, left: e.left, width: this.$root.outerWidth(), height: this.$root.outerHeight(), zIndex: this.getStartZIndex(!0), opacity: 0 })
                .appendTo(document.body);
            }
            this.disabled = !0;
          }
        },
        docClick: function (t) {
          return this.$touchScrollingSub ? ((this.$touchScrollingSub = null), void 0) : (((this.visibleSubMenus.length && !$.contains(this.$root[0], t.target)) || $(t.target).closest("a").length) && this.menuHideAll(), void 0);
        },
        docTouchEnd: function () {
          if (this.lastTouch) {
            if (!(!this.visibleSubMenus.length || (void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2) || (void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2) || (this.lastTouch.target && $.contains(this.$root[0], this.lastTouch.target)))) {
              this.hideTimeout && (clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
              var t = this;
              this.hideTimeout = setTimeout(function () {
                t.menuHideAll();
              }, 350);
            }
            this.lastTouch = null;
          }
        },
        docTouchMove: function (t) {
          if (this.lastTouch) {
            var e = t.originalEvent.touches[0];
            (this.lastTouch.x2 = e.pageX), (this.lastTouch.y2 = e.pageY);
          }
        },
        docTouchStart: function (t) {
          var e = t.originalEvent.touches[0];
          this.lastTouch = { x1: e.pageX, y1: e.pageY, target: e.target };
        },
        enable: function () {
          this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), (this.$disableOverlay = null)), (this.disabled = !1));
        },
        getClosestMenu: function (t) {
          for (var e = $(t).closest("ul"); e.dataSM("in-mega"); ) e = e.parent().closest("ul");
          return e[0] || null;
        },
        getHeight: function (t) {
          return this.getOffset(t, !0);
        },
        getOffset: function (t, e) {
          var i;
          "none" == t.css("display") && ((i = { position: t[0].style.position, visibility: t[0].style.visibility }), t.css({ position: "absolute", visibility: "hidden" }).show());
          var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
            o = s && (e ? s.height || s.bottom - s.top : s.width || s.right - s.left);
          return o || 0 === o || (o = e ? t[0].offsetHeight : t[0].offsetWidth), i && t.hide().css(i), o;
        },
        getStartZIndex: function (t) {
          var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
          return !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))), isNaN(e) ? 1 : e;
        },
        getTouchPoint: function (t) {
          return (t.touches && t.touches[0]) || (t.changedTouches && t.changedTouches[0]) || t;
        },
        getViewport: function (t) {
          var e = t ? "Height" : "Width",
            i = document.documentElement["client" + e],
            s = window["inner" + e];
          return s && (i = Math.min(i, s)), i;
        },
        getViewportHeight: function () {
          return this.getViewport(!0);
        },
        getViewportWidth: function () {
          return this.getViewport();
        },
        getWidth: function (t) {
          return this.getOffset(t);
        },
        handleEvents: function () {
          return !this.disabled && this.isCSSOn();
        },
        handleItemEvents: function (t) {
          return this.handleEvents() && !this.isLinkInMegaMenu(t);
        },
        isCollapsible: function () {
          return "static" == this.$firstSub.css("position");
        },
        isCSSOn: function () {
          return "inline" != this.$firstLink.css("display");
        },
        isFixed: function () {
          var t = "fixed" == this.$root.css("position");
          return (
            t ||
              this.$root.parentsUntil("body").each(function () {
                return "fixed" == $(this).css("position") ? ((t = !0), !1) : void 0;
              }),
            t
          );
        },
        isLinkInMegaMenu: function (t) {
          return $(this.getClosestMenu(t[0])).hasClass("mega-menu");
        },
        isTouchMode: function () {
          return !mouse || this.opts.noMouseOver || this.isCollapsible();
        },
        itemActivate: function (t, e) {
          var i = t.closest("ul"),
            s = i.dataSM("level");
          if (s > 1 && (!this.activatedItems[s - 2] || this.activatedItems[s - 2][0] != i.dataSM("parent-a")[0])) {
            var o = this;
            $(i.parentsUntil("[data-smartmenus-id]", "ul").get().reverse())
              .add(i)
              .each(function () {
                o.itemActivate($(this).dataSM("parent-a"));
              });
          }
          if (((!this.isCollapsible() || e) && this.menuHideSubMenus(this.activatedItems[s - 1] && this.activatedItems[s - 1][0] == t[0] ? s : s - 1), (this.activatedItems[s - 1] = t), this.$root.triggerHandler("activate.smapi", t[0]) !== !1)) {
            var a = t.dataSM("sub");
            a && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(a);
          }
        },
        itemBlur: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) && this.$root.triggerHandler("blur.smapi", e[0]);
        },
        itemClick: function (t) {
          var e = $(t.currentTarget);
          if (this.handleItemEvents(e)) {
            if (this.$touchScrollingSub && this.$touchScrollingSub[0] == e.closest("ul")[0]) return (this.$touchScrollingSub = null), t.stopPropagation(), !1;
            if (this.$root.triggerHandler("click.smapi", e[0]) === !1) return !1;
            var i = e.dataSM("sub"),
              s = i ? 2 == i.dataSM("level") : !1;
            if (i) {
              var o = $(t.target).is(".sub-arrow"),
                a = this.isCollapsible(),
                n = /toggle$/.test(this.opts.collapsibleBehavior),
                r = /link$/.test(this.opts.collapsibleBehavior),
                h = /^accordion/.test(this.opts.collapsibleBehavior);
              if (i.is(":visible")) {
                if (!a && this.opts.showOnClick && s) return this.menuHide(i), (this.clickActivated = !1), (this.focusActivated = !1), !1;
                if (a && (n || o)) return this.itemActivate(e, h), this.menuHide(i), !1;
              } else if ((!r || !a || o) && (!a && this.opts.showOnClick && s && (this.clickActivated = !0), this.itemActivate(e, h), i.is(":visible"))) return (this.focusActivated = !0), !1;
            }
            return (!a && this.opts.showOnClick && s) || e.hasClass("disabled") || this.$root.triggerHandler("select.smapi", e[0]) === !1 ? !1 : void 0;
          }
        },
        itemDown: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) && e.dataSM("mousedown", !0);
        },
        itemEnter: function (t) {
          var e = $(t.currentTarget);
          if (this.handleItemEvents(e)) {
            if (!this.isTouchMode()) {
              this.showTimeout && (clearTimeout(this.showTimeout), (this.showTimeout = 0));
              var i = this;
              this.showTimeout = setTimeout(
                function () {
                  i.itemActivate(e);
                },
                this.opts.showOnClick && 1 == e.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout
              );
            }
            this.$root.triggerHandler("mouseenter.smapi", e[0]);
          }
        },
        itemFocus: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) && (!this.focusActivated || (this.isTouchMode() && e.dataSM("mousedown")) || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == e[0]) || this.itemActivate(e, !0), this.$root.triggerHandler("focus.smapi", e[0]));
        },
        itemLeave: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) && (this.isTouchMode() || (e[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), (this.showTimeout = 0))), e.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", e[0]));
        },
        menuHide: function (t) {
          if (this.$root.triggerHandler("beforehide.smapi", t[0]) !== !1 && (canAnimate && t.stop(!0, !0), "none" != t.css("display"))) {
            var e = function () {
              t.css("z-index", "");
            };
            this.isCollapsible() ? (canAnimate && this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, t, e) : t.hide(this.opts.collapsibleHideDuration, e)) : canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, t, e) : t.hide(this.opts.hideDuration, e),
              t.dataSM("scroll") && (this.menuScrollStop(t), t.css({ "touch-action": "", "-ms-touch-action": "", "-webkit-transform": "", transform: "" }).off(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()),
              t.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"),
              t.attr({ "aria-expanded": "false", "aria-hidden": "true" });
            var i = t.dataSM("level");
            this.activatedItems.splice(i - 1, 1), this.visibleSubMenus.splice($.inArray(t, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", t[0]);
          }
        },
        menuHideAll: function () {
          this.showTimeout && (clearTimeout(this.showTimeout), (this.showTimeout = 0));
          for (var t = this.opts.isPopup ? 1 : 0, e = this.visibleSubMenus.length - 1; e >= t; e--) this.menuHide(this.visibleSubMenus[e]);
          this.opts.isPopup && (canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") && (canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration))), (this.activatedItems = []), (this.visibleSubMenus = []), (this.clickActivated = !1), (this.focusActivated = !1), (this.zIndexInc = 0), this.$root.triggerHandler("hideAll.smapi");
        },
        menuHideSubMenus: function (t) {
          for (var e = this.activatedItems.length - 1; e >= t; e--) {
            var i = this.activatedItems[e].dataSM("sub");
            i && this.menuHide(i);
          }
        },
        menuInit: function (t) {
          if (!t.dataSM("in-mega")) {
            t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
            for (var e = 2, i = t[0]; (i = i.parentNode.parentNode) != this.$root[0]; ) e++;
            var s = t.prevAll("a").eq(-1);
            s.length || (s = t.prevAll().find("a").eq(-1)), s.addClass("has-submenu").dataSM("sub", t), t.dataSM("parent-a", s).dataSM("level", e).parent().dataSM("sub", t);
            var o = s.attr("id") || this.accessIdPrefix + ++this.idInc,
              a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
            s.attr({ id: o, "aria-haspopup": "true", "aria-controls": a, "aria-expanded": "false" }), t.attr({ id: a, role: "group", "aria-hidden": "true", "aria-labelledby": o, "aria-expanded": "false" }), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone());
          }
        },
        menuPosition: function (t) {
          var e,
            i,
            s = t.dataSM("parent-a"),
            o = s.closest("li"),
            a = o.parent(),
            n = t.dataSM("level"),
            r = this.getWidth(t),
            h = this.getHeight(t),
            u = s.offset(),
            l = u.left,
            c = u.top,
            d = this.getWidth(s),
            m = this.getHeight(s),
            p = $(window),
            f = p.scrollLeft(),
            v = p.scrollTop(),
            b = this.getViewportWidth(),
            S = this.getViewportHeight(),
            g = a.parent().is("[data-sm-horizontal-sub]") || (2 == n && !a.hasClass("sm-vertical")),
            w = (this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]")) || (!this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]")),
            M = 2 == n ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
            T = 2 == n ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
          if ((g ? ((e = w ? d - r - M : M), (i = this.opts.bottomToTopSubMenus ? -h - T : m + T)) : ((e = w ? M - r : d - M), (i = this.opts.bottomToTopSubMenus ? m - T - h : T)), this.opts.keepInViewport)) {
            var y = l + e,
              I = c + i;
            if ((w && f > y ? (e = g ? f - y + e : d - M) : !w && y + r > f + b && (e = g ? f + b - r - y + e : M - r), g || (S > h && I + h > v + S ? (i += v + S - h - I) : (h >= S || v > I) && (i += v - I)), (g && (I + h > v + S + 0.49 || v > I)) || (!g && h > S + 0.49))) {
              var x = this;
              t.dataSM("scroll-arrows") ||
                t.dataSM(
                  "scroll-arrows",
                  $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]])
                    .on({
                      mouseenter: function () {
                        (t.dataSM("scroll").up = $(this).hasClass("scroll-up")), x.menuScroll(t);
                      },
                      mouseleave: function (e) {
                        x.menuScrollStop(t), x.menuScrollOut(t, e);
                      },
                      "mousewheel DOMMouseScroll": function (t) {
                        t.preventDefault();
                      },
                    })
                    .insertAfter(t)
                );
              var A = ".smartmenus_scroll";
              if (
                (t
                  .dataSM("scroll", { y: this.cssTransforms3d ? 0 : i - m, step: 1, itemH: m, subH: h, arrowDownH: this.getHeight(t.dataSM("scroll-arrows").eq(1)) })
                  .on(
                    getEventsNS(
                      {
                        mouseover: function (e) {
                          x.menuScrollOver(t, e);
                        },
                        mouseout: function (e) {
                          x.menuScrollOut(t, e);
                        },
                        "mousewheel DOMMouseScroll": function (e) {
                          x.menuScrollMousewheel(t, e);
                        },
                      },
                      A
                    )
                  )
                  .dataSM("scroll-arrows")
                  .css({ top: "auto", left: "0", marginLeft: e + (parseInt(t.css("border-left-width")) || 0), width: r - (parseInt(t.css("border-left-width")) || 0) - (parseInt(t.css("border-right-width")) || 0), zIndex: t.css("z-index") })
                  .eq(g && this.opts.bottomToTopSubMenus ? 0 : 1)
                  .show(),
                this.isFixed())
              ) {
                var C = {};
                (C[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"] = function (e) {
                  x.menuScrollTouch(t, e);
                }),
                  t.css({ "touch-action": "none", "-ms-touch-action": "none" }).on(getEventsNS(C, A));
              }
            }
          }
          t.css({ top: "auto", left: "0", marginLeft: e, marginTop: i - m });
        },
        menuScroll: function (t, e, i) {
          var s,
            o = t.dataSM("scroll"),
            a = t.dataSM("scroll-arrows"),
            n = o.up ? o.upEnd : o.downEnd;
          if (!e && o.momentum) {
            if (((o.momentum *= 0.92), (s = o.momentum), 0.5 > s)) return this.menuScrollStop(t), void 0;
          } else s = i || (e || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(o.step));
          var r = t.dataSM("level");
          if ((this.activatedItems[r - 1] && this.activatedItems[r - 1].dataSM("sub") && this.activatedItems[r - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(r - 1), (o.y = (o.up && o.y >= n) || (!o.up && n >= o.y) ? o.y : Math.abs(n - o.y) > s ? o.y + (o.up ? s : -s) : n), t.css(this.cssTransforms3d ? { "-webkit-transform": "translate3d(0, " + o.y + "px, 0)", transform: "translate3d(0, " + o.y + "px, 0)" } : { marginTop: o.y }), mouse && ((o.up && o.y > o.downEnd) || (!o.up && o.y < o.upEnd)) && a.eq(o.up ? 1 : 0).show(), o.y == n))
            mouse && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t);
          else if (!e) {
            this.opts.scrollAccelerate && o.step < this.opts.scrollStep && (o.step += 0.2);
            var h = this;
            this.scrollTimeout = requestAnimationFrame(function () {
              h.menuScroll(t);
            });
          }
        },
        menuScrollMousewheel: function (t, e) {
          if (this.getClosestMenu(e.target) == t[0]) {
            e = e.originalEvent;
            var i = (e.wheelDelta || -e.detail) > 0;
            t
              .dataSM("scroll-arrows")
              .eq(i ? 0 : 1)
              .is(":visible") && ((t.dataSM("scroll").up = i), this.menuScroll(t, !0));
          }
          e.preventDefault();
        },
        menuScrollOut: function (t, e) {
          mouse && (/^scroll-(up|down)/.test((e.relatedTarget || "").className) || ((t[0] == e.relatedTarget || $.contains(t[0], e.relatedTarget)) && this.getClosestMenu(e.relatedTarget) == t[0]) || t.dataSM("scroll-arrows").css("visibility", "hidden"));
        },
        menuScrollOver: function (t, e) {
          if (mouse && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == t[0]) {
            this.menuScrollRefreshData(t);
            var i = t.dataSM("scroll"),
              s = $(window).scrollTop() - t.dataSM("parent-a").offset().top - i.itemH;
            t.dataSM("scroll-arrows")
              .eq(0)
              .css("margin-top", s)
              .end()
              .eq(1)
              .css("margin-top", s + this.getViewportHeight() - i.arrowDownH)
              .end()
              .css("visibility", "visible");
          }
        },
        menuScrollRefreshData: function (t) {
          var e = t.dataSM("scroll"),
            i = $(window).scrollTop() - t.dataSM("parent-a").offset().top - e.itemH;
          this.cssTransforms3d && (i = -(parseFloat(t.css("margin-top")) - i)), $.extend(e, { upEnd: i, downEnd: i + this.getViewportHeight() - e.subH });
        },
        menuScrollStop: function (t) {
          return this.scrollTimeout ? (cancelAnimationFrame(this.scrollTimeout), (this.scrollTimeout = 0), (t.dataSM("scroll").step = 1), !0) : void 0;
        },
        menuScrollTouch: function (t, e) {
          if (((e = e.originalEvent), isTouchEvent(e))) {
            var i = this.getTouchPoint(e);
            if (this.getClosestMenu(i.target) == t[0]) {
              var s = t.dataSM("scroll");
              if (/(start|down)$/i.test(e.type)) this.menuScrollStop(t) ? (e.preventDefault(), (this.$touchScrollingSub = t)) : (this.$touchScrollingSub = null), this.menuScrollRefreshData(t), $.extend(s, { touchStartY: i.pageY, touchStartTime: e.timeStamp });
              else if (/move$/i.test(e.type)) {
                var o = void 0 !== s.touchY ? s.touchY : s.touchStartY;
                if (void 0 !== o && o != i.pageY) {
                  this.$touchScrollingSub = t;
                  var a = i.pageY > o;
                  void 0 !== s.up && s.up != a && $.extend(s, { touchStartY: i.pageY, touchStartTime: e.timeStamp }), $.extend(s, { up: a, touchY: i.pageY }), this.menuScroll(t, !0, Math.abs(i.pageY - o));
                }
                e.preventDefault();
              } else void 0 !== s.touchY && ((s.momentum = 15 * Math.pow(Math.abs(i.pageY - s.touchStartY) / (e.timeStamp - s.touchStartTime), 2)) && (this.menuScrollStop(t), this.menuScroll(t), e.preventDefault()), delete s.touchY);
            }
          }
        },
        menuShow: function (t) {
          if ((t.dataSM("beforefirstshowfired") || (t.dataSM("beforefirstshowfired", !0), this.$root.triggerHandler("beforefirstshow.smapi", t[0]) !== !1)) && this.$root.triggerHandler("beforeshow.smapi", t[0]) !== !1 && (t.dataSM("shown-before", !0), canAnimate && t.stop(!0, !0), !t.is(":visible"))) {
            var e = t.dataSM("parent-a"),
              i = this.isCollapsible();
            if (((this.opts.keepHighlighted || i) && e.addClass("highlighted"), i)) t.removeClass("sm-nowrap").css({ zIndex: "", width: "auto", minWidth: "", maxWidth: "", top: "", left: "", marginLeft: "", marginTop: "" });
            else {
              if ((t.css("z-index", (this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1)), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({ width: "auto", minWidth: "", maxWidth: "" }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth))) {
                var s = this.getWidth(t);
                t.css("max-width", this.opts.subMenusMaxWidth), s > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth);
              }
              this.menuPosition(t);
            }
            var o = function () {
              t.css("overflow", "");
            };
            i ? (canAnimate && this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, o) : t.show(this.opts.collapsibleShowDuration, o)) : canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, t, o) : t.show(this.opts.showDuration, o), e.attr("aria-expanded", "true"), t.attr({ "aria-expanded": "true", "aria-hidden": "false" }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0]);
          }
        },
        popupHide: function (t) {
          this.hideTimeout && (clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
          var e = this;
          this.hideTimeout = setTimeout(
            function () {
              e.menuHideAll();
            },
            t ? 1 : this.opts.hideTimeout
          );
        },
        popupShow: function (t, e) {
          if (!this.opts.isPopup) return alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'), void 0;
          if ((this.hideTimeout && (clearTimeout(this.hideTimeout), (this.hideTimeout = 0)), this.$root.dataSM("shown-before", !0), canAnimate && this.$root.stop(!0, !0), !this.$root.is(":visible"))) {
            this.$root.css({ left: t, top: e });
            var i = this,
              s = function () {
                i.$root.css("overflow", "");
              };
            canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, s) : this.$root.show(this.opts.showDuration, s), (this.visibleSubMenus[0] = this.$root);
          }
        },
        refresh: function () {
          this.destroy(!0), this.init(!0);
        },
        rootKeyDown: function (t) {
          if (this.handleEvents())
            switch (t.keyCode) {
              case 27:
                var e = this.activatedItems[0];
                if (e) {
                  this.menuHideAll(), e[0].focus();
                  var i = e.dataSM("sub");
                  i && this.menuHide(i);
                }
                break;
              case 32:
                var s = $(t.target);
                if (s.is("a") && this.handleItemEvents(s)) {
                  var i = s.dataSM("sub");
                  i && !i.is(":visible") && (this.itemClick({ currentTarget: t.target }), t.preventDefault());
                }
            }
        },
        rootOut: function (t) {
          if (this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), (this.hideTimeout = 0)), !this.opts.showOnClick || !this.opts.hideOnClick)) {
            var e = this;
            this.hideTimeout = setTimeout(function () {
              e.menuHideAll();
            }, this.opts.hideTimeout);
          }
        },
        rootOver: function (t) {
          this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
        },
        winResize: function (t) {
          if (this.handleEvents()) {
            if (!("onorientationchange" in window) || "orientationchange" == t.type) {
              var e = this.isCollapsible();
              (this.wasCollapsible && e) || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), (this.wasCollapsible = e);
            }
          } else if (this.$disableOverlay) {
            var i = this.$root.offset();
            this.$disableOverlay.css({ top: i.top, left: i.left, width: this.$root.outerWidth(), height: this.$root.outerHeight() });
          }
        },
      },
    }),
    ($.fn.dataSM = function (t, e) {
      return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus");
    }),
    ($.fn.removeDataSM = function (t) {
      return this.removeData(t + "_smartmenus");
    }),
    ($.fn.smartmenus = function (options) {
      if ("string" == typeof options) {
        var args = arguments,
          method = options;
        return (
          Array.prototype.shift.call(args),
          this.each(function () {
            var t = $(this).data("smartmenus");
            t && t[method] && t[method].apply(t, args);
          })
        );
      }
      return this.each(function () {
        var dataOpts = $(this).data("sm-options") || null;
        if (dataOpts && "object" != typeof dataOpts)
          try {
            dataOpts = eval("(" + dataOpts + ")");
          } catch (e) {
            (dataOpts = null), alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.');
          }
        new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts));
      });
    }),
    ($.fn.smartmenus.defaults = {
      isPopup: !1,
      mainMenuSubOffsetX: 0,
      mainMenuSubOffsetY: 0,
      subMenusSubOffsetX: 0,
      subMenusSubOffsetY: 0,
      subMenusMinWidth: "10rem",
      subMenusMaxWidth: "25rem",
      subIndicators: !0,
      subIndicatorsPos: "append",
      subIndicatorsText: "",
      scrollStep: 30,
      scrollAccelerate: !0,
      showTimeout: 200,
      hideTimeout: 200,
      showDuration: 0,
      showFunction: null,
      hideDuration: 0,
      hideFunction: function (t, e) {
        t.fadeOut(200, e);
      },
      collapsibleShowDuration: 0,
      collapsibleShowFunction: function (t, e) {
        t.slideDown(200, e);
      },
      collapsibleHideDuration: 0,
      collapsibleHideFunction: function (t, e) {
        t.slideUp(200, e);
      },
      showOnClick: !1,
      hideOnClick: !0,
      noMouseOver: !1,
      keepInViewport: !0,
      keepHighlighted: !0,
      markCurrentItem: !1,
      markCurrentTree: !0,
      rightToLeftSubMenus: !1,
      bottomToTopSubMenus: !1,
      collapsibleBehavior: "link",
    }),
    $
  );
});
/*
 * SmartMenus jQuery Bootstrap 4 Addon - v0.1.0+
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com/
 *
 * Released under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery", "smartmenus"], factory);
  } else if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  $.extend(($.SmartMenus.Bootstrap = {}), {
    keydownFix: !1,
    init: function () {
      var $navbars = $("ul.navbar-nav:not([data-sm-skip])");
      $navbars.each(function () {
        var $this = $(this),
          obj = $this.data("smartmenus");
        if (!obj) {
          var skipBehavior = $this.is("[data-sm-skip-collapsible-behavior]"),
            rightAligned = $this.hasClass("ml-auto") || $this.prevAll(".mr-auto").length > 0;
          $this.smartmenus({ subMenusSubOffsetX: -8, subMenusSubOffsetY: 0, subIndicators: !skipBehavior, collapsibleShowFunction: null, collapsibleHideFunction: null, rightToLeftSubMenus: rightAligned, bottomToTopSubMenus: $this.closest(".fixed-bottom").length > 0, bootstrapHighlightClasses: "" }).on({
            "show.smapi": function (e, menu) {
              var $menu = $(menu),
                $scrollArrows = $menu.dataSM("scroll-arrows");
              if ($scrollArrows) {
                $scrollArrows.css("background-color", $menu.css("background-color"));
              }
              $menu.parent().addClass("show");
              if (obj.opts.keepHighlighted && $menu.dataSM("level") > 2) {
                $menu.prevAll("a").addClass(obj.opts.bootstrapHighlightClasses);
              }
            },
            "hide.smapi": function (e, menu) {
              var $menu = $(menu);
              $menu.parent().removeClass("show");
              if (obj.opts.keepHighlighted && $menu.dataSM("level") > 2) {
                $menu.prevAll("a").removeClass(obj.opts.bootstrapHighlightClasses);
              }
            },
          });
          obj = $this.data("smartmenus");
          function onInit() {
            $this.find("a.current").each(function () {
              var $this = $(this);
              ($this.hasClass("dropdown-item") ? $this : $this.parent()).addClass("active");
            });
            $this.find("a.has-submenu").each(function () {
              var $this = $(this);
              if ($this.is('[data-toggle="dropdown"]')) {
                $this.dataSM("bs-data-toggle-dropdown", !0).removeAttr("data-toggle");
              }
              if (!skipBehavior && $this.hasClass("dropdown-toggle")) {
                $this.dataSM("bs-dropdown-toggle", !0).removeClass("dropdown-toggle");
              }
            });
          }
          onInit();
          function onBeforeDestroy() {
            $this.find("a.current").each(function () {
              var $this = $(this);
              ($this.hasClass("active") ? $this : $this.parent()).removeClass("active");
            });
            $this.find("a.has-submenu").each(function () {
              var $this = $(this);
              if ($this.dataSM("bs-dropdown-toggle")) {
                $this.addClass("dropdown-toggle").removeDataSM("bs-dropdown-toggle");
              }
              if ($this.dataSM("bs-data-toggle-dropdown")) {
                $this.attr("data-toggle", "dropdown").removeDataSM("bs-data-toggle-dropdown");
              }
            });
          }
          obj.refresh = function () {
            $.SmartMenus.prototype.refresh.call(this);
            onInit();
            detectCollapsible(!0);
          };
          obj.destroy = function (refresh) {
            onBeforeDestroy();
            $.SmartMenus.prototype.destroy.call(this, refresh);
          };
          if (skipBehavior) {
            obj.opts.collapsibleBehavior = "toggle";
          }
          var winW;
          function detectCollapsible(force) {
            var newW = obj.getViewportWidth();
            if (newW != winW || force) {
              if (obj.isCollapsible()) {
                $this.addClass("sm-collapsible");
              } else {
                $this.removeClass("sm-collapsible");
              }
              winW = newW;
            }
          }
          detectCollapsible();
          $(window).on("resize.smartmenus" + obj.rootId, detectCollapsible);
        }
      });
      if ($navbars.length && !$.SmartMenus.Bootstrap.keydownFix) {
        $(document).off("keydown.bs.dropdown.data-api", ".dropdown-menu");
        if ($.fn.dropdown && $.fn.dropdown.Constructor && typeof $.fn.dropdown.Constructor._dataApiKeydownHandler == "function") {
          $(document).on("keydown.bs.dropdown.data-api", ".dropdown-menu.show", $.fn.dropdown.Constructor._dataApiKeydownHandler);
        }
        $.SmartMenus.Bootstrap.keydownFix = !0;
      }
    },
  });
  $($.SmartMenus.Bootstrap.init);
  return $;
});

// ProgressBar.js 1.0.1
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT
!(function (a) {
  if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
  else if ("function" == typeof define && define.amd) define([], a);
  else {
    var b;
    (b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this), (b.ProgressBar = a());
  }
})(function () {
  var a;
  return (function b(a, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!a[g]) {
          var i = "function" == typeof require && require;
          if (!h && i) return i(g, !0);
          if (f) return f(g, !0);
          var j = new Error("Cannot find module '" + g + "'");
          throw ((j.code = "MODULE_NOT_FOUND"), j);
        }
        var k = (c[g] = { exports: {} });
        a[g][0].call(
          k.exports,
          function (b) {
            var c = a[g][1][b];
            return e(c ? c : b);
          },
          k,
          k.exports,
          b,
          a,
          c,
          d
        );
      }
      return c[g].exports;
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e;
  })(
    {
      1: [
        function (b, c, d) {
          (function () {
            var b = this || Function("return this")(),
              e = (function () {
                "use strict";
                function e() {}
                function f(a, b) {
                  var c;
                  for (c in a) Object.hasOwnProperty.call(a, c) && b(c);
                }
                function g(a, b) {
                  return (
                    f(b, function (c) {
                      a[c] = b[c];
                    }),
                    a
                  );
                }
                function h(a, b) {
                  f(b, function (c) {
                    "undefined" == typeof a[c] && (a[c] = b[c]);
                  });
                }
                function i(a, b, c, d, e, f, g) {
                  var h,
                    i,
                    k,
                    l = f > a ? 0 : (a - f) / e;
                  for (h in b) b.hasOwnProperty(h) && ((i = g[h]), (k = "function" == typeof i ? i : o[i]), (b[h] = j(c[h], d[h], k, l)));
                  return b;
                }
                function j(a, b, c, d) {
                  return a + (b - a) * c(d);
                }
                function k(a, b) {
                  var c = n.prototype.filter,
                    d = a._filterArgs;
                  f(c, function (e) {
                    "undefined" != typeof c[e][b] && c[e][b].apply(a, d);
                  });
                }
                function l(a, b, c, d, e, f, g, h, j, l, m) {
                  (v = b + c + d), (w = Math.min(m || u(), v)), (x = w >= v), (y = d - (v - w)), a.isPlaying() && (x ? (j(g, a._attachment, y), a.stop(!0)) : ((a._scheduleId = l(a._timeoutHandler, s)), k(a, "beforeTween"), b + c > w ? i(1, e, f, g, 1, 1, h) : i(w, e, f, g, d, b + c, h), k(a, "afterTween"), j(e, a._attachment, y)));
                }
                function m(a, b) {
                  var c = {},
                    d = typeof b;
                  return (
                    "string" === d || "function" === d
                      ? f(a, function (a) {
                          c[a] = b;
                        })
                      : f(a, function (a) {
                          c[a] || (c[a] = b[a] || q);
                        }),
                    c
                  );
                }
                function n(a, b) {
                  (this._currentState = a || {}), (this._configured = !1), (this._scheduleFunction = p), "undefined" != typeof b && this.setConfig(b);
                }
                var o,
                  p,
                  q = "linear",
                  r = 500,
                  s = 1e3 / 60,
                  t = Date.now
                    ? Date.now
                    : function () {
                        return +new Date();
                      },
                  u = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : t;
                p = "undefined" != typeof window ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame) || setTimeout : setTimeout;
                var v, w, x, y;
                return (
                  (n.prototype.tween = function (a) {
                    return this._isTweening ? this : ((void 0 === a && this._configured) || this.setConfig(a), (this._timestamp = u()), this._start(this.get(), this._attachment), this.resume());
                  }),
                  (n.prototype.setConfig = function (a) {
                    (a = a || {}), (this._configured = !0), (this._attachment = a.attachment), (this._pausedAtTime = null), (this._scheduleId = null), (this._delay = a.delay || 0), (this._start = a.start || e), (this._step = a.step || e), (this._finish = a.finish || e), (this._duration = a.duration || r), (this._currentState = g({}, a.from) || this.get()), (this._originalState = this.get()), (this._targetState = g({}, a.to) || this.get());
                    var b = this;
                    this._timeoutHandler = function () {
                      l(b, b._timestamp, b._delay, b._duration, b._currentState, b._originalState, b._targetState, b._easing, b._step, b._scheduleFunction);
                    };
                    var c = this._currentState,
                      d = this._targetState;
                    return h(d, c), (this._easing = m(c, a.easing || q)), (this._filterArgs = [c, this._originalState, d, this._easing]), k(this, "tweenCreated"), this;
                  }),
                  (n.prototype.get = function () {
                    return g({}, this._currentState);
                  }),
                  (n.prototype.set = function (a) {
                    this._currentState = a;
                  }),
                  (n.prototype.pause = function () {
                    return (this._pausedAtTime = u()), (this._isPaused = !0), this;
                  }),
                  (n.prototype.resume = function () {
                    return this._isPaused && (this._timestamp += u() - this._pausedAtTime), (this._isPaused = !1), (this._isTweening = !0), this._timeoutHandler(), this;
                  }),
                  (n.prototype.seek = function (a) {
                    a = Math.max(a, 0);
                    var b = u();
                    return this._timestamp + a === 0 ? this : ((this._timestamp = b - a), this.isPlaying() || ((this._isTweening = !0), (this._isPaused = !1), l(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, b), this.pause()), this);
                  }),
                  (n.prototype.stop = function (a) {
                    return (this._isTweening = !1), (this._isPaused = !1), (this._timeoutHandler = e), (b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.oCancelAnimationFrame || b.msCancelAnimationFrame || b.mozCancelRequestAnimationFrame || b.clearTimeout)(this._scheduleId), a && (k(this, "beforeTween"), i(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), k(this, "afterTween"), k(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this;
                  }),
                  (n.prototype.isPlaying = function () {
                    return this._isTweening && !this._isPaused;
                  }),
                  (n.prototype.setScheduleFunction = function (a) {
                    this._scheduleFunction = a;
                  }),
                  (n.prototype.dispose = function () {
                    var a;
                    for (a in this) this.hasOwnProperty(a) && delete this[a];
                  }),
                  (n.prototype.filter = {}),
                  (n.prototype.formula = {
                    linear: function (a) {
                      return a;
                    },
                  }),
                  (o = n.prototype.formula),
                  g(n, { now: u, each: f, tweenProps: i, tweenProp: j, applyFilter: k, shallowCopy: g, defaults: h, composeEasingObject: m }),
                  "function" == typeof SHIFTY_DEBUG_NOW && (b.timeoutHandler = l),
                  "object" == typeof d
                    ? (c.exports = n)
                    : "function" == typeof a && a.amd
                    ? a(function () {
                        return n;
                      })
                    : "undefined" == typeof b.Tweenable && (b.Tweenable = n),
                  n
                );
              })();
            !(function () {
              e.shallowCopy(e.prototype.formula, {
                easeInQuad: function (a) {
                  return Math.pow(a, 2);
                },
                easeOutQuad: function (a) {
                  return -(Math.pow(a - 1, 2) - 1);
                },
                easeInOutQuad: function (a) {
                  return (a /= 0.5) < 1 ? 0.5 * Math.pow(a, 2) : -0.5 * ((a -= 2) * a - 2);
                },
                easeInCubic: function (a) {
                  return Math.pow(a, 3);
                },
                easeOutCubic: function (a) {
                  return Math.pow(a - 1, 3) + 1;
                },
                easeInOutCubic: function (a) {
                  return (a /= 0.5) < 1 ? 0.5 * Math.pow(a, 3) : 0.5 * (Math.pow(a - 2, 3) + 2);
                },
                easeInQuart: function (a) {
                  return Math.pow(a, 4);
                },
                easeOutQuart: function (a) {
                  return -(Math.pow(a - 1, 4) - 1);
                },
                easeInOutQuart: function (a) {
                  return (a /= 0.5) < 1 ? 0.5 * Math.pow(a, 4) : -0.5 * ((a -= 2) * Math.pow(a, 3) - 2);
                },
                easeInQuint: function (a) {
                  return Math.pow(a, 5);
                },
                easeOutQuint: function (a) {
                  return Math.pow(a - 1, 5) + 1;
                },
                easeInOutQuint: function (a) {
                  return (a /= 0.5) < 1 ? 0.5 * Math.pow(a, 5) : 0.5 * (Math.pow(a - 2, 5) + 2);
                },
                easeInSine: function (a) {
                  return -Math.cos(a * (Math.PI / 2)) + 1;
                },
                easeOutSine: function (a) {
                  return Math.sin(a * (Math.PI / 2));
                },
                easeInOutSine: function (a) {
                  return -0.5 * (Math.cos(Math.PI * a) - 1);
                },
                easeInExpo: function (a) {
                  return 0 === a ? 0 : Math.pow(2, 10 * (a - 1));
                },
                easeOutExpo: function (a) {
                  return 1 === a ? 1 : -Math.pow(2, -10 * a) + 1;
                },
                easeInOutExpo: function (a) {
                  return 0 === a ? 0 : 1 === a ? 1 : (a /= 0.5) < 1 ? 0.5 * Math.pow(2, 10 * (a - 1)) : 0.5 * (-Math.pow(2, -10 * --a) + 2);
                },
                easeInCirc: function (a) {
                  return -(Math.sqrt(1 - a * a) - 1);
                },
                easeOutCirc: function (a) {
                  return Math.sqrt(1 - Math.pow(a - 1, 2));
                },
                easeInOutCirc: function (a) {
                  return (a /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
                },
                easeOutBounce: function (a) {
                  return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
                },
                easeInBack: function (a) {
                  var b = 1.70158;
                  return a * a * ((b + 1) * a - b);
                },
                easeOutBack: function (a) {
                  var b = 1.70158;
                  return (a -= 1) * a * ((b + 1) * a + b) + 1;
                },
                easeInOutBack: function (a) {
                  var b = 1.70158;
                  return (a /= 0.5) < 1 ? 0.5 * (a * a * (((b *= 1.525) + 1) * a - b)) : 0.5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2);
                },
                elastic: function (a) {
                  return -1 * Math.pow(4, -8 * a) * Math.sin(((6 * a - 1) * (2 * Math.PI)) / 2) + 1;
                },
                swingFromTo: function (a) {
                  var b = 1.70158;
                  return (a /= 0.5) < 1 ? 0.5 * (a * a * (((b *= 1.525) + 1) * a - b)) : 0.5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2);
                },
                swingFrom: function (a) {
                  var b = 1.70158;
                  return a * a * ((b + 1) * a - b);
                },
                swingTo: function (a) {
                  var b = 1.70158;
                  return (a -= 1) * a * ((b + 1) * a + b) + 1;
                },
                bounce: function (a) {
                  return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
                },
                bouncePast: function (a) {
                  return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) : 2.5 / 2.75 > a ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
                },
                easeFromTo: function (a) {
                  return (a /= 0.5) < 1 ? 0.5 * Math.pow(a, 4) : -0.5 * ((a -= 2) * Math.pow(a, 3) - 2);
                },
                easeFrom: function (a) {
                  return Math.pow(a, 4);
                },
                easeTo: function (a) {
                  return Math.pow(a, 0.25);
                },
              });
            })(),
              (function () {
                function a(a, b, c, d, e, f) {
                  function g(a) {
                    return ((n * a + o) * a + p) * a;
                  }
                  function h(a) {
                    return ((q * a + r) * a + s) * a;
                  }
                  function i(a) {
                    return (3 * n * a + 2 * o) * a + p;
                  }
                  function j(a) {
                    return 1 / (200 * a);
                  }
                  function k(a, b) {
                    return h(m(a, b));
                  }
                  function l(a) {
                    return a >= 0 ? a : 0 - a;
                  }
                  function m(a, b) {
                    var c, d, e, f, h, j;
                    for (e = a, j = 0; 8 > j; j++) {
                      if (((f = g(e) - a), l(f) < b)) return e;
                      if (((h = i(e)), l(h) < 1e-6)) break;
                      e -= f / h;
                    }
                    if (((c = 0), (d = 1), (e = a), c > e)) return c;
                    if (e > d) return d;
                    for (; d > c; ) {
                      if (((f = g(e)), l(f - a) < b)) return e;
                      a > f ? (c = e) : (d = e), (e = 0.5 * (d - c) + c);
                    }
                    return e;
                  }
                  var n = 0,
                    o = 0,
                    p = 0,
                    q = 0,
                    r = 0,
                    s = 0;
                  return (p = 3 * b), (o = 3 * (d - b) - p), (n = 1 - p - o), (s = 3 * c), (r = 3 * (e - c) - s), (q = 1 - s - r), k(a, j(f));
                }
                function b(b, c, d, e) {
                  return function (f) {
                    return a(f, b, c, d, e, 1);
                  };
                }
                (e.setBezierFunction = function (a, c, d, f, g) {
                  var h = b(c, d, f, g);
                  return (h.displayName = a), (h.x1 = c), (h.y1 = d), (h.x2 = f), (h.y2 = g), (e.prototype.formula[a] = h);
                }),
                  (e.unsetBezierFunction = function (a) {
                    delete e.prototype.formula[a];
                  });
              })(),
              (function () {
                function a(a, b, c, d, f, g) {
                  return e.tweenProps(d, b, a, c, 1, g, f);
                }
                var b = new e();
                (b._filterArgs = []),
                  (e.interpolate = function (c, d, f, g, h) {
                    var i = e.shallowCopy({}, c),
                      j = h || 0,
                      k = e.composeEasingObject(c, g || "linear");
                    b.set({});
                    var l = b._filterArgs;
                    (l.length = 0), (l[0] = i), (l[1] = c), (l[2] = d), (l[3] = k), e.applyFilter(b, "tweenCreated"), e.applyFilter(b, "beforeTween");
                    var m = a(c, i, d, f, k, j);
                    return e.applyFilter(b, "afterTween"), m;
                  });
              })(),
              (function (a) {
                function b(a, b) {
                  var c,
                    d = [],
                    e = a.length;
                  for (c = 0; e > c; c++) d.push("_" + b + "_" + c);
                  return d;
                }
                function c(a) {
                  var b = a.match(v);
                  return b ? (1 === b.length || a[0].match(u)) && b.unshift("") : (b = ["", ""]), b.join(A);
                }
                function d(b) {
                  a.each(b, function (a) {
                    var c = b[a];
                    "string" == typeof c && c.match(z) && (b[a] = e(c));
                  });
                }
                function e(a) {
                  return i(z, a, f);
                }
                function f(a) {
                  var b = g(a);
                  return "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")";
                }
                function g(a) {
                  return (a = a.replace(/#/, "")), 3 === a.length && ((a = a.split("")), (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2])), (B[0] = h(a.substr(0, 2))), (B[1] = h(a.substr(2, 2))), (B[2] = h(a.substr(4, 2))), B;
                }
                function h(a) {
                  return parseInt(a, 16);
                }
                function i(a, b, c) {
                  var d = b.match(a),
                    e = b.replace(a, A);
                  if (d) for (var f, g = d.length, h = 0; g > h; h++) (f = d.shift()), (e = e.replace(A, c(f)));
                  return e;
                }
                function j(a) {
                  return i(x, a, k);
                }
                function k(a) {
                  for (var b = a.match(w), c = b.length, d = a.match(y)[0], e = 0; c > e; e++) d += parseInt(b[e], 10) + ",";
                  return (d = d.slice(0, -1) + ")");
                }
                function l(d) {
                  var e = {};
                  return (
                    a.each(d, function (a) {
                      var f = d[a];
                      if ("string" == typeof f) {
                        var g = r(f);
                        e[a] = { formatString: c(f), chunkNames: b(g, a) };
                      }
                    }),
                    e
                  );
                }
                function m(b, c) {
                  a.each(c, function (a) {
                    for (var d = b[a], e = r(d), f = e.length, g = 0; f > g; g++) b[c[a].chunkNames[g]] = +e[g];
                    delete b[a];
                  });
                }
                function n(b, c) {
                  a.each(c, function (a) {
                    var d = b[a],
                      e = o(b, c[a].chunkNames),
                      f = p(e, c[a].chunkNames);
                    (d = q(c[a].formatString, f)), (b[a] = j(d));
                  });
                }
                function o(a, b) {
                  for (var c, d = {}, e = b.length, f = 0; e > f; f++) (c = b[f]), (d[c] = a[c]), delete a[c];
                  return d;
                }
                function p(a, b) {
                  C.length = 0;
                  for (var c = b.length, d = 0; c > d; d++) C.push(a[b[d]]);
                  return C;
                }
                function q(a, b) {
                  for (var c = a, d = b.length, e = 0; d > e; e++) c = c.replace(A, +b[e].toFixed(4));
                  return c;
                }
                function r(a) {
                  return a.match(w);
                }
                function s(b, c) {
                  a.each(c, function (a) {
                    var d,
                      e = c[a],
                      f = e.chunkNames,
                      g = f.length,
                      h = b[a];
                    if ("string" == typeof h) {
                      var i = h.split(" "),
                        j = i[i.length - 1];
                      for (d = 0; g > d; d++) b[f[d]] = i[d] || j;
                    } else for (d = 0; g > d; d++) b[f[d]] = h;
                    delete b[a];
                  });
                }
                function t(b, c) {
                  a.each(c, function (a) {
                    var d = c[a],
                      e = d.chunkNames,
                      f = e.length,
                      g = b[e[0]],
                      h = typeof g;
                    if ("string" === h) {
                      for (var i = "", j = 0; f > j; j++) (i += " " + b[e[j]]), delete b[e[j]];
                      b[a] = i.substr(1);
                    } else b[a] = g;
                  });
                }
                var u = /(\d|\-|\.)/,
                  v = /([^\-0-9\.]+)/g,
                  w = /[0-9.\-]+/g,
                  x = new RegExp("rgb\\(" + w.source + /,\s*/.source + w.source + /,\s*/.source + w.source + "\\)", "g"),
                  y = /^.*\(/,
                  z = /#([0-9]|[a-f]){3,6}/gi,
                  A = "VAL",
                  B = [],
                  C = [];
                a.prototype.filter.token = {
                  tweenCreated: function (a, b, c, e) {
                    d(a), d(b), d(c), (this._tokenData = l(a));
                  },
                  beforeTween: function (a, b, c, d) {
                    s(d, this._tokenData), m(a, this._tokenData), m(b, this._tokenData), m(c, this._tokenData);
                  },
                  afterTween: function (a, b, c, d) {
                    n(a, this._tokenData), n(b, this._tokenData), n(c, this._tokenData), t(d, this._tokenData);
                  },
                };
              })(e);
          }).call(null);
        },
        {},
      ],
      2: [
        function (a, b, c) {
          var d = a("./shape"),
            e = a("./utils"),
            f = function (a, b) {
              (this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}"), (this.containerAspectRatio = 1), d.apply(this, arguments);
            };
          (f.prototype = new d()),
            (f.prototype.constructor = f),
            (f.prototype._pathString = function (a) {
              var b = a.strokeWidth;
              a.trailWidth && a.trailWidth > a.strokeWidth && (b = a.trailWidth);
              var c = 50 - b / 2;
              return e.render(this._pathTemplate, { radius: c, "2radius": 2 * c });
            }),
            (f.prototype._trailString = function (a) {
              return this._pathString(a);
            }),
            (b.exports = f);
        },
        { "./shape": 7, "./utils": 8 },
      ],
      3: [
        function (a, b, c) {
          var d = a("./shape"),
            e = a("./utils"),
            f = function (a, b) {
              (this._pathTemplate = "M 0,{center} L 100,{center}"), d.apply(this, arguments);
            };
          (f.prototype = new d()),
            (f.prototype.constructor = f),
            (f.prototype._initializeSvg = function (a, b) {
              a.setAttribute("viewBox", "0 0 100 " + b.strokeWidth), a.setAttribute("preserveAspectRatio", "none");
            }),
            (f.prototype._pathString = function (a) {
              return e.render(this._pathTemplate, { center: a.strokeWidth / 2 });
            }),
            (f.prototype._trailString = function (a) {
              return this._pathString(a);
            }),
            (b.exports = f);
        },
        { "./shape": 7, "./utils": 8 },
      ],
      4: [
        function (a, b, c) {
          b.exports = { Line: a("./line"), Circle: a("./circle"), SemiCircle: a("./semicircle"), Path: a("./path"), Shape: a("./shape"), utils: a("./utils") };
        },
        { "./circle": 2, "./line": 3, "./path": 5, "./semicircle": 6, "./shape": 7, "./utils": 8 },
      ],
      5: [
        function (a, b, c) {
          var d = a("shifty"),
            e = a("./utils"),
            f = { easeIn: "easeInCubic", easeOut: "easeOutCubic", easeInOut: "easeInOutCubic" },
            g = function h(a, b) {
              if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
              b = e.extend({ duration: 800, easing: "linear", from: {}, to: {}, step: function () {} }, b);
              var c;
              (c = e.isString(a) ? document.querySelector(a) : a), (this.path = c), (this._opts = b), (this._tweenable = null);
              var d = this.path.getTotalLength();
              (this.path.style.strokeDasharray = d + " " + d), this.set(0);
            };
          (g.prototype.value = function () {
            var a = this._getComputedDashOffset(),
              b = this.path.getTotalLength(),
              c = 1 - a / b;
            return parseFloat(c.toFixed(6), 10);
          }),
            (g.prototype.set = function (a) {
              this.stop(), (this.path.style.strokeDashoffset = this._progressToOffset(a));
              var b = this._opts.step;
              if (e.isFunction(b)) {
                var c = this._easing(this._opts.easing),
                  d = this._calculateTo(a, c),
                  f = this._opts.shape || this;
                b(d, f, this._opts.attachment);
              }
            }),
            (g.prototype.stop = function () {
              this._stopTween(), (this.path.style.strokeDashoffset = this._getComputedDashOffset());
            }),
            (g.prototype.animate = function (a, b, c) {
              (b = b || {}), e.isFunction(b) && ((c = b), (b = {}));
              var f = e.extend({}, b),
                g = e.extend({}, this._opts);
              b = e.extend(g, b);
              var h = this._easing(b.easing),
                i = this._resolveFromAndTo(a, h, f);
              this.stop(), this.path.getBoundingClientRect();
              var j = this._getComputedDashOffset(),
                k = this._progressToOffset(a),
                l = this;
              (this._tweenable = new d()),
                this._tweenable.tween({
                  from: e.extend({ offset: j }, i.from),
                  to: e.extend({ offset: k }, i.to),
                  duration: b.duration,
                  easing: h,
                  step: function (a) {
                    l.path.style.strokeDashoffset = a.offset;
                    var c = b.shape || l;
                    b.step(a, c, b.attachment);
                  },
                  finish: function (a) {
                    e.isFunction(c) && c();
                  },
                });
            }),
            (g.prototype._getComputedDashOffset = function () {
              var a = window.getComputedStyle(this.path, null);
              return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10);
            }),
            (g.prototype._progressToOffset = function (a) {
              var b = this.path.getTotalLength();
              return b - a * b;
            }),
            (g.prototype._resolveFromAndTo = function (a, b, c) {
              return c.from && c.to ? { from: c.from, to: c.to } : { from: this._calculateFrom(b), to: this._calculateTo(a, b) };
            }),
            (g.prototype._calculateFrom = function (a) {
              return d.interpolate(this._opts.from, this._opts.to, this.value(), a);
            }),
            (g.prototype._calculateTo = function (a, b) {
              return d.interpolate(this._opts.from, this._opts.to, a, b);
            }),
            (g.prototype._stopTween = function () {
              null !== this._tweenable && (this._tweenable.stop(), (this._tweenable = null));
            }),
            (g.prototype._easing = function (a) {
              return f.hasOwnProperty(a) ? f[a] : a;
            }),
            (b.exports = g);
        },
        { "./utils": 8, shifty: 1 },
      ],
      6: [
        function (a, b, c) {
          var d = a("./shape"),
            e = a("./circle"),
            f = a("./utils"),
            g = function (a, b) {
              (this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0"), (this.containerAspectRatio = 2), d.apply(this, arguments);
            };
          (g.prototype = new d()),
            (g.prototype.constructor = g),
            (g.prototype._initializeSvg = function (a, b) {
              a.setAttribute("viewBox", "0 0 100 50");
            }),
            (g.prototype._initializeTextContainer = function (a, b, c) {
              a.text.style && ((c.style.top = "auto"), (c.style.bottom = "0"), a.text.alignToBottom ? f.setStyle(c, "transform", "translate(-50%, 0)") : f.setStyle(c, "transform", "translate(-50%, 50%)"));
            }),
            (g.prototype._pathString = e.prototype._pathString),
            (g.prototype._trailString = e.prototype._trailString),
            (b.exports = g);
        },
        { "./circle": 2, "./shape": 7, "./utils": 8 },
      ],
      7: [
        function (a, b, c) {
          var d = a("./path"),
            e = a("./utils"),
            f = "Object is destroyed",
            g = function h(a, b) {
              if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
              if (0 !== arguments.length) {
                (this._opts = e.extend({ color: "#555", strokeWidth: 1, trailColor: null, trailWidth: null, fill: null, text: { style: { color: null, position: "absolute", left: "50%", top: "50%", padding: 0, margin: 0, transform: { prefix: !0, value: "translate(-50%, -50%)" } }, autoStyleContainer: !0, alignToBottom: !0, value: null, className: "progressbar-text" }, svgStyle: { display: "block", width: "100%" }, warnings: !1 }, b, !0)),
                  e.isObject(b) && void 0 !== b.svgStyle && (this._opts.svgStyle = b.svgStyle),
                  e.isObject(b) && e.isObject(b.text) && void 0 !== b.text.style && (this._opts.text.style = b.text.style);
                var c,
                  f = this._createSvgView(this._opts);
                if (((c = e.isString(a) ? document.querySelector(a) : a), !c)) throw new Error("Container does not exist: " + a);
                (this._container = c), this._container.appendChild(f.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && e.setStyles(f.svg, this._opts.svgStyle), (this.svg = f.svg), (this.path = f.path), (this.trail = f.trail), (this.text = null);
                var g = e.extend({ attachment: void 0, shape: this }, this._opts);
                (this._progressPath = new d(f.path, g)), e.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value);
              }
            };
          (g.prototype.animate = function (a, b, c) {
            if (null === this._progressPath) throw new Error(f);
            this._progressPath.animate(a, b, c);
          }),
            (g.prototype.stop = function () {
              if (null === this._progressPath) throw new Error(f);
              void 0 !== this._progressPath && this._progressPath.stop();
            }),
            (g.prototype.destroy = function () {
              if (null === this._progressPath) throw new Error(f);
              this.stop(), this.svg.parentNode.removeChild(this.svg), (this.svg = null), (this.path = null), (this.trail = null), (this._progressPath = null), null !== this.text && (this.text.parentNode.removeChild(this.text), (this.text = null));
            }),
            (g.prototype.set = function (a) {
              if (null === this._progressPath) throw new Error(f);
              this._progressPath.set(a);
            }),
            (g.prototype.value = function () {
              if (null === this._progressPath) throw new Error(f);
              return void 0 === this._progressPath ? 0 : this._progressPath.value();
            }),
            (g.prototype.setText = function (a) {
              if (null === this._progressPath) throw new Error(f);
              null === this.text && ((this.text = this._createTextContainer(this._opts, this._container)), this._container.appendChild(this.text)), e.isObject(a) ? (e.removeChildren(this.text), this.text.appendChild(a)) : (this.text.innerHTML = a);
            }),
            (g.prototype._createSvgView = function (a) {
              var b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
              this._initializeSvg(b, a);
              var c = null;
              (a.trailColor || a.trailWidth) && ((c = this._createTrail(a)), b.appendChild(c));
              var d = this._createPath(a);
              return b.appendChild(d), { svg: b, path: d, trail: c };
            }),
            (g.prototype._initializeSvg = function (a, b) {
              a.setAttribute("viewBox", "0 0 100 100");
            }),
            (g.prototype._createPath = function (a) {
              var b = this._pathString(a);
              return this._createPathElement(b, a);
            }),
            (g.prototype._createTrail = function (a) {
              var b = this._trailString(a),
                c = e.extend({}, a);
              return c.trailColor || (c.trailColor = "#eee"), c.trailWidth || (c.trailWidth = c.strokeWidth), (c.color = c.trailColor), (c.strokeWidth = c.trailWidth), (c.fill = null), this._createPathElement(b, c);
            }),
            (g.prototype._createPathElement = function (a, b) {
              var c = document.createElementNS("http://www.w3.org/2000/svg", "path");
              return c.setAttribute("d", a), c.setAttribute("stroke", b.color), c.setAttribute("stroke-width", b.strokeWidth), b.fill ? c.setAttribute("fill", b.fill) : c.setAttribute("fill-opacity", "0"), c;
            }),
            (g.prototype._createTextContainer = function (a, b) {
              var c = document.createElement("div");
              c.className = a.text.className;
              var d = a.text.style;
              return d && (a.text.autoStyleContainer && (b.style.position = "relative"), e.setStyles(c, d), d.color || (c.style.color = a.color)), this._initializeTextContainer(a, b, c), c;
            }),
            (g.prototype._initializeTextContainer = function (a, b, c) {}),
            (g.prototype._pathString = function (a) {
              throw new Error("Override this function for each progress bar");
            }),
            (g.prototype._trailString = function (a) {
              throw new Error("Override this function for each progress bar");
            }),
            (g.prototype._warnContainerAspectRatio = function (a) {
              if (this.containerAspectRatio) {
                var b = window.getComputedStyle(a, null),
                  c = parseFloat(b.getPropertyValue("width"), 10),
                  d = parseFloat(b.getPropertyValue("height"), 10);
                e.floatEquals(this.containerAspectRatio, c / d) || (console.warn("Incorrect aspect ratio of container", "#" + a.id, "detected:", b.getPropertyValue("width") + "(width)", "/", b.getPropertyValue("height") + "(height)", "=", c / d), console.warn("Aspect ratio of should be", this.containerAspectRatio));
              }
            }),
            (b.exports = g);
        },
        { "./path": 5, "./utils": 8 },
      ],
      8: [
        function (a, b, c) {
          function d(a, b, c) {
            (a = a || {}), (b = b || {}), (c = c || !1);
            for (var e in b)
              if (b.hasOwnProperty(e)) {
                var f = a[e],
                  g = b[e];
                c && l(f) && l(g) ? (a[e] = d(f, g, c)) : (a[e] = g);
              }
            return a;
          }
          function e(a, b) {
            var c = a;
            for (var d in b)
              if (b.hasOwnProperty(d)) {
                var e = b[d],
                  f = "\\{" + d + "\\}",
                  g = new RegExp(f, "g");
                c = c.replace(g, e);
              }
            return c;
          }
          function f(a, b, c) {
            for (var d = a.style, e = 0; e < p.length; ++e) {
              var f = p[e];
              d[f + h(b)] = c;
            }
            d[b] = c;
          }
          function g(a, b) {
            m(b, function (b, c) {
              null !== b && void 0 !== b && (l(b) && b.prefix === !0 ? f(a, c, b.value) : (a.style[c] = b));
            });
          }
          function h(a) {
            return a.charAt(0).toUpperCase() + a.slice(1);
          }
          function i(a) {
            return "string" == typeof a || a instanceof String;
          }
          function j(a) {
            return "function" == typeof a;
          }
          function k(a) {
            return "[object Array]" === Object.prototype.toString.call(a);
          }
          function l(a) {
            if (k(a)) return !1;
            var b = typeof a;
            return "object" === b && !!a;
          }
          function m(a, b) {
            for (var c in a)
              if (a.hasOwnProperty(c)) {
                var d = a[c];
                b(d, c);
              }
          }
          function n(a, b) {
            return Math.abs(a - b) < q;
          }
          function o(a) {
            for (; a.firstChild; ) a.removeChild(a.firstChild);
          }
          var p = "Webkit Moz O ms".split(" "),
            q = 0.001;
          b.exports = { extend: d, render: e, setStyle: f, setStyles: g, capitalize: h, isString: i, isFunction: j, isObject: l, forEachObject: m, floatEquals: n, removeChildren: o };
        },
        {},
      ],
    },
    {},
    [4]
  )(4);
});

/*!
 * scrollCue.js v2.0.0
 * https://github.com/prjct-samwest/scrollCue
 */
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, b, e) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = e.value;
        return a;
      };
$jscomp.getGlobal = function (a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var e = a[b];
    if (e && e.Math == Math) return e;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, b) {
  var e = $jscomp.propertyToPolyfillSymbol[b];
  if (null == e) return a[b];
  e = a[e];
  return void 0 !== e ? e : a[b];
};
$jscomp.polyfill = function (a, b, e, f) {
  b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, e, f) : $jscomp.polyfillUnisolated(a, b, e, f));
};
$jscomp.polyfillUnisolated = function (a, b, e, f) {
  e = $jscomp.global;
  a = a.split(".");
  for (f = 0; f < a.length - 1; f++) {
    var h = a[f];
    h in e || (e[h] = {});
    e = e[h];
  }
  a = a[a.length - 1];
  f = e[a];
  b = b(f);
  b != f && null != b && $jscomp.defineProperty(e, a, { configurable: !0, writable: !0, value: b });
};
$jscomp.polyfillIsolated = function (a, b, e, f) {
  var h = a.split(".");
  a = 1 === h.length;
  f = h[0];
  f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var k = 0; k < h.length - 1; k++) {
    var l = h[k];
    l in f || (f[l] = {});
    f = f[l];
  }
  h = h[h.length - 1];
  e = $jscomp.IS_SYMBOL_NATIVE && "es6" === e ? f[h] : null;
  b = b(e);
  null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, h, { configurable: !0, writable: !0, value: b }) : b !== e && (($jscomp.propertyToPolyfillSymbol[h] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(h) : $jscomp.POLYFILL_PREFIX + h), (h = $jscomp.propertyToPolyfillSymbol[h]), $jscomp.defineProperty(f, h, { configurable: !0, writable: !0, value: b })));
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill(
  "Symbol",
  function (a) {
    if (a) return a;
    var b = function (a, b) {
      this.$jscomp$symbol$id_ = a;
      $jscomp.defineProperty(this, "description", { configurable: !0, writable: !0, value: b });
    };
    b.prototype.toString = function () {
      return this.$jscomp$symbol$id_;
    };
    var e = 0,
      f = function (a) {
        if (this instanceof f) throw new TypeError("Symbol is not a constructor");
        return new b("jscomp_symbol_" + (a || "") + "_" + e++, a);
      };
    return f;
  },
  "es6",
  "es3"
);
$jscomp.initSymbolIterator = function () {};
$jscomp.polyfill(
  "Symbol.iterator",
  function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), e = 0; e < b.length; e++) {
      var f = $jscomp.global[b[e]];
      "function" === typeof f &&
        "function" != typeof f.prototype[a] &&
        $jscomp.defineProperty(f.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
          },
        });
    }
    return a;
  },
  "es6",
  "es3"
);
$jscomp.initSymbolAsyncIterator = function () {};
$jscomp.iteratorPrototype = function (a) {
  a = { next: a };
  a[Symbol.iterator] = function () {
    return this;
  };
  return a;
};
$jscomp.iteratorFromArray = function (a, b) {
  a instanceof String && (a += "");
  var e = 0,
    f = {
      next: function () {
        if (e < a.length) {
          var h = e++;
          return { value: b(h, a[h]), done: !1 };
        }
        f.next = function () {
          return { done: !0, value: void 0 };
        };
        return f.next();
      },
    };
  f[Symbol.iterator] = function () {
    return f;
  };
  return f;
};
$jscomp.polyfill(
  "Array.prototype.keys",
  function (a) {
    return a
      ? a
      : function () {
          return $jscomp.iteratorFromArray(this, function (a) {
            return a;
          });
        };
  },
  "es6",
  "es3"
);
var scrollCue = (function () {
  var a = {},
    b,
    e,
    f = 0,
    h = !0,
    k = !0,
    l = !1,
    n = !1,
    m,
    p = { duration: 600, interval: -0.7, percentage: 0.75, enable: !0, docSlider: !1, pageChangeReset: !1 };
  a = {
    setEvents: function (g) {
      var c = function () {
        h &&
          (requestAnimationFrame(function () {
            h = !0;
            k && (a.setQuery(), a.runQuery());
          }),
          (h = !1));
      };
      k && !g && window.addEventListener("load", a.runQuery);
      window.addEventListener("scroll", c);
      if (l) {
        g = docSlider.getElements().pages;
        for (var d = 0; d < g.length; d++)
          g[d].addEventListener("scroll", function (a) {
            var g = docSlider.getCurrentIndex() + "";
            a = a.target.getAttribute("data-ds-index");
            if (g !== a) return !1;
            docSlider._getWheelEnable() && c();
          });
      }
      window.addEventListener("resize", function () {
        0 < f && clearTimeout(f);
        f = setTimeout(function () {
          k && (a.searchElements(), a.setQuery(), a.runQuery());
        }, 200);
      });
    },
    setOptions: function (g, c) {
      var d = {};
      if ("undefined" !== typeof g)
        return (
          Object.keys(g).forEach(function (b) {
            "[object Object]" === Object.prototype.toString.call(g[b]) ? (d[b] = a.setOptions(g[b], c[b])) : ((d[b] = g[b]), "undefined" !== typeof c && "undefined" !== typeof c[b] && (d[b] = c[b]));
          }),
          d
        );
    },
    searchElements: function () {
      b = [];
      var g = document.querySelectorAll("[data-cues]:not([data-disabled])");
      for (var c = 0; c < g.length; c++) {
        for (var d = g[c], e = 0; e < d.children.length; e++) {
          var f = d.children[e];
          a.setAttrPtoC(f, "data-cue", d, "data-cues", "");
          a.setAttrPtoC(f, "data-duration", d, "data-duration", !1);
          a.setAttrPtoC(f, "data-interval", d, "data-interval", !1);
          a.setAttrPtoC(f, "data-sort", d, "data-sort", !1);
          a.setAttrPtoC(f, "data-addClass", d, "data-addClass", !1);
          a.setAttrPtoC(f, "data-group", d, "data-group", !1);
          a.setAttrPtoC(f, "data-delay", d, "data-delay", !1);
        }
        d.setAttribute("data-disabled", "true");
      }
      g = document.querySelectorAll('[data-cue]:not([data-show="true"])');
      for (c = 0; c < g.length; c++) (d = g[c]), b.push({ elm: d, cue: a.getAttr(d, "data-cue", "fadeIn"), duration: Number(a.getAttr(d, "data-duration", m.duration)), interval: Number(a.getAttr(d, "data-interval", m.interval)), order: a.getOrderNumber(d), sort: a.getAttr(d, "data-sort", null), addClass: a.getAttr(d, "data-addClass", null), group: a.getAttr(d, "data-group", null), delay: Number(a.getAttr(d, "data-delay", 0)) });
      if (l) for (g = docSlider.getElements().pages.length, c = 0; c < g; c++) for (d = document.querySelectorAll('[data-ds-index="' + c + '"] [data-cue]:not([data-scpage])'), e = 0; e < d.length; e++) d[e].setAttribute("data-scpage", c);
    },
    sortElements: function () {
      for (var a = arguments[0], c = [].slice.call(arguments).slice(1), d = { $jscomp$loop$prop$i$4: 0 }; d.$jscomp$loop$prop$i$4 < c.length; d = { $jscomp$loop$prop$i$4: d.$jscomp$loop$prop$i$4 }, d.$jscomp$loop$prop$i$4++)
        a.sort(
          (function (a) {
            return function (g, d) {
              var b = "undefined" === typeof c[a.$jscomp$loop$prop$i$4][1] ? !0 : c[a.$jscomp$loop$prop$i$4][1],
                e = c[a.$jscomp$loop$prop$i$4][0];
              return g[e] > d[e] ? (b ? 1 : -1) : g[e] < d[e] ? (b ? -1 : 1) : 0;
            };
          })(d)
        );
    },
    randElements: function (a) {
      for (var g = a.length - 1; 0 < g; g--) {
        var d = Math.floor(Math.random() * (g + 1)),
          b = a[g];
        a[g] = a[d];
        a[d] = b;
      }
      return a;
    },
    setDurationValue: function (a, c, d) {
      if ("undefined" === typeof c) return a;
      c = c.duration;
      a = -1 === (d + "").indexOf(".") ? a + c + d : a + c + c * d;
      return 0 > a ? 0 : a;
    },
    getOrderNumber: function (a) {
      return a.hasAttribute("data-order") ? ((a = Number(a.getAttribute("data-order"))), 0 <= a ? a : Math.pow(2, 53) - 1 + a) : Math.pow(2, 52) - 1;
    },
    setAttrPtoC: function (a, c, d, b, e) {
      d.hasAttribute(b) ? a.hasAttribute(c) || a.setAttribute(c, d.getAttribute(b)) : !1 !== e && a.setAttribute(c, e);
    },
    getAttr: function (a, c, d) {
      return a.hasAttribute(c) ? a.getAttribute(c) : d;
    },
    getOffsetTop: function (a) {
      return a.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
    },
    setClassNames: function (a, c) {
      if (c) {
        c = c.split(" ");
        for (var d = 0; d < c.length; d++) a.classList.add(c[d]);
      }
    },
    setQuery: function () {
      e = {};
      for (var g = 0; g < b.length; g++) {
        var c = b[g],
          d = c.group ? c.group : "$" + a.getOffsetTop(c.elm);
        if (!c.elm.hasAttribute("data-show")) {
          if (l) {
            var f = c.elm.getAttribute("data-scpage"),
              h = docSlider.getCurrentIndex() + "";
            if (f !== h && null !== f) continue;
          }
          "undefined" === typeof e[d] && (e[d] = []);
          e[d].push(c);
        }
      }
    },
    runQuery: function () {
      for (var b = Object.keys(e), c = {}, d = 0; d < b.length; c = { $jscomp$loop$prop$elms$6: c.$jscomp$loop$prop$elms$6, $jscomp$loop$prop$interval$7: c.$jscomp$loop$prop$interval$7 }, d++)
        if (((c.$jscomp$loop$prop$elms$6 = e[b[d]]), a.isElementIn(c.$jscomp$loop$prop$elms$6[0].elm))) {
          "reverse" === c.$jscomp$loop$prop$elms$6[0].sort ? c.$jscomp$loop$prop$elms$6.reverse() : "random" === c.$jscomp$loop$prop$elms$6[0].sort && a.randElements(c.$jscomp$loop$prop$elms$6);
          a.sortElements(c.$jscomp$loop$prop$elms$6, ["order"]);
          for (var f = (c.$jscomp$loop$prop$interval$7 = 0); f < c.$jscomp$loop$prop$elms$6.length; f++)
            (function (c) {
              return function (b) {
                c.$jscomp$loop$prop$elms$6[b].elm.setAttribute("data-show", "true");
                a.setClassNames(c.$jscomp$loop$prop$elms$6[b].elm, c.$jscomp$loop$prop$elms$6[b].addClass);
                c.$jscomp$loop$prop$interval$7 = a.setDurationValue(c.$jscomp$loop$prop$interval$7, c.$jscomp$loop$prop$elms$6[b - 1], c.$jscomp$loop$prop$elms$6[b].interval);
                c.$jscomp$loop$prop$elms$6[b].elm.style.animationName = c.$jscomp$loop$prop$elms$6[b].cue;
                c.$jscomp$loop$prop$elms$6[b].elm.style.animationDuration = c.$jscomp$loop$prop$elms$6[b].duration + "ms";
                c.$jscomp$loop$prop$elms$6[b].elm.style.animationTimingFunction = "ease";
                c.$jscomp$loop$prop$elms$6[b].elm.style.animationDelay = c.$jscomp$loop$prop$interval$7 + c.$jscomp$loop$prop$elms$6[b].delay + "ms";
                c.$jscomp$loop$prop$elms$6[b].elm.style.animationDirection = "normal";
                c.$jscomp$loop$prop$elms$6[b].elm.style.animationFillMode = "both";
              };
            })(c)(f);
          delete e[b[d]];
        }
    },
    isElementIn: function (b) {
      var c = b.hasAttribute("data-scpage") ? a.isScrollEndWithDocSlider : a.isScrollEnd;
      return window.pageYOffset > a.getOffsetTop(b) - window.innerHeight * m.percentage || c();
    },
    isScrollEnd: function () {
      var a = window.document.documentElement;
      return (window.document.body.scrollTop || a.scrollTop) >= a.scrollHeight - a.clientHeight;
    },
    isScrollEndWithDocSlider: function () {
      var a = docSlider.getCurrentPage();
      return a.scrollTop >= a.scrollHeight - a.clientHeight;
    },
  };
  return {
    init: function (b) {
      m = a.setOptions(p, b);
      k = m.enable;
      l = m.docSlider;
      n = m.pageChangeReset;
      l || (a.setEvents(), a.searchElements(), a.setQuery());
    },
    update: function () {
      k && (a.searchElements(), a.setQuery(), a.runQuery());
    },
    enable: function (a) {
      k = "undefined" === typeof a ? !k : a;
      scrollCue.update();
    },
    _hasDocSlider: function () {
      return l;
    },
    _hasPageChangeReset: function () {
      return n;
    },
    _initWithDocSlider: function (b) {
      a.setEvents(b);
      a.searchElements();
      a.setQuery();
    },
    _updateWithDocSlider: function () {
      k && (a.setQuery(), a.runQuery());
    },
    _searchElements: function () {
      a.searchElements();
    },
  };
})();

/*!
 * SVGInject v1.2.3
 * https://github.com/iconfu/svg-inject
 */
!(function (o, l) {
  var r,
    a,
    s = "createElement",
    g = "getElementsByTagName",
    b = "length",
    E = "style",
    d = "title",
    y = "undefined",
    k = "setAttribute",
    w = "getAttribute",
    x = null,
    A = "__svgInject",
    C = "--inject-",
    S = new RegExp(C + "\\d+", "g"),
    I = "LOAD_FAIL",
    t = "SVG_NOT_SUPPORTED",
    L = "SVG_INVALID",
    v = ["src", "alt", "onload", "onerror"],
    j = l[s]("a"),
    G = typeof SVGRect != y,
    f = { useCache: !0, copyAttributes: !0, makeIdsUnique: !0 },
    N = { clipPath: ["clip-path"], "color-profile": x, cursor: x, filter: x, linearGradient: ["fill", "stroke"], marker: ["marker", "marker-end", "marker-mid", "marker-start"], mask: x, pattern: ["fill", "stroke"], radialGradient: ["fill", "stroke"] },
    u = 1,
    c = 2,
    O = 1;
  function T(e) {
    return (r = r || new XMLSerializer()).serializeToString(e);
  }
  function P(e, r) {
    var t,
      n,
      i,
      o,
      a = C + O++,
      f = /url\("?#([a-zA-Z][\w:.-]*)"?\)/g,
      u = e.querySelectorAll("[id]"),
      c = r ? [] : x,
      l = {},
      s = [],
      d = !1;
    if (u[b]) {
      for (i = 0; i < u[b]; i++) (n = u[i].localName) in N && (l[n] = 1);
      for (n in l)
        (N[n] || [n]).forEach(function (e) {
          s.indexOf(e) < 0 && s.push(e);
        });
      s[b] && s.push(E);
      var v,
        p,
        m,
        h = e[g]("*"),
        y = e;
      for (i = -1; y != x; ) {
        if (y.localName == E)
          (m =
            (p = y.textContent) &&
            p.replace(f, function (e, r) {
              return c && (c[r] = 1), "url(#" + r + a + ")";
            })) !== p && (y.textContent = m);
        else if (y.hasAttributes()) {
          for (o = 0; o < s[b]; o++)
            (v = s[o]),
              (m =
                (p = y[w](v)) &&
                p.replace(f, function (e, r) {
                  return c && (c[r] = 1), "url(#" + r + a + ")";
                })) !== p && y[k](v, m);
          ["xlink:href", "href"].forEach(function (e) {
            var r = y[w](e);
            /^\s*#/.test(r) && ((r = r.trim()), y[k](e, r + a), c && (c[r.substring(1)] = 1));
          });
        }
        y = h[++i];
      }
      for (i = 0; i < u[b]; i++) (t = u[i]), (c && !c[t.id]) || ((t.id += a), (d = !0));
    }
    return d;
  }
  function V(e, r, t, n) {
    if (r) {
      r[k]("data-inject-url", t);
      var i = e.parentNode;
      if (i) {
        n.copyAttributes &&
          (function c(e, r) {
            for (var t, n, i, o = e.attributes, a = 0; a < o[b]; a++)
              if (((n = (t = o[a]).name), -1 == v.indexOf(n)))
                if (((i = t.value), n == d)) {
                  var f,
                    u = r.firstElementChild;
                  u && u.localName.toLowerCase() == d ? (f = u) : ((f = l[s + "NS"]("http://www.w3.org/2000/svg", d)), r.insertBefore(f, u)), (f.textContent = i);
                } else r[k](n, i);
          })(e, r);
        var o = n.beforeInject,
          a = (o && o(e, r)) || r;
        i.replaceChild(a, e), (e[A] = u), m(e);
        var f = n.afterInject;
        f && f(e, a);
      }
    } else D(e, n);
  }
  function p() {
    for (var e = {}, r = arguments, t = 0; t < r[b]; t++) {
      var n = r[t];
      for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i]);
    }
    return e;
  }
  function _(e, r) {
    if (r) {
      var t;
      try {
        t = (function i(e) {
          return (a = a || new DOMParser()).parseFromString(e, "text/xml");
        })(e);
      } catch (o) {
        return x;
      }
      return t[g]("parsererror")[b] ? x : t.documentElement;
    }
    var n = l.createElement("div");
    return (n.innerHTML = e), n.firstElementChild;
  }
  function m(e) {
    e.removeAttribute("onload");
  }
  function n(e) {
    console.error("SVGInject: " + e);
  }
  function i(e, r, t) {
    (e[A] = c), t.onFail ? t.onFail(e, r) : n(r);
  }
  function D(e, r) {
    m(e), i(e, L, r);
  }
  function F(e, r) {
    m(e), i(e, t, r);
  }
  function M(e, r) {
    i(e, I, r);
  }
  function q(e) {
    (e.onload = x), (e.onerror = x);
  }
  function R(e) {
    n("no img element");
  }
  var e = (function z(e, r) {
    var t = p(f, r),
      h = {};
    function n(a, f) {
      f = p(t, f);
      var e = function (r) {
        var e = function () {
          var e = f.onAllFinish;
          e && e(), r && r();
        };
        if (a && typeof a[b] != y) {
          var t = 0,
            n = a[b];
          if (0 == n) e();
          else
            for (
              var i = function () {
                  ++t == n && e();
                },
                o = 0;
              o < n;
              o++
            )
              u(a[o], f, i);
        } else u(a, f, e);
      };
      return typeof Promise == y ? e() : new Promise(e);
    }
    function u(u, c, e) {
      if (u) {
        var r = u[A];
        if (r) Array.isArray(r) ? r.push(e) : e();
        else {
          if ((q(u), !G)) return F(u, c), void e();
          var t = c.beforeLoad,
            n = (t && t(u)) || u[w]("src");
          if (!n) return "" === n && M(u, c), void e();
          var i = [];
          u[A] = i;
          var l = function () {
              e(),
                i.forEach(function (e) {
                  e();
                });
            },
            s = (function f(e) {
              return (j.href = e), j.href;
            })(n),
            d = c.useCache,
            v = c.makeIdsUnique,
            p = function (r) {
              d &&
                (h[s].forEach(function (e) {
                  e(r);
                }),
                (h[s] = r));
            };
          if (d) {
            var o,
              a = function (e) {
                if (e === I) M(u, c);
                else if (e === L) D(u, c);
                else {
                  var r,
                    t = e[0],
                    n = e[1],
                    i = e[2];
                  v &&
                    (t === x
                      ? ((t = P((r = _(n, !1)), !1)), (e[0] = t), (e[2] = t && T(r)))
                      : t &&
                        (n = (function o(e) {
                          return e.replace(S, C + O++);
                        })(i))),
                    (r = r || _(n, !1)),
                    V(u, r, s, c);
                }
                l();
              };
            if (typeof (o = h[s]) != y) return void (o.isCallbackQueue ? o.push(a) : a(o));
            ((o = []).isCallbackQueue = !0), (h[s] = o);
          }
          !(function m(e, r, t) {
            if (e) {
              var n = new XMLHttpRequest();
              (n.onreadystatechange = function () {
                if (4 == n.readyState) {
                  var e = n.status;
                  200 == e ? r(n.responseXML, n.responseText.trim()) : 400 <= e ? t() : 0 == e && t();
                }
              }),
                n.open("GET", e, !0),
                n.send();
            }
          })(
            s,
            function (e, r) {
              var t = e instanceof Document ? e.documentElement : _(r, !0),
                n = c.afterLoad;
              if (n) {
                var i = n(t, r) || t;
                if (i) {
                  var o = "string" == typeof i;
                  (r = o ? i : T(t)), (t = o ? _(i, !0) : i);
                }
              }
              if (t instanceof SVGElement) {
                var a = x;
                if ((v && (a = P(t, !1)), d)) {
                  var f = a && T(t);
                  p([a, r, f]);
                }
                V(u, t, s, c);
              } else D(u, c), p(L);
              l();
            },
            function () {
              M(u, c), p(I), l();
            }
          );
        }
      } else R();
    }
    return (
      G &&
        (function i(e) {
          var r = l[g]("head")[0];
          if (r) {
            var t = l[s](E);
            (t.type = "text/css"), t.appendChild(l.createTextNode(e)), r.appendChild(t);
          }
        })('img[onload^="' + e + '("]{visibility:hidden;}'),
      (n.setOptions = function (e) {
        t = p(t, e);
      }),
      (n.create = z),
      (n.err = function (e, r) {
        e ? e[A] != c && (q(e), G ? (m(e), M(e, t)) : F(e, t), r && (m(e), (e.src = r))) : R();
      }),
      (o[e] = n)
    );
  })("SVGInject");
  "object" == typeof module && "object" == typeof module.exports && (module.exports = e);
})(window, document);
