!(function (r) {
  "use strict";
  var a = {
    init: () => {
      a.stickyHeader(), a.dropdownAnimation(), a.headerButtons(), a.isotope(), a.anchorSmoothScroll(), a.svgInject(), a.backgroundImage(), a.backgroundImageMobile(), a.backgroundVideo(), a.imageHoverOverlay(), a.scrollCue(), a.showMoreItems(), a.owlCarousel(), a.heroSlider(), a.animatedCaptions(), a.progressBar(), a.pageProgress(), a.bsTooltips(), a.bsPopovers(), a.pricingSwitcher(), a.bsModal();
    },
    stickyHeader: () => {
      r(".navbar").length &&
        new Headhesive(".navbar", {
          offset: 350,
          offsetSide: "top",
          classes: { clone: "banner--clone fixed ", stick: "banner--stick", unstick: "banner--unstick" },
          onStick: function () {
            r(r.SmartMenus.Bootstrap.init), r(".navbar:not(.fixed) .language-select .dropdown-menu").removeClass("show");
          },
          onUnstick: function () {
            r(".navbar.fixed .language-select .dropdown-menu").removeClass("show");
          },
        });
    },
    dropdownAnimation: () => {
      r(".navbar .navbar-nav:not(.navbar-nav-other)")
        .bind({
          "show.smapi": function (e, a) {
            r(a).removeClass("hide-animation").addClass("show-animation");
          },
          "hide.smapi": function (e, a) {
            r(a).removeClass("show-animation").addClass("hide-animation");
          },
        })
        .on("animationend webkitAnimationEnd oanimationend MSAnimationEnd", "ul", function (e) {
          r(this).removeClass("show-animation hide-animation"), e.stopPropagation();
        });
    },
    headerButtons: () => {
      var a = r(".hamburger.animate"),
        t = (r(".language-select .dropdown-menu"), r(".offcanvas-nav")),
        e = r('[data-toggle="offcanvas-nav"]'),
        o = r(".offcanvas-nav-close"),
        n = r(".offcanvas-info"),
        i = r(".offcanvas-info-close"),
        s = r('[data-toggle="offcanvas-info"]');
      a.on("click", function () {
        a.toggleClass("active");
      }),
        e.on("click", function (e) {
          e.stopPropagation(), t.toggleClass("open");
        }),
        t.on("click", function (e) {
          e.stopPropagation();
        }),
        o.on("click", function (e) {
          t.removeClass("open"), a.removeClass("active");
        }),
        s.on("click", function (e) {
          e.stopPropagation(), n.toggleClass("open");
        }),
        n.on("click", function (e) {
          e.stopPropagation();
        }),
        r(document).on("click", function () {
          t.removeClass("open"), n.removeClass("open"), a.removeClass("active");
        }),
        i.on("click", function (e) {
          n.removeClass("open");
        }),
        r(".onepage .navbar li a.scroll").on("click", function () {
          t.removeClass("open"), a.removeClass("active");
        });
    },
    isotope: () => {
      r(".grid").each(function (e, a) {
        var a = r(a),
          t = a.find(".isotope").imagesLoaded(function () {
            t.isotope({ itemSelector: ".item", layoutMode: "masonry", percentPosition: !0, masonry: { columnWidth: t.width() / 12 }, transitionDuration: "0.7s" });
          });
        r(window).resize(function () {
          t.isotope({ masonry: { columnWidth: t.width() / 12 } });
        }),
          r(window).on("load", function () {
            t.isotope({ masonry: { columnWidth: t.width() / 12 } });
          }),
          a.find(".isotope-filter").on("click", "a", function () {
            var e = r(this).attr("data-filter");
            t.isotope({ filter: e });
          });
      }),
        r(".isotope-filter").each(function (e, a) {
          var t = r(a);
          t.on("click", "a", function () {
            t.find(".active").removeClass("active"), r(this).addClass("active");
          });
        });
    },
    anchorSmoothScroll: () => {
      r(function () {
        function a(e) {
          (e = e.length ? e : r("[name=" + this.hash.slice(1) + "]")).length && r("html,body").animate({ scrollTop: e.offset().top }, 1500, "easeInOutExpo");
        }
        setTimeout(function () {
          var e;
          location.hash && (window.scrollTo(0, 0), (e = location.hash.split("#")), a(r("#" + e[1])));
        }, 1),
          r('a.scroll[href*="#"]:not([href="#"])').on("click", function () {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) return a(r(this.hash)), !1;
          });
      });
    },
    svgInject: () => {
      SVGInject(document.querySelectorAll("img.svg-inject"));
    },
    backgroundImage: () => {
      r(".bg-image").css("background-image", function () {
        return "url(" + r(this).data("image-src") + ")";
      });
    },
    backgroundImageMobile: () => {
      !(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || ("MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) || r(".image-wrapper").addClass("mobile");
    },
    backgroundVideo: () => {
      r(".video-wrapper video").backgroundVideo({ $outerWrap: r(".video-wrapper"), pauseVideoOnViewLoss: !1, parallaxOptions: { effect: 6 } });
    },
    imageHoverOverlay: () => {
      r(".overlay:not(.caption) > a, .overlay:not(.caption) > span").prepend('<span class="bg"></span>');
    },

    scrollCue: () => {
      scrollCue.init({ interval: -400, duration: 700, percentage: 0.8 }), scrollCue.update();
    },
    showMoreItems: () => {
      r(".show-more").each(function () {
        var e = r(this);
        e.showMoreItems({
          startNum: e.data("showstart"),
          afterNum: e.data("showafter"),
          moreText: "Show More",
          after: function () {
            a.isotope(), a.rellax(), a.scrollCue();
          },
        });
      });
    },
    owlCarousel: () => {
      r(".basic-slider").each(function () {
        var e = r(this);
        e.owlCarousel({ items: 1, nav: e.data("nav"), navText: ["<i class='uil-arrow-left'></i>", "<i class='uil-arrow-right'></i>"], dots: !0, dotsEach: !0, autoHeight: !0, loop: !0, margin: e.data("margin") });
      }),
        r(".carousel").each(function () {
          var e = r(this);
          e.owlCarousel({ autoHeight: !1, nav: e.data("nav"), navText: ["<i class='uil-arrow-left'></i>", "<i class='uil-arrow-right'></i>"], dots: e.data("dots"), dotsEach: !0, loop: e.data("loop"), margin: e.data("margin"), autoplay: e.data("autoplay"), autoplayTimeout: e.data("autoplay-timeout"), responsive: e.data("responsive") });
        });
    },
    heroSlider: () => {
      r(".hero-slider").each(function () {
        var e = r(this);
        e.owlCarousel({
          items: 1,
          nav: r(this).data("nav"),
          navText: ["<i class='uil-arrow-left'></i>", "<i class='uil-arrow-right'></i>"],
          dots: r(this).data("dots"),
          dotsEach: !0,
          autoHeight: !1,
          loop: !0,
          autoplay: e.data("autoplay"),
          autoplayTimeout: 5e3,
          onInitialized: function () {
            e.trigger("stop.owl.autoplay"),
              setTimeout(function () {
                e.trigger("play.owl.autoplay");
              }, 3e3);
          },
          autoplayHoverPause: !0,
          margin: 0,
          animateIn: "fadeIn",
          animateOut: "fadeOut",
        }),
          e.on("changed.owl.carousel", (e) => {
            r(".owl-item.active")
              .find(".animated-caption")
              .each(function (e, a) {
                r(this).removeClass("animate__animated").removeClass(r(this).data("anim"));
              }),
              r(".owl-item")
                .eq(e.item.index)
                .find(".animated-caption")
                .each(function (e, a) {
                  var t = r(this).data("anim-delay"),
                    o = r(this).data("anim-duration");
                  r(this)
                    .addClass("animate__animated")
                    .addClass(r(this).data("anim"))
                    .css({ "animation-delay": t + "ms", "animation-duration": o + "ms" });
                });
          }),
          e.trigger("refresh.owl.carousel");
      });
    },
    animatedCaptions: () => {
      r(".animated-captions")
        .find(".animated-caption")
        .each(function () {
          var e = r(this).data("anim-delay"),
            a = r(this).data("anim-duration");
          r(this)
            .addClass("animate__animated")
            .addClass(r(this).data("anim"))
            .css({ "animation-delay": e + "ms", "animation-duration": a + "ms" });
        });
    },

    progressBar: () => {
      var o = r(".progressbar.line");
      o.each(function (e) {
        var a = new ProgressBar.Line(this, {
            strokeWidth: 3,
            trailWidth: 3,
            duration: 3e3,
            easing: "easeInOut",
            text: { style: { color: "inherit", position: "absolute", right: "0", top: "-30px", padding: 0, margin: 0, transform: null }, autoStyleContainer: !1 },
            step: function (e, a, t) {
              a.setText(Math.round(100 * a.value()) + " %");
            },
          }),
          t = r(this).attr("data-value") / 100;
        o.waypoint(
          function () {
            a.animate(t);
          },
          { offset: "100%" }
        );
      });
    },
    pageProgress: () => {
      var t, o, e;
      r(".progress-wrap").length &&
        ((t = document.querySelector(".progress-wrap path")),
        (o = t.getTotalLength()),
        (t.style.transition = t.style.WebkitTransition = "none"),
        (t.style.strokeDasharray = o + " " + o),
        (t.style.strokeDashoffset = o),
        t.getBoundingClientRect(),
        (t.style.transition = t.style.WebkitTransition = "stroke-dashoffset 10ms linear"),
        (e = function () {
          var e = r(window).scrollTop(),
            a = r(document).height() - r(window).height();
          t.style.strokeDashoffset = o - (e * o) / a;
        })(),
        r(window).scroll(e),
        jQuery(window).on("scroll", function () {
          50 < jQuery(this).scrollTop() ? jQuery(".progress-wrap").addClass("active-progress") : jQuery(".progress-wrap").removeClass("active-progress");
        }),
        jQuery(".progress-wrap").on("click", function (e) {
          return e.preventDefault(), jQuery("html, body").animate({ scrollTop: 0 }, 550), !1;
        }));
    },

    bsTooltips: () => {
      [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function (e) {
        return new bootstrap.Tooltip(e);
      });
    },
    bsPopovers: () => {
      [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (e) {
        return new bootstrap.Popover(e);
      });
    },
    pricingSwitcher: () => {
      r(".pricing-wrapper").each(function (e, a) {
        var t = r(a);
        t.find(".pricing-switcher").on("click", function () {
          t.find(".pricing-switcher").toggleClass("pricing-switcher-active"), t.find(".price").removeClass("price-hidden"), t.find(".price").toggleClass("price-show price-hide");
        });
      });
    },
    bsModal: () => {
      var e,
        a = window.innerWidth - r("body").innerWidth();
      document.querySelectorAll(".modal").forEach((e) => {
        e.addEventListener("show.bs.modal", function (e) {
          r(".navbar.fixed").css("padding-right", a), r(".progress-wrap").css("margin-right", a);
        }),
          e.addEventListener("hidden.bs.modal", function (e) {
            r(".navbar.fixed").css("padding-right", ""), r(".progress-wrap").css("margin-right", "");
          });
      }),
        0 < r(".modal-popup").length &&
          ((e = new bootstrap.Modal(document.querySelector(".modal-popup"))),
          document.querySelector(".modal-popup"),
          setTimeout(function () {
            e.show();
          }, 200));
    },
  };
  a.init();
})(jQuery);
