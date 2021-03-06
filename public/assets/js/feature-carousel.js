function FeatureCarousel(e, t) {
  (t = t || {}),
    (this.container = e),
    (this.selectionsWrapper = this.container.querySelector(
      ".featuresCarousel-selections"
    )),
    (this.selections = this.container.querySelectorAll(
      ".featuresCarousel-selection"
    )),
    (this.slides = this.container.querySelectorAll(".featuresCarousel-slide")),
    (this.activeClass = t.activeClass || "-is-active"),
    (this.defaultSlideSpeed = t.defaultSlideSpeed || 8e3),
    (this.autoplayTimerBuffer = t.autoplayTimerBuffer || 1e3),
    (this.autoPlay = t.autoPlay || !0),
    (this.activeSectionIndex = 0),
    (this.activeSection = null),
    (this.previousSection = null),
    (this.previousSectionIndex = null),
    (this.autoPlayTimer = null),
    (this.autoPlayDelayTimer = null),
    (this.autoPlayActive = !1),
    (this.sections = []),
    (this.observer = null),
    (this.wasIntersecting = !1),
    (this.init = function () {
      this.initSections(),
        this.bindEventListeners(),
        this.updateDOM(),
        this.initObserver();
    }),
    (this.initSections = function () {
      for (var e = 0; e < this.slides.length; e++) {
        var t = this.slides[e].querySelector("video"),
          i = this.slides[e].querySelector("img,picture"),
          s = this.selections[e].querySelector(
            ".featuresCarousel-progress-bar"
          ),
          n = this.selections[e]
            .querySelector(".featuresCarousel-title")
            .getBoundingClientRect().height,
          a = window
            .getComputedStyle(this.selections[e])
            .paddingTop.split("px")[0],
          o = this.defaultSlideSpeed;
        this.slides[e].dataset.slideSpeed
          ? (o = 1e3 * this.slides[e].dataset.slideSpeed)
          : t &&
            ((t.loop = !1),
            t.duration
              ? (o = 1e3 * t.duration + this.autoplayTimerBuffer)
              : this.applyVideoMeta(t, e));
        var r = this.selections[e].getBoundingClientRect().height,
          l = n + parseInt(a);
        (this.selections[e].style.maxHeight = l + "px"),
          this.sections.push({
            slide: this.slides[e],
            selection: this.selections[e],
            selectionMinimizedHeight: l,
            selectionMaximizedHeight: r,
            slideSpeed: o,
            video: t,
            videoPromise: void 0,
            image: i,
            progressBar: s,
            color: this.slides[e].dataset.color || "purple",
          });
      }
      this.activeSection = this.sections[this.activeSectionIndex];
    }),
    (this.bindEventListeners = function () {
      this.selectionsWrapper.addEventListener(
        "mouseenter",
        this.pauseAutoPlay.bind(this)
      ),
        this.selectionsWrapper.addEventListener(
          "mouseleave",
          this.restartAutoPlay.bind(this)
        );
      for (var e = 0; e < this.sections.length; e++)
        !(function (e, t) {
          t.sections[e].selection.addEventListener("click", function () {
            t.setActiveSlide(e, !0);
          });
        })(e, this);
      var t, i;
      if (void 0 !== document.hidden) (t = "hidden"), (i = "visibilitychange");
      else if (void 0 !== document.msHidden)
        (t = "msHidden"), (i = "msvisibilitychange");
      else {
        if (void 0 === document.webkitHidden) return;
        (t = "webkitHidden"), (i = "webkitvisibilitychange");
      }
      document.addEventListener(
        i,
        function () {
          document[t]
            ? (this.pauseAutoPlay(), this.pauseVideo())
            : (this.restartAutoPlay(), this.restartVideo());
        }.bind(this)
      );
    }),
    (this.initObserver = function () {
      (this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        { threshold: [0.25, 0.5, 0.75] }
      )),
        this.observer.observe(this.container);
    }),
    (this.calculateAndUpdateSelectionHeights = function () {
      for (var e = 0; e < this.slides.length; e++) {
        var t = this.selections[e]
            .querySelector(".featuresCarousel-body")
            .getBoundingClientRect().height,
          i = this.selections[e]
            .querySelector(".featuresCarousel-title")
            .getBoundingClientRect().height,
          s = window
            .getComputedStyle(this.selections[e])
            .paddingTop.split("px")[0],
          n = i + parseInt(s),
          a = t + parseInt(s) + parseInt(s),
          o = this.activeSectionIndex === e ? a : n;
        (this.sections[e].selection.style.maxHeight = o + "px"),
          (this.sections[e].selectionMaximizedHeight = a),
          (this.sections[e].selectionMinimizedHeight = n);
      }
    }),
    (this.applyVideoMeta = function (e, t) {
      e instanceof HTMLVideoElement &&
        e.addEventListener(
          "loadedmetadata",
          function () {
            (this.sections[t].slideSpeed =
              1e3 * e.duration + this.autoplayTimerBuffer),
              this.activeSectionIndex === t &&
                this.autoPlayActive &&
                this.startAutoPlay();
          }.bind(this)
        );
    }),
    (this.updateDOM = function () {
      this.activeSectionIndex !== this.previousSectionIndex &&
        (this.sections.forEach(
          function (e, t) {
            this.activeSectionIndex === t
              ? e.slide.classList.add(this.activeClass)
              : (e.slide.classList.remove(this.activeClass),
                this.stopProgressBar(e));
          }.bind(this)
        ),
        this.activeSection.selection.classList.add(this.activeClass),
        (this.activeSection.selection.style.maxHeight =
          this.activeSection.selectionMaximizedHeight + "px"),
        this.previousSection &&
          (this.previousSection.selection.classList.remove(this.activeClass),
          (this.previousSection.selection.style.maxHeight =
            this.previousSection.selectionMinimizedHeight + "px")));
    }),
    (this.playVideo = function () {
      this.activeSection.video &&
        this.activeSectionIndex !== this.previousSectionIndex &&
        (this.activeSection.videoPromise
          ? this.activeSection.videoPromise.then(
              function () {
                this.activeSection.video.play();
              }.bind(this)
            )
          : this.activeSection.video.play());
    }),
    (this.pauseVideo = function () {
      this.activeSection.video && this.activeSection.video.pause();
    }),
    (this.restartVideo = function () {
      this.activeSection.video &&
        ((this.activeSection.video.currentTime = 0), this.playVideo());
    }),
    (this.setActiveSlide = function (e, t) {
      (this.previousSectionIndex = this.activeSectionIndex),
        (this.activeSectionIndex = e),
        (this.activeSection = this.sections[this.activeSectionIndex]),
        (this.previousSection = this.sections[this.previousSectionIndex]),
        this.activeSectionIndex !== this.previousSectionIndex &&
          (t && (this.restartAutoPlay(), this.pauseAutoPlay()),
          !t && this.autoPlay && this.startAutoPlay(),
          this.updateDOM(),
          this.restartVideo());
    }),
    (this.nextSlide = function () {
      var e = this.activeSectionIndex + 1;
      e >= this.sections.length && (e = 0), this.setActiveSlide(e);
    }),
    (this.startAutoPlay = function () {
      (this.autoPlayActive = !0),
        this.autoPlayTimer && clearTimeout(this.autoPlayTimer),
        this.autoPlayDelayTimer && clearTimeout(this.autoPlayDelayTimer),
        this.previousSection && this.stopProgressBar(this.activeSection),
        this.startProgressBar(this.activeSection),
        (this.autoPlayTimer = setTimeout(
          this.nextSlide.bind(this),
          this.activeSection.slideSpeed
        ));
    }),
    (this.pauseAutoPlay = function () {
      (this.autoPlayActive = !1),
        this.autoPlayTimer && clearTimeout(this.autoPlayTimer),
        this.autoPlayDelayTimer && clearTimeout(this.autoPlayDelayTimer),
        (this.activeSection.progressBar.style.webkitAnimationPlayState =
          "paused"),
        (this.activeSection.progressBar.style.animationPlayState = "paused");
    }),
    (this.restartAutoPlay = function () {
      (this.autoPlayActive = !0),
        this.autoPlayTimer && clearTimeout(this.autoPlayTimer),
        this.autoPlayDelayTimer && clearTimeout(this.autoPlayDelayTimer),
        this.stopProgressBar(this.activeSection),
        (this.autoPlayDelayTimer = setTimeout(
          function () {
            this.startProgressBar(this.activeSection),
              (this.autoPlayTimer = setTimeout(
                this.nextSlide.bind(this),
                this.activeSection.slideSpeed
              ));
          }.bind(this),
          10
        ));
    }),
    (this.startProgressBar = function (e) {
      var t = e.slideSpeed + "ms";
      (e.progressBar.style.animationPlayState = "running"),
        (e.progressBar.style.webkitAnimationPlayState = "running"),
        (e.progressBar.style.animationDuration = t),
        (e.progressBar.style.webkitAnimationDuration = t),
        (e.progressBar.style.animationTimingFunction = "linear"),
        (e.progressBar.style.webkitAnimationTimingFunction = "linear"),
        (e.progressBar.style.animationName = ""),
        (e.progressBar.style.webkitAnimationName = "");
    }),
    (this.stopProgressBar = function (e) {
      (e.progressBar.style.animationPlayState = "paused"),
        (e.progressBar.style.webkitAnimationPlayState = "paused"),
        (e.progressBar.style.animationDuration = ""),
        (e.progressBar.style.webkitAnimationDuration = ""),
        (e.progressBar.style.animationTimingFunction = ""),
        (e.progressBar.style.webkitAnimationTimingFunction = ""),
        (e.progressBar.style.animationName = "none"),
        (e.progressBar.style.webkitAnimationName = "none");
    }),
    (this.handleIntersection = function (e) {
      e.forEach(
        function (e) {
          e.isIntersecting && !this.wasIntersecting
            ? (this.restartAutoPlay(), this.restartVideo())
            : !e.isIntersecting &&
              this.wasIntersecting &&
              (this.pauseAutoPlay(), this.pauseVideo()),
            (this.wasIntersecting = e.isIntersecting);
        }.bind(this)
      );
    });
}
window.addEventListener("load", function () {
  (window.featureCarousels && Array.isArray(window.featureCarousels)) ||
    ((window.featureCarousels = []),
    document.querySelectorAll(".featuresCarousel").forEach(function (e) {
      var t = new FeatureCarousel(e);
      t.init(), window.featureCarousels.push(t);
    }));
}),
  window.addEventListener("resize", function () {
    window.featureCarousels &&
      window.featureCarousels.forEach(function (e) {
        e.calculateAndUpdateSelectionHeights();
      });
  });
