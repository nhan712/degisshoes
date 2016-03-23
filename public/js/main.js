! function(a) {
    "use strict";
    var b = {
        initialised: !1,
        version: 1,
        mobile: !1,
        init: function() {
            if (!this.initialised) {
                this.initialised = !0, this.checkMobile(), this.menuHover()
            }
        },
        checkMobile: function() {
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? this.mobile = !0 : this.mobile = !1
        },
        navbarBtnClassToggle: function() {
            a("#main-navbar-container").on("show.bs.collapse hide.bs.collapse", function(b) {
                a(".navbar-toggle").toggleClass("opened")
            })
        },
        toggleBtn: function() {
            var b = this;
            a(".btn-toggle").on("click", function(c) {
                a(this).toggleClass("opened"), a(this).hasClass("side-menu-btn") && b.toggleClassSideMenu(), c.preventDefault()
            })
        },
        toggleOverlayClick: function() {
            a(".boss-menu-overlay").on("click", function(b) {
                a(".side-menu, .btn-toggle.side-menu-btn").toggleClass("opened"), b.preventDefault()
            })
        },
        toggleClassSideMenu: function() {
            a(".side-menu").toggleClass("opened")
        },
        fullHeight: function() {
            a(".fullheight").each(function() {
                var b = a(window).height();
                a(this).css("height", b)
            })
        },
        pageHeaderTitleAlign: function() {
            if (a(".page-header-welcome.fullheight")) {
                var b = a(window).height(),
                    c = a("#header").find(".navbar").outerHeight(),
                    d = a(".page-header-welcome.fullheight").find("h1").height(),
                    e = (b - (c + d + 150)) / 2;
                a(".page-header-welcome.fullheight").find("h1").css("padding-top", e)
            }
        },
        menuHover: function() {
            Modernizr.mq("only all and (min-width: 768px)") && !Modernizr.touch && a.fn.hoverIntent && a("#header").find(".navbar-nav").hoverIntent({
                over: function() {
                    var b = a(this);
                    b.find("ul, div").length && (b.addClass("open"), b.find(".dropdown-toggle").addClass("disabled"))
                },
                out: function() {
                    var b = a(this);
                    b.hasClass("open") && (b.removeClass("open"), b.find(".dropdown-toggle").removeClass("disabled"))
                },
                selector: "li",
                timeout: 145,
                interval: 55
            })
        },
        mobileMenuDropdownFix: function() {
            (Modernizr.mq("only all and (max-width: 767px)") || Modernizr.touch) && a(".navbar-nav").find(".dropdown-toggle").on("click", function(b) {
                var c = a(this).closest("li");
                c.siblings().removeClass("open").find("li").removeClass("open"), c.toggleClass("open"), b.preventDefault(), b.stopPropagation()
            })
        },
        stickyMenu: function() {
            a.fn.waypoint && a(window).width() >= 992 && a(".sticky-menu").waypoint("sticky", {
                stuckClass: "fixed",
                offset: -300
            })
        },
        destroyStickyMenu: function() {
            a.fn.waypoint && a(window).width() <= 991 && a(".sticky-menu").waypoint("unsticky")
        },
        headerSearchFormFix: function() {
            a("[data-target='#header-search-form']").on("click", function(b) {
                a(".sticky-menu").hasClass("fixed") && a("#header-search-form").toggleClass("fixed"), b.preventDefault()
            })
        },
        headerSearchScrollFix: function() {
            if (a("#header-search-form").hasClass("fixed")) {
                var b = a(window).scrollTop();
                300 >= b && a("#header-search-form").removeClass("fixed")
            }
        },
        headerSearchFormClose: function() {
            a("body").on("click", function(b) {
                a("#header-search-form").hasClass("in") && !a(b.target).closest("#header-search-form").length && (a("#header-search-form").collapse("hide").removeClass("fixed"), b.preventDefault())
            })
        },
        sideMenuCollapse: function() {
            a(".side-menu").find(".navbar-nav").find("a").on("click", function(b) {
                a(this).siblings("ul").length && (a(this).siblings("ul").slideToggle(400, function() {
                    a(this).closest("li").toggleClass("open")
                }), b.preventDefault())
            })
        },
        sideMenuScrollbar: function() {
            if (a.fn.niceScroll) {
                var b, c = a(".side-menu");
                if (b = c.hasClass("navbar-default") ? "#7a7a7a" : c.hasClass("navbar-inverse") ? "#9a9a9a" : "#505050", c.data("railalign")) var d = c.data("railalign");
                a(".side-menu-wrapper").niceScroll({
                    zindex: 9999,
                    autohidemode: !0,
                    background: "rgba(0,0,0, 0.03)",
                    cursorcolor: b,
                    cursorwidth: "6px",
                    cursorborder: "1px solid transparent",
                    cursorborderradius: "4px",
                    railalign: d
                })
            }
        },
        collapseArrows: function() {
            a(".category-widget-btn").on("click", function(b) {
                var c = a(this),
                    d = c.closest("li");
                d.hasClass("open") ? d.find("ul").slideUp(400, function() {
                    d.removeClass("open")
                }) : d.find("ul").slideDown(400, function() {
                    d.addClass("open")
                }), b.preventDefault()
            })
        },
        
        scrollTopBtnAppear: function() {
            var b = a(window).scrollTop(),
                c = a("#scroll-top");
            b >= 300 ? c.addClass("fixed") : c.removeClass("fixed")
        },
        scrollToAnimation: function(b, c, d) {
            var e = a(this).attr("href"),
                f = !1;
            if (a(e).length) var g = a(e),
                h = c ? g.offset().top + c : g.offset().top;
            else {
                if ("#header" !== e && "#top" !== e && "#wrapper" !== e) return;
                h = 0, f = !0
            }(e || f) && (a("html, body").animate({
                scrollTop: h
            }, b || 1200), d.preventDefault())
        },
        scrollToTopAnimation: function() {
            var b = this;
            a("#scroll-top").on("click", function(a) {
                b.scrollToAnimation.call(this, 1200, 0, a)
            })
        },
        scrollToClass: function() {
            var b = this;
            a(".scroll-btn, .section-btn, .scrollto").on("click", function(c) {
                var d = a(this).data("offset");
                b.scrollToAnimation.call(this, 1200, d, c)
            })
        },
        menuOnClick: function() {
            var b = this;
            a(".navbar-nav").find("a").on("click", function(c) {
                var d = a(this).attr("href"); - 1 !== d.indexOf("#") && a(d) && b.scrollToAnimation.call(this, 1200, 0, c)
            })
        },
        priceSlider: function() {
            a("#price-range").noUiSlider({
                range: [0, 1e3],
                start: [100, 900],
                handles: 2,
                connect: !0,
                serialization: {
                    to: [a("#price-range-low"), a("#price-range-high")]
                }
            })
        },
        filterColorBg: function() {
            a(".filter-color-box").each(function() {
                var b = a(this),
                    c = b.data("bgcolor");
                b.css("background-color", c)
            })
        },
        productZoomImage: function() {
            a.fn.elevateZoom && (a("#product-zoom").elevateZoom({
                responsive: !0,
                zoomType: "inner",
                borderColour: "#e1e1e1",
                zoomWindowPosition: 1,
                zoomWindowOffetx: 30,
                cursor: "crosshair",
                zoomWindowFadeIn: 400,
                zoomWindowFadeOut: 250,
                lensBorderSize: 3,
                lensOpacity: 1,
                lensColour: "rgba(255, 255, 255, 0.5)",
                lensShape: "square",
                lensSize: 200,
                scrollZoom: !0
            }), a(".product-gallery").find("a").on("click", function(b) {
                var c = a("#product-zoom").data("elevateZoom"),
                    d = a(this).data("image"),
                    e = a(this).data("zoom-image");
                c.swaptheimage(d, e), b.preventDefault()
            }))
        },
        selectBox: function() {
            a.fn.selectbox && a(".selectbox").selectbox({
                effect: "fade"
            })
        },
        boostrapSpinner: function() {
            a.fn.TouchSpin && (a(".vertical-spinner").TouchSpin({
                verticalbuttons: !0
            }), a(".horizontal-spinner").TouchSpin())
        },
        dateTimePicker: function() {
            a.fn.datetimepicker && (a(".form-datetime").datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            }), a(".form-date").datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0
            }), a(".form-time").datetimepicker({
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 1,
                minView: 0,
                maxView: 1,
                forceParse: 0
            }))
        },
        tooltip: function() {
            a.fn.tooltip && a(".add-tooltip").tooltip()
        },
        popover: function() {
            a.fn.popover && a(".add-popover").popover({
                trigger: "focus"
            })
        },
        servicesHover: function() {
            a(".service-hover").on("mouseover", function() {
                a.each(a(this).find(".service-icon, .service-title, p"), function() {
                    var b = a(this).data("hover-anim");
                    a(this).addClass("animated " + b)
                })
            }).on("mouseleave", function() {
                a.each(a(this).find(".service-icon, .service-title, p"), function() {
                    var b = a(this).data("hover-anim");
                    a(this).removeClass("animated " + b)
                })
            })
        },
        countTo: function() {
            a.fn.countTo ? a.fn.waypoint ? a(".count").waypoint(function() {
                a(this).countTo()
            }, {
                offset: function() {
                    return a(window).height() - 100
                },
                triggerOnce: !0
            }) : a(".count").countTo() : a(".count").each(function() {
                var b = a(this),
                    c = b.data("to");
                b.text(c)
            })
        },
        newsletterPopup: function() {
            document.getElementById("newsletter-popup-form") && jQuery.magnificPopup.open({
                items: {
                    src: "#newsletter-popup-form"
                },
                type: "inline"
            }, 0)
        },
        lightBox: function() {
            a(".popup-gallery").magnificPopup({
                delegate: ".zoom-item",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: !0,
                    titleSrc: function(a) {
                        return a.el.attr("title") + '&nbsp;&nbsp;<a class="image-source-link" href="' + a.el.attr("href") + '" target="_blank">source &rarr;</a>'
                    }
                },
                gallery: {
                    enabled: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 400,
                    opener: function(a) {
                        return a.find("img")
                    }
                }
            }), a(".popup-image").magnificPopup({
                type: "image",
                closeOnContentClick: !0,
                closeBtnInside: !1,
                fixedContentPos: !0,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 400
                }
            }), a(".popup-iframe").magnificPopup({
                disableOn: 700,
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1
            })
        },
        videoBg: function() {
            if (!this.mobile) {
                if (!a.fn.mb_YTPlayer) return;
                a(".player").mb_YTPlayer()
            }
        },
        progressBars: function() {
            var b = this;
            a.fn.waypoint ? a(".progress-animate").waypoint(function() {
                if (a(this).hasClass("circle-progress")) b.animateKnob();
                else {
                    var c = a(this),
                        d = a(this).data("width"),
                        e = c.find(".progress-text, .progress-tooltip");
                    c.css({
                        width: d + "%"
                    }, 400), setTimeout(function() {
                        e.fadeIn(400, function() {
                            c.removeClass("progress-animate")
                        })
                    }, 100)
                }
            }, {
                offset: function() {
                    return a(window).height() - 10
                }
            }) : a(".progress-animate").each(function() {
                var b = a(this),
                    c = a(this).data("width"),
                    d = b.find(".progress-text");
                b.css({
                    width: c + "%"
                }, 400), d.fadeIn(500)
            })
        },
        registerKnob: function() {
            a.fn.knob && (a(".knob").knob({
                bgColor: "#eaeaea"
            }), a(".knob.whitebg").knob({
                bgColor: "#fff"
            }))
        },
        animateKnob: function() {
            a.fn.knob && a(".knob").each(function() {
                var b = a(this),
                    c = b.closest(".progress-animate"),
                    d = b.data("animateto"),
                    e = b.data("animatespeed");
                b.animate({
                    value: d
                }, {
                    duration: e,
                    easing: "swing",
                    progress: function() {
                        b.val(Math.round(this.value)).trigger("change")
                    },
                    complete: function() {
                        c.removeClass("progress-animate")
                    }
                })
            })
        },
        mediaElement: function() {
            a("video, audio").mediaelementplayer()
        },
        scrollAnimations: function() {
            "function" == typeof WOW && new WOW({
                boxClass: "wow",
                animateClass: "animated",
                offset: 0
            }).init()
        },
        flickerFeed: function() {
            a.fn.jflickrfeed && (a("ul.flickr-widget-two").jflickrfeed({
                limit: 8,
                qstrings: {
                    id: "54297118@N03"
                },
                itemTemplate: '<li><a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
            }), a("ul.flickr-widget-three").jflickrfeed({
                limit: 15,
                qstrings: {
                    id: "54297118@N03"
                },
                itemTemplate: '<li><a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
            }))
        },
        attachBg: function() {
            var b = a("[data-bgattach]");
            a.each(b, function() {
                a(this).data("bgattach") && a(this).css("background-image", "url(" + a(this).data("bgattach") + ")")
            })
        },
        parallax: function() {
            this.mobile || "object" != typeof skrollr || skrollr.init({
                forceHeight: !1
            }), this.mobile && a(".parallax, .parallax-fixed").css("background-attachment", "initial")
        },
        isotopeActivate: function() {
            if (a.fn.isotope) {
                var b = this.container,
                    c = b.data("layoutmode");
                b.isotope({
                    itemSelector: ".portfolio-item",
                    layoutMode: c ? c : "masonry",
                    transitionDuration: 0
                })
            }
        },
        isotopeReinit: function() {
            a.fn.isotope && (this.container.isotope("destroy"), this.isotopeActivate())
        },
        isotopeFilter: function() {
            var b = this,
                c = a("#portfolio-filter");
            c.find("a").on("click", function(d) {
                var e = a(this),
                    f = e.attr("data-filter");
                c.find(".active").removeClass("active"), b.container.isotope({
                    filter: f,
                    transitionDuration: "0.8s"
                }), e.closest("li").addClass("active"), d.preventDefault()
            })
        },
        blogMasonry: function() {
            var a = this.blogContainer;
            a.isotope({
                itemSelector: ".entry",
                lasyoutMode: "fitRows",
                masonry: {
                    gutter: 15
                },
                transitionDuration: 0
            })
        },
        blogMasonryRefresh: function() {
            this.blogContainer.isotope("layout")
        },
        infiniteScroll: function(b, c) {
            a.fn.infinitescroll && (b.infinitescroll({
                navSelector: "#page-nav",
                nextSelector: "#page-nav a:first",
                itemSelector: c,
                loading: {
                    msgText: "Loading Posts...",
                    finishedMsg: "No more post to load.",
                    img: "//eonythemes.com/themes/t/images/load.GIF"
                }
            }, function(c) {
                b.isotope("appended", a(c)).isotope("layout")
            }), a("#infinite-trigger").length && (a(window).unbind(".infscr"), a("#infinite-trigger").on("click", function(a) {
                b.infinitescroll("retrieve"), a.preventDefault()
            }), a(document).ajaxError(function(b, c, d) {
                404 == c.status && a("a#infinite-trigger").addClass("disabled")
            })))
        }
    };
    b.init(), a(window).on("load", function() {
        b.sideMenuScrollbar()
    }), a(window).on("scroll", function() {
        b.scrollTopBtnAppear(), b.headerSearchScrollFix()
    }), a.event.special.debouncedresize ? a(window).on("debouncedresize", function() {
        b.fullHeight(), b.destroyStickyMenu()
    }) : a(window).on("resize", function() {
        b.fullHeight(), b.destroyStickyMenu()
    });
    
}(jQuery)