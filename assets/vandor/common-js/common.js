/***************************************************
==================== JS INDEX ======================
01. Data Background Set
02. Sticky Header
03. GSAP Plugins Register
04. Smooth Scroll
05. Fade Animation
06. Preloader
07. Side Info Toggle
08. Mean Menu Init
09. Video Popup
10. Text Invert Scroll Effect
11. Smooth Anchor Scroll
12. Nice Select Init
****************************************************/

(function ($) {
    "use strict";

    var windowOn = $(window);
    let mm = gsap.matchMedia();

    /* === Data Css Js (index 01) === */
    $("[data-background]").each(function () {
        $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
        );
    });

    /* === sticky header Js (index 02) === */
    function pinned_header() {
        var lastScrollTop = 0;

        windowOn.on('scroll', function () {
            var currentScrollTop = $(this).scrollTop();
            if (currentScrollTop > lastScrollTop) {
                $('.header-sticky').removeClass('sticky');
                $('.header-sticky').addClass('transformed');
            } else if ($(this).scrollTop() <= 500) {
                $('.header-sticky').removeClass('sticky');
                $('.header-sticky').removeClass('transformed');
            } else {
                // Scrolling up, remove the class
                $('.header-sticky').addClass('sticky');
                $('.header-sticky').removeClass('transformed');
            }
            lastScrollTop = currentScrollTop;
        });
    }
    pinned_header();

    function pinned_header() {
        $(window).on('scroll', function () {
            var scroll = $(this).scrollTop();

            if (scroll > 720) {
                $('.header-area').addClass('scrolled');
            } else {
                $('.header-area').removeClass('scrolled');
            }
        });
    }
    pinned_header();


    /* === Register GSAP Plugins Js (index 02) === */
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);

    /* === Smooth active Js (index 03) === */
    var device_width = window.screen.width;

    if (device_width > 767) {
        if (document.querySelector("#has_smooth").classList.contains("has-smooth")) {
            const smoother = ScrollSmoother.create({
                // smooth: 0.9,
                smooth: 1.5,
                effects: device_width < 1025 ? false : true,
                smoothTouch: 0.1,
                // normalizeScroll: false,
                normalizeScroll: {
                    allowNestedScroll: true,
                },
                ignoreMobileResize: true,
            });
        }

    }

    /* === GSAP Fade Animation Js (index 04) === */
    let fadeArray_items = document.querySelectorAll(".fade-anim");
    if (fadeArray_items.length > 0) {
        const fadeArray = gsap.utils.toArray(".fade-anim")
        fadeArray.forEach((item, i) => {
            var fade_direction = "bottom"
            var onscroll_value = 1
            var duration_value = 1.15
            var fade_offset = 50
            var delay_value = 0.15
            var ease_value = "power2.out"
            if (item.getAttribute("data-offset")) {
                fade_offset = item.getAttribute("data-offset");
            }
            if (item.getAttribute("data-duration")) {
                duration_value = item.getAttribute("data-duration");
            }
            if (item.getAttribute("data-direction")) {
                fade_direction = item.getAttribute("data-direction");
            }
            if (item.getAttribute("data-on-scroll")) {
                onscroll_value = item.getAttribute("data-on-scroll");
            }
            if (item.getAttribute("data-delay")) {
                delay_value = item.getAttribute("data-delay");
            }
            if (item.getAttribute("data-ease")) {
                ease_value = item.getAttribute("data-ease");
            }
            let animation_settings = {
                opacity: 0,
                ease: ease_value,
                duration: duration_value,
                delay: delay_value,
            }
            if (fade_direction == "top") {
                animation_settings['y'] = -fade_offset
            }
            if (fade_direction == "left") {
                animation_settings['x'] = -fade_offset;
            }
            if (fade_direction == "bottom") {
                animation_settings['y'] = fade_offset;
            }
            if (fade_direction == "right") {
                animation_settings['x'] = fade_offset;
            }
            if (onscroll_value == 1) {
                animation_settings['scrollTrigger'] = {
                    trigger: item,
                    start: 'top 85%',
                }
            }
            gsap.from(item, animation_settings);
        })
    }

    /* === Preloader Animation  Js (index 05) === */
    if (document.querySelectorAll(".loader-wrap").length > 0) {
        $(document).ready(function () {
            setTimeout(function () {
                $('#container').addClass('loaded');
            }, 500);

            setTimeout(function () {
                $('.loader-wrap').fadeOut(1000, function () {
                    $(this).remove();
                });
            }, 3000);

            $('.odometer').waypoint(function (direction) {
                if (direction === 'down') {
                    let countNumber = $(this.element).attr("data-count");
                    $(this.element).html(countNumber);
                }
            }, {
                offset: '80%'
            });

        });

        const svg = document.getElementById("svg");
        const tl = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
            delay: 1.5,
            y: -100,
            opacity: 0,
        });
        tl.to(svg, {
            duration: 0.5,
            attr: {
                d: curve
            },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.5,
            attr: {
                d: flat
            },
            ease: "power2.easeOut",
        });
        tl.to(".loader-wrap", {
            y: -1500,
        });
        tl.to(".loader-wrap", {
            zIndex: -1,
            display: "none",
        });
        tl.from(
            "main", {
            y: 0,
            opacity: 0,
            delay: 0.3,
        },
            "-=1.5"
        );

    }

    /* === Side Info Js (index 06) === */
    $(".side-info-close,.offcanvas-overlay").on("click", function () {
        $(".side-info, .side-info-4").removeClass("info-open");
        $(".offcanvas-overlay").removeClass("overlay-open");
    });
    $(".side-toggle").on("click", function () {
        $(".side-info, .side-info-4").addClass("info-open");
        $(".offcanvas-overlay").addClass("overlay-open");
    });

    /* === Side Info Open/Close (Unified) === */
    $(".side-info-close, .offcanvas-overlay").on("click", function () {
        $(".side-info-4").removeClass("info-open");
        $(".offcanvas-overlay").removeClass("overlay-open");
    });

    $(".side-toggle, .menu-toggle").on("click", function () {
        $(".side-info-4").addClass("info-open");
        $(".offcanvas-overlay").addClass("overlay-open");
    });

    /* === Mean menu activation  Js (index 07) === */
    $('.main-menu').meanmenu({
        meanScreenWidth: "1199",
        meanMenuContainer: '.mobile-menu',
        meanMenuCloseSize: '28px',
    });

    $('.main-menu-all').meanmenu({
        meanScreenWidth: "5000",
        meanMenuContainer: '.mobile-menu',
        meanMenuCloseSize: '28px',
    });

    //  Home 01 menu Animaton 
    if (document.querySelectorAll(".side-info-4").length > 0) {
        const menuToggle = document.querySelector(".menu-toggle");
        const sidebar = document.querySelector(".side-info-4");
        const closeBtn = document.getElementById("side-info-4-close");

        const socialTl = gsap.timeline({ paused: true });
        const navTl = gsap.timeline({ paused: true });

        menuToggle.addEventListener("click", () => {
            sidebar.classList.add("info-open");
            socialTl.play();
            navTl.play(0);
        });

        closeBtn.addEventListener("click", () => {
            socialTl.reverse();
            navTl.reverse();

            sidebar.classList.add("closing");
            sidebar.classList.remove("info-open");

            setTimeout(() => {
                sidebar.classList.remove("closing");
            }, 900);
        });
    }


    /* === Magnific Video popup Js (index 08) === */
    if ($('.video-popup').length && 'magnificPopup' in jQuery) {
        $('.video-popup').magnificPopup({
            type: 'iframe',
        });
    }

    /* === Text Invert With Scroll Js (index 09) === */
    const split = new SplitText(".text-invert", { type: "lines" });
    split.lines.forEach((target) => {
        gsap.to(target, {
            backgroundPositionX: 0,
            ease: "none",
            scrollTrigger: {
                trigger: target,
                scrub: 1,
                start: 'top 85%',
                end: "bottom center",
            }
        });
    });

    /* === gsap nav Js (index 10) === */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });

    /* === Nice Select Js (index 11) === */
    $("select").niceSelect();


    $('.odometer').waypoint(function (direction) {
        if (direction === 'down') {
            let countNumber = $(this.element).attr("data-count");
            $(this.element).html(countNumber);
        }
    }, {
        offset: '80%'
    });
    /* ========  main Js ======== */


    /* === masonry (index 07) === */
    document.addEventListener('DOMContentLoaded', function () {
        var grid = document.querySelector('.gallery__wrapper');
        if (!grid) return;

        imagesLoaded(grid, function () {
            var iso = new Isotope(grid, {
                itemSelector: '.grid-item',
                layoutMode: 'masonry',
                masonry: {
                    gutter: 15,
                    isFitWidth: true,
                }
            });
        });
    });


    /* ===  MagnificPopup image view (index 07) === */
    $(".popup-image").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
            fitWidth: true
        },
    });

    // 18. webgl images hover animation //
    if ($('.rr--hover-item').length) {
        let hoverAnimation__do = function (t, n) {
            let a = new hoverEffect({
                parent: t.get(0),
                intensity: t.data("intensity") || void 0,
                speedIn: t.data("speedin") || void 0,
                speedOut: t.data("speedout") || void 0,
                easing: t.data("easing") || void 0,
                hover: t.data("hover") || void 0,
                image1: n.eq(0).attr("src"),
                image2: n.eq(0).attr("src"),
                displacementImage: t.data("displacement"),
                imagesRatio: n[0].height / n[0].width,
                hover: !1
            });
            t.closest(".rr--hover-item").on("mouseenter", function () {
                a.next()
            }).on("mouseleave", function () {
                a.previous()
            })
        }
        let hoverAnimation = function () {
            $(".rr--hover-img").each(function () {
                let n = $(this);
                let e = n.find("img");
                let i = e.eq(0);
                i[0].complete ? hoverAnimation__do(n, e) : i.on("load", function () {
                    hoverAnimation__do(n, e)
                })
            })
        }
        hoverAnimation();
    }

    // GSAP title animation
    if (document.querySelectorAll(".rr_title_anim").length > 0) {
        if ($('.rr_title_anim').length > 0) {
            let splitTitleLines = gsap.utils.toArray(".rr_title_anim");
            splitTitleLines.forEach(splitTextLine => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none reverse'
                    }
                });

                const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: "lines" })
                tl.from(itemSplitted.lines, {
                    duration: 1,
                    delay: 0.3,
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: "top center -50",
                    stagger: 0.2
                });
            });
        }
    }

})(jQuery);

